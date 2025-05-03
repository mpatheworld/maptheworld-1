"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

interface ContactFormProps {
  className?: string;
  source: string;
}

export default function ContactForm({ className, source }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [message, setMessage] = useState({
    type: "",
    title: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setMessage({
      type: "info",
      title: "Submitting form...",
      description: "",
    });
    e.preventDefault();
    try {
      const response = await api.post("/enquiries", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        path: window?.location?.pathname,
        source,
      });
      console.log("Form submitted:", response);
      setMessage({
        type: "success",
        title: "Thank you for your interest!",
        description:
          "Our travel expert will contact you shortly to discuss your dream vacation.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        title: "Error submitting form",
        description: "Please try again later",
      });
      console.error("Error submitting form:", error);
    } finally {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
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
        <div className="grid gap-2">
          <p
            className={`${
              message?.type === "success"
                ? "text-green-500"
                : message?.type === "error"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {message?.title}
          </p>
          <p>{message?.description}</p>
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  );
}
