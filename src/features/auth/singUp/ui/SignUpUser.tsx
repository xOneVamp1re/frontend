'use client';

import { RegisterOptions, useForm } from 'react-hook-form';

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
	const onSubmit = (data: SignUpFormData) => {
		console.log(data);
		registerMutation.mutate(data);
	};

	const validation: Record<keyof SignUpFormData, RegisterOptions<SignUpFormData, keyof SignUpFormData>> = {
		email: {
			required: 'This field is required',
			pattern: {
				value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: 'Invalid email address',
			},
		},
		username: {
			required: 'This field is required',
			minLength: { value: 3, message: 'Username must be at least 3 characters' },
			maxLength: { value: 20, message: 'Username must be at most 20 characters' },
			pattern: {
				value: /^[a-zA-Z0-9]{3,20}$/,
				message: 'Only letters and numbers are allowed',
			},
		},
		password: {
			required: 'This field is required',
			minLength: {
				value: 6,
				message: 'Your password needs to be at least 6 characters',
			},
			maxLength: {
				value: 40,
				message: 'Your password needs to be at most 40 characters',
			},
			pattern: {
				value: /^\S*$/,
				message: 'Password should not contain spaces',
			},
		},
		'repeat-password': {
			required: 'This field is required',
			minLength: {
				value: 6,
				message: 'Your password needs to be at least 6 characters',
			},
			maxLength: {
				value: 40,
				message: 'Your password needs to be at most 40 characters',
			},
			pattern: {
				value: /^\S*$/,
				message: 'Password should not contain spaces',
			},
			validate: value => {
				const { password } = getValues();
				return value === password || 'Passwords must match';
			},
		},
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
				<fieldset>
					<legend className={styles.legend}>Create New Account</legend>
					{formFields.map(field => (
						<Input
							key={field.id}
							label={field.label}
							id={field.id}
							type={field.type}
							autocomplete={field.autocomplete}
							placeholder={`Enter your ${field.placeholder.toLowerCase()}`}
							validation={register(field.id, validation[field.id])}
							error={errors[field.id]?.message}
						/>
					))}
					<button className={styles.button} type='submit' disabled={!isValid || isSubmitting}>
						Sign Up
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
