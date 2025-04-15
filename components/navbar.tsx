"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-32">
            <span className="text-xl font-bold text-brand-red font-serif">maptheworld</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/packages" className="text-sm font-medium transition-colors hover:text-primary">
            Packages
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
        </nav>

        <Button className="hidden md:inline-flex">Get Started</Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/packages"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

