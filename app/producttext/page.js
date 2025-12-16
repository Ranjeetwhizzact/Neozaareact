"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css/pagination";

export default function ProductPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const menu = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ];

  // Product data
  const productData = {
    name: "Acronis Cyber Protect",
    vendor: "Microsoft 365",
    category: "SECURITY",
    logo: "/assests/cyberprotect.png",
    pricing: {
      basic: {
        name: "Basic",
        price: 599,
        description: "Starting From"
      }
    }
  };

  // Button click handlers
  const handleDemoClick = () => {
    console.log("Request Demo clicked");
    setIsModalOpen(true);
  };

  const handlePrivatePriceClick = () => {
    console.log("Get Private Price clicked");
    setIsPriceModalOpen(true);
  };

  const handleBrochureClick = () => {
    console.log("Downloading brochure...");
    // Add actual download logic here
  };

  const handleCaseStudyClick = () => {
    console.log("Downloading case study...");
    // Add actual download logic here
  };

  const handleDemoVideoClick = () => {
    console.log("Playing demo video...");
    // Add video player logic here
  };

  const handleViewPricingClick = (e) => {
    e.preventDefault();
    console.log("Viewing more pricing information...");
    setIsPriceModalOpen(true);
  };

  return (
    <>
      {/* Header Section */}
  <Header></Header>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            {/* Left: Logo and Title */}
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="w-40 h-40 border-2 border-gray-200 rounded-3xl flex items-center justify-center bg-white p-6">
                <Image
                  src={productData.logo}
                  alt={productData.name}
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </div>

              {/* Title and Description */}
              <div className="pt-4">
                <h1 className="text-5xl font-bold text-gray-900 mb-2">
                  {productData.name}
                </h1>
                <p className="text-lg text-gray-700 mb-1">
                  by {productData.vendor}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  {productData.category}
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="px-8 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors"
                onClick={handleDemoClick}
              >
                Request Demo
              </button>
              <button
                className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full border-2 border-gray-900 transition-colors"
                onClick={handlePrivatePriceClick}
              >
                Get Private Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`block w-full text-left px-4 py-3 transition-colors ${
                    activeSection === item.id
                      ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex gap-6">
            {/* Main Section */}
            <div className="flex-1">
              {/* OVERVIEW */}
              <div className={activeSection === "overview" ? "block" : "hidden"}>
                <SectionCard title="Overview">
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Acronis Cyber Protect is a comprehensive cyber protection solution 
                    that integrates backup, anti-malware, cybersecurity, and endpoint 
                    management. This all-in-one solution provides complete protection 
                    for your business data and systems.
                  </p>

                  <div className="flex gap-4">
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors"
                      onClick={handleBrochureClick}
                    >
                      Brochure <Download size={18} />
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full transition-colors"
                      onClick={handleCaseStudyClick}
                    >
                      Case Study <Download size={18} />
                    </button>
                    <button
                      className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full border-2 border-gray-900 transition-colors"
                      onClick={handleDemoVideoClick}
                    >
                      Demo Video
                    </button>
                  </div>
                </SectionCard>
              </div>

              {/* DETAILS */}
              <div className={activeSection === "details" ? "block" : "hidden"}>
                <SectionCard title="Details">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Acronis Cyber Protect offers comprehensive protection with:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-8">
                    <li>Integrated backup and anti-ransomware protection</li>
                    <li>Automated patch management</li>
                    <li>AI-based anti-malware and antivirus</li>
                    <li>Remote desktop capabilities</li>
                    <li>Endpoint detection and response (EDR)</li>
                    <li>Data protection and compliance tools</li>
                  </ul>
                </SectionCard>
              </div>

              {/* FEATURES */}
              <div className={activeSection === "features" ? "block" : "hidden"}>
                <SectionCard title="Features">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Data Protection</h4>
                      <p className="text-gray-600 text-sm">Complete backup and recovery solutions</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Cyber Security</h4>
                      <p className="text-gray-600 text-sm">Advanced threat protection</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Endpoint Management</h4>
                      <p className="text-gray-600 text-sm">Unified endpoint protection</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Compliance</h4>
                      <p className="text-gray-600 text-sm">Regulatory compliance tools</p>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* PRICING */}
              <div className={activeSection === "pricing" ? "block" : "hidden"}>
                <SectionCard title="Pricing">
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Flexible pricing plans based on your business needs. Choose from 
                    Basic, Advanced, and Enterprise tiers with different features and 
                    support levels.
                  </p>
                </SectionCard>
              </div>
            </div>

            {/* Pricing Sidebar (Always Visible) */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pricing
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Pricing provided by {productData.vendor}
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {productData.pricing.basic.name}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-2">
                    ${productData.pricing.basic.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    {productData.pricing.basic.description}
                  </p>
                </div>

                <button
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  onClick={handleViewPricingClick}
                >
                  View More Pricing Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Request Demo</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Fill out the form below to request a personalized demo of Acronis Cyber Protect.
              </p>
              {/* Add form fields here */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Information Modal */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Pricing Information</h3>
              <button
                onClick={() => setIsPriceModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">Basic Plan</h4>
                    <span className="text-2xl font-bold text-gray-900">$599</span>
                  </div>
                  <p className="text-gray-600 text-sm">Starting price for small businesses</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">Advanced Plan</h4>
                    <span className="text-2xl font-bold text-gray-900">$899</span>
                  </div>
                  <p className="text-gray-600 text-sm">Recommended for medium businesses</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">Enterprise Plan</h4>
                    <span className="text-2xl font-bold text-gray-900">$1,299</span>
                  </div>
                  <p className="text-gray-600 text-sm">Complete solution for large enterprises</p>
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
                onClick={() => setIsPriceModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
       <section className="relative px-4 py-10 max-w-[1920px] mx-auto">
          <div className="flex justify-between items-center absolute md:top-[70px] mb-40 z-30 pointer-events-none">
            <h2 className="text-xl font-semibold pointer-events-auto">More Similar Products</h2>
          </div>
          <Swiper
            className="relative z-20"
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            // loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // default hai (horizontal slide)
            // direction="horizontal"  // (optional) explicitly add
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Link href={`/bundle?productid=${product.id}`} passHref>
                <div className="bg-zinc-50 border border-zinc-200 h-[400px] cursor-pointer w-[90%] sm:w-[295px] mx-auto">
                  <div className="w-full h-[258px] relative">
                    <Image
                      fill
                      alt={product.title || 'Product Image'}
                      className="w-full h-[256px] object-cover rounded-t"
                      src="/image/acronis.png"
                    />
                  </div>
                  <div className="p-2">
                    <p className="uppercase text-xs text-zinc-400 tracking-wider">
                      {product.name}
                    </p>
                    <p className="text-black text-left text-lg font-normal w-[90%] leading-snug h-12 overflow-hidden line-clamp-2">
                      {product.short_description}
                    </p>
                    <p className="text-blue-600 text-sm pt-3">
                      Starting From {product.starting_price}
                    </p>
                  </div>
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
         {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
            <div className="bg-black text-zinc-600 w-full max-w-lg shadow-lg p-10 relative my-auto flex flex-col "> 
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-white ">Request Demo</h2>
              <form
              onSubmit={handleSubmit}>
                {/* Role Title */}
        <input
          type="text"
          placeholder="Your Role (e.g. CTO)"
          className={`w-full border bg-zinc-800 p-2 mb-4 placeholder:text-zinc-600 text-white ${
            errors.roleTitle ? "border-red-500" : "border-none"
          }`}
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
        />
                {errors.roleTitle && (
  <p className="text-red-500 text-sm mb-1">{errors.roleTitle}</p>
)}

        {/* Use Case */}
        <input
          type="text"
          placeholder="Use Case (e.g. Evaluate new system)"
          className={`w-full border bg-zinc-800 p-2 mb-4 placeholder:text-zinc-600 text-white ${
            errors.useCase ? "border-red-500" : "border-none"
          }`}
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        />
        {errors.useCase && (
  <p className="text-red-500 text-sm mb-1">{errors.useCase}</p>
)}
        {/* Message */}
        <textarea
          rows={6}
          placeholder="Comments"
          className={`w-full border bg-zinc-800 p-2 mb-4 placeholder:text-zinc-600 text-white ${
            errors.message ? "border-red-500" : "border-none"
          }`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message && (
  <p className="text-red-500 text-sm mb-1">{errors.message}</p>
)}
        <button
          type="submit"
          className="bg-gradient-to-bl from-orange-400 to-orange-700 text-white px-4 py-2 w-full"
        >
          Submit
        </button>
              </form>
            </div>
          </div>
        )}
         {isPriceModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-black text-zinc-600 w-full max-w-lg shadow-lg p-10 relative my-auto flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setIsPriceModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-white ">Enquiry Form</h2>
              <form onSubmit={handleSubmitB}>

        <input
          type="text"
          placeholder="enter AWS id"
          className={`w-full border bg-zinc-800 p-2 mb-4 placeholder:text-zinc-600 text-white ${
            errors.AWSID ? "border-red-500" : "border-none"
          }`}
          value={AWSID}
          onChange={(e) => setAWSID(e.target.value)}
        />
        {errors.AWSID && (
  <p className="text-red-500 text-sm mb-1">{errors.AWSID}</p>
)}

        {/* Message */}
        <textarea
          rows={6}
          placeholder="Comments"
          className={`w-full border bg-zinc-800 p-2 mb-4 placeholder:text-zinc-600 text-white ${
            errors.messageB ? "border-red-500" : "border-none"
          }`}
          value={messageB}
          onChange={(e) => setMessageB(e.target.value)}
        />
        {errors.messageB && (
  <p className="text-red-500 text-sm mb-1">{errors.messageB}</p>
)}

        <button
          type="submit"
          className="bg-gradient-to-bl from-orange-400 to-orange-700 text-white px-4 py-2 w-full"
        >
          Submit
        </button>
              </form>
            </div>
          </div>
        )}
        {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold text-green-600">Success!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for reaching out to us.  
               Our team has received your request and will contact you shortly.
            </p>
          </div>
        </div>
      )}
   <Footer></Footer>
   </>
  );
}

/* ------------------ Reusable Section Card ------------------ */

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  );
}