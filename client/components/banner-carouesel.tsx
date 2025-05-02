"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface BannerItem {
  id: string
  title: string
  description: string
  imageUrl: string
  ctaLink?: string
  ctaText?: string
}
const bannerItems = [
    {
      id: "1",
      title: "Discover Your Next Adventure",
      description: "Explore the world with our carefully curated travel packages",
      imageUrl: "/placeholder.svg?height=800&width=1200",
      ctaLink: "/packages",
      ctaText: "View Packages"
    },
    {
      id: "2",
      title: "Luxury Travel Experiences",
      description: "Indulge in premium accommodations and exclusive tours",
      imageUrl: "/placeholder.svg?height=800&width=1200",
      ctaLink: "/contact",
      ctaText: "Contact Us"
    },
    {
      id: "3",
      title: "Customized Itineraries",
      description: "Let us create your perfect travel experience",
      imageUrl: "/placeholder.svg?height=800&width=1200",
      ctaLink: "/custom-trip",
      ctaText: "Plan Your Trip"
    }
  ]

interface BannerCarouselProps {

  className?: string
  autoPlay?: boolean
  interval?: number
}


export function BannerCarousel({
 
  className,
  autoPlay = true,
  interval = 5000,
}: BannerCarouselProps) {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api || !autoPlay) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, interval)

    return () => clearInterval(intervalId)
  }, [api, autoPlay, interval])

  const handleSelect = React.useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  React.useEffect(() => {
    if (!api) return
    
    api.on("select", handleSelect)
    
    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  return (
    <Carousel 
      setApi={setApi}
      className={cn("w-full", className)}
    >
      <CarouselContent>
        {bannerItems.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[90vh] w-full overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10 md:px-20">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-5xl font-display mb-4">{item.title}</h2>
                  <p className="text-lg md:text-xl mb-6">{item.description}</p>
                  {item.ctaLink && item.ctaText && (
                    <a 
                      href={item.ctaLink}
                      className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      {item.ctaText}
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
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              current === index ? "bg-primary" : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
  
    </Carousel>
  )
}
