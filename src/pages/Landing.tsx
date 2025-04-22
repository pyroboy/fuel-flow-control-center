// src/pages/Landing.tsx

import React from "react";
import { Link } from "react-router-dom"; // Use react-router-dom Link
import {
  Truck,
  BarChart3,
  Clock,
  Shield,
  Users,
  Droplet,
  Phone as PhoneIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
} from "lucide-react"; // Add Droplet and other icons
import { Button } from "@/components/ui/button"; // Import Button from shadcn/ui

// --- Placeholder Navbar ---
const Navbar: React.FC = () => (
  <nav className="bg-gray-900 text-white border-b border-gray-700 fixed w-full z-20 top-0 left-0">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo/logo.svg" alt="FuelFlow Logo" className="h-8 w-auto" />
        <span className="text-xl font-bold text-white">FuelFlow</span>
      </Link>
      {/* Navigation links - hidden on mobile */}
      <div className="hidden md:flex space-x-6">
        <a
          href="#home"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href="#our-fuels"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Our Fuels
        </a>
        <a
          href="#services"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Services
        </a>
        <a
          href="#news-promos"
          className="text-gray-300 hover:text-white transition-colors"
        >
          News & Promos
        </a>
        <a
          href="#about-us"
          className="text-gray-300 hover:text-white transition-colors"
        >
          About Us
        </a>
        <a
          href="#contact-us"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Contact Us
        </a>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

// --- Placeholder Footer ---
const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img
            src="/logo/logo.svg"
            alt="FuelFlow Logo"
            className="h-8 w-auto"
          />
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} FuelFlow Control Center. All rights
          reserved.
          <div className="mt-1">
            <Link to="#" className="hover:text-indigo-400 mx-2">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="#" className="hover:text-indigo-400 mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Feature Card Component ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center md:text-left">
    <div className="mb-4 inline-block md:block">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// --- Step Card Component ---
interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isFirst?: boolean;
  isLast?: boolean;
}
const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  isLast = false,
}) => (
  <div className="relative lg:flex-1">
    {" "}
    {/* Use flex-1 on larger screens */}
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-900 text-white font-bold mb-4">
        {number}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    {/* Connector line for larger screens */}
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-full transform -translate-y-1/2 w-6 h-0.5 bg-indigo-300 ml-1 mr-1"></div> // Adjusted position and size
    )}
    {/* Connector line for medium screens (stacked vertically) */}
    {!isLast && (
      <div className="hidden md:block lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-0.5 h-6 bg-indigo-300"></div>
    )}
    {/* Connector line for small screens (stacked vertically) */}
    {!isLast && (
      <div className="block md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-0.5 h-6 bg-indigo-300"></div>
    )}
  </div>
);

// --- Testimonial Card Component ---
interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
}) => (
  <div className="bg-gray-100 rounded-lg p-6 shadow-md">
    <div className="text-4xl text-indigo-900 mb-4">"</div>
    <p className="text-gray-700 mb-6 italic">{quote}</p>
    <div className="text-right">
      <p className="font-bold">{name}</p>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  </div>
);

