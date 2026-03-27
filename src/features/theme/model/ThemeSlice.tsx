/* type Theme = 'light' | 'dark';

interface ThemeState {
	theme: Theme;
	systemTheme: Theme;
}

const getSystemTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light';
	const saved = localStorage.getItem('theme') as Theme;
	return saved || getSystemTheme();
};
 */
