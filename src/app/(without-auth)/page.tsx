'use client';

import { Auth } from '@/widgets/auth/UI/Auth';

import styles from './page.module.scss';

export default function WithoutAuthPage({ children }: { children: React.ReactNode }) {
	return (
		<main className={styles.main}>
			<Auth />
		</main>
	);
}
