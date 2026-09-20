import { useEffect, useState } from 'react';
import { ActionLink } from '@/shared/ui';
import type { Project } from '../model/types';
import { cn } from 'cn';
import { Z_INDEX } from '@/shared/config';

const SLIDE_MS = 3000;
const OFFSETS = [
	{ x: 18, y: 18, z: Z_INDEX.PROJECT_INFO_SLIDE_FRONT }, // front
	{ x: 0, y: 0, z: Z_INDEX.PROJECT_INFO_SLIDE_MIDDLE }, // middle
	{ x: -18, y: -18, z: Z_INDEX.PROJECT_INFO_SLIDE_BACK }, // back
] as const;
const slides = [1, 2, 3] as const;

type ProjectInfoProps = {
	project: Project;

	// a11y
	titleId?: string;
};

export function ProjectInfo({ project, titleId }: ProjectInfoProps) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (!project.github_url) return;

		const id = window.setInterval(() => {
			setActive((i) => (i + 1) % slides.length);
		}, SLIDE_MS);

		return () => window.clearInterval(id);
	}, [project.id, project.github_url]);

	return (
		<div className={cn('bg-ink rounded-2xl p-4 lg:p-5')}>
			<div
				key={project.id}
				className={cn(
					'flex w-full flex-col gap-3 md:flex-row lg:gap-8',
					'animate-in fade-in fill-mode-both duration-1200',
				)}
			>
				<div className="bg-ink-soft relative aspect-video flex-1 rounded-xl">
					{project.github_url ? (
						slides.map((n, i) => {
							const layer = (i - active + slides.length) % slides.length;
							const { x, y, z } = OFFSETS[layer];

							return (
								<img
									key={n}
									src={`/images/${project.id}/${n}.png`}
									alt=""
									className={cn(
										'absolute top-1/2 left-1/2 aspect-video w-[70%] rounded-lg',
										'transition-transform duration-500 ease-out',
									)}
									style={{
										zIndex: z,
										transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
									}}
								/>
							);
						})
					) : (
						<>
							<div className="bg-muted absolute top-[50%] left-[50%] aspect-video w-[70%] translate-x-[calc(-50%-18px)] translate-y-[calc(-50%-18px)] rounded-lg" />
							<div className="bg-muted-dark absolute top-[50%] left-[50%] aspect-video w-[70%] translate-x-[-50%] translate-y-[-50%] rounded-lg" />
							<div className="bg-paper absolute top-[50%] left-[50%] aspect-video w-[70%] translate-x-[calc(-50%+18px)] translate-y-[calc(-50%+18px)] rounded-lg" />
						</>
					)}
				</div>

				<div className="font-manrope flex w-full flex-col gap-3 md:flex-1 lg:w-102.5 lg:flex-none lg:gap-4">
					<h3 id={titleId} className="text-paper text-2xl leading-normal font-medium tracking-[-0.02em] md:text-3xl lg:text-4xl">
						{project.name}
					</h3>
					{project.github_url && (
						<ActionLink href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.name} (откроется в новой вкладке)`}>
							github →
						</ActionLink>
					)}
					<p className="text-muted-dark text-sm leading-normal font-normal">
						{project.description}
					</p>
					<ul className="text-ink mt-auto flex flex-wrap gap-2 text-xs leading-3 font-normal">
						{project.tech_stack.map((tech) => (
							<li className="bg-paper rounded-full px-3.5 py-1.5" key={tech}>
								{tech}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
