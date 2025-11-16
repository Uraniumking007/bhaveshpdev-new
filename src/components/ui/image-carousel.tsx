"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils/cn";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export const ImageCarousel = ({
  images,
  alt,
  className,
  autoPlay = false,
  interval = 3000,
}: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Update selected index when carousel changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !emblaApi || images.length <= 1) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, emblaApi, images.length]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full h-48 rounded-lg overflow-hidden bg-gray-800",
          className
        )}
      >
        <div className="flex items-center justify-center h-full text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className={cn(
          "relative w-full h-48 rounded-lg overflow-hidden",
          className
        )}
      >
        <Image src={images[0]} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-48 rounded-lg overflow-hidden group",
        className
      )}
    >
      {/* Embla Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] relative h-full"
            >
              <Image
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label="Previous image"
      >
        <IconChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label="Next image"
      >
        <IconChevronRight className="w-4 h-4" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
        {selectedIndex + 1} / {images.length}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              selectedIndex === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
