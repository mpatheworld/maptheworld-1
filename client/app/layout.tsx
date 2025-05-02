import type React from "react"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-sans',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
})

export const metadata = {
  title: "maptheworld",
  description: "Discover amazing travel destinations and packages",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'