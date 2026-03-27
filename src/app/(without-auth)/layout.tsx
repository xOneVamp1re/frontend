import { Header } from '@/widgets/header/UI/Header';

export default function WithoutAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
