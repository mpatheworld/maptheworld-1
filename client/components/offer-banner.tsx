import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'
import { Button } from './ui/button'

interface OfferBannerProps {
  title: string
  description: string
  discount: string
  ctaText: string
  ctaLink: string
  variant: 'red' | 'orange'
}

export function OfferBanner({ title, description, discount, ctaText, ctaLink, variant }: OfferBannerProps) {
  const bgColor = variant === 'red' 
    ? 'from-red-600 to-orange-600'
    : 'from-orange-600 to-orange-500'

  return (
    <div className={`bg-gradient-to-r ${bgColor} overflow-hidden my-4 sm:my-8 md:my-16`}>
      <div className="container py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 text-center md:text-left">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 text-white rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 w-fit mx-auto md:mx-0 mb-2 sm:mb-3 md:mb-4">
              <Tag className="h-3 w-3" />
              <span className="text-xs font-medium">{discount} OFF</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 md:mb-3">{title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 line-clamp-2 md:line-clamp-none">{description}</p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto mt-3 md:mt-0">
            <Link href={ctaLink} className="block w-full md:w-auto">
              <Button 
                size="sm"
                className="w-full md:w-auto bg-white text-red-600 hover:bg-red-50 font-semibold group text-xs sm:text-sm py-1.5 sm:py-2 md:py-3"
              >
                {ctaText}
                <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}