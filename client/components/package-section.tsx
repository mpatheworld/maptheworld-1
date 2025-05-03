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

interface PackageSectionProps {
  title: string
  description: string
  packages: Package[]
  sectionId: string
}

export function PackageSection({ title, description, packages, sectionId }: PackageSectionProps) {
  if (packages.length === 0) return null

  return (
    <section className="py-8 sm:py-16">
      <div className="container px-4 sm:px-6">
        <div className="mb-6 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
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
                <CarouselItem key={pkg._id} className="pl-4 basis-[90%] sm:basis-[60%] md:basis-[40%] lg:basis-[30%] xl:basis-[25%]">
                  <div className="p-1 h-full">
                    <PackageCard
                      id={pkg._id}
                      name={pkg.name}   
                      image={pkg.images[0]}
                      duration={pkg.duration}
                      description={pkg.description}
                      price={pkg.price}
                      onClick={() => window.location.href = `/packages/${pkg._id}`}
                      className="h-full flex flex-col rounded-xl overflow-hidden hover:shadow-lg active:scale-[0.98] transition-all duration-200 bg-white dark:bg-gray-800"  
                      imageClassName="aspect-[4/3] w-full object-cover"
                    />  
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
            <CarouselNext className="hidden sm:flex -right-12 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
          </Carousel>
        </div>

        <div className="mt-6 sm:mt-10 text-center">
          <Link href={`/packages?section=${sectionId}`}>
            <Button size="sm" className="sm:size-lg">View All {title}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 