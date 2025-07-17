import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Maptheworld",
  description: "Privacy policy and data protection information for Maptheworld users.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-red max-w-none">
        <p className="text-gray-600 mb-6">
          At Maptheworld, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Name and contact information</li>
          <li>Passport details for booking purposes</li>
          <li>Payment information</li>
          <li>Travel preferences and requirements</li>
          <li>Communication history with us</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">We use your personal information to:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Process your travel bookings and arrangements</li>
          <li>Communicate with you about your bookings</li>
          <li>Send you promotional offers (with your consent)</li>
          <li>Improve our services and website experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">3. Data Protection</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
        <p className="text-gray-600 mb-4">
          We may share your information with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Travel service providers necessary for your booking</li>
          <li>Payment processors for secure transactions</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
        <p className="text-gray-600 mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Request a copy of your data</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">6. Cookies</h2>
        <p className="text-gray-600 mb-4">
          We use cookies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          For any privacy-related queries or to exercise your rights, please contact us at:
        </p>
        <ul className="list-none text-gray-600 mb-6">
          <li>Email: info@maptheworld.com</li>
          <li>Phone: +91 79073 02538</li>
          <li>Address: 42 Tourism Avenue, Kochi, Kerala, India 682016</li>
        </ul>

        <p className="text-gray-600 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
} 