import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import type { ReactNode } from 'react';

type AppLayoutProps = {
	children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="mx-auto w-[min(100%-32px,680px)] md:w-[min(100%-56px,920px)] lg:w-[min(100%-80px,1200px)]">
			<Header />

			<main className="py-5 md:py-6 lg:py-8">{children}</main>

			<Footer />
		</div>
	);
}
