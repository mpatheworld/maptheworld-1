"use client"

import { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Calendar, Check, X, Info, Star, Users, Shield, Phone, Mail } from "lucide-react"
import PackageCard from "@/components/package-card"
import ReviewCard from "@/components/review-card"
import ContactForm from "@/components/contact-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface PackagePageProps {
  params: Promise<{
    id: string
  }>
}

export default function PackagePage({ params }: PackagePageProps) {
  const { id } = use(params)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    packageId: id,
  })

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
    category: "luxury",
    isActive: true,
    featured: true,
    bookingPolicy: "A 25% deposit is required at the time of booking to secure your reservation. Full payment is due 30 days prior to departure. We accept credit cards, PayPal, and bank transfers.",
    cancellationPolicy: "Cancellations made 30+ days before departure: Full refund minus processing fee. 15-29 days: 50% refund. 14 days or less: No refund available. All cancellations must be received in writing.",
    refundPolicy: "Refunds will be processed within 7-14 business days and will be issued using the original payment method. No refunds for unused services or no-shows.",
    termsAndConditions: "By booking this package, you agree to our full terms and conditions. We reserve the right to alter itineraries due to weather conditions, safety concerns, or other unforeseen circumstances. Travel insurance is highly recommended.",
    contactInfo: "For assistance before, during, or after your trip, please contact us at: support@maptheworld.com | Emergency Hotline: +91-9876543210 | WhatsApp: +91-9876543210"
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)
      setIsFormSubmitted(true)
      toast({
        title: "Thank you for your interest!",
        description: "Our travel expert will contact you shortly to discuss your dream vacation.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        packageId: id,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {/* Hero Section with CTA */}
      <section className="relative">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={packageData.images[0] || "/placeholder.svg"}
            alt={packageData.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">{packageData.name}</h1>
              <div className="flex items-center justify-center gap-6 text-lg mb-8">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{packageData.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{packageData.location}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book Your Dream Vacation
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center">
              <Star className="mr-2 h-5 w-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" />
              <span>1000+ Happy Travelers</span>
            </div>
            <div className="flex items-center justify-center">
              <Shield className="mr-2 h-5 w-5" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Flexible Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
                      <p className="text-lg">{packageData.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Facilities</h3>
                        <ul className="space-y-2">
                          {packageData.facilities.map((facility, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-2 h-5 w-5 text-primary" />
                              <span>{facility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Trip Highlights</h3>
                        <ul className="space-y-2">
                          {packageData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-2 h-5 w-5 text-primary" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary">
                  <div className="space-y-6">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="bg-muted p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
                            {day.day}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                        <p>{day.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="inclusions">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Inclusions</h3>
                      <ul className="space-y-2">
                        {packageData.inclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Exclusions</h3>
                      <ul className="space-y-2">
                        {packageData.exclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <X className="mr-2 h-5 w-5 text-destructive" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
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
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar with Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <div className="text-3xl font-bold mb-2">₹{packageData.price}</div>
                  <div className="text-muted-foreground mb-6">per person</div>

                  {!isFormSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Get a Free Quote
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-4">
                        Our travel expert will contact you shortly to discuss your dream vacation.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsFormSubmitted(false)}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      <span>+91-9876543210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      <span>support@maptheworld.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      <section className="py-12 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Similar Packages</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </>
  )
}

