"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function CustomSlider() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [userId, setUserId] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form states
  const [roleTitle, setRoleTitle] = useState("");
  const [useCase, setUseCase] = useState("");
  const [message, setMessage] = useState("");
  const [AWSID, setAWSID] = useState("");
  const [messageB, setMessageB] = useState("");

  // Menu items
  const menu = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ];

  // Get product ID from URL
  useEffect(() => {
    const productid = searchParams.get("productid");
    if (productid) {
      setUserId(productid);
    }
  }, [searchParams]);

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token || token.trim() === "") {
        router.push('/auth/login');
        return;
      }
    };
    checkAuth();
  }, [router]);

  // Fetch product details and recommendations
  useEffect(() => {
    async function fetchProductDetails() {
      if (!userId) return;
      
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (res.status === 401 || res.status === 403) {
          router.push("/auth/login");
          return;
        }
        
        const data = await res.json();
        if (data.data) {
          setProductDetails(data.data);
          
          // Set recommendations if available
          if (Array.isArray(data.data.recommendations)) {
            setProducts(data.data.recommendations);
          }
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      }
    }

    fetchProductDetails();
  }, [userId, router]);

  // Fetch all products if no recommendations
  useEffect(() => {
    async function fetchAllProducts() {
      if (products.length > 0) return; // Skip if we already have recommendations
      
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}products/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.status === 401 || res.status === 403) {
          router.push("/auth/login");
          return;
        }
        
        const data = await res.json();
        if (res.ok && Array.isArray(data?.data?.products)) {
          setProducts(data.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    fetchAllProducts();
  }, [products.length, router]);

  // Helper function to clean HTML
  const clean = (html) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, " ").replace(/<[^>]*>/g, "");
  };

  // Parse key features from JSON string
  const parseKeyFeatures = (featuresString) => {
    if (!featuresString) return [];
    try {
      const parsed = JSON.parse(featuresString);
      return Array.isArray(parsed) ? parsed : [featuresString];
    } catch (e) {
      console.error("Failed to parse key features:", e);
      return [featuresString];
    }
  };

  // Button handlers
  const handleDemoClick = () => {
    setIsModalOpen(true);
  };

  const handlePrivatePriceClick = () => {
    setIsPriceModalOpen(true);
  };

  const handleBrochureClick = (url) => {
    window.open(url, "_blank");
  };

  const handleCaseStudyClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleDemoVideoClick = () => {
    if (productDetails?.product?.demo_video_link) {
      window.open(productDetails.product.demo_video_link, "_blank");
    }
  };

  const handleViewPricingClick = (e) => {
    e.preventDefault();
    setIsPriceModalOpen(true);
  };

  // Demo form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!roleTitle.trim()) newErrors.roleTitle = "Role Title is required";
    if (!useCase.trim()) newErrors.useCase = "Use Case is required";
    if (!message.trim()) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}lead/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action_id: productDetails?.product?.id,
          action_type: "product",
          status: "new",
          leadType: "demo",
          message: message,
          demoData: {
            role_title: roleTitle,
            use_case: useCase
          }
        }),
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setIsModalOpen(false);
        setRoleTitle("");
        setUseCase("");
        setMessage("");
        setErrors({});
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 5000);
      } else {
        alert("Failed to submit enquiry.");
      }
    } catch (err) {
      console.error("Error submitting enquiry:", err);
    }
  };

  // Price form submission
  const handleSubmitB = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!AWSID.trim()) {
      newErrors.AWSID = "AWS Account ID is required";
    } else if (!/^\d{12}$/.test(AWSID.trim())) {
      newErrors.AWSID = "Invalid AWS Account ID format";
    }
    if (!messageB.trim()) {
      newErrors.messageB = "Message cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}lead/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action_id: productDetails?.product?.id,
          action_type: "product",
          status: "new",
          leadType: "buy_now",
          message: messageB,
          purchaseData: {
            aws_account_id: AWSID,
            product_id: productDetails?.product?.id || 3,
            entitlement_status: "pending",
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setShowSuccessModal(true);
        setIsPriceModalOpen(false);
        setAWSID("");
        setMessageB("");
        setErrors({});
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 5000);
      } else {
        alert(data.message || "Failed to submit price enquiry.");
      }
    } catch (err) {
      console.error("Error submitting price enquiry:", err);
    }
  };

  return (
    <>
      <Header />
      
      {/* Product Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12">
            {/* Left: Logo and Title */}
            <div className="flex items-start gap-6 col-span-8">
              <div className="w-40 h-40 border-2 border-gray-200 rounded-3xl flex items-center justify-center bg-white p-6">
                {productDetails?.product?.product_logo && (
                  <Image
                    src={productDetails.product.product_logo}
                    alt={productDetails.product.name}
                    width={600}
                    height={400}
                    className="object-contain"
                  />
                )}
              </div>
              <div className="pt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {productDetails?.product?.name || "Loading..."}
                </h1>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  {productDetails?.product?.category_subcategory?.join(", ") || ""}
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col gap-3 items-end col-span-4">
              <button
                className="px-8 w-[200px] py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors"
                onClick={handleDemoClick}
              >
                Request Demo
              </button>
              <button
                className="px-8 w-[200px] py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full border-2 border-gray-900 transition-colors"
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
              {activeSection === "overview" && (
                <SectionCard>
                  <h3 className="text-gray-900 text-xl font-semibold">
                    Short Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {productDetails?.product?.short_description || "No description available."}
                  </p>
                  <h3 className="text-gray-900 text-xl font-semibold">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {productDetails?.product?.long_description || "No detailed description available."}
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    {/* Brochures */}
                    {productDetails?.product?.brochures?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {productDetails.product.brochures.map((url, index) => (
                          <button
                            key={index}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors"
                            onClick={() => handleBrochureClick(url)}
                          >
                            Brochure {index + 1} <Download size={18} />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Case Studies */}
                    {productDetails?.product?.customer_case_studies?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {productDetails.product.customer_case_studies.map((url, index) => (
                          <button
                            key={index}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full transition-colors"
                            onClick={() => handleCaseStudyClick(url)}
                          >
                            Case Study {index + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Demo Video */}
                    {productDetails?.product?.demo_video_link && (
                      <button
                        className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full border-2 border-gray-900 transition-colors"
                        onClick={handleDemoVideoClick}
                      >
                        Demo Video
                      </button>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* DETAILS */}
              {activeSection === "details" && (
                <SectionCard>
                  <h3 className="text-gray-900 text-xl capitalize font-semibold mb-4">
                    Key Features
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 text-lg font-normal mb-6">
                    {parseKeyFeatures(productDetails?.product?.key_features).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-gray-900 text-xl capitalize font-semibold mb-4">
                    Primary Use Cases
                  </h3>
                  <div
                    className="text-gray-600 text-lg font-normal mb-6"
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.product?.primary_use_cases?.replace(/&nbsp;/g, " ") || "",
                    }}
                  />

                  {/* Target Audience */}
                  {productDetails?.product?.target_audience?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2 text-black">Target Audience</h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {productDetails.product.target_audience.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Category */}
                  {productDetails?.product?.category_subcategory?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2 text-black">Category</h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {productDetails.product.category_subcategory.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cloud Provider Support */}
                  {productDetails?.product?.cloud_provider_support?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2 text-black">
                        Cloud Provider Support
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {productDetails.product.cloud_provider_support.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Regions Supported */}
                  {productDetails?.product?.regions_supported?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2 text-black">Regions Supported</h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {productDetails.product.regions_supported.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SectionCard>
              )}

              {/* FEATURES */}
              {activeSection === "features" && (
                <SectionCard>
                  <h3 className="text-gray-900 text-2xl font-bold mb-6">
                    Technical & Pricing Information
                  </h3>
                  
                  {productDetails?.product?.technical_prerequisites && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-black">Technical Prerequisites:</h4>
                      <p className="text-gray-700">
                         dangerouslySetInnerHTML={{
                      __html: productDetails?.product?.technical_prerequisites?.replace(/&nbsp;/g, " ") || "",
                    }}
                      </p>
                    </div>
                  )}

                  {productDetails?.product?.pricing_model && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-black">Pricing Model:</h4>
                      <p className="text-gray-700">
                        {clean(productDetails.product.pricing_model)}
                      </p>
                    </div>
                  )}

                  {productDetails?.product?.api_metering_endpoint && (
                    <div className="mt-6">
                      <a
                        href={productDetails.product.api_metering_endpoint}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View Terms & Conditions
                      </a>
                    </div>
                  )}
                </SectionCard>
              )}

              {/* PRICING */}
              {activeSection === "pricing" && (
                <SectionCard>
                  <h3 className="text-gray-900 text-2xl font-bold mb-6">
                    Pricing Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Flexible pricing plans based on your business needs. Please contact us for custom pricing or use the &quot;Get Private Price&quot; button for detailed pricing information.
                  </p>
                </SectionCard>
              )}
            </div>

            {/* Pricing Sidebar */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pricing
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Contact for detailed pricing information
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Starting From
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-2">
                    {/* ${productDetails?.product?.starting_price || "Contact"} */}
                  </p>
                  <p className="text-sm text-gray-500">
                    Custom pricing available based on requirements
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

      {/* Similar Products Slider */}
      <section className="relative px-4 py-10 max-w-[1920px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl text-black font-semibold">More Similar Products</h2>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
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
                <div className="bg-zinc-50 border border-zinc-200 h-[400px] cursor-pointer w-[90%] sm:w-[295px] mx-auto rounded-lg overflow-hidden">
                  <div className="w-full h-[258px] relative">
                    <Image
                      src={product.product_logo || "/image/acronis.png"}
                      alt={product.name || 'Product Image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="uppercase text-xs text-zinc-400 tracking-wider mb-2">
                      {product.category || "Product"}
                    </p>
                    <p className="text-black text-left text-lg font-normal leading-snug h-12 overflow-hidden line-clamp-2 mb-2">
                      {product.short_description || product.name}
                    </p>
                    <p className="text-blue-600 text-sm">
                      Starting From ${product.starting_price || "Contact"}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Request Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black text-zinc-600 w-full max-w-lg shadow-lg p-10 relative my-auto flex flex-col">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">Request Demo</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Role (e.g. CTO)"
                className={`w-full border bg-zinc-800 p-3 mb-4 placeholder:text-zinc-600 text-white rounded-lg ${
                  errors.roleTitle ? "border-red-500" : "border-zinc-700"
                }`}
                value={roleTitle}
                onChange={(e) => {
                  setRoleTitle(e.target.value);
                  if (errors.roleTitle) setErrors({...errors, roleTitle: ""});
                }}
              />
              {errors.roleTitle && (
                <p className="text-red-500 text-sm mb-2">{errors.roleTitle}</p>
              )}

              <input
                type="text"
                placeholder="Use Case (e.g. Evaluate new system)"
                className={`w-full border bg-zinc-800 p-3 mb-4 placeholder:text-zinc-600 text-white rounded-lg ${
                  errors.useCase ? "border-red-500" : "border-zinc-700"
                }`}
                value={useCase}
                onChange={(e) => {
                  setUseCase(e.target.value);
                  if (errors.useCase) setErrors({...errors, useCase: ""});
                }}
              />
              {errors.useCase && (
                <p className="text-red-500 text-sm mb-2">{errors.useCase}</p>
              )}

              <textarea
                rows={4}
                placeholder="Comments"
                className={`w-full border bg-zinc-800 p-3 mb-4 placeholder:text-zinc-600 text-white rounded-lg ${
                  errors.message ? "border-red-500" : "border-zinc-700"
                }`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({...errors, message: ""});
                }}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mb-2">{errors.message}</p>
              )}

              <button
                type="submit"
                className="bg-gradient-to-bl from-orange-400 to-orange-700 text-white px-4 py-3 w-full rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Price Enquiry Modal */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black text-zinc-600 w-full max-w-lg shadow-lg p-10 relative my-auto flex flex-col">
            <button
              onClick={() => setIsPriceModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">Price Enquiry</h2>
            <form onSubmit={handleSubmitB}>
              <input
                type="text"
                placeholder="AWS Account ID (12 digits)"
                className={`w-full border bg-zinc-800 p-3 mb-4 placeholder:text-zinc-600 text-white rounded-lg ${
                  errors.AWSID ? "border-red-500" : "border-zinc-700"
                }`}
                value={AWSID}
                onChange={(e) => {
                  setAWSID(e.target.value);
                  if (errors.AWSID) setErrors({...errors, AWSID: ""});
                }}
              />
              {errors.AWSID && (
                <p className="text-red-500 text-sm mb-2">{errors.AWSID}</p>
              )}

              <textarea
                rows={4}
                placeholder="Comments"
                className={`w-full border bg-zinc-800 p-3 mb-4 placeholder:text-zinc-600 text-white rounded-lg ${
                  errors.messageB ? "border-red-500" : "border-zinc-700"
                }`}
                value={messageB}
                onChange={(e) => {
                  setMessageB(e.target.value);
                  if (errors.messageB) setErrors({...errors, messageB: ""});
                }}
              />
              {errors.messageB && (
                <p className="text-red-500 text-sm mb-2">{errors.messageB}</p>
              )}

              <button
                type="submit"
                className="bg-gradient-to-bl from-orange-400 to-orange-700 text-white px-4 py-3 w-full rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white shadow-lg p-6 w-96 text-center rounded-lg">
            <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-600">
              Thank you for reaching out to us. Our team has received your request and will contact you shortly.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// SectionCard Component
function SectionCard({ children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      {children}
    </div>
  );
}