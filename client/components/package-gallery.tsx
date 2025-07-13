"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PackageGalleryProps {
  images: string[];
}

export function PackageGallery({ images }: PackageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev! + 1) % images.length);
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt="Package main image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
          >
            <Image
              src={image}
              alt={`Package image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <DialogTitle className="p-4 text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Image Preview
          </DialogTitle>
          <div className="relative aspect-video">
            {selectedImage !== null && (
              <Image
                src={images[selectedImage]}
                alt={`Package image ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full bg-white/80 hover:bg-white hover:text-red-600 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="rounded-full bg-white/80 hover:bg-white hover:text-red-600 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}