import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from 'cn';

type RevealProps = {
	children: ReactNode;
	once?: boolean;
};

export function Reveal({ children, once = true }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setShown(true);
				if (once) io.disconnect();
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
		);

		io.observe(el);

		return () => io.disconnect();
	}, [once]);

	return (
		<div
			ref={ref}
			className={cn(
				shown
					? 'animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700'
					: 'opacity-0',
			)}
		>
			{children}
		</div>
	);
}
