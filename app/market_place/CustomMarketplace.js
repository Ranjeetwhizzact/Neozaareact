"use client";
import { trackEvent } from "../lib/track";
import { useEffect, useRef, useState, useCallback } from "react";
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
import api from "../lib/api";

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
  const [activeTab, setActiveTab] = useState(null);
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
    solutionsSlider: true,
    marketplace: false,
    initialData: true,
    authChecking: true
  });
  const [bundles, setBundles] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ==================== AUTHENTICATION LOGIC ====================
  const checkAuthentication = () => {
    if (typeof window === "undefined") return false;

    try {
      const token = localStorage.getItem("token");
      const userRaw = localStorage.getItem("user");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (!token || token.trim() === "") {
        console.log("No token found");
        return false;
      }

      if (tokenExpiry) {
        const now = Date.now();
        if (now > parseInt(tokenExpiry)) {
          console.log("Token expired");
          return false;
        }
      }

      let user = null;
      try {
        user = userRaw ? JSON.parse(userRaw) : null;
      } catch (e) {
        console.error("Error parsing user data:", e);
        return false;
      }

      const userRole = user?.role_type;
      if (userRole === "ISV") {
        console.log("ISV role not allowed");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Authentication check error:", error);
      return false;
    }
  };

  const handleUnauthorized = () => {
    localStorage.clear();
    router.replace("/auth/login");
  };

  // Main authentication effect
  useEffect(() => {
    const authenticateUser = async () => {
      if (typeof window === "undefined") {
        setLoading(prev => ({ ...prev, authChecking: false }));
        return;
      }

      // Check basic authentication
      const isAuth = checkAuthentication();
      if (!isAuth) {
        handleUnauthorized();
        setLoading(prev => ({ ...prev, authChecking: false }));
        return;
      }

      // Set authentication state
      setIsAuthenticated(true);
      setAuthChecked(true);
      setLoading(prev => ({ ...prev, authChecking: false }));
      
      // Fetch all initial data for carousels
      fetchInitialProducts();
      fetchBundles();
      fetchSolutions();
      fetchCategories();
    };

    authenticateUser();

    // Set up token expiry checker
    const checkTokenExpiry = () => {
      const expiry = localStorage.getItem('tokenExpiry');
      if (expiry && Date.now() > parseInt(expiry)) {
        handleUnauthorized();
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ==================== DATA FETCHING FUNCTIONS ====================
  const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  // Fetch initial products for carousel
  const fetchInitialProducts = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        handleUnauthorized();
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products?action_type=product&action_for=customer&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      if (res.ok && data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching initial products:', error);
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        handleUnauthorized();
      }
    } finally {
      setLoading(prev => ({ ...prev, products: false, initialData: false }));
    }
  };

  const fetchBundles = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        handleUnauthorized();
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products?action_type=solutions&action_for=customer&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      if (res.ok && data.data) {
        setBundles(data.data);
      }
    } catch (error) {
      console.error('Error fetching bundles:', error);
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        handleUnauthorized();
      }
    } finally {
      setLoading(prev => ({ ...prev, bundles: false, initialData: false }));
    }
  };

  const fetchSolutions = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        handleUnauthorized();
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products?action_type=service&action_for=customer&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      if (res.ok && data.data) {
        setSolutions(data.data);
      }
    } catch (error) {
      console.error('Error fetching solutions:', error);
      if (error.message.includes('401')) {
        handleUnauthorized();
      }
    } finally {
      setLoading(prev => ({ ...prev, solutionsSlider: false, initialData: false }));
    }
  };

  const fetchMarketplace = useCallback(async (page = 1, category = categoriesSelect, type = activeTab) => {
    if (typeof window === "undefined") return;
    if (!type) return;
    
    const token = getAuthToken();
    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      setLoading(prev => ({ ...prev, marketplace: true }));
      
      let query = `?action_type=${type}&action_for=customer&page=${page}&limit=20`;

      if (search.trim()) {
        query += `&search=${encodeURIComponent(search.trim())}`;
      }

      if (category && category.trim()) {
        query += `&category=${encodeURIComponent(category.trim())}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/marketplace/products${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setMarketplace(data.data || []);
        setPagination(prev => ({
          ...prev,
          page: data.pagination?.page || page,
          pages: data.pagination?.pages || 0,
          total: data.pagination?.total || 0
        }));
        
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        console.log('API error:', data.message);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        handleUnauthorized();
      }
    } finally {
      setLoading(prev => ({ 
        ...prev, 
        [type]: false,
        marketplace: false 
      }));
    }
  }, [search, categoriesSelect, activeTab]);

  const fetchCategories = async () => {
    try {
      if (typeof window === "undefined") return;

      const token = getAuthToken();
      if (!token) {
        handleUnauthorized();
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}catalog/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      if (data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
      if (error.message.includes('401')) {
        handleUnauthorized();
      }
    }
  };

  // ==================== EFFECTS ====================
  // Effect for when active tab changes - ONLY when authenticated
  useEffect(() => {
    if (isAuthenticated && activeTab && authChecked) {
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchMarketplace(1, categoriesSelect, activeTab);
    }
  }, [activeTab, isAuthenticated, fetchMarketplace, authChecked, categoriesSelect]);

  // Effect for search/category changes - ONLY when authenticated and tab is active
  useEffect(() => {
    if (!isAuthenticated || !activeTab || !authChecked) return;

    const debounceTimer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchMarketplace(1, categoriesSelect, activeTab);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, categoriesSelect, isAuthenticated, fetchMarketplace, activeTab, authChecked]);

  // Remove the problematic api.get call - it's causing 401 errors
  useEffect(() => {
    // Removed the problematic api.get("/marketplace") call that was causing 401 errors
    // This call was not using authentication headers
  }, []);

  // ==================== AUTO-SCROLLING SLIDER ====================
  useEffect(() => {
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

  // ==================== EVENT HANDLERS ====================
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryClick = (categoryName) => {
    setMenu(false);
    setCategoriesSelect(categoryName === categoriesSelect ? '' : categoryName);
  };

  const handleProductClick = (product) => {
    if (!isAuthenticated) {
      handleUnauthorized();
      return;
    }

    trackEvent({
      eventType: "PRODUCT_CLICK",
      entityType: "product",
      entityId: product.id,
      pageUrl: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    router.push(`/bundle?productid=${product.id}`);
  };

  const handleTabClick = (tab) => {
    if (!isAuthenticated) {
      handleUnauthorized();
      return;
    }
    setActiveTab(tab);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (!isAuthenticated) {
      handleUnauthorized();
      return;
    }
    fetchMarketplace(newPage, categoriesSelect, activeTab);
  };

  const handleResetFilters = () => {
    if (!isAuthenticated) {
      handleUnauthorized();
      return;
    }
    setSearch('');
    setCategoriesSelect('');
    setMenu(false);
    setPagination(prev => ({ ...prev, page: 1 }));
    // Also reset to initial view if we're on a tab
    if (activeTab) {
      setActiveTab(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!isAuthenticated) {
      handleUnauthorized();
      return;
    }
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // ==================== RENDER LOGIC ====================
  const showSpecialSections = activeTab === ACTION_TYPES.PRODUCT && 
                              !categoriesSelect && 
                              !search.trim();

  // Show loading state while checking authentication
  if (!authChecked || loading.authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="mb-6">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <Image
                src="/assests/loaderlogo-neozaar.gif" 
                alt="Loading..." 
                width={80}
                height={80}
                className="animate-pulse"
              />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome to NeoZaar Marketplace
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Please wait while we verify your authentication...
          </p>
          
          <div className="mt-6 w-64 mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse"></div>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Securely connecting you to the marketplace
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated (redirect should have happened already)
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

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
                  
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="mr-2 shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                      </svg>
                    </button>
                  )}
                  
                  <button 
                    onClick={handleSearchSubmit}
                    disabled={loading.marketplace}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {loading.marketplace ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
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
                    )}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoriesSelect('');
                      }}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </button>

                {/* Dropdown Menu */}
                {menu && (
                  <div className="absolute top-[85px] left-0 w-[200px] bg-white text-black shadow-lg border border-zinc-200 rounded-lg z-50 transition-all">
                    <ul className="flex flex-col">
                      {categories && categories.map((cat) => (
                        <li
                          key={cat.id}
                          className={`px-4 py-2 hover:bg-zinc-100 cursor-pointer text-sm flex items-center justify-between ${
                            categoriesSelect === cat.name ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                          onClick={() => handleCategoryClick(cat.name)}
                        >
                          <span>{cat.name}</span>
                          {categoriesSelect === cat.name && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* RESET FILTERS BUTTON */}
              {(search || categoriesSelect || activeTab) && (
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
            {(search || categoriesSelect) && (
              <div className="max-w-[1400px] mx-auto px-4 mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {search && `Searching for "${search}" `}
                  {categoriesSelect && `in "${categoriesSelect}" `}
                  {activeTab && `across ${ACTION_TYPE_LABELS[activeTab]}`}
                </p>
                
                {loading.marketplace && (
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                    Loading...
                  </div>
                )}
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
                {activeTab === key && search && marketplace.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {marketplace.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Products Carousel - Show when no tab is selected */}
        {!activeTab && !search && !categoriesSelect && (
          <section id="products_carousel_section" className="mt-20">
            <div className="w-11/12 m-auto flex flex-wrap lg:flex-nowrap justify-between">
              <div>
                <div className="max-w-[400px]">
                  <div className="text-black font-['CreatoDisplay-Regular',_sans-serif] text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-semibold">
                    Popular & Trending Products
                  </div>
                  <div className="text-neutral-500 text-left text-sm sm:text-base">
                    Enterprise-grade SaaS, ready to deploy.
                  </div>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => handleTabClick(ACTION_TYPES.PRODUCT)}
                  className="text-nowrap bg-orange-500 inline-block px-4 py-2 font-bold text-white shadow rounded-full hover:bg-orange-600 transition-colors"
                >
                  See more..
                </button>
              </div>
            </div>

            <div className="w-11/12 m-auto mt-5">
              {loading.initialData ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
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
                  {products.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="bg-zinc-50 border border-zinc-200 h-[410px] overflow-hidden cursor-pointer w-full max-w-[295px]"
                        onClick={() => handleProductClick(item)}
                      >
                        <div className="h-64 relative w-full">
                          <Image
                            src={item.image_url || "/brand-log/neozaardefault.jpg"}
                            alt={item.title || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10 p-4">
                          <div className="text-lg text-black font-semibold mb-2 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-3">
                            {item.description}
                          </div>
                          <p className="text-blue-600 text-sm font-semibold mt-2">
                            Starting From &#x20b9;{item.starting_price}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </section>
        )}

        {/* Services Carousel - Show when no tab is selected */}
        {!activeTab && !search && !categoriesSelect && (
          <section id="solutions_section" className="mt-20">
            <div className="w-11/12 m-auto flex flex-wrap lg:flex-nowrap justify-between">
              <div className="max-w-[400px]">
                <div>
                  <div className="text-black font-semibold text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-['CreatoDisplay-Regular',_sans-serif]">
                    Services
                  </div>
                  <p className="dark:text-black mb-2">
                    Certified experts to design, deploy, and manage.
                  </p>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => handleTabClick(ACTION_TYPES.SERVICE)}
                  className="text-nowrap bg-orange-500 inline-block px-4 py-2 font-bold text-white shadow rounded-full hover:bg-orange-600 transition-colors"
                >
                  See more..
                </button>
              </div>
            </div>

            <div className="w-11/12 m-auto">
              {loading.initialData ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
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
                        className="bg-zinc-50 border border-zinc-200 h-[410px] overflow-hidden cursor-pointer w-full max-w-[295px]"
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
                        <div className="relative z-10 p-4">
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

        {/* Solutions Carousel - Show when no tab is selected */}
        {!activeTab && !search && !categoriesSelect && (
          <section id="goal_oriented_bundle_section">
            <div className="w-11/12 m-auto mt-20 flex flex-wrap lg:flex-nowrap justify-between">
              <div className="flex w-full flex-wrap lg:flex-nowrap justify-between"> 
                <div className="max-w-[400px]">
                  <div>
                    <div className="text-black font-semibold text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-['CreatoDisplay-Regular',_sans-serif] ">
                      Solutions
                    </div>
                    <p className="dark:text-black mb-2">
                      Curated bundles built to achieve real outcomes
                    </p>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => handleTabClick(ACTION_TYPES.SOLUTION)}
                    className="text-nowrap bg-orange-500 inline-block px-4 py-2 font-bold text-white shadow rounded-full hover:bg-orange-600 transition-colors"
                  >
                    See more..
                  </button>
                </div>
              </div>
            </div>

            <div className="w-11/12 m-auto">
              {loading.initialData ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading solutions...</p>
                </div>
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
                        className="bg-zinc-50 border border-zinc-200 h-[410px] overflow-hidden cursor-pointer w-full max-w-[295px]"
                        onClick={() => handleProductClick(item)}
                      >
                        <div className="h-64 relative w-full">
                          <Image
                            src={item.image_url || "/brand-log/neozaardefault.jpg"}
                            alt={item.title || "Solution"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative z-10 p-4">
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

        {/* Marketplace Items Section - Show when a tab is selected */}
        {activeTab && (
          <section id="trending_bundle_section" className={`${search.length > 0 || categoriesSelect.length > 0 ? "my-30" : ""}`}>
            <div className="w-11/12 m-auto mt-20">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {search ? `Search Results for "${search}"` : `All ${ACTION_TYPE_LABELS[activeTab]}`}
                    {categoriesSelect && ` in "${categoriesSelect}"`}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Showing {marketplace.length} of {paginations.total} {ACTION_TYPE_LABELS[activeTab].toLowerCase()}
                  </p>
                </div>
                
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
            
            <div className="w-11/12 m-auto mt-5">
              {loading.marketplace ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading {ACTION_TYPE_LABELS[activeTab]}...</p>
                </div>
              ) : Array.isArray(marketplace) && marketplace.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {marketplace.map((product, index) => (
                      <div
                        key={index}
                        onClick={() => handleProductClick(product)}
                        className="h-full"
                      >
                        <div className="bg-zinc-50 border border-zinc-200 h-[420px] cursor-pointer w-full mx-auto hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                          <div className="w-full h-[250px] relative overflow-hidden">
                            <Image
                              fill
                              alt={product.title || `${ACTION_TYPE_LABELS[activeTab]} Image`}
                              className="w-full h-[256px] object-cover rounded-t hover:scale-110 transition-transform duration-700"
                              src={product.image_url || "/brand-log/neozaardefault.jpg"}
                            />
                          </div>
                          <div className="p-4">
                            <p className="uppercase text-lg text-black tracking-wider mb-2 line-clamp-2 font-semibold">
                              {product.title}
                            </p>
                            <p className="text-gray-500 leading-snug h-10 overflow-hidden line-clamp-2 mb-3 text-sm">
                              {product.description}
                            </p>
                            <p className="text-blue-600 text-sm font-semibold">
                              Starting From &#x20b9;{product.starting_price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {paginations.pages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-4">
                      <button
                        onClick={() => handlePageChange(paginations.page - 1)}
                        disabled={paginations.page <= 1}
                        className={`px-4 py-2 rounded-lg border ${
                          paginations.page <= 1
                            ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        } transition-colors`}
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, paginations.pages) }, (_, i) => {
                          let pageNum;
                          if (paginations.pages <= 5) {
                            pageNum = i + 1;
                          } else if (paginations.page <= 3) {
                            pageNum = i + 1;
                          } else if (paginations.page >= paginations.pages - 2) {
                            pageNum = paginations.pages - 4 + i;
                          } else {
                            pageNum = paginations.page - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-lg ${
                                paginations.page === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                              } transition-colors`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        {paginations.pages > 5 && paginations.page < paginations.pages - 2 && (
                          <>
                            <span className="text-gray-400">...</span>
                            <button
                              onClick={() => handlePageChange(paginations.pages)}
                              className={`w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors`}
                            >
                              {paginations.pages}
                            </button>
                          </>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(paginations.page + 1)}
                        disabled={paginations.page >= paginations.pages}
                        className={`px-4 py-2 rounded-lg border ${
                          paginations.page >= paginations.pages
                            ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-400'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        } transition-colors`}
                      >
                        Next
                      </button>
                      
                      <div className="ml-4 text-sm text-gray-500">
                        Page {paginations.page} of {paginations.pages}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
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
          </section>
        )}

        {/* AI Assistant Section - Show when no tab is selected */}
        {!activeTab && !search && !categoriesSelect && (
          <section className="w-11/12 m-auto bg-cover bg-center rounded-2xl overflow-hidden my-10 h-[242px] relative">
            <Image
              src="/assests/ask_ai_bg.png"
              alt="AI Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 gap-3">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  Not Sure Which Solutions Fits Your Need?
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
      </div>
      <Footer />
    </>
  );
}