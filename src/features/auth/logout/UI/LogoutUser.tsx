import { useLogout } from '../Api/LogoutUser.api';

export const LogoutUser = () => {
	const logoutUserMutation = useLogout();

	return (
		<button
			disabled={logoutUserMutation.isPending}
			onClick={() => {
				logoutUserMutation.mutate();
			}}>
			Выйти
		</button>
	);
};
