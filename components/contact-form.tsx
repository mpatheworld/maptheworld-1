"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  )
}

