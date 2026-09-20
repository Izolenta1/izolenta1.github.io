import { cn } from 'cn';
import { cva } from 'class-variance-authority';
import type { AnchorHTMLAttributes } from 'react';
import { setOrigin } from '@/shared/lib';
import type { ReactNode } from 'react';

const actionLinkVariants = cva(
	[
		'relative overflow-hidden isolate focus-ring',
		'font-manrope text-sm font-medium leading-3.5 text-paper text-center',
		'bg-sage rounded-full',
		'transition-[color] duration-300',
		'cursor-pointer',
		// оранжевый «залив»
		'before:content-[""] before:absolute before:top-(--y) before:left-(--x)',
		'before:size-0 before:rounded-full before:bg-accent',
		'before:-translate-x-1/2 before:-translate-y-1/2',
		'before:transition-[width,height] before:duration-300 before:ease-out',
		'before:pointer-events-none before:-z-10',
		'hover:before:size-[250%]', // запас, чтобы покрыть с любого угла
	].join(' '),
	{
		variants: {
			variant: {
				default: '',
			},
			size: {
				default: 'px-4 py-2 w-fit',
				large: 'px-4.5 py-3 flex-1',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type ActionLinkProps = {
	variant?: 'default';
	size?: 'default' | 'large';
	className?: string;
	href: string;
	children: ReactNode;
};

export function ActionLink({
	variant = 'default',
	size = 'default',
	className,
	children,
	...props
}: ActionLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className={cn(actionLinkVariants({ variant, size, className }))}
			onMouseEnter={setOrigin}
			onMouseLeave={setOrigin}
			{...props}
		>
			{children}
		</a>
	);
}
