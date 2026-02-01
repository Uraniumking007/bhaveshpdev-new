"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";

interface ProjectImageCarouselProps {
  images?: string[];
  image?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  showDots?: boolean;
  showButtons?: boolean;
}

export function ProjectImageCarousel({
  images,
  image,
  alt,
  className,
  containerClassName,
  showDots = true,
  showButtons = true,
}: ProjectImageCarouselProps) {
  // Determine which images to use: prioritize images array, fallback to image field
  const imageList =
    images && images.length > 0
      ? images
      : image
      ? [image]
      : ["/placeholder.png"];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: imageList.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const hasMultipleImages = imageList.length > 1;

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {imageList.map((img, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
            >
              <div className={cn("relative w-full", className)}>
                <img
                  src={img}
                  alt={`${alt} - Image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {hasMultipleImages && showButtons && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "p-2 rounded-full bg-black/50 hover:bg-black/70",
              "text-white transition-all duration-200",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "backdrop-blur-sm border border-white/10"
            )}
            aria-label="Previous image"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "p-2 rounded-full bg-black/50 hover:bg-black/70",
              "text-white transition-all duration-200",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "backdrop-blur-sm border border-white/10"
            )}
            aria-label="Next image"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {hasMultipleImages && showDots && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {imageList.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                selectedIndex === index
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
