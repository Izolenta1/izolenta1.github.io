export function setOrigin(e: React.MouseEvent<HTMLElement>) {
	const el = e.currentTarget;
	const { left, top } = el.getBoundingClientRect();
	el.style.setProperty('--x', `${e.clientX - left}px`);
	el.style.setProperty('--y', `${e.clientY - top}px`);
};