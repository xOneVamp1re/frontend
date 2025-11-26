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
		label: 'Username',
		type: 'text',
		id: 'username',
		placeholder: 'Username',
		autocomplete: 'username',
	},
	{
		label: 'Email Address',
		type: 'email',
		id: 'email',
		placeholder: 'Email Address',
		autocomplete: 'email',
	},
	{
		label: 'Password',
		type: 'password',
		id: 'password',
		placeholder: 'Password',
		autocomplete: 'new-password',
	},
	{
		label: 'Repeat Password',
		type: 'password',
		id: 'repeat-password',
		placeholder: 'Password',
		autocomplete: 'new-password',
	},
];
