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
  className?: string
  imageClassName?: string
}

export default function PackageCard({ 
  id, 
  name, 
  image, 
  duration, 
  description, 
  price, 
  onClick,
  className = "",
  imageClassName = ""
}: PackageCardProps) {
  return (
    <div className={`group overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-all active:shadow-md ${className}`}>
      <div className={`relative w-full ${imageClassName || "aspect-[4/3]"}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-200 group-active:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
          priority
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold line-clamp-1">{name}</h3>
        <div className="mt-1 sm:mt-2 flex items-center text-sm sm:text-base text-muted-foreground">
          <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="line-clamp-1">{duration}</span>
        </div>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground line-clamp-2 flex-grow">{description}</p>
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold">₹{price}</span>
          {onClick ? (
            <Button size="sm" className="sm:size-default" onClick={onClick}>View Details</Button>
          ) : (
            <Link href={`/packages/${id}`}>
              <Button size="sm" className="sm:size-default">View Details</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
