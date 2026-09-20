import { About } from '@/widgets/About';
import { Projects } from '@/widgets/Projects';
import { Skills } from '@/widgets/Skills';
import { Contacts } from '@/widgets/Contacts';
import projects from '@/data/projects.json';
import additional from '@/data/additional.json';
import { Reveal } from '@/shared/ui';

export function MainPage() {
	return (
		<div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
			<Reveal>
				<About />
			</Reveal>
			<Reveal>
				<Projects title="Проекты" anchor="projects" projects={projects.projects} />
			</Reveal>
			<Reveal>
				<Projects title="Доп. опыт" anchor="additional" projects={additional.projects} />
			</Reveal>
			<Reveal>
				<Skills />
			</Reveal>
			<Reveal>
				<Contacts />
			</Reveal>
		</div>
	);
}
