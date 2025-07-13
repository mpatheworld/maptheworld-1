"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

interface BannerItem {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
  link?: string;
}

interface BannerCarouselProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function BannerCarousel({
  className,
  autoPlay = true,
  interval = 5000,
}: BannerCarouselProps) {
  const [el, setEl] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [bannerItems, setBannerItems] = React.useState<BannerItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch banner data
  React.useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await api.get("/banners/active");
        setBannerItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-play effect
  React.useEffect(() => {
    if (!el || !autoPlay || bannerItems.length === 0) return;

    const intervalId = setInterval(() => {
      el.scrollNext();
    }, interval);

    return () => clearInterval(intervalId);
  }, [el, autoPlay, interval, bannerItems.length]);

  const handleSelect = React.useCallback(() => {
    if (!el) return;
    setCurrent(el.selectedScrollSnap());
  }, [el]);

  React.useEffect(() => {
    if (!el) return;

    el.on("select", handleSelect);

    return () => {
      el.off("select", handleSelect);
    };
  }, [el, handleSelect]);

  if (loading) {
    return (
      <div className={cn("w-full h-[90vh] relative", className)}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full h-[90vh] flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50",
          className
        )}
      >
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (bannerItems.length === 0) {
    return (
      <div
        className={cn(
          "w-full h-[90vh] flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50",
          className
        )}
      >
        <p className="text-gray-600">No banners available</p>
      </div>
    );
  }

  return (
    <Carousel setApi={setEl} className={cn("w-full", className)}>
      <CarouselContent>
        {bannerItems.map((item) => (
          <CarouselItem key={item._id}>
            <div className="relative h-[93vh] w-full overflow-hidden">
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex flex-col justify-center px-10 md:px-20">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                    {item.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-white">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-block bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300"
                    >
                      Explore More
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => el?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              current === index 
                ? "bg-gradient-to-r from-red-600 to-orange-600" 
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
