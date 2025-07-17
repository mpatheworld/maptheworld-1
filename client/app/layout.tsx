import type React from "react"
import { Inter, Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
const inter = Inter({ subsets: ['latin'] })

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
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
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