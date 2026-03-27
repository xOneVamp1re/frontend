import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.scss';
import MainProvider from './MainProvider';
import './variables.css';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'No Syntax Error',
	description: 'Сайт для подготовки к ревью и собеседованиям',
	/* 	robots: 'index, follow',
	viewport: 'width=device-width, initial-scale=1', */
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${inter.variable} antialiased layout`}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
