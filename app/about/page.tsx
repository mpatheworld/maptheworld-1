import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  // Founders data
  const founders = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years in the travel industry, Sarah founded maptheworld with a vision to create authentic travel experiences that connect people with the world's most extraordinary places. Her own transformative journey through Southeast Asia in her twenties sparked a lifelong passion for helping others discover the world's hidden gems.",
    },
    {
      name: "Michael Chen",
      position: "Co-Founder & Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael met Sarah during a trek in Nepal, where they discovered their shared dream of creating meaningful travel experiences. With his background in hospitality management, Michael ensures that every maptheworld journey runs smoothly, from the initial planning stages to on-the-ground logistics.",
    },
  ]

  // Team members data
  const teamMembers = [
    {
      name: "Emily Rodriguez",
      position: "Lead Travel Designer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily joined maptheworld after a chance meeting with Sarah in a small café in Bali. She combines her passion for exploration with meticulous attention to detail to craft unique itineraries that showcase the best each destination has to offer.",
    },
    {
      name: "David Kim",
      position: "Customer Experience Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "David discovered maptheworld as a client first, falling in love with our approach to travel. Now, he's dedicated to ensuring every traveler receives the same personalized service and support that won him over, making each maptheworld experience truly exceptional.",
    },
  ]

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Journey</h1>
            <p className="mt-6 text-xl text-muted-foreground">The story of maptheworld and the dreamers behind it</p>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Our founders on their first adventure together"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Where It All Began</h2>
              <p className="text-lg text-muted-foreground">
                It started with a chance meeting on a misty mountain trail in Nepal. Sarah, a seasoned traveler seeking 
                new perspectives, and Michael, a hospitality expert exploring ancient cultures, found themselves sharing 
                shelter during an unexpected rainstorm.
              </p>
              <p className="text-lg text-muted-foreground">
                As they waited out the storm, they discovered a shared frustration: travel experiences that felt 
                manufactured and disconnected from the authentic heart of destinations. That rainy afternoon in the 
                Himalayas, the seed of maptheworld was planted.
              </p>
              <p className="text-lg text-muted-foreground">
                "What if we could create journeys that truly connect people with places?" Sarah had asked. Michael's 
                eyes lit up. "Not just seeing a place, but feeling it, living it, being transformed by it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <div className="mt-8 space-y-6 text-lg">
              <p>
                At maptheworld, we don't just plan trips—we craft stories waiting to be lived. Our mission goes beyond 
                showing you the world; we aim to help you become part of it, even if just for a moment.
              </p>
              <p>
                We believe travel should leave both the traveler and the destination better than before. Every journey 
                we design is an opportunity for connection, understanding, and positive impact.
              </p>
              <p>
                When Sarah and Michael returned from Nepal, they carried more than memories—they brought back a vision 
                for travel that honors local cultures, supports communities, and creates moments of genuine wonder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-[50%] before:ml-[-1px] before:border-l-2 before:border-dashed before:border-muted-foreground/30 max-w-3xl mx-auto">
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="text-right pr-4">
                <h3 className="text-xl font-bold">The First Step</h3>
                <p className="text-muted-foreground">2010</p>
                <p className="mt-2">
                  With savings, passion, and a small office in Sarah's apartment, maptheworld launched with just three 
                  carefully crafted journeys to places our founders knew intimately.
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">1</div>
              <div></div>
            </div>

            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div></div>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">2</div>
              <div className="pl-4">
                <h3 className="text-xl font-bold">Growing Through Stories</h3>
                <p className="text-muted-foreground">2015</p>
                <p className="mt-2">
                  Word spread through the stories our travelers brought home. Five years in, our small team had grown to 
                  twelve passionate individuals, and our destinations spanned five continents.
                </p>
              </div>
            </div>

            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="text-right pr-4">
                <h3 className="text-xl font-bold">The Challenge</h3>
                <p className="text-muted-foreground">2020</p>
                <p className="mt-2">
                  When global travel paused, we pivoted to virtual experiences and supported our global partners. This 
                  challenge revealed our resilience and deepened our commitment to responsible tourism.
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">3</div>
              <div></div>
            </div>

            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div></div>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">4</div>
              <div className="pl-4">
                <h3 className="text-xl font-bold">Today's Chapter</h3>
                <p className="text-muted-foreground">Present</p>
                <p className="mt-2">
                  Now, maptheworld connects curious souls with over 50 destinations worldwide. Our approach remains the 
                  same: authentic experiences, meaningful connections, and journeys that become part of your life story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">The Dreamers Behind maptheworld</h2>
            <p className="mt-4 text-muted-foreground">
              Meet the founders who turned a rainy day conversation into a global travel experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl bg-background shadow-md transition-all hover:shadow-xl"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{founder.name}</h3>
                  <p className="text-primary font-medium">{founder.position}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">Our Growing Family</h2>
            <p className="mt-4 text-muted-foreground">
              The passionate storytellers who help bring our vision to life
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl bg-muted/50 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                  <p className="mt-3 text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">The Principles That Guide Our Journey</h2>
            <p className="mt-4 text-muted-foreground">Values we've carried since that rainy day in Nepal</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-xl bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold">Authentic Connection</h3>
              <p className="mt-4 text-muted-foreground">
                "Travel is meaningless without connection," Sarah often says. We design every experience to foster 
                genuine interactions with places, cultures, and people.
              </p>
            </div>
            <div className="rounded-xl bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold">Responsible Impact</h3>
              <p className="mt-4 text-muted-foreground">
                Michael's commitment to sustainability shapes our approach. We partner with local communities, minimize 
                environmental footprints, and ensure tourism benefits those who welcome us.
              </p>
            </div>
            <div className="rounded-xl bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold">Transformative Experiences</h3>
              <p className="mt-4 text-muted-foreground">
                We believe travel should change you. Our journeys are designed not just to show you new places, but to 
                offer new perspectives that stay with you long after you return home.
              </p>
            </div>
            <div className="rounded-xl bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold">Attention to Detail</h3>
              <p className="mt-4 text-muted-foreground">
                From the perfect local guide to the ideal moment to visit a landmark, we obsess over the details so you 
                can immerse yourself fully in the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-xl bg-primary p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold">Write Your Own Story</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg">
              Every great journey begins with a single step. Join us in creating travel experiences that become chapters 
              in your life story.
            </p>
            <div className="mt-8">
              <Link href="/packages">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                  Explore Our Journeys
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
