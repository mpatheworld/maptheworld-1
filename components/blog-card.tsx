import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  image: string
  date: string
  excerpt: string
}

export default function BlogCard({ id, title, image, date, excerpt }: BlogCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 line-clamp-3 text-muted-foreground">{excerpt}</p>
        <div className="mt-4">
          <Link href={`/blog/${id}`}>
            <Button variant="outline">Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

