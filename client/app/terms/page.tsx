import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Maptheworld",
  description: "Terms and conditions for using Maptheworld's travel services and website.",
}

export default function TermsAndConditions() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      
      <div className="prose prose-red max-w-none">
        <p className="text-gray-600 mb-6">
          Welcome to Maptheworld. By accessing and using our website and services, you agree to these terms and conditions.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing and using Maptheworld's website and services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">2. Booking and Payments</h2>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>All bookings are subject to availability and confirmation</li>
          <li>Prices are subject to change without prior notice</li>
          <li>Payment terms will be specified at the time of booking</li>
          <li>Cancellation policies apply as per package specifications</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">3. Travel Documentation</h2>
        <p className="text-gray-600 mb-4">
          Customers are responsible for ensuring they have valid travel documentation, including but not limited to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Valid passport</li>
          <li>Required visas</li>
          <li>Travel insurance</li>
          <li>Health certificates where applicable</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">4. Liability</h2>
        <p className="text-gray-600 mb-4">
          Maptheworld acts as an intermediary between customers and service providers. While we ensure quality service, we cannot be held liable for:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Acts of nature or force majeure</li>
          <li>Actions of third-party service providers</li>
          <li>Personal accidents or loss of belongings</li>
          <li>Changes in schedules due to unforeseen circumstances</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">5. Website Usage</h2>
        <p className="text-gray-600 mb-4">
          The content of this website is for general information and use only. It is subject to change without notice.
        </p>

        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">6. Contact</h2>
        <p className="text-gray-600 mb-4">
          For any queries regarding these terms and conditions, please contact us at info@maptheworld.com or call +91 79073 02538.
        </p>

        <p className="text-gray-600 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
} 