// --- Main Landing Page Component ---
const Landing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar />

      <main className="flex-grow pt-16">
        {" "}
        {/* Adjusted padding for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-indigo-900 text-white py-16 md:py-24" id="home">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* --- LEFT SIDE: Text and Buttons --- */}
              <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  FuelFlow: Fuel Delivery Management System
                </h1>
                <p className="text-lg md:text-xl mb-8 text-indigo-100">
                  The complete management system for fuel distributors, gas
                  stations, and fleet operators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/auth" // Updated path
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md text-center transition-colors shadow hover:shadow-md"
                  >
                    Log In
                  </Link>
                  <Link
                    to="#" // Placeholder
                    className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-md text-center transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* --- RIGHT SIDE: Image (UPDATED) --- */}
              <div className="md:w-1/2 flex justify-center">
                {/* Use the standard img tag. Ensure the image is in the /public folder */}
                <img
                  src="/logo/logo.gif" // <<< Make sure this path is correct!
                  alt="FuelFlow Hero Section"
                  width={500} // Adjust width/height as needed
                  height={400}
                  className="rounded-lg shadow-xl max-w-full h-auto" // Responsive classes
                />
              </div>
              {/* --- END OF UPDATED IMAGE SECTION --- */}
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Comprehensive Fuel Management Solution
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                FuelFlow provides a complete system for managing fuel delivery
                operations from order to delivery, with real-time tracking and
                reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Truck className="h-10 w-10 text-indigo-600" />}
                title="Delivery Management"
                description="Optimize routes, track deliveries in real-time, and manage your entire fleet from a single dashboard."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-indigo-600" />}
                title="Inventory Control"
                description="Monitor fuel levels across all locations, set automatic reorder points, and eliminate stockouts."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-indigo-600" />}
                title="Order Processing"
                description="Streamline order management with automated workflows, approvals, and customer notifications."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-indigo-600" />}
                title="Compliance & Safety"
                description="Ensure regulatory compliance with built-in safety checklists and automated documentation."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-indigo-600" />}
                title="Customer Management"
                description="Manage customer accounts, preferences, and payment terms in one centralized system."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-indigo-600" />}
                title="Reporting & Analytics"
                description="Gain insights with comprehensive reports on sales, deliveries, inventory, and more."
              />
            </div>
          </div>
        </section>
        {/* Our Fuels Section */}
        {/* Our Fuels Section */}
        <section className="py-16 bg-gray-100" id="our-fuels">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Our Fuels
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                We provide high-quality fuels to meet all your energy needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fuel Card 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
                {/* UPDATED img tag below */}
                <img
                  src="/fuels/premium.png" // Ensure this path is correct and image is in /public
                  alt="Premium Fuel"
                  // Removed explicit width and height props
                  // Removed fixed h-48 class
                  className="w-full object-cover" // Kept w-full and object-cover
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Premium Fuel
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    High-octane premium fuel for superior engine performance and
                    efficiency.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckIcon /> Higher octane rating (91-94)
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Enhanced engine protection
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Improved fuel efficiency
                    </li>
                  </ul>
                </div>
              </div>
              {/* Fuel Card 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
                {/* UPDATED img tag below */}
                <img
                  src="/fuels/regular.png" // Ensure this path is correct
                  alt="Regular Fuel"
                  // Removed explicit width and height props
                  // Removed fixed h-48 class
                  className="w-full object-cover" // Kept w-full and object-cover
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Regular Fuel
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Standard fuel for everyday vehicles with reliable
                    performance.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckIcon /> Standard octane rating (87-89)
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Cost-effective option
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Suitable for most vehicles
                    </li>
                  </ul>
                </div>
              </div>
              {/* Fuel Card 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
                {/* UPDATED img tag below */}
                <img
                  src="/fuels/diesel.png" // Ensure this path is correct
                  alt="Diesel Fuel"
                  // Removed explicit width and height props
                  // Removed fixed h-48 class
                  className="w-full object-cover" // Kept w-full and object-cover
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Diesel Fuel
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    High-quality diesel for commercial vehicles and heavy
                    machinery.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckIcon /> Higher energy density
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Better fuel economy
                    </li>
                    <li className="flex items-center">
                      <CheckIcon /> Lower emissions options available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-16 bg-white" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Our Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Comprehensive fuel delivery and management services for
                businesses of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex gap-6 items-start">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700 mt-1">
                  <Truck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Scheduled Deliveries
                  </h3>
                  <p className="text-gray-600">
                    Regular fuel deliveries on a schedule that works for your
                    business. Never worry about running low on fuel again.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700 mt-1">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Emergency Refueling
                  </h3>
                  <p className="text-gray-600">
                    24/7 emergency fuel delivery service when you need it most.
                    Quick response times and reliable service.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700 mt-1">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Inventory Monitoring
                  </h3>
                  <p className="text-gray-600">
                    Advanced monitoring systems to track your fuel levels in
                    real-time and predict when you'll need a refill.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700 mt-1">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">
                    Compliance Management
                  </h3>
                  <p className="text-gray-600">
                    Stay compliant with all regulatory requirements with our
                    comprehensive compliance management services.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="#" // Placeholder
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md inline-block transition-colors shadow hover:shadow-md"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section className="py-16 bg-indigo-50" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                How FuelFlow Works
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Our platform connects all stakeholders in the fuel delivery
                process for seamless operations.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0">
              <StepCard
                number="1"
                title="Order Placement"
                description="Gas stations place orders through the platform or via automated reorder points."
                isFirst={true}
              />
              <StepCard
                number="2"
                title="Order Processing"
                description="Office staff review and approve orders, scheduling them for delivery."
              />
              <StepCard
                number="3"
                title="Dispatch"
                description="Depot staff prepare deliveries and assign them to drivers based on optimal routes."
              />
              <StepCard
                number="4"
                title="Delivery"
                description="Drivers complete deliveries with real-time updates and digital proof of delivery."
              />
              <StepCard
                number="5"
                title="Completion"
                description="Inventory is updated automatically and invoices are generated for seamless billing."
                isLast={true}
              />
            </div>
          </div>
        </section>
        {/* About Us Section */}
        <section className="py-16 bg-white" id="about-us">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                  About FuelFlow
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  FuelFlow is a leading provider of fuel delivery management
                  solutions, dedicated to optimizing the fuel supply chain for
                  distributors, gas stations, and fleet operators.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2018, we've grown to serve hundreds of businesses
                  across the country, helping them streamline operations, reduce
                  costs, and improve customer satisfaction.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our mission is to transform the fuel delivery industry through
                  innovative technology and exceptional service.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-2 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-900">
                      500+
                    </div>
                    <div className="text-gray-600 text-sm">Clients</div>
                  </div>
                  <div className="text-center p-2 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-900">
                      35M+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Gallons Delivered
                    </div>
                  </div>
                  <div className="text-center p-2 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-900">
                      98%
                    </div>
                    <div className="text-gray-600 text-sm">
                      Client Retention
                    </div>
                  </div>
                  <div className="text-center p-2 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-900">
                      24/7
                    </div>
                    <div className="text-gray-600 text-sm">Support</div>
                  </div>
                </div>
                <Link
                  to="#" // Placeholder
                  className="text-indigo-600 font-semibold hover:text-indigo-800 inline-flex items-center group"
                >
                  Learn more about our story
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="relative flex justify-center">
                {/* Decorative background element */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-100 rounded-lg transform rotate-12 opacity-50 z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full opacity-50 z-0"></div>
                {/* Use img tag - ensure /logo/logo.svg is in /public */}
                <img
                  src="/logo/logo.svg"
                  alt="About FuelFlow - Logo"
                  width={400}
                  height={400}
                  className="relative z-10 rounded-lg shadow-xl max-w-sm w-full"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                See what our customers say about how FuelFlow has transformed
                their operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="FuelFlow has reduced our delivery scheduling time by 75% and virtually eliminated delivery errors."
                name="Sarah Johnson"
                title="Operations Manager, PetroMax"
              />
              <TestimonialCard
                quote="The real-time tracking and inventory management has been a game-changer for our network of 35 stations."
                name="Michael Chen"
                title="CEO, FuelExpress"
              />
              <TestimonialCard
                quote="We've seen a 30% reduction in administrative costs since implementing FuelFlow across our operations."
                name="David Rodriguez"
                title="Director, GasNow Distribution"
              />
            </div>
          </div>
        </section>
        {/* News & Promos Section */}
        <section className="py-16 bg-white" id="news-promos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                News & Promotions
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Stay updated with the latest news and special offers from
                FuelFlow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* News/Promo Card 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg border border-gray-200">
                <img
                  src="/news/soon.png"
                  alt="FuelFlow Mobile App Launch"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-indigo-600 mb-2">
                    March 15, 2023
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    FuelFlow Mobile App Launch
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We're excited to announce the launch of our new mobile app,
                    making fuel management easier than ever.
                  </p>
                  <Link
                    to="#"
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>

              {/* News/Promo Card 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg border border-gray-200">
                <img
                  src="/news/promotion.png"
                  alt="Summer Discount Program"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-indigo-600 mb-2">
                    June 1, 2023
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    Summer Discount Program
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Take advantage of our summer discount program with special
                    rates for high-volume customers.
                  </p>
                  <Link
                    to="#"
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>

              {/* News/Promo Card 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg border border-gray-200">
                <img
                  src="/news/insights.png"
                  alt="Industry Conference"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-indigo-600 mb-2">
                    September 10, 2023
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    Join Us at FuelTech 2023
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Meet our team at the upcoming FuelTech 2023 conference and
                    see our latest innovations.
                  </p>
                  <Link
                    to="#"
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="#"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md inline-block transition-colors shadow hover:shadow-md"
              >
                View All News & Promotions
              </Link>
            </div>
          </div>
        </section>
        {/* Contact Us Section */}
        <section className="py-16 bg-gray-100" id="contact-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Contact Us
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Have questions or ready to get started? Reach out to our team
                today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gray-50 rounded-lg shadow-md p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-indigo-900">
                  Get in Touch
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); /* Add form submission logic */
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow hover:shadow-md"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info & Hours */}
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-indigo-900">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <InfoItem
                      icon={<PhoneIcon className="h-5 w-5" />}
                      title="Phone"
                      lines={["+1 (555) 123-4567", "Mon-Fri, 8am-6pm EST"]}
                    />
                    <InfoItem
                      icon={<MailIcon className="h-5 w-5" />}
                      title="Email"
                      lines={["support@fuelflow.com", "sales@fuelflow.com"]}
                    />
                    <InfoItem
                      icon={<MapPinIcon className="h-5 w-5" />}
                      title="Address"
                      lines={["123 Fuel Street", "Houston, TX 77001"]}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-indigo-900">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Monday - Friday:
                      </span>
                      <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Saturday:
                      </span>
                      <span className="text-gray-600">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Sunday:</span>
                      <span className="text-gray-600">Closed</span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <p className="text-gray-600 font-medium">
                        24/7 Emergency Delivery Service Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Optimize Your Fuel Delivery Operations?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-indigo-100">
              Join hundreds of fuel distributors and gas stations already using
              FuelFlow to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth" // Updated path
                className="bg-white hover:bg-gray-100 text-indigo-700 font-bold py-3 px-8 rounded-md text-center transition-colors shadow hover:shadow-md"
              >
                Get Started Today
              </Link>
              <Link
                to="#" // Placeholder
                className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-8 rounded-md text-center transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

// Helper component for check icons in fuel lists
const CheckIcon = () => (
  <svg
    className="h-4 w-4 text-green-500 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Helper component for Contact Info items
interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}
const InfoItem: React.FC<InfoItemProps> = ({ icon, title, lines }) => (
  <div className="flex items-start">
    <div className="bg-indigo-100 p-3 rounded-lg mr-4 text-indigo-700">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      {lines.map((line, index) => (
        <p key={index} className="text-gray-600 text-sm">
          {line}
        </p>
      ))}
    </div>
  </div>
);

export default Landing;
