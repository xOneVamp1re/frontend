import { Navigation } from '@/widgets/navigation/Navigation';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

import './globals.scss';

export default function Home() {
	return (
		<div className='layout'>
			<Navigation />
			<main className='center'>Content</main>
			<Sidebar />
		</div>
	);
}
