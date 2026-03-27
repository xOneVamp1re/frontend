import { useState } from 'react';

import SingUp from '@/app/sing_up/page';
import { SingIn } from '@/features/auth/singIn/ui/SingInUser';

import styles from './Auth.module.scss';

export const Auth = () => {
	const [activePanelRight, setActivePanelRight] = useState(true);

	const handleClick = () => {
		setActivePanelRight(prev => !prev);
	};

	return (
		<section className={styles.section}>
			<div className={`${styles.container}  ${activePanelRight ? styles['right-panel-active'] : ''} `}>
				<div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
					<SingUp />
				</div>
				<div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
					<SingIn />
				</div>
				<div className={styles['overlay-container']}>
					<div className={styles.overlay}>
						<div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
							<h3 className={styles['overlay-title']}>С возвращением!</h3>
							<p className={styles['overlay-text']}>
								Чтобы оставаться на связи с нами, пожалуйста, войдите используя свои данные
							</p>
							<button className={styles['ghost-button']} onClick={handleClick}>
								Зарегистрироваться
							</button>
						</div>
						<div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
							<h3 className={styles['overlay-title']}>Привет, друг!</h3>
							<p className={styles['overlay-text']}>Введите свои данные и начните путешествие с нами</p>
							<button className={styles['ghost-button']} onClick={handleClick}>
								Войти
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
