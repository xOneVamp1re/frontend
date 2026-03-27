class CSRFManager {
	private token: string | null = null;
	private lastFetched: number | null = null;
	private readonly TTL = 23 * 60 * 60 * 1000; // 23 часа
	private promise: Promise<string> | null = null;
	private readonly STORAGE_KEY = 'csrf-token-cache';
	private readonly SYNC_KEY = 'csrf-token-sync';
	private channel: BroadcastChannel | null = null; // Для современных браузеров

	constructor() {
		if (typeof window !== 'undefined') {
			// Пытаемся восстановить из sessionStorage при загрузке
			this.restoreFromSession();

			// Слушаем изменения в localStorage (для синхронизации между вкладками)
			window.addEventListener('storage', this.handleStorageSync.bind(this));

			// Используем BroadcastChannel для современных браузеров (опционально)
			if (typeof BroadcastChannel !== 'undefined') {
				this.channel = new BroadcastChannel('csrf-sync');
				this.channel.onmessage = event => {
					if (event.data.type === 'CSRF_UPDATED') {
						this.handleSync(event.data.token, event.data.timestamp);
					}
				};
			}
		}
	}

	private restoreFromSession() {
		try {
			const saved = sessionStorage.getItem(this.STORAGE_KEY);
			if (saved) {
				const { token, timestamp } = JSON.parse(saved);
				if (Date.now() - timestamp < this.TTL) {
					this.token = token;
					this.lastFetched = timestamp;
					console.log('🔄 CSRF token restored from session');
				} else {
					sessionStorage.removeItem(this.STORAGE_KEY);
				}
			}
		} catch (error) {
			console.debug('Failed to restore CSRF token from session:', error);
		}
	}

	private handleStorageSync(event: StorageEvent) {
		if (event.key === this.SYNC_KEY && event.newValue) {
			try {
				const { token, timestamp } = JSON.parse(event.newValue);
				this.handleSync(token, timestamp);
			} catch (error) {
				console.debug('Failed to handle storage sync:', error);
			}
		}
	}

	private handleSync(token: string, timestamp: number) {
		// Обновляем токен только если он новее текущего
		if (!this.lastFetched || timestamp > this.lastFetched) {
			console.log('🔄 CSRF token synced from another tab');
			this.token = token;
			this.lastFetched = timestamp;

			// Обновляем sessionStorage
			this.saveToSession(token, timestamp);
		}
	}

	private saveToSession(token: string, timestamp: number) {
		try {
			sessionStorage.setItem(
				this.STORAGE_KEY,
				JSON.stringify({
					token,
					timestamp,
				})
			);
		} catch (error) {
			console.debug('Failed to save CSRF token to session:', error);
		}
	}

	private notifyOtherTabs(token: string, timestamp: number) {
		// Уведомляем через localStorage (кросс-таб)
		try {
			localStorage.setItem(this.SYNC_KEY, JSON.stringify({ token, timestamp }));
			// Сразу удаляем, чтобы не захламлять storage
			setTimeout(() => {
				localStorage.removeItem(this.SYNC_KEY);
			}, 100);
		} catch (error) {
			console.debug('Failed to notify other tabs:', error);
		}

		// Уведомляем через BroadcastChannel (если поддерживается)
		if (this.channel) {
			this.channel.postMessage({
				type: 'CSRF_UPDATED',
				token,
				timestamp,
			});
		}
	}

	async getToken(): Promise<string> {
		// Если есть и не протух - возвращаем
		if (this.token && this.lastFetched && Date.now() - this.lastFetched < this.TTL) {
			return this.token;
		}

		// Если уже запрашиваем - не создаем новый запрос
		if (this.promise) {
			return this.promise;
		}

		this.promise = this.fetchToken();
		try {
			const token = await this.promise;
			return token;
		} finally {
			this.promise = null;
		}
	}

	private async fetchToken(): Promise<string> {
		try {
			const response = await fetch('/api/auth/csrf-token', {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch CSRF token');
			}

			const data = await response.json();
			const token = data.csrfToken;
			const timestamp = Date.now();

			this.token = token;
			this.lastFetched = timestamp;

			// Сохраняем в sessionStorage
			this.saveToSession(token, timestamp);

			// Уведомляем другие вкладки
			this.notifyOtherTabs(token, timestamp);

			return token;
		} catch (error) {
			console.error('❌ Failed to fetch CSRF token:', error);
			throw error;
		}
	}

	reset() {
		this.token = null;
		this.lastFetched = null;
		this.promise = null;

		// Очищаем sessionStorage
		try {
			sessionStorage.removeItem(this.STORAGE_KEY);
		} catch (error) {
			console.debug('Failed to clear session storage:', error);
		}

		// Уведомляем другие вкладки о сбросе
		this.notifyOtherTabs('', 0);
	}

	// Очистка при размонтировании (вызвать в провайдере)
	destroy() {
		if (this.channel) {
			this.channel.close();
		}
		window.removeEventListener('storage', this.handleStorageSync.bind(this));
	}
}

export const csrfManager = new CSRFManager();
