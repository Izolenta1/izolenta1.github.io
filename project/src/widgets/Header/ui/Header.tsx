import { ActionLink, MenuIcon, CrossIcon } from '@/shared/ui';
import { Z_INDEX } from '@/shared/config';
import { useState } from 'react';
import { cn } from 'cn';
import portfolio from '@/data/portfolio.json';

const LINKS = [
	{
		href: '#about',
		label: 'обо мне',
	},
	{
		href: '#projects',
		label: 'проекты',
	},
	{
		href: '#additional',
		label: 'доп. опыт',
	},
	{
		href: '#skills',
		label: 'умения',
	},
	{
		href: '#contacts',
		label: 'контакты',
	},
] as const;

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header
			className={cn(
				'bg-bg border-line sticky top-0 flex items-center justify-between border-b py-5 lg:py-6',
				isMenuOpen && 'border-transparent',
			)}
			style={{ zIndex: Z_INDEX.HEADER }}
		>
			<span className="font-manrope text-ink text-base leading-normal font-semibold">
				{portfolio.github_name}
			</span>

			<nav
				aria-label="Основная навигация"
				className="font-manrope text-muted flex items-center gap-3 text-sm leading-normal font-normal md:gap-6"
			>
				{LINKS.map((link) => (
					<a
						href={link.href}
						key={link.href}
						className="focus-ring hover:text-ink hidden md:block"
					>
						{link.label}
					</a>
				))}

				<ActionLink
					href={portfolio.resume_url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Резюме (откроется в новой вкладке)"
				>
					Резюме →
				</ActionLink>

				<button
					type="button"
					aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-nav"
					className="focus-ring relative block size-7 cursor-pointer md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<CrossIcon
						aria-hidden="true"
						focusable="false"
						className={cn(
							'text-ink absolute inset-0 size-7 transition-all duration-300',
							isMenuOpen
								? 'scale-100 rotate-0 opacity-100'
								: 'scale-75 -rotate-90 opacity-0',
						)}
					/>
					<MenuIcon
						aria-hidden="true"
						focusable="false"
						className={cn(
							'text-ink absolute inset-0 size-7 transition-all duration-300',
							isMenuOpen
								? 'scale-75 rotate-90 opacity-0'
								: 'scale-100 rotate-0 opacity-100',
						)}
					/>
				</button>
			</nav>

			<nav
				id="mobile-nav"
				aria-label="Мобильное меню"
				inert={!isMenuOpen}
				className={cn(
					'bg-paper border-line absolute top-full right-0 left-0 flex flex-col overflow-hidden rounded-b-xl border border-t-0 transition-[max-height,opacity] duration-300 ease-out md:hidden',
					isMenuOpen ? 'max-h-80' : 'pointer-events-none max-h-0',
				)}
			>
				{LINKS.map((link) => (
					<a
						href={link.href}
						key={link.href}
						className="focus-ring-inset hover:text-ink border-line text-muted border-t px-4.5 py-3.5 text-sm"
						onClick={() => setIsMenuOpen(false)}
					>
						{link.label}
					</a>
				))}
			</nav>
		</header>
	);
}
