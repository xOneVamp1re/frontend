import { MaterialIcon } from '@/shared/types/icons.types';

import { useLogout } from '../Api/LogoutUser.api';
import styles from './LogoutUser.module.scss';

export const LogoutUser = () => {
	const logoutUserMutation = useLogout();

	return (
		<button
			disabled={logoutUserMutation.isPending}
			className={styles.button}
			onClick={() => {
				logoutUserMutation.mutate();
			}}>
			<MaterialIcon name='MdLogout' />
			Выйти
		</button>
	);
};
