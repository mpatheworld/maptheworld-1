"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Phone } from "lucide-react"

interface PackageCardProps {
  id: string
  name: string
  image: string
  duration: string
  description: string
  price: number
  onClick?: () => void
  onRequestCallback?: () => void
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
  onRequestCallback,
  className = "",
  imageClassName = ""
}: PackageCardProps) {
  const handleRequestCallback = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRequestCallback?.()
  }

  return (
    <div 
      className={`flex flex-col rounded-xl overflow-hidden hover:shadow-lg active:scale-[0.98] transition-all duration-200 bg-white dark:bg-gray-800 ${className}`}
      onClick={onClick}
    >
      <div className={`relative w-full ${imageClassName || "aspect-[4/3]"}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover w-full"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
          priority
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span className="line-clamp-1">{duration}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">₹{price.toLocaleString('en-IN')}</span>
          {!onClick && (
            <Link href={`/packages/${id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <div 
            className="flex items-center justify-center w-12 h-10 border border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={handleRequestCallback}
          >
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <Button 
            className="flex-1 h-10"
            onClick={handleRequestCallback}
          >
            Request Callback
          </Button>
        </div>
      </div>
    </div>
  )
}
