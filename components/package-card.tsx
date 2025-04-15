"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface PackageCardProps {
  id: string
  name: string
  image: string
  duration: string
  description: string
  price: number
  onClick?: () => void
}

export default function PackageCard({ id, name, image, duration, description, price, onClick }: PackageCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-light-gray shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-2 flex items-center text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{duration}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">₹{price}</span>
          {onClick ? (
            <Button onClick={onClick}>View Details</Button>
          ) : (
            <Link href={`/packages/${id}`}>
              <Button>View Details</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

