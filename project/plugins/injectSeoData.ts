import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export function injectSeoData(): Plugin {
	return {
		name: 'inject-site-data',

		transformIndexHtml(html) {
			const portfolioFile = path.resolve(import.meta.dirname, '../src/data/portfolio.json');
			const portfolioData = JSON.parse(fs.readFileSync(portfolioFile, 'utf-8'));
			const contactFile = path.resolve(import.meta.dirname, '../src/data/contacts.json');
			const contactData = JSON.parse(fs.readFileSync(contactFile, 'utf-8'));
			const skillsFile = path.resolve(import.meta.dirname, '../src/data/skills.json');
			const skillsData = JSON.parse(fs.readFileSync(skillsFile, 'utf-8'));

			return html
				.replaceAll('{{name}}', portfolioData.name)
				.replaceAll('{{surname}}', portfolioData.surname)
				.replaceAll('{{position}}', portfolioData.position)
				.replaceAll('{{about}}', portfolioData.about.slice(0, 155) + '...')
				.replaceAll('{{canonical}}', portfolioData.seo_additional.canonical)
				.replaceAll(
					'{{email}}',
					contactData.contacts.find((c: { type: string }) => c.type === 'email')!.value,
				)
				.replaceAll(
					'{{other_contacts}}',
					contactData.contacts
						.filter((c: { type: string }) => c.type !== 'email')
						.map((c: { href: string }) => `"${c.href}"`)
						.join(', '),
				)
				.replaceAll(
					'{{skills}}',
					skillsData.skills
						.flatMap((s: { items: string[] }) => s.items)
						.map((item: string) => `"${item}"`)
						.join(', '),
				);
		},
	};
}
