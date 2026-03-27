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
		id: 'email',
		placeholder: 'Ваш email-адрес',
		autocomplete: 'email',
		label: 'Email',
	},
	{
		type: 'password',
		id: 'password',
		placeholder: 'Ваш пароль',
		autocomplete: 'password',
		label: 'Пароль',
	},
];
