"use client";
import { trackEvent } from "../lib/track";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Link from "next/link";
// import { BrowserRouter } from "react-router-dom";

const ACTION_TYPES = {
  PRODUCT: 'product',
  SERVICE: 'service',
  SOLUTION: 'solutions'
};

const ACTION_TYPE_LABELS = {
  [ACTION_TYPES.PRODUCT]: 'Products',
  [ACTION_TYPES.SERVICE]: 'Services',
  [ACTION_TYPES.SOLUTION]: 'Solutions'
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(ACTION_TYPES.PRODUCT);
  const [marketplace, setMarketplace] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const sliderRef = useRef(null);
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesSelect, setCategoriesSelect] = useState('');
  const [paginations, setPagination] = useState({
    page: 1,
    limit: 20,
    pages: 0,
    total: 0,
  });
  const [loading, setLoading] = useState({
    products: true,
    services: true,
    solutions: true,
    bundles: true,
    solutionsSlider: true
  });
  const [bundles, setBundles] = useState([]);
  const [solutions, setSolutions] = useState([]);

  // Fetch bundles function (for Services section)
  const fetchBundles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products?action_type=solutions&action_for=customer&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.data) {
        setBundles(data.data);
      }
    } catch (error) {
      console.error('Error fetching bundles:', error);
    } finally {
      setLoading(prev => ({ ...prev, bundles: false }));
    }
  };

  // Fetch solutions for the Solutions slider
  const fetchSolutions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products?action_type=service&action_for=customer&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.data) {
        setSolutions(data.data);
      }
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(prev => ({ ...prev, solutionsSlider: false }));
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") return;
      
      const token = localStorage.getItem("token");

      if (!token || token.trim() === "") {
        router.push('/auth/login');
        return;
      }
    };

    checkAuth();
  }, [router]);

  // Fetch marketplace function - updated for all three types
  const fetchMarketplace = async (page = 1, category = categoriesSelect, type = activeTab) => {
    if (typeof window === "undefined") return;
    
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      let query = `?action_type=${type}&action_for=customer&page=${page}&limit=${paginations.limit}`;

      if (search) {
        query += `&search=${encodeURIComponent(search)}`;
      }

      if (category) {
        query += `&category=${encodeURIComponent(category)}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMarketplace(data.data || []);
        setPagination(data.pagination || paginations);
        
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        console.log('API error:', data.message);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();
      if (data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      fetchMarketplace(1, '', activeTab);
      fetchBundles();
      fetchSolutions();
      fetchCategories();
    }
  }, []);

  // Fetch data when search, category, or active tab changes
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      fetchMarketplace(1, categoriesSelect, activeTab);
    }
  }, [search, categoriesSelect, activeTab]);

  useEffect(() => {
    // Auto-scrolling slider effect
    let position = 0;
    const slider = sliderRef.current;
    let requestId;

    const scroll = () => {
      if (!slider) return;
      position -= 0.5;
      if (Math.abs(position) >= slider.scrollWidth / 2) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      requestId = requestAnimationFrame(scroll);
    };

    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryClick = (categoryName) => {
    setMenu(false);
    setCategoriesSelect(categoryName);
  };

  const handleProductClick = (product) => {
    trackEvent({
      eventType: "PRODUCT_CLICK",
      entityType: "product",
      entityId: product.id,
      pageUrl: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    router.push(`/bundle?productid=${product.id}`);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (newPage) => {
    fetchMarketplace(newPage, categoriesSelect, activeTab);
  };

  // Check if we should show the special sections
  // UPDATED: Show special sections only when on Products tab AND no search AND no category filter
  const showSpecialSections = activeTab === ACTION_TYPES.PRODUCT && 
                              categoriesSelect.length === 0 && 
                              search.length === 0;

  // RESET ALL FILTERS FUNCTION
  const handleResetFilters = () => {
    setSearch('');
    setCategoriesSelect('');
    setMenu(false);
    // Reset to first page when clearing filters
    fetchMarketplace(1, '', activeTab);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    fetchMarketplace(1, categoriesSelect, activeTab);
  };

  return (
    <>
      <Header />
      <div className="max-w-[1920px] m-auto">
        {/* Hero Section */}
        <section id="hero-section">
          <div className="relative bg-black overflow-hidden w-full min-h-[400px] md:h-[553px]">
            <Image
              src="/brand-log/maketplacebanner.jpg"
              alt="Background"
              fill
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute text-white font-['CreatoDisplay-LightItalic',_sans-serif] italic font-light text-lg sm:text-2xl md:text-4xl lg:text-[50px] md:leading-[50px] top-12 sm:top-[118px] left-4 sm:left-[104px] max-w-[90%] sm:max-w-none">
              Curated Cloud <br />
              Bundles to Accelerate
              <br />
              Transformation & Maximize ROI
            </div>
            <div className="absolute text-neutral-400 font-text-sm-regular-font-family font-text-sm-regular-font-weight text-xs sm:text-sm md:text-base lg:text-[16px] mt-4 top-[180px] sm:top-[309px] left-4 sm:left-[100px] w-[90%] sm:w-[440px]">
              Combine trusted cloud infrastructure from AWS, Azure, and Google Cloud with ready-to-deploy solutions from global ISVs like Zscaler, Acronis, Databricks, and Rubrik — all in one seamless experience.
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search-section">
          <div className="w-full bg-white">
            <div className="flex items-center gap-2 px-4 py-3 max-w-[1400px] mx-auto">
              {/* AI Assistant Button */}
              <div className="relative bg-white shrink-0 w-[100px] h-[68px] rounded-[20px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/assests/unsureaibg.png"
                  alt="AI Background"
                  fill
                  className="absolute w-full h-full object-cover"
                />
                <div className="relative flex items-center justify-center gap-2 cursor-pointer">
                  <Image
                    src="/assests/sparkle_png.png"
                    alt="Sparkle"
                    width={30}
                    height={30}
                    className="w-6 h-6 sm:w-[30px] sm:h-[30px]"
                  />
                </div>
              </div>

              {/* Search Input Container */}
              <div className="flex-1 relative">
                <div className="relative flex items-center h-[68px] px-6 bg-white border-2 border-gray-200 rounded-[20px] hover:border-gray-300 focus-within:border-blue-500 transition-colors">
                  <input
                    type="search"
                    placeholder="Search across Products, Services & Solutions"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                    className="flex-1 text-gray-600 text-base placeholder:text-gray-400 outline-none bg-transparent"
                  />
                  
                  <button 
                    onClick={handleSearchSubmit}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories Button */}
              <div className="relative">
                <button
                  onClick={() => setMenu(!menu)}
                  className="flex items-center gap-3 h-[68px] text-black px-8 bg-white border-2 border-gray-200 rounded-[20px] hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="flex flex-col gap-[5px]">
                    <span className="w-5 h-[2px] bg-gray-800 rounded-full transition-all group-hover:w-6"></span>
                    <span className="w-5 h-[2px] bg-gray-800 rounded-full"></span>
                    <span className="w-5 h-[2px] bg-gray-800 rounded-full transition-all group-hover:w-6"></span>
                  </div>

                  <span className={`text-base font-semibold whitespace-nowrap transition-colors text-black`}>
                    {categoriesSelect || "Categories"}
                  </span>
                  
                  {categoriesSelect && (
                    <svg 
                      className="w-4 h-4 text-black" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {menu && (
                  <div className="absolute top-[85px] -left-5 w-[200px] bg-white text-black shadow-lg border border-zinc-200 rounded-lg z-50 transition-all">
                    <ul className="flex flex-col">
                      {categories && categories.map((cat) => (
                        <li
                          key={cat.id}
                          className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-sm"
                          onClick={() => handleCategoryClick(cat.name)}
                        >
                          {cat.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* RESET FILTERS BUTTON - NEW */}
              {(search || categoriesSelect) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 h-[68px] px-6 bg-white border-2 border-gray-200 rounded-[20px] hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-600 font-medium whitespace-nowrap"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-gray-500"
                  >
                    <path d="M3 6h18M7 12h10M10 18h4" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="14" cy="18" r="2" />
                  </svg>
                  Reset Filters
                </button>
              )}
            </div>

            {/* Search info text */}
            {search && (
              <div className="max-w-[1400px] mx-auto px-4 mt-2">
                <p className="text-sm text-gray-500">
                  Searching for <span className="font-medium text-gray-700">{search}</span> across all {Object.values(ACTION_TYPE_LABELS).join(', ')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Tabs Section */}
        <section id="tabs-section" className="w-11/12 mx-auto mt-8">
          <div className="flex border-b border-gray-200">
            {Object.entries(ACTION_TYPE_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`px-8 py-3 font-medium text-sm sm:text-base ${
                  activeTab === key
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
                {/* Show count if there's a search */}
                {search && marketplace.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {marketplace.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Industry Specific Bundle Section - Only show when on Products tab AND no search/filter */}
        {showSpecialSections && (
          <section id="industry_specific_bundle_section">
            <div className="w-11/12 m-auto mt-20">
              <div className="max-w-[400px]">
                <div className="text-black text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-normal">
                  Solve for compliance, scale, and digital transformation — tailored by industry.
                </div>
                <div className="text-neutral-500 text-left text-sm sm:text-base">
                  These bundles address regulatory needs, vertical-specific architecture, and legacy modernization challenges.
                </div>
              </div>
            </div>

            <div className="w-11/12 m-auto" id="kitsider">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                loop={true}
                speed={4000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                grabCursor={true}
                slidesPerView={1.2}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2 },
                  1280: { slidesPerView: 2.5 },
                  1500: { slidesPerView: 3 },
                  1600: { slidesPerView: 4 },
                }}
              >
                <SwiperSlide>
                  <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                    <div className="bg-zinc-100 flex items-center aspect-square justify-center w-[127px] h-[127px] relative">
                      <Image
                        src="/assests/HealthcareDataPatientManagementKit.webp"
                        alt="Kit Icon"
                        width={35}
                        height={35}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                        Healthcare Data & Patient Management Kit
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                    <div className="bg-zinc-100 flex items-center justify-center aspect-square w-[127px] h-[127px] relative">
                      <Image
                        src="/assests/SmartFactoryModernizationAccelerator.webp"
                        alt="Kit Icon"
                        width={35}
                        height={35}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                        Smart Factory & Modernization Accelerator
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                    <div className="bg-zinc-100 flex items-center aspect-square justify-center w-[127px] h-[127px] relative">
                      <Image
                        src="/assests/RegulatoryComplianceAuditReadinessToolkit.webp"
                        alt="Kit Icon"
                        width={35}
                        height={35}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                        Regulatory Compliance & Audit Readiness Toolkit
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                    <div className="bg-zinc-100 flex items-center justify-center aspect-square w-[127px] h-[127px] relative">
                      <Image
                        src="/assests/hybridlearning.webp"
                        alt="Kit Icon"
                        width={35}
                        height={35}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                        Hybrid Learning Stack
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                    <div className="bg-zinc-100 flex items-center aspect-square justify-center w-[127px] h-[127px] relative">
                      <Image
                        src="/assests/EmployeeLifecycleComplianceKitVisitorCheck.inZohoPeoplePOSHcompliance.webp"
                        alt="Kit Icon"
                        width={35}
                        height={35}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                        Employee Lifecycle + Compliance Kit
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        )}

        {/* Goal Oriented Bundle Section (Solutions) - Only show when on Products tab AND no search/filter */}
        {showSpecialSections && (
          <section id="goal_oriented_bundle_section">
            <div className="w-11/12 m-auto mt-20 flex flex-wrap lg:flex-nowrap justify-between">
              <div className="flex w-full flex-wrap lg:flex-nowrap justify-between"> 
                <div className="max-w-[400px]">
                  <div>
                    <div className="text-black text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-['CreatoDisplay-Regular',_sans-serif] font-normal">
                      Solution
                    </div>
                    <p className="dark:text-black mb-2">
                      Curated bundles built to achieve real outcomes
                    </p>
                  </div>
                </div>
                <div>
                  <Link href="/solution-list" className="text-nowrap bg-orange-500 inline-block px-4 py-2  font-bold text-white shadow rounded-full">See more..</Link>
                </div>
              </div>
            </div>

            <div className="w-11/12 m-auto">
              {loading.bundles ? (
                <div className="text-center py-10">Loading solutions...</div>
              ) : (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  loop={true}
                  grabCursor={true}
                  speed={5000}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    740: { slidesPerView: 2 },
                    968: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {bundles.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="bg-zinc-50 border border-zinc-200 h-[400px] overflow-hidden cursor-pointer w-full max-w-[295px]"
                        onClick={() => handleProductClick(item)}
                      >
                        <div className="h-64 relative w-full">
                          <Image
                            src={item.image_url || "/brand-log/neozaardefault.jpg"}
                            alt={item.title || "Service"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10 p-4 text-white flex flex-col justify-end">
                          <div className="text-lg text-black font-semibold mb-2 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-3">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </section>
        )}

        {/* Services Section - Only show when on Products tab AND no search/filter */}
        {showSpecialSections && (
          <section id="solutions_section" className="mt-20">
            <div className="w-11/12 m-auto flex flex-wrap lg:flex-nowrap justify-between">
              <div className="max-w-[400px]">
                <div>
                  <div className="text-black text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-['CreatoDisplay-Regular',_sans-serif] font-normal">
                    Service
                  </div>
                  <p className="dark:text-black mb-2">
                    Certified experts to design, deploy, and manage.
                  </p>
                </div>
              </div>
              <div>
                <Link href="/service-list" className="text-nowrap bg-orange-500 inline-block px-4 py-2  font-bold text-white shadow rounded-full">See more..</Link>
              </div>
            </div>

            <div className="w-11/12 m-auto">
              {loading.solutionsSlider ? (
                <div className="text-center py-10">Loading services...</div>
              ) : (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  loop={true}
                  grabCursor={true}
                  speed={5000}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    740: { slidesPerView: 2 },
                    968: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {solutions.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="bg-zinc-50 border border-zinc-200 h-[400px] overflow-hidden cursor-pointer w-full max-w-[295px]"
                        onClick={() => handleProductClick(item)}
                      >
                        <div className="h-64 relative w-full">
                          <Image
                            src={item.image_url || "/brand-log/neozaardefault.jpg"}
                            alt={item.title || "Service"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10 p-4 text-white flex flex-col justify-end">
                          <div className="text-lg text-black font-semibold mb-2 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-3">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </section>
        )}

        {/* Main Results Section - Shows Products/Services/Solutions based on active tab */}
        <section id="trending_bundle_section" className={`${search.length > 0 || categoriesSelect.length > 0 ? "my-30" : ""}`}>
          {/* Show different headers based on whether we're showing special sections or filtered results */}
          {showSpecialSections ? (
            <div className="w-11/12 m-auto mt-20 flex flex-wrap lg:flex-nowrap justify-between">
              <div>
                <div className="max-w-[400px]">
                  <div className="text-black font-['CreatoDisplay-Regular',_sans-serif] text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-normal">
                    Popular & Trending {ACTION_TYPE_LABELS[activeTab]}
                  </div>
                  <div className="text-neutral-500 text-left text-sm sm:text-base">
                    Enterprise-grade SaaS, ready to deploy.
                  </div>
                </div>
              </div>
              <div>
                <Link href="/product-list" className="text-nowrap bg-orange-500 inline-block px-4 py-2  font-bold text-white shadow rounded-full">See more..</Link>
              </div>
            </div>
          ) : (
            // Show search results header when filtering or on non-Products tabs
            <div className="w-11/12 m-auto mt-20">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {search ? `Search Results for "${search}"` : `All ${ACTION_TYPE_LABELS[activeTab]}`}
                    {categoriesSelect && ` in "${categoriesSelect}"`}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Showing {marketplace.length} {ACTION_TYPE_LABELS[activeTab].toLowerCase()}
                  </p>
                </div>
                
                {/* Reset button in results section too */}
                {(search || categoriesSelect) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M7 12h10M10 18h4" />
                      <circle cx="18" cy="6" r="2" />
                      <circle cx="6" cy="12" r="2" />
                      <circle cx="14" cy="18" r="2" />
                    </svg>
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-auto xl:grid-cols-4 gap-5 mt-5">
            {Array.isArray(marketplace) && marketplace.length > 0 ? (
              marketplace.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="bg-zinc-50 border border-zinc-200 m-auto h-[420px] cursor-pointer w-full max-w-[295px]">
                    <div className="w-full h-[250px] relative">
                      <Image
                        fill
                        alt={product.title || `${ACTION_TYPE_LABELS[activeTab]} Image`}
                        className="w-full h-[256px] object-cover rounded-t"
                        src={product.image_url || "/brand-log/neozaardefault.jpg"}
                      />
                    </div>
                    <div className="p-4">
                      <p className="uppercase text-lg text-black tracking-wider mb-2 line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-gray-500 leading-snug h-12 overflow-hidden line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <p className="text-blue-600 text-sm font-semibold">
                        Starting From &#x20b9;{product.starting_price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No {ACTION_TYPE_LABELS[activeTab]} Found</h3>
                <p className="text-gray-500 mb-6">
                  {search 
                    ? `We couldn't find any ${ACTION_TYPE_LABELS[activeTab].toLowerCase()} matching "${search}"`
                    : `No ${ACTION_TYPE_LABELS[activeTab].toLowerCase()} available${categoriesSelect ? ` in "${categoriesSelect}"` : ''}`
                  }
                </p>
                {(search || categoriesSelect) && (
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination Component */}
          {marketplace.length > 0 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => handlePageChange(paginations.page - 1)}
                disabled={paginations.page <= 1}
                className="px-4 py-2 mx-2 border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {paginations.page} of {paginations.pages}
              </span>
              <button
                onClick={() => handlePageChange(paginations.page + 1)}
                disabled={paginations.page >= paginations.pages}
                className="px-4 py-2 mx-2 border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* AI Assistant Section - Only show when on Products tab AND no search/filter */}
        {showSpecialSections && (
          <section className="w-11/12 m-auto bg-cover bg-center rounded-2xl overflow-hidden mt-10 h-[242px] relative">
            <Image
              src="/assests/ask_ai_bg.png"
              alt="AI Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 gap-3">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  Not Sure Which Bundle Fits Your Need?
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  Tell us your goals — our team will recommend a private offer–aligned bundle built by trusted ISVs and expert partners.
                  We{"'"}ll handle the mapping, bundling, and delivery. You just focus on outcomes.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 text-white text-sm md:text-base font-medium rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/20"
              >
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    src="/assests/sparkle_png.png"
                    alt="icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                Ask Our AI Assistant
              </a>
            </div>
          </section>
        )}

        {/* Streamline Project Section - Only show when on Products tab AND no search/filter */}
        {showSpecialSections && (
          <section id="streamline_project_section" className="w-11/12 m-auto mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="text-left text-[25px] lg:text-[37px] font-normal">
                  <span className="text-zinc-500">
                    Your Project, Streamlined in <br />
                    <span className="font-semibold italic text-black">
                      3 Steps
                    </span>
                  </span>
                </div>
                <div className="text-black text-lg">
                  From discovery to deployment, NeoZaar simplifies your cloud buying journey — with curated bundles and expert-led delivery.
                </div>
              </div>
              <div className="lg:col-span-8">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1.5}
                  centeredSlides={false}
                  loop={false}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    1024: { slidesPerView: 1.5 },
                  }}
                >
                  {[1, 2, 3].map((card, index) => (
                    <SwiperSlide key={index}>
                      <div className="text-black px-10 py-16 bg-cover bg-center rounded-2xl h-[261px] w-full bg-[url('/assests/your-bg.jpg')]">
                        <div className="flex items-start">
                          <div className="mt-2">
                            <Image src="/assests/Vector.png" alt="icon" width={24} height={24} />
                          </div>
                          <h3 className="capitalize text-[25px] font-medium ml-3 mb-3">
                            Find Your Bundle
                          </h3>
                        </div>
                        <p className="line-clamp-4">
                          Browse outcome-driven bundles across Security, AI, FinOps, and more — all private offer–aligned to your AWS MACC or Azure EDP.
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section - Only show when on Products tab AND no search/filter */}
  
      </div>
      <Footer />
    </>
  );
}