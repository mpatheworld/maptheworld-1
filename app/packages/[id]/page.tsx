"use client"

import { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Calendar, Check, X, Info } from "lucide-react"
import PackageCard from "@/components/package-card"
import ReviewCard from "@/components/review-card"

interface PackagePageProps {
  params: Promise<{
    id: string
  }>
}

export default function PackagePage({ params }: PackagePageProps) {
  const { id } = use(params)
  // In a real app, you would fetch this data based on the ID
  const packageData = {
    id: id,
    name: "Bali Paradise",
    duration: "7 Days / 6 Nights",
    location: "Bali, Indonesia",
    price: 1299,
    description:
      "Experience the beauty of Bali with this all-inclusive package featuring pristine beaches, cultural tours, and luxury accommodations.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    facilities: [
      "Luxury Accommodations",
      "Private Transportation",
      "English-speaking Guide",
      "Daily Breakfast",
      "Welcome Dinner",
      "Airport Transfers",
    ],
    highlights: [
      "Visit the sacred Monkey Forest Sanctuary",
      "Explore the terraced rice fields of Tegallalang",
      "Witness a traditional Balinese dance performance",
      "Relax on the pristine beaches of Nusa Dua",
      "Tour ancient temples including Uluwatu and Tanah Lot",
      "Enjoy a private cooking class with local chefs",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bali",
        description:
          "Arrive at Ngurah Rai International Airport where you'll be greeted by your guide and transferred to your luxury hotel in Seminyak. Enjoy a welcome dinner featuring traditional Balinese cuisine.",
      },
      {
        day: "Day 2",
        title: "Ubud Cultural Tour",
        description:
          "After breakfast, head to Ubud to explore the cultural heart of Bali. Visit the Sacred Monkey Forest, Ubud Palace, and local art galleries. Enjoy lunch at a restaurant overlooking the Tegallalang Rice Terraces.",
      },
      {
        day: "Day 3",
        title: "Temple Exploration",
        description:
          "Visit some of Bali's most iconic temples, including Tanah Lot Temple perched on a rock formation in the sea and Uluwatu Temple on the cliff edge. End the day with a traditional Kecak fire dance performance.",
      },
      {
        day: "Day 4",
        title: "Balinese Cooking Class",
        description:
          "Start your day with a visit to a local market to select fresh ingredients, followed by a hands-on cooking class where you'll learn to prepare authentic Balinese dishes. Enjoy the fruits of your labor for lunch.",
      },
      {
        day: "Day 5",
        title: "Beach Day at Nusa Dua",
        description:
          "Spend a relaxing day at the pristine beaches of Nusa Dua. Optional water activities include snorkeling, paddleboarding, or a glass-bottom boat tour to observe marine life.",
      },
      {
        day: "Day 6",
        title: "Mount Batur Sunrise Trek",
        description:
          "Early morning departure for a guided trek up Mount Batur to witness a spectacular sunrise. Return to your hotel for rest, followed by a spa treatment in the afternoon.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description:
          "Free time for last-minute shopping or relaxation before your transfer to the airport for your departure flight.",
      },
    ],
    inclusions: [
      "6 nights accommodation in 4-5 star hotels",
      "Daily breakfast and select meals as per itinerary",
      "Private air-conditioned transportation",
      "English-speaking licensed guide",
      "All entrance fees to attractions in the itinerary",
      "Cooking class with lunch",
      "Traditional dance performance",
      "Mount Batur sunrise trek with breakfast",
      "One-hour traditional Balinese massage",
      "Airport transfers",
      "Bottled water during tours",
    ],
    exclusions: [
      "International airfare",
      "Travel insurance",
      "Personal expenses",
      "Optional activities not mentioned in the itinerary",
      "Meals not specified in the itinerary",
      "Tips for guides and drivers",
      "Visa fees (if applicable)",
    ],
    knowBeforeYouGo: [
      "Visa requirements: Many countries receive visa-free entry to Indonesia for 30 days",
      "Currency: Indonesian Rupiah (IDR) is the local currency",
      "Weather: Tropical climate with temperatures between 26-33°C year-round",
      "Dress code: Modest attire is required when visiting temples (shoulders and knees covered)",
      "Health: No mandatory vaccinations, but travel insurance is strongly recommended",
      "Language: Bahasa Indonesia is the official language, but English is widely spoken in tourist areas",
    ],
  }

  // Similar packages
  const similarPackages = [
    {
      id: "2",
      name: "Thai Explorer",
      image: "/placeholder.svg?height=400&width=600",
      duration: "10 Days / 9 Nights",
      description:
        "Experience the best of Thailand, from the bustling streets of Bangkok to the serene beaches of Phuket.",
      price: 1599,
    },
    {
      id: "3",
      name: "Vietnam Discovery",
      image: "/placeholder.svg?height=400&width=600",
      duration: "9 Days / 8 Nights",
      description: "Journey through Vietnam's highlights, including Hanoi, Ha Long Bay, and Ho Chi Minh City.",
      price: 1499,
    },
    {
      id: "4",
      name: "Malaysian Adventure",
      image: "/placeholder.svg?height=400&width=600",
      duration: "8 Days / 7 Nights",
      description: "Explore Malaysia's diverse attractions, from Kuala Lumpur's skyline to Borneo's wildlife.",
      price: 1399,
    },
  ]

  // Reviews
  const reviews = [
    {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      review:
        "Our trip to Bali was absolutely perfect! The accommodations were luxurious, the guides were knowledgeable, and every detail was taken care of. Highly recommend this package!",
    },
    {
      name: "Michael Chen",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      review:
        "This Bali package exceeded all our expectations. From the seamless airport transfers to the carefully selected activities, everything was top-notch.",
    },
    {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      review:
        "We had an amazing time in Bali with this package. The only reason for 4 stars instead of 5 is that one of the hotels wasn't as nice as the others, but overall it was a fantastic experience.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] w-full overflow-hidden">
          <Image
            src={packageData.images[0] || "/placeholder.svg"}
            alt={packageData.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl max-w-4xl">{packageData.name}</h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{packageData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container -mt-16 relative z-10">
          <div className="grid grid-cols-3 gap-4">
            {packageData.images.map((image, index) => (
              <div key={index} className="relative h-32 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${packageData.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions & Exclusions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold">Package Overview</h2>
                      <p className="mt-4 text-muted-foreground">{packageData.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">Facilities</h3>
                      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {packageData.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-500" />
                            <span>{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">Trip Highlights</h3>
                      <ul className="mt-4 space-y-2">
                        {packageData.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                  <div className="space-y-6">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-6">
                        <div className="flex items-center">
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {day.day}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mt-2">{day.title}</h3>
                        <p className="mt-2 text-muted-foreground">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold">Inclusions</h3>
                      <ul className="mt-4 space-y-2">
                        {packageData.inclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">Exclusions</h3>
                      <ul className="mt-4 space-y-2">
                        {packageData.exclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <X className="mr-2 h-5 w-5 text-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <div className="grid gap-6">
                      {reviews.map((review, index) => (
                        <ReviewCard
                          key={index}
                          name={review.name}
                          image={review.image}
                          rating={review.rating}
                          review={review.review}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Similar Packages */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Similar Packages</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {similarPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      id={pkg.id}
                      name={pkg.name}
                      image={pkg.image}
                      duration={pkg.duration}
                      description={pkg.description}
                      price={pkg.price}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border p-6">
                <div className="mb-4">
                  <div className="text-3xl font-bold">₹{packageData.price}</div>
                  <div className="text-muted-foreground">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>Available year-round</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{packageData.duration}</span>
                  </div>
                </div>

                <Button className="w-full mb-4">Book Now</Button>
                <Button variant="outline" className="w-full">
                  Inquire
                </Button>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p>* Prices are per person based on double occupancy</p>
                  <p>* Single supplement applies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

