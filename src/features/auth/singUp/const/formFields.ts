import { SignUpFormData } from '../ui/SignUpUser';

export interface FormField {
	id: keyof SignUpFormData;
	label: string;
	type: 'text' | 'email' | 'password';
	autocomplete: string;
	placeholder: string;
}

export const formFields: FormField[] = [
	{
		label: 'Имя пользователя',
		type: 'text',
		id: 'username',
		placeholder: 'имя пользователя',
		autocomplete: 'username',
	},
	{
		label: 'Ваш email-адрес',
		type: 'email',
		id: 'email',
		placeholder: 'Ваш email-адрес',
		autocomplete: 'email',
	},
	{
		label: 'Ваш пароль',
		type: 'password',
		id: 'password',
		placeholder: 'Ваш пароль',
		autocomplete: 'new-password',
	},
	{
		label: 'Повторите ваш пароль',
		type: 'password',
		id: 'repeat-password',
		placeholder: 'Ваш пароль еще раз',
		autocomplete: 'new-password',
	},
];
