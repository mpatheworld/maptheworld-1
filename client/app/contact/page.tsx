"use client"

import { useState } from "react"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock, Users, Heart, Globe, Compass } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact")

  const offices = [
    {
      id: "kochi",
      name: "Kochi",
      address: "42 Tourism Avenue, Kochi, Kerala, India 682016",
      phone: "+91 (484) 123-4567", 
      email: "kochi@maptheworld.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.000000000002!2d76.2678!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1619826381244!5m2!1sen!2sin",
    },
    {
      id: "kannur", 
      name: "Kannur",
      address: "15 Beach Road, Kannur, Kerala, India 670001",
      phone: "+91 (497) 234-5678",
      email: "kannur@maptheworld.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12538.000000000002!2d75.3704!3d11.8745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422b9b2aca753%3A0x380605a11ce24f6c!2sKannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1619826462320!5m2!1sen!2sin",
    },
    {
      id: "trivandrum",
      name: "Trivandrum", 
      address: "28 Temple Street, Trivandrum, Kerala, India 695001",
      phone: "+91 (471) 345-6789",
      email: "trivandrum@maptheworld.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15765.000000000002!2d76.9366!3d8.5241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb805bbcd47%3A0x15439fab5c5c81cb!2sThiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1619826520279!5m2!1sen!2sin",
    },
  ]

  const [selectedOffice, setSelectedOffice] = useState(offices[0])

  return (
    <>
      <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to plan your next adventure? Our travel experts are here to help make your dreams a reality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <Tabs defaultValue="contact" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="contact" className="text-lg">Contact Form</TabsTrigger>
              <TabsTrigger value="offices" className="text-lg">Our Offices</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
                    <Mail className="h-4 w-4" />
                    Send us a Message
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                  <ContactForm source="Contact Page" className="max-w-md" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                    <MapPin className="h-4 w-4" />
                    Contact Information
                  </div>
                  <h2 className="text-3xl font-bold mb-8 text-gray-900">How to Reach Us</h2>
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Head Office</h3>
                        <p className="text-gray-600">
                          42 Tourism Avenue
                          <br />
                          Kochi, Kerala, India 682016
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="mr-4 h-6 w-6 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">+91 (484) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="mr-4 h-6 w-6 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">info@maptheworld.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="mr-4 h-6 w-6 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Office Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 h-80 w-full overflow-hidden rounded-2xl border border-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offices">
              <div className="grid gap-12 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
                    <Globe className="h-4 w-4" />
                    Global Presence
                  </div>
                  <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Global Offices</h2>
                  <div className="space-y-4">
                    {offices.map((office) => (
                      <button
                        key={office.id}
                        className={`w-full text-left p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                          selectedOffice.id === office.id
                            ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                            : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-red-200"
                        }`}
                        onClick={() => setSelectedOffice(office)}
                      >
                        <h3 className="text-xl font-bold">{office.name}</h3>
                        <p
                          className={
                            selectedOffice.id === office.id ? "text-white/90" : "text-gray-600"
                          }
                        >
                          {office.address}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-gray-100 p-8 bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">{selectedOffice.name} Office</h3>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <MapPin className="mr-4 h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Address</h4>
                            <p className="text-gray-600">{selectedOffice.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="mr-4 h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Phone</h4>
                            <p className="text-gray-600">{selectedOffice.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="mr-4 h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Email</h4>
                            <p className="text-gray-600">{selectedOffice.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="mr-4 h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Office Hours</h4>
                            <p className="text-gray-600 whitespace-pre-line">{selectedOffice.hours}</p>
                          </div>
                        </div>
                      </div>

                      <div className="h-64 md:h-full w-full overflow-hidden rounded-2xl border border-gray-100">
                        <iframe
                          src={selectedOffice.mapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${selectedOffice.name} Office Location`}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and travel packages
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-2xl bg-white p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">How do I book a travel package?</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                You can book a travel package by contacting our team through the form on this page, calling our office
                directly, or using the "Book Now" button on any package page on our website.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We accept all major credit cards, bank transfers, and PayPal. For certain destinations, we also offer
                payment plans to help you budget for your trip.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">Can I customize a travel package?</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We specialize in creating customized travel experiences. Contact our team with your preferences, and
                we'll work with you to design the perfect itinerary.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">What is your cancellation policy?</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Our cancellation policy varies depending on the package and destination. Generally, cancellations made
                60+ days before departure receive a full refund minus a small administrative fee. Please refer to the
                specific terms for each package or ask our team for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-red-200">Adventure</span>?
            </h2>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the world through our carefully crafted experiences.
              Your next great adventure is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-6 text-lg">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 font-semibold px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
