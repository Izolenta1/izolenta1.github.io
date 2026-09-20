import portfolio from '@/data/portfolio.json';

export function Footer() {
	return (
		<footer className="border-line border-t py-6 md:py-7 lg:py-8">
			<span className="font-manrope text-muted text-xs leading-normal font-normal">
				{portfolio.build_text}
			</span>
		</footer>
	);
}
