"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  MapPin,
  Calendar,
  Check,
  X,
  Star,
  Users,
  Shield,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import PackageCard from "@/components/package-card";
import ReviewCard from "@/components/review-card";
import { useState } from "react";
import api from "@/lib/api";
import { Package } from "@/lib/interface";
import ContactForm from "@/components/contact-form";
import { PackageGallery } from "@/components/package-gallery";
import Modal from "@/components/modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { PackageEnquiryForm } from "@/components/package-enquiry-form";

interface PackagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PackagePage({ params }: PackagePageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageData, setPackageData] = useState<Package>();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get(`/packages/${id}`);
        setPackageData(response.data);
        console.log(response.data);
      } catch (err) {   
        console.error("Error fetching package:", err);
      }
    };

    fetchPackage();
  }, []);

  return (
    <>
      {/* Hero Section with CTA */}
      <section className="relative">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={packageData?.images[0] || "/placeholder.svg"}
            alt={packageData?.name || "banner image"}
            fill
            priority
            className="object-cover"  
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">
                {packageData?.name}
              </h1>
              <div className="flex items-center justify-center gap-6 text-lg mb-8">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{packageData?.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{packageData?.location}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Book Your Dream Vacation
                </Button>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20"
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center">
              <Star className="mr-2 h-5 w-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" />
              <span>1000+ Happy Travelers</span>
            </div>
            <div className="flex items-center justify-center">
              <Shield className="mr-2 h-5 w-5" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Flexible Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Package Overview Section */}
                <section>
                  <h2 className="text-3xl font-bold mb-6">Package Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Description</h3>
                      <p className="text-muted-foreground">{packageData?.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-primary" />
                          <span>{packageData?.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-primary" />
                          <span>{packageData?.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-primary" />
                          
                          {/* <span>Best for {packageData?.category} travelers</span> TODO: Add category */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Highlights and Facilities */}
                <section>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Trip Highlights</h3>
                      <ul className="space-y-3">
                        {packageData?.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Facilities</h3>
                      <ul className="space-y-3">
                        {packageData?.facilities.map((facility, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                            <span>{facility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Image Gallery */}
                <section>
                  <PackageGallery images={packageData?.images || []} />
                </section>

                {/* Detailed Information Accordion */}
                <section>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="itinerary">
                      <AccordionTrigger className="text-xl font-semibold">
                        Detailed Itinerary
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {packageData?.itinerary.map((day, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center mb-2">
                                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full mr-3">
                                  Day {day?.day}
                                </div>
                                <h4 className="font-medium">{day?.title}</h4>
                              </div>
                              <p className="text-muted-foreground">{day?.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="inclusions">
                      <AccordionTrigger className="text-xl font-semibold">
                        Inclusions & Exclusions
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-4">What's Included</h4>
                            <ul className="space-y-2">
                              {packageData?.inclusions.map((item, index) => (
                                <li key={index} className="flex items-center">
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-4">What's Excluded</h4>
                            <ul className="space-y-2">
                              {packageData?.exclusions.map((item, index) => (
                                <li key={index} className="flex items-center">
                                  <X className="mr-2 h-4 w-4 text-red-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="policies">
                      <AccordionTrigger className="text-xl font-semibold">
                        Policies & Important Information
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {packageData?.bookingPolicy && (
                            <div>
                              <h4 className="font-medium mb-2">Booking Policy</h4>
                              <p className="text-muted-foreground">{packageData.bookingPolicy}</p>
                            </div>
                          )}
                          {packageData?.cancellationPolicy && (
                            <div>
                              <h4 className="font-medium mb-2">Cancellation Policy</h4>
                              <p className="text-muted-foreground">{packageData.cancellationPolicy}</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="reviews">
                      <AccordionTrigger className="text-xl font-semibold">
                        Traveler Reviews
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {packageData?.reviews.map((review, index) => (
                            <ReviewCard
                              key={index}
                              name={review.name}
                              image={review.image}
                              rating={review.rating}
                              review={review.review}
                              date={review.date}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </div>
            </div>

            {/* Sidebar with Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <p>{packageData?.name}</p>
                  <div className="flex items-end gap-2 mb-6">
                    <p className="text-3xl font-bold">₹{packageData?.price}</p>
                    <p className="text-muted-foreground">/ per person</p>
                  </div>

                  {!isFormSubmitted ? (
                    <ContactForm
                      source={packageData?.name || "Package Detail Page"}
                    />
                  ) : (
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-4">
                        Our travel expert will contact you shortly to discuss
                        your dream vacation.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsFormSubmitted(false)}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      <span>+91-9876543210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      <span>support@maptheworld.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      {packageData?.similarPackages &&
        packageData?.similarPackages?.length > 0 && (
          <section className="py-12 bg-muted">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Similar Packages</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {packageData?.similarPackages.map((pkg) => (
                  <PackageCard
                    key={pkg?._id}
                    id={pkg?._id}
                    name={pkg?.name}
                    image={pkg?.images?.[0]}
                    duration={pkg?.duration}
                    description={pkg?.description}
                    price={pkg?.price}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get a Free Quote"
      >
        <ContactForm source={packageData?.name || "Package Detail Page"} />
      </Modal>
    </>
  );
}
