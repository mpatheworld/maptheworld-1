"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg ${
          isOpen ? "translate-y-0" : "translate-y-4"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

