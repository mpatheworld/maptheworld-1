import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-12 mt-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-600 font-serif">
            <img src="/logo.svg" alt="Maptheworld Logo" className="h-22 w-auto" />
          </h3>
          <p className="text-gray-600 mb-4">
            Discover amazing destinations and create unforgettable memories with our expertly crafted travel packages.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif text-gray-900">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" className="text-gray-600 hover:text-red-600 transition-colors">
                Packages
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif text-gray-900">Popular Destinations</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                Kerala Backwaters, India
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                Taj Mahal, Agra
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                Jaipur, Rajasthan
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                Goa Beaches, India
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                Munnar, Kerala
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif text-gray-900">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-red-600" />
              <span className="text-gray-600">42 Tourism Avenue, Kochi, Kerala, India 682016</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-red-600" />
              <span className="text-gray-600">+91 79073 02538</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-red-600" />
              <span className="text-gray-600">info@maptheworld.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-red-100">
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} maptheworld. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
