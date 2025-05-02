"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag } from "lucide-react"
import BlogCard from "@/components/blog-card"

interface BlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = use(params)

  // In a real app, you would fetch this data based on the ID
  const post = {
    id: id,
    title: "Top 10 Hidden Beaches in Southeast Asia",
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 15, 2023",
    author: "Emma Wilson",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["Travel Tips", "Beaches", "Southeast Asia"],
    content: `
      <p>Southeast Asia is renowned for its stunning beaches, but the most popular ones can often be crowded with tourists. For travelers seeking tranquility and unspoiled natural beauty, there are still many hidden gems waiting to be discovered. In this guide, we'll take you off the beaten path to explore ten of Southeast Asia's most beautiful secret beaches.</p>
      
      <h2>1. Koh Kradan, Thailand</h2>
      <p>Located in the Trang province, Koh Kradan offers crystal-clear waters and pristine white sand without the crowds of more popular Thai islands. The island has limited accommodation options, which helps maintain its peaceful atmosphere. The eastern side of the island features a stunning coral reef that's perfect for snorkeling.</p>
      
      <h2>2. Selong Belanak, Lombok, Indonesia</h2>
      <p>While Bali gets most of the attention, neighboring Lombok offers equally beautiful beaches with a fraction of the visitors. Selong Belanak, with its horseshoe-shaped bay and gentle waves, is ideal for beginners learning to surf and those  with its horseshoe-shaped bay and gentle waves, is ideal for beginners learning to surf and those seeking a relaxed beach experience. The local surf schools offer affordable lessons, and the beach's shallow waters make it safe for families with children.

      <h2>3. Nacpan Beach, El Nido, Philippines</h2>
      <p>While El Nido is no longer a secret, many visitors stick to the island-hopping tours and miss out on Nacpan Beach. This four-kilometer stretch of golden sand offers plenty of space to find your own private spot. The beach is lined with coconut palms and has a few laid-back beach bars where you can enjoy a drink while watching the sunset.</p>
      
      <h2>4. Koh Rong Samloem, Cambodia</h2>
      <p>The lesser-known sister island to Koh Rong, Samloem offers pristine beaches without the party atmosphere. Saracen Bay on the eastern side features powdery white sand and turquoise waters, while Lazy Beach on the western side is perfect for watching spectacular sunsets. The island also offers excellent snorkeling and diving opportunities.</p>
      
      <h2>5. Phu Quoc, Vietnam</h2>
      <p>While Phu Quoc is developing rapidly, the island's northern beaches remain relatively untouched. Bai Dai (Long Beach) stretches for nearly 20 kilometers, providing plenty of secluded spots. The clear waters are perfect for swimming, and the island's national park offers additional adventures for nature lovers.</p>
      
      <h2>6. Pantai Tanjung Rhu, Langkawi, Malaysia</h2>
      <p>Located on the northern tip of Langkawi, Tanjung Rhu remains one of the island's best-kept secrets. The beach offers stunning views of limestone karsts rising from the sea, similar to those in Thailand's Phang Nga Bay but without the crowds. The shallow waters extend far from shore during low tide, creating natural pools perfect for relaxing.</p>
      
      <h2>7. Ngapali Beach, Myanmar</h2>
      <p>Myanmar's tourism industry is still developing, making Ngapali Beach one of Southeast Asia's most unspoiled destinations. The palm-lined beach stretches for several kilometers along the Bay of Bengal, with traditional fishing villages adding to its authentic charm. The lack of high-rise developments and nightlife keeps the atmosphere peaceful and focused on natural beauty.</p>
      
      <h2>8. Balangan Beach, Bali, Indonesia</h2>
      <p>While Bali's southern beaches are often crowded, Balangan remains relatively quiet. Tucked below limestone cliffs, this white sand beach is popular with surfers but offers plenty of space for sunbathers. The beach has a few simple warungs (local restaurants) serving fresh seafood and cold drinks.</p>
      
      <h2>9. Otres Beach, Sihanoukville, Cambodia</h2>
      <p>While parts of Sihanoukville have become overdeveloped, Otres Beach maintains a laid-back vibe. The beach is divided into two sections, with Otres 2 being the quieter option. The shallow, calm waters are ideal for swimming, and the beach offers stunning sunset views over nearby islands.</p>
      
      <h2>10. Kalapathar Beach, Havelock Island, Andaman Islands</h2>
      <p>Technically part of India but geographically closer to Southeast Asia, the Andaman Islands offer some of the region's most pristine beaches. Kalapathar Beach on Havelock Island is named for the black rocks (kala pathar) that contrast beautifully with the white sand. The beach is rarely crowded, offering a tranquil escape surrounded by lush jungle.</p>
      
      <h2>Tips for Visiting Hidden Beaches</h2>
      <ul>
        <li>Travel during shoulder season (just before or after peak tourist season) for the best balance of good weather and fewer crowds.</li>
        <li>Respect local communities and environments by taking all trash with you and using reef-safe sunscreen.</li>
        <li>Some remote beaches have limited facilities, so bring water, snacks, and other essentials.</li>
        <li>Check transportation options in advance, as reaching hidden beaches often requires extra planning.</li>
        <li>Support local businesses rather than international chains to contribute to the local economy.</li>
      </ul>
      
      <p>These hidden beaches offer the perfect escape for travelers looking to experience Southeast Asia's natural beauty without the crowds. As these destinations become more popular, remember to travel responsibly to help preserve their pristine condition for future visitors.</p>
    `,
  }

  // Related posts
  const relatedPosts = [
    {
      id: "2",
      title: "A Food Lover's Guide to Italian Cuisine",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 22, 2023",
      excerpt:
        "From pasta to gelato, explore the diverse and delicious world of authentic Italian cuisine region by region.",
    },
    {
      id: "3",
      title: "Sustainable Travel: How to Reduce Your Carbon Footprint",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 10, 2023",
      excerpt:
        "Learn practical tips and strategies for environmentally conscious travel that doesn't compromise on experience.",
    },
    {
      id: "4",
      title: "The Art of Packing Light: Essential Tips for Minimalist Travel",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 5, 2023",
      excerpt: "Master the art of traveling with just a carry-on, no matter the destination or duration of your trip.",
    },
  ]

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>

            <div className="relative mb-8 h-[40vh] w-full overflow-hidden rounded-lg sm:h-[50vh]">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill priority className="object-cover" />
            </div>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-8 flex flex-wrap gap-2">
              {post.categories.map((category, index) => (
                <div key={index} className="flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                  <Tag className="mr-1 h-4 w-4" />
                  <span>{category}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center border-t border-b py-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <div className="ml-4">
                <p className="font-semibold">Written by {post.author}</p>
                <p className="text-sm text-muted-foreground">Travel Writer & Photographer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.id}
                id={relatedPost.id}
                title={relatedPost.title}
                image={relatedPost.image}
                date={relatedPost.date}
                excerpt={relatedPost.excerpt}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

