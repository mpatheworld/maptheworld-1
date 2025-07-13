"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-40 w-50">
            <img src="/logo.svg" alt="Maptheworld Logo" className="h-full w-full" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link href="/packages" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
            Packages
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
            Contact
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
            Blog
          </Link>
        </nav>

        <Button className="hidden md:inline-flex bg-gradient-to-r from-red-600 to-orange-600 text-white hover:bg-red-50">
          Get Started
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/packages"
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
