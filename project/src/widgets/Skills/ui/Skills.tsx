import skills from '@/data/skills.json';
import { JSIcon, ReactIcon, NodejsIcon, DockerIcon } from '@/shared/ui';
import { cn } from 'cn';

export function Skills() {
	const techIcons = {
		Languages: JSIcon,
		Frontend: ReactIcon,
		Backend: NodejsIcon,
		Tooling: DockerIcon,
	};

	return (
		<section
			id="skills"
			aria-labelledby="skills-heading"
			className="flex scroll-mt-18 flex-col gap-3 md:gap-4 lg:scroll-mt-20 lg:gap-5"
		>
			<h2
				id="skills-heading"
				className="font-manrope text-ink text-2xl leading-normal font-medium tracking-[-0.02em] lg:text-3xl"
			>
				Умения и стек
			</h2>

			<div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:flex lg:flex">
				{skills.skills.map((skill) => {
					const Icon = techIcons[skill.type as keyof typeof techIcons];

					return (
						<div
							key={skill.type}
							className="group bg-paper flex flex-1 justify-between gap-3 p-5 md:p-6 lg:p-7"
						>
							<div className="flex flex-col gap-3 lg:gap-4">
								<h3 className="font-manrope text-muted text-xs leading-normal font-semibold tracking-[0.12em] uppercase">
									{skill.type}
								</h3>
								<ul className="font-ibmpm text-ink text-xs leading-loose font-normal">
									{skill.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>

							<Icon
								aria-hidden="true"
								focusable="false"
								className={cn(
									'hidden xl:block',
									'text-ink size-24 self-end transition-transform duration-300 ease-out',
									'translate-y-[calc(100%+1.75rem)] group-hover:translate-y-0',
									skill.type === 'Frontend' &&
										'animate-[spin_6s_linear_infinite]',
								)}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
}
