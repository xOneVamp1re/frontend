import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './input.style.module.scss';

interface InputProps {
	label?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	id: string;
	placeholder: string;
	autocomplete: string;
	validation?: UseFormRegisterReturn;
	className?: string;
	error?: string;
}

export const Input = (props: InputProps) => {
	const { label, error, className, validation, ...rest } = props;
	const containerClasses = classNames(styles.container, className, {
		[styles.hasError]: error,
	});

	return (
		<div className={containerClasses}>
			{label && (
				<Input.Label htmlFor={rest.id}>
					{label}
					{/* 	{validation.required && <span className={styles.requiredAsterisk}>*</span>} */}
				</Input.Label>
			)}
			<Input.Field validation={validation} {...rest} />
			<Input.Error error={error} />
		</div>
	);
};

Input.Label = function InputLabel({ htmlFor, children, className = '' }) {
	const labelClasses = classNames(styles.label, className && className.split(' ').map(cssClass => styles[cssClass]));
	return (
		<label className={labelClasses} htmlFor={htmlFor}>
			{children}
			{/* {validation?.required && <span className={styles.requiredAsterisk}>*</span>} */}
		</label>
	);
};
Input.Field = function InputField({ type = 'text', id, placeholder, autocomplete, validation, className = '' }) {
	const inputClasses = classNames(styles.input, className && className.split(' ').map(cssClass => styles[cssClass]));
	return (
		<input
			className={inputClasses}
			type={type}
			id={id}
			autoComplete={autocomplete}
			placeholder={placeholder}
			{...validation}
		/>
	);
};
Input.Error = function InputError({ error, className = '' }) {
	const errorClasses = classNames(styles.error, className && className.split(' ').map(cssClass => styles[cssClass]));
	return error ? <div className={errorClasses}>{error}</div> : null;
};
