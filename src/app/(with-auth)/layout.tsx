import { Header } from '@/widgets/header/UI/Header';

import styles from './style.module.scss';

export default function WithAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles['with-auth']}>
			<Header />
			<main className={styles.main}>{children}</main>
		</div>
	);
}
