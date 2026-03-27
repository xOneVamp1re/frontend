'use client';

import { useRouter } from 'next/navigation';
import { RegisterOptions, useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

import { MaterialIcon } from '@/shared/types/icons.types';
import { Input } from '@/shared/UI/input/input';

import { useLogin } from '../api/singIn';
import { formFields } from '../const/formFields';
import styles from './SingInUser.module.scss';

export interface SingInFormData {
	'email': string;
	'password': string;
}

export const SingIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<SingInFormData>({ mode: 'onChange' });

	// const router = useRouter();
	const loginMutation = useLogin();

	const onSubmit = (data: SingInFormData) => {
		console.log(data);
		loginMutation.mutate(data);
	};

	const validation: Record<keyof SingInFormData, RegisterOptions<SingInFormData, keyof SingInFormData>> = {
		'email-signin': {
			required: 'Это поле обязательно для заполнения',

			pattern: {
				value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: 'Неверный email-адрес',
			},
		},
		'password-signin': {
			required: 'Это поле обязательно для заполнения',
			minLength: {
				value: 6,
				message: 'Пароль должен содержать не менее 6 символов',
			},
			maxLength: {
				value: 40,
				message: 'Пароль должен содержать не более 40 символов',
			},
			pattern: {
				value: /^\S*$/,
				message: 'Пароль не должен содержать пробелы',
			},
		},
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
				<h2 className={styles.legend}>Войти в аккаунт</h2>
				<div className={styles['social-buttons']}>
					<button type='button' className={styles['social-button']}>
						<MaterialIcon name='MdFacebook' size={26} />
					</button>
					<button type='button' className={styles['social-button']}>
						<FaGoogle />
					</button>
				</div>
				<span className={styles.text}>или используйте email для входа</span>
				<fieldset className={styles.fieldset}>
					{formFields.map(field => (
						<Input
							key={field.id}
							id={field.id}
							type={field.type}
							autocomplete={field.autocomplete}
							placeholder={`Введите ${field.placeholder.toLowerCase()}`}
							validation={register(field.id, validation[field.id])}
							error={errors[field.id]?.message}
							variant='floating'
							label={field.label}
						/>
					))}
					<button className={styles.button} type='submit' disabled={!isValid || isSubmitting}>
						Войти
					</button>
				</fieldset>
			</form>
		</>
	);
};
