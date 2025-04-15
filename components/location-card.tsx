import Image from "next/image"
import Link from "next/link"

interface LocationCardProps {
  name: string
  image: string
  slug: string
}

export default function LocationCard({ name, image, slug }: LocationCardProps) {
  return (
    <Link href={`/locations/${slug}`} className="group">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
      </div>
    </Link>
  )
}

