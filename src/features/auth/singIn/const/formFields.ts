import { SingInFormData } from '../ui/SingInUser';

export interface FormField {
	id: keyof SingInFormData;
	type: 'email' | 'password';
	autocomplete: string;
	placeholder: string;
	label: string;
}

export const formFields: FormField[] = [
	{
		type: 'email',
		id: 'email-signin',
		placeholder: 'Ваш email-адрес',
		autocomplete: 'email',
		label: 'Email',
	},
	{
		type: 'password',
		id: 'password-signin',
		placeholder: 'Ваш пароль',
		autocomplete: 'password',
		label: 'Пароль',
	},
];
