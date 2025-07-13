"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Check, X } from "lucide-react"
import Modal from "@/components/modal"

interface PackageDetailModalProps {
  isOpen: boolean
  onClose: () => void
  packageData: {
    id: string
    name: string
    image: string
    duration: string
    location: string
    price: number
    description: string
    highlights: string[]
    inclusions: string[]
    exclusions: string[]
  }
}

export default function PackageDetailModal({ isOpen, onClose, packageData }: PackageDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={packageData.name}>
      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
        <Image src={packageData.image || "/placeholder.svg"} alt={packageData.name} fill className="object-cover" />
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded-full ${
            activeTab === "overview" 
              ? "bg-gradient-to-r from-red-600 to-orange-600 text-white" 
              : "bg-red-100 text-red-800"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-full ${
            activeTab === "inclusions"
              ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
              : "bg-red-100 text-red-800"
          }`}
          onClick={() => setActiveTab("inclusions")}
        >
          Details
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {activeTab === "overview" && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-red-600" />
                <span className="text-sm text-gray-600">{packageData.duration}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-orange-600" />
                <span className="text-sm text-gray-600">{packageData.location}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{packageData.description}</p>

            <h3 className="font-bold mb-2 text-gray-900">Highlights</h3>
            <ul className="space-y-1 mb-4">
              {packageData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-red-600 mt-0.5" />
                  <span className="text-sm text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "inclusions" && (
          <div>
            <h3 className="font-bold mb-2 text-gray-900">What's Included</h3>
            <ul className="space-y-1 mb-4">
              {packageData.inclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-red-600 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-bold mb-2 text-gray-900">What's Not Included</h3>
            <ul className="space-y-1 mb-4">
              {packageData.exclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <X className="mr-2 h-4 w-4 text-orange-600 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-4 border-t">
        <div>
          <span className="text-lg font-bold text-gray-900">₹{packageData.price}</span>
          <span className="text-sm text-gray-600"> / person</span>
        </div>
        <Button 
          onClick={() => (window.location.href = `/packages/${packageData.id}`)}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700"
        >
          Book Now
        </Button>
      </div>
    </Modal>
  )
}
