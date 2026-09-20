import { ContactButton } from '@/entities/Contact';
import portfolio from '@/data/portfolio.json';
import contacts from '@/data/contacts.json';

export function Contacts() {
	return (
		<section
			id="contacts"
			tabIndex={-1}
			aria-labelledby="contacts-heading"
			className="xs:flex-row flex scroll-mt-18 flex-col gap-6 md:gap-12 lg:scroll-mt-20 lg:gap-25"
		>
			<div className="xs:max-w-82.5 flex w-full flex-col gap-3 md:max-w-105 md:gap-4 lg:max-w-137.5 lg:gap-5">
				<h2
					id="contacts-heading"
					className="font-manrope text-ink text-2xl leading-normal font-medium tracking-[-0.02em] lg:text-3xl"
				>
					Контакты
				</h2>

				<div className="flex flex-col gap-4">
					<p className="font-manrope text-ink text-lg leading-normal font-normal tracking-[-0.02em] lg:text-xl">
						{portfolio.contacts_description}
					</p>

					<ul className="flex flex-col gap-3">
						{contacts.contacts.map((contact) => (
							<li key={contact.type}>
								<ContactButton contact={contact} />
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="flex-1">
				<img
					src="/CatPicture2.png"
					alt=""
					className="h-full w-full object-contain object-bottom [image-rendering:pixelated]"
				/>
			</div>
		</section>
	);
}
