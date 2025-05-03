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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt="Package main image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
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
        <DialogContent className="max-w-4xl p-0">
          <DialogTitle className="pt-2 pl-2">Image Preview</DialogTitle>
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
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 