import PackageCard from "@/components/package-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { Package } from "@/lib/interface"
import { useRouter } from "next/navigation"

interface PackageSectionProps {
  title: string
  description: string
  packages: Package[]
  sectionId: string
  onRequestCallback?: (packageId: string) => void
}

export function PackageSection({ 
  title, 
  description, 
  packages, 
  sectionId,
  onRequestCallback 
}: PackageSectionProps) {
  const router = useRouter()
  
  if (packages.length === 0) return null

  // Single package case - display centered without carousel
  if (packages.length === 1) {
    return (
      <section className="py-8 sm:py-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container px-4 sm:px-6">
          <div className="mb-6 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent uppercase">{title}</h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto line-clamp-1">
              {description}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <PackageCard
                id={packages[0]._id}
                name={packages[0].name}   
                image={packages[0].images[0]}
                duration={packages[0].duration}
                description={packages[0].description}
                price={packages[0].price}
                onClick={() => router.push(`/packages/${packages[0]._id}`)}
                onRequestCallback={() => onRequestCallback?.(packages[0]._id)}
                className="h-full hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-10 text-center">
            <Link href={`/packages?section=${sectionId}`}>
              <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 sm:text-lg">
                View All {title}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Multiple packages case - display carousel
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container px-4 sm:px-6">
        <div className="mb-6 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent uppercase">{title}</h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto line-clamp-1">
            {description}
          </p>
        </div>

        <div className="mb-6 sm:mb-10 text-right">
          <Link href={`/packages?section=${sectionId}`}>
            <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 sm:text-lg">
              View All
            </Button>
          </Link>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              containScroll: "trimSnaps",
              dragFree: true,
              skipSnaps: false,
              breakpoints: {
                '(min-width: 640px)': { dragFree: false },
              }
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {packages.map((pkg) => (
                <CarouselItem key={pkg._id} className="pl-4 basis-[70%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.33%]">
                  <div className="p-1 h-full">
                    <PackageCard
                      id={pkg._id}
                      name={pkg.name}   
                      image={pkg.images[0]}
                      duration={pkg.duration}
                      description={pkg.description}
                      price={pkg.price}
                      onClick={() => router.push(`/packages/${pkg._id}`)}
                      onRequestCallback={() => onRequestCallback?.(pkg._id)}
                      className="h-full hover:-translate-y-1 transition-transform duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
            <CarouselNext className="hidden sm:flex -right-12 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
          </Carousel>
        </div>
      </div>
    </section>
  )
} 