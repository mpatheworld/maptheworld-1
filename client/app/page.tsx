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

      {/* Dynamic Package Sections */}
      {sections.map((section) => (
        <PackageSection
          key={section._id}
          title={section.title}
          description={section.description}
          packages={section.packages}
          sectionId={section._id}
        />
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
