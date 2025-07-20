import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Heart, Globe, Users, Award, Compass } from "lucide-react"

export default function AboutPage() {
  // Founders data
  const founders = [
    {
      name: "B.N NITHYANAND",
      position: "CEO & Founder",
      image: "/nithyanand.jpg", 
      bio: "A passionate explorer and visionary leader who believes that travel is the greatest teacher. With over 15 years of experience in the travel industry, he founded MapTheWorld to make authentic travel experiences accessible to everyone.",
    },
    {
      name: "HIMANK GUPTA",
      position: "CEO & Founder",
      image: "/himankgupta.jpg",
      bio: "An adventure enthusiast and tech innovator who combines his love for exploration with cutting-edge technology. His mission is to create seamless travel experiences that connect people with the world's hidden gems.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Travelers", icon: Users },
    { number: "50+", label: "Destinations", icon: MapPin },
    { number: "500+", label: "Adventures Created", icon: Compass },
    { number: "5 Years", label: "Experience", icon: Award },
  ]

  const values = [
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "We believe in creating genuine connections with local cultures, traditions, and communities that leave lasting memories."
    },
    {
      icon: Globe,
      title: "Sustainable Travel", 
      description: "Our commitment to responsible tourism ensures that every journey positively impacts the destinations we visit."
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Every traveler is unique, and we craft personalized experiences that match your interests, pace, and dreams."
    },
    {
      icon: Compass,
      title: "Expert Guidance",
      description: "Our team of travel experts and local guides ensure you discover the hidden gems and authentic stories of each destination."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs font-medium mb-6">
              <MapPin className="h-3 w-3" />
              Discover Our Story
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Your Journey Starts Here
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Born from a passion for exploration and a desire to share the world's wonders, MapTheWorld is your gateway to extraordinary adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
              <iframe
                src="https://lottie.host/embed/77e1947a-3fbd-40c1-845a-13c5f0f02a90/UCqlPHfg8G.lottie"
                className="absolute inset-0 w-full h-full"
                title="Founders Animation"
                allowFullScreen
              ></iframe>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                <Heart className="h-3 w-3" />
                Our Beginning
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Where Dreams Meet <span className="text-red-600">Adventure</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                MapTheWorld was born from a simple yet powerful belief: everyone deserves to experience the magic of travel. 
                Our founders, united by their passion for exploration and discovery, set out to create a platform that makes 
                authentic travel experiences accessible to all.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                From bustling markets in Marrakech to serene temples in Kyoto, from the Northern Lights in Iceland to 
                the vibrant coral reefs of the Maldives - we've been there, experienced it, and now we're here to share 
                these incredible journeys with you.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-red-600">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium text-sm">Global Reach</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <Heart className="h-4 w-4" />
                  <span className="font-medium text-sm">Local Heart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs font-medium mb-6">
              <Compass className="h-3 w-3" />
              Our Values
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Drives Our <span className="text-red-600">Passion</span>
            </h2>
            <p className="text-base text-gray-600">
              These core values guide every journey we create and every experience we deliver
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-red-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs font-medium mb-6">
              <Users className="h-3 w-3" />
              Meet Our Founders
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The <span className="text-red-600">Visionaries</span> Behind Your Adventures
            </h2>
            <p className="text-base text-gray-600">
              Passionate travelers who turned their love for exploration into your next great adventure
            </p>
          </div>

          <div className="grid gap-16 md:grid-cols-2 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="group flex flex-col items-center"
              >
                <div className="relative w-56 h-56 mb-8">
                  {/* Decorative circles */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-orange-200 opacity-20" />
                  <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-red-200 opacity-20" />
                  
                  {/* Image container */}
                  <div className="relative h-full w-full rounded-full">
                    {/* Gradient border */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur opacity-30 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Image */}
                    <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white shadow-2xl">
                      <Image
                        src={founder.image || "/placeholder.svg"}
                        alt={founder.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative text-center max-w-md">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
                    {founder.name}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full mb-6">
                    <span className="text-sm font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      {founder.position}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs font-medium mb-6">
              <MapPin className="h-3 w-3" />
              Our Journey
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Milestones of Our <span className="text-red-600">Adventure</span>
            </h2>
            <p className="text-base text-gray-600">
              From a simple idea to a global travel platform - here's how we've grown
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-[50%] before:ml-[-2px] before:border-l-4 before:border-dashed before:border-red-200 max-w-4xl mx-auto">
            {[
              {
                year: "2021",
                title: "The Vision",
                description: "MapTheWorld was founded with a mission to make authentic travel experiences accessible to everyone.",
                side: "left"
              },
              {
                year: "2022",
                title: "First Adventures",
                description: "Launched our first curated travel packages to popular destinations across India and Southeast Asia.",
                side: "right"
              },
              {
                year: "2023",
                title: "Global Expansion",
                description: "Extended our reach to over 50 destinations worldwide, partnering with local guides and communities.",
                side: "left"
              },
              {
                year: "2024",
                title: "Digital Innovation",
                description: "Introduced AI-powered travel recommendations and seamless booking experiences for modern travelers.",
                side: "right"
              },
              {
                year: "2025",
                title: "Sustainable Travel",
                description: "Launched eco-friendly initiatives and carbon offset programs to promote responsible tourism worldwide.",
                side: "left"
              }
            ].map((milestone, index) => (
              <div key={index} className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-8`}>
                {milestone.side === "left" ? (
                  <>
                    <div className="text-right pr-8">
                      <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs font-bold mb-3">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center z-10">
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                    </div>
                    <div></div>
                  </>
                ) : (
                  <>
                    <div></div>
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center z-10">
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                    </div>
                    <div className="pl-8">
                      <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs font-bold mb-3">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Start Your <span className="text-red-200">Adventure</span>?
            </h2>
            <p className="text-lg mb-8 text-red-100 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the world through our carefully crafted experiences. 
              Your next great adventure is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-5 text-base">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 font-semibold px-6 py-5 text-base">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
