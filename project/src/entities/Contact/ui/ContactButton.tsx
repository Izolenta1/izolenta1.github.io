import { MailIcon, TelegramIcon, GithubIcon } from '@/shared/ui';
import type { Contact } from '../model/types';
import { cn } from 'cn';
import { setOrigin } from '@/shared/lib';

const ariaLabels = {
	email: 'Написать на email',
	telegram: 'Telegram (откроется в новой вкладке)',
	github: 'GitHub (откроется в новой вкладке)',
} as const;

type ContactButtonProps = {
	contact: Contact;
};

export function ContactButton({ contact }: ContactButtonProps) {
	const contactIcons = {
		email: MailIcon,
		telegram: TelegramIcon,
		github: GithubIcon,
	};

	const Icon = contactIcons[contact.type as keyof typeof contactIcons];

	return (
		<a
			onMouseEnter={setOrigin}
			onMouseLeave={setOrigin}
			href={contact.href}
			target={contact.type === 'email' ? undefined : '_blank'}
			rel={contact.type === 'email' ? undefined : 'noopener noreferrer'}
			aria-label={`${ariaLabels[contact.type as keyof typeof ariaLabels]}: ${contact.value}`}
			className={cn(
				'focus-ring relative isolate overflow-hidden',
				'bg-paper font-manrope text-ink hover:text-paper',
				'flex items-center gap-3 rounded-lg p-3 px-4.5 py-3.5',
				'text-base leading-normal font-normal',
				'transition-[color] duration-300',
				// темный «залив»
				'before:pointer-events-none before:absolute before:top-(--y) before:left-(--x) before:-z-10',
				'before:bg-ink before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full',
				'before:transition-[width,height] before:duration-300 before:ease-out before:content-[""]',
				'hover:before:size-[250%]',
			)}
		>
			<Icon className="size-5" aria-hidden="true" />
			<span aria-hidden="true">{contact.value}</span>
			<span className="ml-auto" aria-hidden="true">
				→
			</span>
		</a>
	);
}
