import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

import { useState } from 'react';

import styles from './input.style.module.scss';

interface InputProps {
	label?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	id: string;
	placeholder: string;
	autocomplete: string;
	validation?: UseFormRegisterReturn;
	className?: string;
	variant?: 'default' | 'floating';
	required?: boolean;
	error?: string;
}

export const Input = (props: InputProps) => {
	const { label, error, className, validation, variant = 'default', required, ...rest } = props;

	const containerClasses = classNames(styles.container, className, {
		[styles.hasError]: error,
		[styles.required]: required,
		[styles.floating]: variant === 'floating',
	});

	return (
		<div className={containerClasses}>
			{variant === 'floating' ? (
				<Input.FloatingLabel htmlFor={rest.id} label={label} required={required} />
			) : label ? (
				<Input.Label htmlFor={rest.id} required={required}>
					{label}
				</Input.Label>
			) : null}

			<Input.Field variant={variant} validation={validation} error={error} required={required} {...rest} />

			<Input.Error error={error} />
		</div>
	);
};

Input.Label = function InputLabel({ htmlFor, children, className = '', required }) {
	const labelClasses = classNames(styles.label, className && className.split(' ').map(cssClass => styles[cssClass]));

	return (
		<label className={labelClasses} htmlFor={htmlFor}>
			{children}
			{required && <span className={styles.requiredAsterisk}>*</span>}
		</label>
	);
};

Input.FloatingLabel = function InputFloatingLabel({ htmlFor, label, required, className = '' }) {
	const labelClasses = classNames(
		styles['floating-label'],
		className && className.split(' ').map(cssClass => styles[cssClass])
	);

	return (
		<label className={labelClasses} htmlFor={htmlFor}>
			{label}
			{required && <span className={styles.requiredAsterisk}>*</span>}
		</label>
	);
};

Input.Field = function InputField({
	type = 'text',
	id,
	autocomplete,
	validation,
	className = '',
	error,
	variant = 'default',
	placeholder,
	required,
}) {
	const [, setIsFocused] = useState(false);

	const inputClasses = classNames(styles.input, className && className.split(' ').map(cssClass => styles[cssClass]), {
		[styles.inputError]: error,
		[styles.floatingInput]: variant === 'floating',
	});

	// Для floating варианта нужен placeholder=" " (пробел)
	const inputPlaceholder = variant === 'floating' ? ' ' : placeholder;

	return (
		<input
			className={inputClasses}
			type={type}
			id={id}
			autoComplete={autocomplete}
			placeholder={inputPlaceholder}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			required={required}
			{...validation}
		/>
	);
};

Input.Error = function InputError({ error, className = '' }) {
	const errorClasses = classNames(styles.error, className && className.split(' ').map(cssClass => styles[cssClass]));

	return error ? <div className={errorClasses}>{error}</div> : <div className={styles['error-transparent']}></div>;
};
