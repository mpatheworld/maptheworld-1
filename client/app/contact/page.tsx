"use client"

import { useState } from "react"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="mt-4 text-muted-foreground">
              Have questions or ready to plan your next adventure? Get in touch with our travel experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="contact" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="offices">Our Offices</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <ContactForm className="max-w-md" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Head Office</h3>
                        <p className="text-muted-foreground">
                          42 Tourism Avenue
                          <br />
                          Kochi, Kerala, India 682016
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="mr-4 h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">+91 (484) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="mr-4 h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">info@maptheworld.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="mr-4 h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 h-80 w-full overflow-hidden rounded-lg">
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
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-bold mb-6">Our Global Offices</h2>
                  <div className="space-y-4">
                    {offices.map((office) => (
                      <button
                        key={office.id}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOffice.id === office.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        onClick={() => setSelectedOffice(office)}
                      >
                        <h3 className="font-bold">{office.name}</h3>
                        <p
                          className={
                            selectedOffice.id === office.id ? "text-primary-foreground/80" : "text-muted-foreground"
                          }
                        >
                          {office.address}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-lg border p-6">
                    <h3 className="text-2xl font-bold mb-4">{selectedOffice.name} Office</h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold">Address</h4>
                            <p className="text-muted-foreground">{selectedOffice.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold">Phone</h4>
                            <p className="text-muted-foreground">{selectedOffice.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold">Email</h4>
                            <p className="text-muted-foreground">{selectedOffice.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="mr-2 h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold">Office Hours</h4>
                            <p className="text-muted-foreground whitespace-pre-line">{selectedOffice.hours}</p>
                          </div>
                        </div>
                      </div>

                      <div className="h-64 md:h-full w-full overflow-hidden rounded-lg">
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

      {/* FAQ Section */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">Find answers to common questions about our services</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-lg bg-background p-6">
              <h3 className="text-lg font-bold">How do I book a travel package?</h3>
              <p className="mt-2 text-muted-foreground">
                You can book a travel package by contacting our team through the form on this page, calling our office
                directly, or using the "Book Now" button on any package page on our website.
              </p>
            </div>

            <div className="rounded-lg bg-background p-6">
              <h3 className="text-lg font-bold">What payment methods do you accept?</h3>
              <p className="mt-2 text-muted-foreground">
                We accept all major credit cards, bank transfers, and PayPal. For certain destinations, we also offer
                payment plans to help you budget for your trip.
              </p>
            </div>

            <div className="rounded-lg bg-background p-6">
              <h3 className="text-lg font-bold">Can I customize a travel package?</h3>
              <p className="mt-2 text-muted-foreground">
                We specialize in creating customized travel experiences. Contact our team with your preferences, and
                we'll work with you to design the perfect itinerary.
              </p>
            </div>

            <div className="rounded-lg bg-background p-6">
              <h3 className="text-lg font-bold">What is your cancellation policy?</h3>
              <p className="mt-2 text-muted-foreground">
                Our cancellation policy varies depending on the package and destination. Generally, cancellations made
                60+ days before departure receive a full refund minus a small administrative fee. Please refer to the
                specific terms for each package or ask our team for details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

