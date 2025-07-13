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
    e.preventDefault()
    e.stopPropagation()
    onRequestCallback?.()
  }

  return (
    <div 
      className={`group flex flex-col rounded-2xl overflow-hidden active:scale-[0.98] transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-red-200 hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden ${imageClassName || "aspect-[4/3]"}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{name}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <Clock className="mr-1 h-4 w-4" />
          <span className="line-clamp-1">{duration}</span>
        </div>
        <p className="mt-2 text-gray-600 leading-relaxed line-clamp-2 flex-grow">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">₹{price.toLocaleString('en-IN')}</span>
          {!onClick && (
            <Link href={`/packages/${id}`}>
              <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">View Details</Button>
            </Link>
          )}
        </div>
        <div className="mt-4 flex gap-3">
          <Link
            href="tel:7907302538"
            onClick={handleRequestCallback}
            className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full group-hover:scale-110 transition-transform"
          >
            <Phone className="h-5 w-5 text-white" />
          </Link>
          <Button 
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium"
            onClick={handleRequestCallback}
          >
            Request Callback
          </Button>
        </div>
      </div>
    </div>
  )
}
