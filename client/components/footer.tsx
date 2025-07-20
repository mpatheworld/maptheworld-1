import Link from "next/link"
  import { Facebook, Instagram, Mail, Phone, MapPin, Globe, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-red-50"></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12">
        <div className="container">
          {/* Top section with logo and social */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-red-100 pb-8">
            <div className="mb-6 md:mb-0">
              <img src="/logo.svg" alt="Maptheworld Logo" className="h-24 w-auto" />
              <p className="text-gray-600 mt-4 max-w-md text-center md:text-left">
                Your trusted partner in creating unforgettable travel experiences across India's most beautiful destinations.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <Link href="https://www.facebook.com/profile.php?id=61565144255876" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-colors">
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://www.instagram.com/maptheworld.in?igsh=MWI3bTZ3OHB1ZXQ5OQ==" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-colors">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
   
              </div>
              <div className="flex items-center text-red-600">
                <Globe className="mr-2" size={20} />
                <span className="font-medium">Available 24/7 for Support</span>
              </div>
            </div>
          </div>

          {/* Main grid section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">About the Maptheworld</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Popular Destinations</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/packages" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/packages" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Taj Mahal, Agra
                  </Link>
                </li>
                <li>
                  <Link href="/packages" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Jaipur, Rajasthan
                  </Link>
                </li>
                <li>
                  <Link href="/packages" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Goa Beaches
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Near Temple Road Swarg Building Nileshwar, Kerala, India </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-red-500" />
                  <span className="text-gray-600">+91 79073 02538</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-red-500" />
                  <span className="text-gray-600">info@maptheworld.in</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-red-500" />
                  <span className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center pt-8 border-t border-red-100">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Maptheworld. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
