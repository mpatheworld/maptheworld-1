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
import { Skeleton } from "@/components/ui/skeleton";
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

// Loading skeleton for package card
function PackageCardSkeleton() {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100">
      <div className="relative w-full aspect-[4/3]">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function PackagePage({ params }: PackagePageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageData, setPackageData] = useState<Package>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/packages/${id}`);
        setPackageData(response.data);
      } catch (err) {   
        console.error("Error fetching package:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  return (
    <>
      {/* Hero Section with CTA */}
      <section className="relative">
        <div className="relative h-[70vh] w-full overflow-hidden">
          {isLoading ? (
            <Skeleton className="absolute inset-0" />
          ) : (
            <Image
              src={packageData?.images[0] || "/placeholder.svg"}
              alt={packageData?.name || "banner image"}
              fill
              priority
              className="object-cover"  
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-800 rounded-full text-xs font-medium mb-4 sm:mb-6">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                {isLoading ? <Skeleton className="h-4 w-24" /> : packageData?.location?.toUpperCase()}
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                {isLoading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                  </div>
                ) : (
                  packageData?.name.toUpperCase()
                )}
              </h1>
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-base mb-6 sm:mb-8">
                <div className="flex items-center">
                  <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {isLoading ? <Skeleton className="h-4 w-20" /> : <span>{packageData?.duration}</span>}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {isLoading ? <Skeleton className="h-4 w-24" /> : <span>{packageData?.location}</span>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-6 py-4 sm:px-8 sm:py-6 text-xs sm:text-base"
                  disabled={isLoading}
                >
                  Book Your Dream Vacation
                </Button>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-white/20 text-white hover:bg-white hover:text-red-600 font-semibold px-6 py-4 sm:px-8 sm:py-6 text-xs sm:text-base backdrop-blur-sm"
                  disabled={isLoading}
                >
                  <Phone className="mr-2" />
                  Request Callback
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
            <div className="flex items-center justify-center text-xs sm:text-sm">
              <Star className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm">
              <Users className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span>1000+ Happy Travelers</span>
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm">
              <Shield className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm">
              <Calendar className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Package Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Description</h3>
                      {isLoading ? (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/6" />
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-600">{packageData?.description}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Key Information</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-32" />
                          ) : (
                            <span className="text-xs sm:text-sm">{packageData?.location}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-24" />
                          ) : (
                            <span className="text-xs sm:text-sm">{packageData?.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Highlights and Facilities */}
                <section>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Trip Highlights</h3>
                      {isLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2 sm:space-y-3">
                          {packageData?.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center text-xs sm:text-sm">
                              <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Facilities</h3>
                      {isLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2 sm:space-y-3">
                          {packageData?.facilities.map((facility, index) => (
                            <li key={index} className="flex items-center text-xs sm:text-sm">
                              <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                              <span>{facility}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>

                {/* Image Gallery */}
                <section>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="w-full aspect-video rounded-2xl" />
                      <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="aspect-square rounded-xl" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <PackageGallery images={packageData?.images || []} />
                  )}
                </section>

                {/* Detailed Information Accordion */}
                <section>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="itinerary">
                      <AccordionTrigger className="text-base sm:text-lg font-semibold">
                        Detailed Itinerary
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 sm:space-y-4">
                          {packageData?.itinerary.map((day, index) => (
                            <div key={index} className="border-b pb-3 sm:pb-4 last:border-b-0">
                              <div className="flex items-center mb-2">
                                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mr-2 sm:mr-3 text-xs">
                                  {day?.day}
                                </div>
                                <h4 className="font-medium text-xs sm:text-sm">{day?.title}</h4>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">{day?.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="inclusions">
                      <AccordionTrigger className="text-base sm:text-lg font-semibold">
                        Inclusions & Exclusions
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">What's Included</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {packageData?.inclusions.map((item, index) => (
                                <li key={index} className="flex items-center text-xs sm:text-sm">
                                  <Check className="mr-2 h-2 w-2 sm:h-3 sm:w-3 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">What's Excluded</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {packageData?.exclusions.map((item, index) => (
                                <li key={index} className="flex items-center text-xs sm:text-sm">
                                  <X className="mr-2 h-2 w-2 sm:h-3 sm:w-3 text-red-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="policies">
                      <AccordionTrigger className="text-base sm:text-lg font-semibold">
                        Policies & Important Information
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 sm:space-y-4">
                          {packageData?.bookingPolicy && (
                            <div>
                              <h4 className="font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">Booking Policy</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{packageData.bookingPolicy}</p>
                            </div>
                          )}
                          {packageData?.cancellationPolicy && (
                            <div>
                              <h4 className="font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">Cancellation Policy</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{packageData.cancellationPolicy}</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="reviews">
                      <AccordionTrigger className="text-base sm:text-lg font-semibold">
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
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <div className="flex items-end gap-2 mb-4 sm:mb-6">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm">{packageData?.name}</p>
                      <div className="flex items-end gap-2 mb-4 sm:mb-6">
                        <p className="text-xl sm:text-2xl font-bold text-red-600">₹{packageData?.price}</p>
                        <p className="text-xs sm:text-sm text-gray-600">/ per person</p>
                      </div>
                    </>
                  )}

                  {!isFormSubmitted ? (
                    <ContactForm
                      source={packageData?.name || "Package Detail Page"}
                    />
                  ) : (
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-bold mb-2">Thank You!</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        Our travel expert will contact you shortly to discuss
                        your dream vacation.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs sm:text-sm"
                        onClick={() => setIsFormSubmitted(false)}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Need Help?</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                      <span className="text-xs sm:text-sm">+91-7907302538</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                      <span className="text-xs sm:text-sm">info@maptheworld.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      {isLoading ? (
        <section className="py-8 sm:py-12 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="container">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Similar Packages</h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <PackageCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      ) : packageData?.similarPackages && packageData?.similarPackages?.length > 0 && (
        <section className="py-8 sm:py-12 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="container">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Similar Packages</h2>
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
