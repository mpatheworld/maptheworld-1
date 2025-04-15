"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PackageCard from "@/components/package-card"
import TestimonialSlider from "@/components/testimonial-slider"
import PackageDetailModal from "@/components/package-detail-modal"
import NewsletterModal from "@/components/newsletter-modal"

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false)
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)

  useEffect(() => {
    // Show newsletter modal after 5 seconds
    const timer = setTimeout(() => {
      setIsNewsletterModalOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Sample data
  const packages = [
    {
      id: "1",
      name: "Bali Paradise",
      image: "/placeholder.svg?height=400&width=600",
      duration: "7 Days / 6 Nights",
      description:
        "Experience the beauty of Bali with this all-inclusive package featuring pristine beaches, cultural tours, and luxury accommodations.",
      price: 1299,
      location: "Bali, Indonesia",
      highlights: [
        "Visit the sacred Monkey Forest Sanctuary",
        "Explore the terraced rice fields of Tegallalang",
        "Witness a traditional Balinese dance performance",
        "Relax on the pristine beaches of Nusa Dua",
      ],
      inclusions: [
        "6 nights accommodation in 4-5 star hotels",
        "Daily breakfast and select meals",
        "Private transportation",
        "English-speaking guide",
        "All entrance fees to attractions",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
    {
      id: "2",
      name: "Greek Island Hopping",
      image: "/placeholder.svg?height=400&width=600",
      duration: "10 Days / 9 Nights",
      description:
        "Explore the stunning Greek islands of Santorini, Mykonos, and Crete with guided tours and boutique hotels.",
      price: 1899,
      location: "Greece",
      highlights: [
        "Watch the famous Santorini sunset",
        "Explore the white-washed streets of Mykonos",
        "Visit ancient ruins in Crete",
        "Swim in the crystal-clear Aegean Sea",
      ],
      inclusions: [
        "9 nights accommodation in boutique hotels",
        "Daily breakfast",
        "Ferry transfers between islands",
        "Guided tours on each island",
        "Airport transfers",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
    {
      id: "3",
      name: "Japan Cultural Tour",
      image: "/placeholder.svg?height=400&width=600",
      duration: "8 Days / 7 Nights",
      description:
        "Immerse yourself in Japanese culture with visits to Tokyo, Kyoto, and Osaka, including traditional experiences and modern attractions.",
      price: 2199,
      location: "Japan",
      highlights: [
        "Visit ancient temples in Kyoto",
        "Experience Tokyo's vibrant city life",
        "Try authentic Japanese cuisine",
        "Participate in a traditional tea ceremony",
      ],
      inclusions: [
        "7 nights accommodation in 4-star hotels",
        "Daily breakfast",
        "Bullet train passes",
        "Guided city tours",
        "Cultural experience activities",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
    {
      id: "4",
      name: "Peruvian Adventure",
      image: "/placeholder.svg?height=400&width=600",
      duration: "9 Days / 8 Nights",
      description:
        "Discover the wonders of Peru, from the ancient ruins of Machu Picchu to the vibrant culture of Cusco and the natural beauty of the Sacred Valley.",
      price: 1799,
      location: "Peru",
      highlights: [
        "Explore the ancient ruins of Machu Picchu",
        "Visit the historic city of Cusco",
        "Experience the beauty of the Sacred Valley",
        "Learn about Inca history and culture",
      ],
      inclusions: [
        "8 nights accommodation",
        "Daily breakfast and select meals",
        "All transportation within Peru",
        "Entrance fees to attractions",
        "Expert local guides",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
    {
      id: "5",
      name: "Thai Explorer",
      image: "/placeholder.svg?height=400&width=600",
      duration: "10 Days / 9 Nights",
      description:
        "Experience the best of Thailand, from the bustling streets of Bangkok to the serene beaches of Phuket and the cultural richness of Chiang Mai.",
      price: 1599,
      location: "Thailand",
      highlights: [
        "Explore Bangkok's Grand Palace and temples",
        "Visit elephant sanctuaries in Chiang Mai",
        "Relax on Phuket's beautiful beaches",
        "Experience authentic Thai cuisine",
      ],
      inclusions: [
        "9 nights accommodation",
        "Daily breakfast",
        "Domestic flights within Thailand",
        "Airport transfers",
        "Guided tours in each city",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
    {
      id: "6",
      name: "Italian Escapade",
      image: "/placeholder.svg?height=400&width=600",
      duration: "12 Days / 11 Nights",
      description:
        "Journey through Italy's most iconic cities, including Rome, Florence, and Venice, with guided tours, culinary experiences, and luxury accommodations.",
      price: 2499,
      location: "Italy",
      highlights: [
        "Visit the Colosseum and Vatican in Rome",
        "Explore Renaissance art in Florence",
        "Experience a gondola ride in Venice",
        "Enjoy authentic Italian cuisine",
      ],
      inclusions: [
        "11 nights accommodation in 4-star hotels",
        "Daily breakfast and select meals",
        "Train transportation between cities",
        "Skip-the-line tickets to major attractions",
        "Expert local guides",
      ],
      exclusions: [
        "International airfare",
        "Travel insurance",
        "Personal expenses",
        "Optional activities not mentioned",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      review:
        "Our trip to Bali was absolutely perfect! The accommodations were luxurious, the guides were knowledgeable, and everything was taken care of. Highly recommend maptheworld for your next adventure!",
    },
    {
      name: "Michael Chen",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      review:
        "The Greek Island Hopping tour exceeded all our expectations. From the seamless transfers between islands to the carefully selected hotels with amazing views, everything was top-notch.",
    },
    {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      review:
        "Japan Cultural Tour was an incredible experience. We got to see both traditional and modern aspects of Japan. The only reason for 4 stars instead of 5 is that some days felt a bit rushed.",
    },
  ]

  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsPackageModalOpen(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Beautiful travel destination"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl max-w-4xl">
            Discover the World's Most Amazing Places
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl">
            Unforgettable experiences and expertly crafted itineraries to the world's most breathtaking destinations
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg">
              Explore Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-transparent text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Featured Packages</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              All-inclusive travel packages designed to provide unforgettable experiences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
                name={pkg.name}
                image={pkg.image}
                duration={pkg.duration}
                description={pkg.description}
                price={pkg.price}
                onClick={() => window.location.href = `/packages/${pkg.id}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/packages">
              <Button size="lg">View All Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">What Our Customers Say</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from travelers who have experienced our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready for Your Next Adventure?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Contact our travel experts today to start planning your dream vacation
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal
          isOpen={isPackageModalOpen}
          onClose={() => setIsPackageModalOpen(false)}
          packageData={selectedPackage}
        />
      )}

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isNewsletterModalOpen} onClose={() => setIsNewsletterModalOpen(false)} />
    </>
  )
}

