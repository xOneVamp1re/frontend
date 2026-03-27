// lib/tokenRefresher.ts
import { AxiosResponse } from 'axios';

import { apiClient } from './client/client';

interface TokenInfoResponse {
	expiresAt?: string;
	exp?: number;
}

class TokenRefresher {
	private refreshTimer: NodeJS.Timeout | null = null;
	private isRefreshing = false;
	private readonly REFRESH_BEFORE = 60 * 1000; // За 1 минуту до истечения
	private readonly MIN_TIMER = 30 * 1000; // Минимум 30 секунд
	private lastRefreshTime = 0;
	private readonly REFRESH_COOLDOWN = 30 * 1000; // 30 секунд

	start() {
		if (typeof window === 'undefined') return; // Только на клиенте

		console.log('🔄 TokenRefresher started');
		this.scheduleRefresh();
	}

	private async scheduleRefresh() {
		try {
			// Получаем информацию о токене с бэкенда
			const response = await apiClient.get('/auth/token-info');
			const expiresAt = this.getExpiresFromResponse(response);

			if (!expiresAt) {
				// Нет токена или не можем определить - проверим через минуту
				this.setTimer(60 * 1000);
				return;
			}

			const now = Date.now();
			const timeUntilExpiry = expiresAt - now;

			console.log(`⏰ Token expires in ${Math.round(timeUntilExpiry / 1000)}s`);

			if (timeUntilExpiry <= 0) {
				await this.refresh();
			} else if (timeUntilExpiry <= this.REFRESH_BEFORE) {
				await this.refresh();
			} else {
				const refreshIn = timeUntilExpiry - this.REFRESH_BEFORE;
				this.setTimer(Math.max(refreshIn, this.MIN_TIMER));
			}
		} catch (error) {
			console.error('❌ Token refresh scheduling error:', error);
			// При ошибке пробуем снова через минуту
			this.setTimer(60 * 1000);
		}
	}

	private async refresh() {
		if (Date.now() - this.lastRefreshTime < this.REFRESH_COOLDOWN) {
			console.log('⏸️ Refresh skipped - too soon');
			return;
		}
		if (this.isRefreshing) {
			console.log('⏳ Already refreshing...');
			return;
		}

		this.isRefreshing = true;
		this.lastRefreshTime = Date.now();

		try {
			console.log('🔄 Preemptive token refresh...');
			await apiClient.post('/auth/refresh');
			console.log('✅ Tokens refreshed proactively');

			// После успешного обновления планируем следующий
			this.scheduleRefresh();
		} catch (error) {
			console.error('❌ Preemptive refresh failed:', error);
			// При ошибке пробуем снова через минуту
			this.setTimer(60 * 1000);
		} finally {
			this.isRefreshing = false;
		}
	}

	private getExpiresFromResponse(response: AxiosResponse<TokenInfoResponse>): number | null {
		// Пытаемся получить expires из разных форматов ответа
		if (response?.data?.expiresAt) {
			return new Date(response.data.expiresAt).getTime();
		}
		if (response?.data?.exp) {
			return response.data.exp * 1000; // JWT exp в секундах
		}
		if (response?.headers?.['x-token-expires']) {
			return parseInt(response.headers['x-token-expires']) * 1000;
		}
		return null;
	}

	private setTimer(ms: number) {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
		}

		console.log(`⏲️  Next refresh in ${Math.round(ms / 1000)}s`);

		this.refreshTimer = setTimeout(() => {
			this.scheduleRefresh();
		}, ms);
	}

	stop() {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
			this.refreshTimer = null;
		}
		console.log('⏹️ TokenRefresher stopped');
	}

	// Принудительное обновление (можно вызвать после логина)
	forceRefresh() {
		this.setTimer(0);
	}
}

export const tokenRefresher = new TokenRefresher();
