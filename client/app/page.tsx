"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestimonialSlider from "@/components/testimonial-slider";
import { BannerCarousel } from "@/components/banner-carouesel";
import { PackageSection } from "@/components/package-section";
import api from "@/lib/api";
import { Section } from "@/lib/interface";

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
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from travelers who have experienced our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready for Your Next Adventure?
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Contact our travel experts today to start planning your dream
              vacation
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
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
