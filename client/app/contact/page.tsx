"use client"

import { useState } from "react"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock, Users, Heart, Globe, Compass } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TestimonialSlider from "@/components/testimonial-slider"

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
    }
  ]

  const [selectedOffice, setSelectedOffice] = useState(offices[0])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/90 via-white/50 to-orange-50/90 backdrop-blur-sm" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Let's Connect
              </div>
              <h1 className="text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
                Your Journey Begins Here
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ready to embark on your next adventure? Our travel experts are here to turn your dream destinations into unforgettable experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact-form">
                  <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:opacity-90">
                    Start Planning
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    View Packages
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-3xl transform rotate-3" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                <ContactForm source="Contact Hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              Our Locations
            </div>
            <h2 className="text-4xl font-bold mb-4">Find Us Near You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              With offices across Kerala, we're always close by to help plan your perfect trip
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offices.map((office) => (
              <div
                key={office.id}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-8 hover:border-red-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4">{office.name}</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="mr-3 h-5 w-5 text-red-600 mt-1" />
                      <p className="text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-red-600" />
                      <p className="text-gray-600">{office.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-red-600" />
                      <p className="text-gray-600">{office.email}</p>
                    </div>
                  </div>
                  <div className="h-48 w-full overflow-hidden rounded-xl border border-gray-100">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${office.name} Office Location`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Testimonials
            </div>
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real travelers who've experienced the Map The World difference
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <Compass className="h-4 w-4" />
              Common Questions
            </div>
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our services and travel packages
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">How do I book a travel package?</h3>
              <p className="mt-3 text-gray-600">
                You can book a travel package through our website, by contacting our team via the form above, or by calling any of our offices directly.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-3 text-gray-600">
                We accept all major credit cards, bank transfers, and digital payments. Flexible payment plans are available for select packages.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-100 hover:border-red-200 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">Can I customize my travel package?</h3>
              <p className="mt-3 text-gray-600">
                Absolutely! We specialize in creating personalized travel experiences. Contact our team to design your perfect itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of travelers who have discovered the world with us. Your next unforgettable journey awaits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                Browse Packages
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
