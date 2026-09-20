import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import type { ReactNode } from 'react';

type CarouselProps = {
	children: ReactNode;

	// a11y
	ariaLabel: string;
};

export function Carousel({ children, ariaLabel }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: 'start',
		},
		[
			WheelGesturesPlugin(),
		],
	);
	const [progress, setProgress] = useState(0);
	const [thumbSize, setThumbSize] = useState(0);

	useEffect(() => {
		if (!emblaApi) return;

		const update = () => {
			const viewport = emblaApi.rootNode();
			const scrollWidth = emblaApi.containerNode().scrollWidth; // ширина всей ленты
			const size = viewport.clientWidth / scrollWidth;

			setThumbSize(Math.min(1, size));
			setProgress(Math.min(1, Math.max(0, emblaApi.scrollProgress())));
		};
		update();

		emblaApi.on('scroll', update).on('reInit', update).on('resize', update);
		return () => {
			emblaApi.off('scroll', update).off('reInit', update).off('resize', update);
		};
	}, [emblaApi]);

	return (
		<div className="flex flex-col gap-3">
			{(emblaApi?.canScrollPrev() || emblaApi?.canScrollNext()) && (
				<div aria-hidden="true" className="bg-line relative h-1.5 w-full rounded-full">
					<div
						className="bg-muted absolute top-0 h-full rounded-full"
						style={{
							width: `${thumbSize * 100}%`,
							left: `${progress * (1 - thumbSize) * 100}%`,
						}}
					/>
				</div>
			)}

			<div className="embla">
				<div
					role="region"
					aria-roledescription="карусель"
					aria-label={ariaLabel}
					className="embla__viewport overflow-x-clip overflow-y-visible"
					ref={emblaRef}
				>
					<div className="embla__container -ml-3 flex [touch-action:pan-y_pinch-zoom]">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
