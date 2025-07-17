"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestimonialSlider from "@/components/testimonial-slider";
import { BannerCarousel } from "@/components/banner-carouesel";
import { PackageSection } from "@/components/package-section";
import api from "@/lib/api";
import { Section } from "@/lib/interface";
import { MapPin, Heart } from "lucide-react";
import { OfferBanner } from "@/components/offer-banner"
import React from 'react'

// Add offers data
const offers = [
  {
    title: "Early Bird Summer Special",
    description: "Book your summer vacation now and get amazing discounts on selected packages",
    discount: "15%",
    ctaText: "Book Now",
    ctaLink: "/packages",
    variant: "red" as const
  },
  {
    title: "Last Minute Deals",
    description: "Grab incredible discounts on last-minute bookings for selected destinations",
    discount: "20%",
    ctaText: "View Deals",
    ctaLink: "/packages",
    variant: "orange" as const
  },
  {
    title: "Group Travel Offer",
    description: "Special rates for group bookings of 5 or more people. Perfect for family and friends",
    discount: "25%",
    ctaText: "Plan Together",
    ctaLink: "/contact",
    variant: "red" as const
  },
  {
    title: "Early Bird Summer Special",
    description: "Book your summer vacation now and get amazing discounts on selected packages",
    discount: "15%",
    ctaText: "Book Now",
    ctaLink: "/packages",
    variant: "red" as const
  }
    
]

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get("/sections/active");
        setSections(response.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <BannerCarousel />

      {/* Dynamic Package Sections with Offer Banners */}
      {sections.map((section, index) => (
        <React.Fragment key={section._id}>
          <PackageSection
            title={section.title}
            description={section.description}
            packages={section.packages}
            sectionId={section._id}
          />
          {index < sections.length - 1 && index < offers.length && (
            <OfferBanner {...offers[index]} />
          )}
        </React.Fragment>
      ))}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Traveler Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-red-600">Customers</span> Say
            </h2>
            <p className="text-lg text-gray-600">
              Read testimonials from travelers who have experienced our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Next <span className="text-red-200">Adventure</span>?
            </h2>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
              Contact our travel experts today to start planning your dream vacation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
