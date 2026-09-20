import { ActionLink } from '@/shared/ui';
import portfolio from '@/data/portfolio.json';

export function About() {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="xs:flex-row flex scroll-mt-18 flex-col-reverse gap-6 md:gap-12 lg:scroll-mt-20 lg:gap-25"
		>
			<div className="xs:max-w-82.5 flex w-full flex-col gap-6 md:max-w-105 lg:max-w-137.5 lg:gap-8">
				<h1
					id="about-heading"
					className="font-manrope text-ink text-6xl leading-[0.95] font-medium tracking-[-0.02em] md:text-7xl md:leading-[0.9] md:tracking-tight lg:text-8xl lg:leading-[0.88] lg:tracking-[-0.03em]"
				>
					{portfolio.name}
					<br />
					{portfolio.surname}
				</h1>

				<div className="font-manrope flex flex-col gap-2.5 leading-normal">
					<h2 className="text-ink text-xl font-normal lg:text-2xl">
						{portfolio.position}
					</h2>
					<p className="text-muted text-base font-normal">{portfolio.about}</p>
				</div>

				<div className="flex items-center gap-6">
					<ActionLink href="#contacts" size="large">
						Связаться →
					</ActionLink>
					<span className="font-manrope text-muted flex-1 text-end text-xs leading-normal font-normal uppercase">
						{portfolio.location}
					</span>
				</div>
			</div>

			<div className="flex-1">
				<img
					src="/CatPicture1.png"
					alt=""
					className="h-full w-full object-contain object-bottom [image-rendering:pixelated]"
				/>
			</div>
		</section>
	);
}
