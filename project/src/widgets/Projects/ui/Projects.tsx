import { ProjectCard, ProjectInfo, type Project } from '@/entities/Project';
import { Carousel } from '@/shared/ui';
import { useState } from 'react';
import { cn } from 'cn';

type ProjectsProps = {
	title: string;
	anchor: string;
	projects: Project[];
};

export function Projects({ title, anchor, projects }: ProjectsProps) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [visibleProject, setVisibleProject] = useState<Project | null>(null);

	function toggleProject(project: Project) {
		if (selectedProject?.id === project.id) {
			setSelectedProject(null);
		} else {
			setSelectedProject(project);
			setVisibleProject(project);
		}
	}

	// a11y
	const detailsId = `${anchor}-details`;
	const detailsTitleId = `${detailsId}-title`;

	return (
		<section
			id={anchor}
			aria-labelledby={`${anchor}-heading`}
			className="flex scroll-mt-18 flex-col gap-3 md:gap-4 lg:scroll-mt-20 lg:gap-5"
		>
			<div className="font-manrope flex items-center justify-between">
				<h2
					id={`${anchor}-heading`}
					className="text-ink text-2xl leading-normal font-medium tracking-[-0.02em] lg:text-3xl"
				>
					{title}
				</h2>
			</div>

			<Carousel ariaLabel={title}>
				{projects.map((project) => {
					const isSelected = selectedProject?.id === project.id;

					return (
						<button
							key={project.id}
							type="button"
							aria-expanded={isSelected}
							aria-controls={detailsId}
							className="focus-ring embla__slide relative min-w-0 flex-[0_0_12rem] pl-3 text-start md:flex-[0_0_25%]"
							onClick={() => toggleProject(project)}
						>
							<ProjectCard project={project} selected={isSelected} />

							{/* Полоса */}
							<div
								aria-hidden="true"
								className={cn(
									'bg-ink pointer-events-none absolute top-full right-0 left-3 h-9 origin-top',
									'transition-transform duration-100 ease-out',
									isSelected ? 'scale-y-100 delay-400' : 'scale-y-0 delay-250',
								)}
							/>
						</button>
					);
				})}
			</Carousel>

			<div
				id={detailsId}
				role="region"
				aria-labelledby={selectedProject ? detailsTitleId : undefined}
				aria-hidden={!selectedProject}
				inert={!selectedProject}
				className={cn(
					'grid transition-[grid-template-rows] duration-500 ease-out',
					selectedProject ? 'grid-rows-[1fr] delay-600' : 'grid-rows-[0fr] delay-0',
				)}
			>
				<div className="min-h-0 overflow-hidden">
					{visibleProject && (
						<ProjectInfo
							key={visibleProject.id}
							project={visibleProject}
							titleId={detailsTitleId}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
