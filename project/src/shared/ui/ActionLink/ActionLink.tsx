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
		'cursor-pointer fill-from-origin [--fill-size:250%] [--fill-color:var(--accent)]',
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
