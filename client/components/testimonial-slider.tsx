"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReviewCard from "@/components/review-card"
import { cn } from "@/lib/utils"

interface Testimonial {
  name: string
  image: string
  rating: number
  review: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
  initialAutoPlay?: boolean
}

export default function TestimonialSlider({ 
  testimonials, 
  autoPlayInterval = 5000, 
  initialAutoPlay = true 
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(initialAutoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, testimonials.length])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, testimonials.length])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return
    
    setIsTransitioning(true)
    setCurrentIndex(index)
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }, [currentIndex, isTransitioning])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  if (!testimonials.length) {
    return null
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <ReviewCard
                name={testimonial.name}
                image={testimonial.image}
                rating={testimonial.rating}
                review={testimonial.review}
              />
            </div>
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all",
                    index === currentIndex 
                      ? "bg-primary w-4" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
