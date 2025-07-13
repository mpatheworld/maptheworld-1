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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                {packageData?.location?.toUpperCase()}
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                {packageData?.name.toUpperCase()}
              </h1>
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-lg mb-6 sm:mb-8">
                <div className="flex items-center">
                  <Clock className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{packageData?.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{packageData?.location}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-lg"
                >
                  Book Your Dream Vacation
                </Button>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 font-semibold px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-lg"
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 sm:py-4">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center justify-center text-sm sm:text-base">
              <Star className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center text-sm sm:text-base">
              <Users className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>1000+ Happy Travelers</span>
            </div>
            <div className="flex items-center justify-center text-sm sm:text-base">
              <Shield className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center text-sm sm:text-base">
              <Calendar className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>Flexible Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6 sm:space-y-8">
                {/* Package Overview Section */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Package Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Description</h3>
                      <p className="text-sm sm:text-base text-gray-600">{packageData?.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Information</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                          <span className="text-sm sm:text-base">{packageData?.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                          <span className="text-sm sm:text-base">{packageData?.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Highlights and Facilities */}
                <section>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Trip Highlights</h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {packageData?.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Facilities</h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {packageData?.facilities.map((facility, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
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
                      <AccordionTrigger className="text-lg sm:text-xl font-semibold">
                        Detailed Itinerary
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 sm:space-y-4">
                          {packageData?.itinerary.map((day, index) => (
                            <div key={index} className="border-b pb-3 sm:pb-4 last:border-b-0">
                              <div className="flex items-center mb-2">
                                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mr-2 sm:mr-3 text-sm">
                                  {day?.day}
                                </div>
                                <h4 className="font-medium text-sm sm:text-base">{day?.title}</h4>
                              </div>
                              <p className="text-sm sm:text-base text-gray-600">{day?.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="inclusions">
                      <AccordionTrigger className="text-lg sm:text-xl font-semibold">
                        Inclusions & Exclusions
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">What's Included</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {packageData?.inclusions.map((item, index) => (
                                <li key={index} className="flex items-center text-sm sm:text-base">
                                  <Check className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">What's Excluded</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {packageData?.exclusions.map((item, index) => (
                                <li key={index} className="flex items-center text-sm sm:text-base">
                                  <X className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="policies">
                      <AccordionTrigger className="text-lg sm:text-xl font-semibold">
                        Policies & Important Information
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 sm:space-y-4">
                          {packageData?.bookingPolicy && (
                            <div>
                              <h4 className="font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Booking Policy</h4>
                              <p className="text-sm sm:text-base text-gray-600">{packageData.bookingPolicy}</p>
                            </div>
                          )}
                          {packageData?.cancellationPolicy && (
                            <div>
                              <h4 className="font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Cancellation Policy</h4>
                              <p className="text-sm sm:text-base text-gray-600">{packageData.cancellationPolicy}</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="reviews">
                      <AccordionTrigger className="text-lg sm:text-xl font-semibold">
                        Traveler Reviews
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 sm:space-y-4">
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
                <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base">{packageData?.name}</p>
                  <div className="flex items-end gap-2 mb-4 sm:mb-6">
                    <p className="text-2xl sm:text-3xl font-bold text-red-600">₹{packageData?.price}</p>
                    <p className="text-sm sm:text-base text-gray-600">/ per person</p>
                  </div>

                  {!isFormSubmitted ? (
                    <ContactForm
                      source={packageData?.name || "Package Detail Page"}
                    />
                  ) : (
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Our travel expert will contact you shortly to discuss
                        your dream vacation.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm sm:text-base"
                        onClick={() => setIsFormSubmitted(false)}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Need Help?</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                      <span className="text-sm sm:text-base">+91-9876543210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                      <span className="text-sm sm:text-base">support@maptheworld.com</span>
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
          <section className="py-8 sm:py-12 bg-gradient-to-br from-red-50 via-white to-orange-50">
            <div className="container">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Similar Packages</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
