"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Modal from "@/components/modal"
import { useToast } from "@/hooks/use-toast"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)
    setIsSubmitted(true)
    toast({
      title: "Offer claimed!",
      description: "Check your email for your 10% discount code",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Limited Time Offer: 10% Off">
      {!isSubmitted ? (
        <>
          <p className="text-muted-foreground mb-4">
            Subscribe now and get 10% off your first booking! Enter your email to claim this exclusive offer.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Claim My 10% Off
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            By claiming this offer, you agree to our Privacy Policy and consent to receive marketing communications.
          </p>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Offer Claimed!</h3>
          <p className="text-muted-foreground mb-4">
            Your 10% discount code has been sent to your email. Use it on your next booking for instant savings!
          </p>
          <Button onClick={onClose} className="w-full">
            Start Browsing Deals
          </Button>
        </div>
      )}
    </Modal>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
