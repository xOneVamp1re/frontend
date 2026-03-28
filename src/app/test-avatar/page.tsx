import { Avatar } from '@/shared/UI/avatar';

export default function TestAvatarPage() {
	return (
		<div className='p-8 space-y-8'>
			<h1 className='text-2xl font-bold'>Тестирование Avatar</h1>

			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>1. Аватар с реальным ключом</h2>
				<Avatar avatarKey='avatars/test-user/1774694646565_z8vrip.webp' size={100} />

				<h2 className='text-lg font-semibold mt-4'>2. Аватар с инициалами (fallback)</h2>
				<Avatar userId='john_doe' fallback='initials' size={100} />

				<h2 className='text-lg font-semibold mt-4'>3. Аватар с несуществующим ключом (должен показать fallback)</h2>
				<Avatar avatarKey='несуществующий/путь.jpg' userId='john_doe' size={100} />
			</div>
		</div>
	);
}
