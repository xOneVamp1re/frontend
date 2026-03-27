'use client';

import { useRouter } from 'next/navigation';
import { RegisterOptions, useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

import { MaterialIcon } from '@/shared/types/icons.types';
import { Input } from '@/shared/UI/input/input';

import { useRegister } from '../api/singUp';
import { formFields } from '../const/formFields';
import styles from './SignUpUser.module.scss';

export interface SignUpFormData {
	email: string;
	username: string;
	password: string;
	'repeat-password': string;
}

export const SignUpUser = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		getValues,
		// setError,
		// setFocus,
	} = useForm<SignUpFormData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			username: '',
			password: '',
			'repeat-password': '',
		},
	});

	const registerMutation = useRegister();
	const router = useRouter();
	const onSubmit = (data: SignUpFormData) => {
		const submitData = { ...data };
		delete submitData['repeat-password'];
		registerMutation.mutate(submitData, {
			onSuccess: () => {
				console.log('ДА ВСЕ ХОРОШО');
				console.log(router);
			},
		});
	};

	const validation: Record<keyof SignUpFormData, RegisterOptions<SignUpFormData, keyof SignUpFormData>> = {
		email: {
			required: 'Это поле обязательно для заполнения',
			pattern: {
				value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: 'Неверный email-адрес',
			},
		},
		username: {
			required: 'Это поле обязательно для заполнения',
			minLength: {
				value: 3,
				message: 'Имя пользователя должно содержать не менее 3 символов',
			},
			maxLength: {
				value: 20,
				message: 'Имя пользователя должно содержать не более 20 символов',
			},
			pattern: {
				value: /^[a-zA-Z0-9]{3,20}$/,
				message: 'Разрешены только латинские буквы и цифры',
			},
		},
		password: {
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
		'repeat-password': {
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
			validate: value => {
				const { password } = getValues();
				return value === password || 'Пароли должны совпадать';
			},
		},
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
				<h2 className={styles.legend}>Создать аккаунт</h2>
				<div className={styles['social-buttons']}>
					<button type='button' className={styles['social-button']}>
						<MaterialIcon name='MdFacebook' size={26} />
					</button>
					<button type='button' className={styles['social-button']}>
						<FaGoogle />
					</button>
				</div>
				<span className={styles.text}>или используйте email для регистрации</span>
				<fieldset className={styles.fieldset}>
					{formFields.map(field => (
						<Input
							key={field.id}
							id={field.id}
							type={field.type}
							label={field.label}
							autocomplete={field.autocomplete}
							placeholder={`Введите ${field.placeholder.toLowerCase()}`}
							validation={register(field.id, validation[field.id])}
							error={errors[field.id]?.message}
							variant='floating'
						/>
					))}
					<button className={styles.button} type='submit' disabled={!isValid || isSubmitting}>
						Зарегистрироваться
					</button>
				</fieldset>
			</form>
		</>
	);
};
{
	/* 					<button 
  type="submit" 
  disabled={!isValid || isSubmitting}
  className={classNames('submit-btn', {
    'loading': isSubmitting,
    'disabled': !isValid
  })}
>
  {isSubmitting ? (
    <>
      <Spinner />
      Creating Account...
    </>
  ) : (
    'Sign Up'
  )}</button> */
}
