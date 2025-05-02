import BlogCard from "@/components/blog-card"

export default function BlogPage() {
  // Sample data
  const blogPosts = [
    {
      id: "1",
      title: "Top 10 Hidden Beaches in Southeast Asia",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15, 2023",
      excerpt:
        "Discover secluded paradises away from the tourist crowds with our guide to Southeast Asia's most beautiful hidden beaches.",
    },
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
    {
      id: "5",
      title: "Beyond the Tourist Trail: Authentic Experiences in Japan",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 18, 2023",
      excerpt:
        "Venture beyond Tokyo and Kyoto to discover Japan's lesser-known treasures and truly authentic cultural experiences.",
    },
    {
      id: "6",
      title: "Solo Female Travel: Safety Tips and Inspiring Destinations",
      image: "/placeholder.svg?height=400&width=600",
      date: "January 30, 2023",
      excerpt:
        "Practical advice and recommended destinations for women traveling solo, from seasoned female adventurers.",
    },
    {
      id: "7",
      title: "The Ultimate Guide to Safari Photography",
      image: "/placeholder.svg?height=400&width=600",
      date: "December 12, 2022",
      excerpt:
        "Expert tips for capturing stunning wildlife photos on your next safari adventure, from equipment recommendations to composition techniques.",
    },
    {
      id: "8",
      title: "Budget Travel in Europe: How to Experience More for Less",
      image: "/placeholder.svg?height=400&width=600",
      date: "November 5, 2022",
      excerpt:
        "Discover how to explore Europe's most iconic destinations without breaking the bank, from accommodation hacks to free attractions.",
    },
    {
      id: "9",
      title: "The World's Most Spectacular Hiking Trails",
      image: "/placeholder.svg?height=400&width=600",
      date: "October 20, 2022",
      excerpt:
        "From the Inca Trail to the Tour du Mont Blanc, these breathtaking hikes offer unforgettable adventures for outdoor enthusiasts.",
    },
  ]

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Travel Blog</h1>
            <p className="mt-4 text-muted-foreground">Tips, guides, and stories from our travel experts</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image}
                date={post.date}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

