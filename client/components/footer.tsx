import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 mt-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold mb-4 text-brand-red font-serif">maptheworld</h3>
          <p className="text-muted-foreground mb-4">
            Discover amazing destinations and create unforgettable memories with our expertly crafted travel packages.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" className="text-muted-foreground hover:text-primary">
                Packages
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif">Popular Destinations</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Kerala Backwaters, India
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Taj Mahal, Agra
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Jaipur, Rajasthan
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Goa Beaches, India
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Munnar, Kerala
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 font-serif">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">42 Tourism Avenue, Kochi, Kerala, India 682016</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">+91 (484) 123-4567</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">info@maptheworld.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} maptheworld. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
