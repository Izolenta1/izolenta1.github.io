import type { Project } from '../model/types';
import { cn } from 'cn';
import { setOrigin } from '@/shared/lib';

type ProjectCardProps = {
	project: Project;
	selected: boolean;
};

export function ProjectCard({ project, selected }: ProjectCardProps) {
	return (
		<div
			onMouseEnter={setOrigin}
			onMouseLeave={setOrigin}
			className={cn(
				'group relative isolate overflow-hidden',
				'font-manrope bg-paper flex flex-col rounded-xl p-3 leading-normal font-normal',
				'transition-[color,background-color,border-radius] duration-300',
				'cursor-pointer',
				// темный «залив»
				'before:pointer-events-none before:absolute before:top-(--y) before:left-(--x) before:-z-10',
				'before:bg-ink before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:content-[""]',
				'before:transition-[width,height] before:duration-300 before:ease-out',
				'hover:before:size-[300%]',
				selected ? 'bg-ink rounded-b-none delay-0' : 'delay-250',
			)}
		>
			{project.github_url ? (
				<img
					src={`/images/${project.id}/preview.png`}
					alt=""
					className="mb-3 aspect-video rounded-md"
				/>
			) : (
				<div
					className={cn(
						'bg-line mb-3 aspect-video rounded-md transition-colors duration-300',
						selected && 'bg-ink-soft',
					)}
				/>
			)}

			<span
				className={cn(
					'text-ink group-hover:text-paper text-sm transition-colors duration-300',
					selected && 'text-paper',
				)}
			>
				{project.name}
			</span>
			<span
				className={cn(
					'text-muted group-hover:text-muted-dark text-xs transition-colors duration-300',
					selected && 'text-muted-dark',
				)}
			>
				{project.year ? project.year : '[Не указано]'}
			</span>
		</div>
	);
}
