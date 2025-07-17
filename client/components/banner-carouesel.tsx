"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [bannerItems, setBannerItems] = React.useState<BannerItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState(0);

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

  React.useEffect(() => {
    if (!autoPlay || bannerItems.length === 0) return;

    const intervalId = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [autoPlay, interval, bannerItems.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
  };

  if (loading) {
    return (
      <div className={cn("w-full h-[90vh] relative", className)}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("w-full h-[90vh] flex items-center justify-center bg-gradient-to-r from-red-50 to-orange-50", className)}>
        <p className="text-red-600">We're experiencing technical difficulties. Please try again later.</p>
      </div>
    );
  }

  if (bannerItems.length === 0) {
    return (
      <div className={cn("w-full h-[90vh] flex items-center justify-center bg-gradient-to-r from-red-50 to-orange-50", className)}>
        <p className="text-gray-600">New travel experiences coming soon!</p>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-[93vh] overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={bannerItems[currentIndex].image.url}
            alt={bannerItems[currentIndex].title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="container h-full flex items-center"
            >
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {bannerItems[currentIndex].title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {bannerItems[currentIndex].description}
                </p>
                {bannerItems[currentIndex].link && (
                  <motion.a
                    href={bannerItems[currentIndex].link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore Now
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

    

     
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentIndex === index 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
