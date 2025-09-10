"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
// import { useState } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PaginationForPages from "../layouts/PaginationForPages";

const faqs = [
  {
    question: " What is NeoZaar?",
    answer: "NeoZaar is a cloud-aligned marketplace that helps businesses discover, evaluate, and deploy SaaS products, solution bundles, and managed services — all aligned to AWS MACC or Azure EDP credits.",
  },
  {
    question: "What are Solution Bundles?",
    answer: "Bundles are curated packages that combine SaaS tools, cloud services, and certified deployment support — tailored for specific outcomes like security, cost optimization, or AI enablement.",
  },
  {
    question: " Can I use my AWS MACC or Azure EDP credits on NeoZaar?",
    answer: "Yes. Most bundles on NeoZaar are private offer–aligned, which means they can be applied toward your existing AWS MACC or Azure EDP enterprise commitments.",
  },
  {
    question: " How do I request a private offer or custom quote?",
    answer: "Every bundle includes an option to Request a Custom Offer. You’ll be contacted by our team or partner to finalize the pricing and cloud alignment.",
  },
  {
    question: "Who delivers the services in the bundle?",
    answer: "All services are fulfilled by certified solution partners — including managed service providers (MSPs), security experts, cloud consultants, or NeoZaar’s delivery team.",
  },
  {
    question: "How is billing handled?",
    answer: "NeoZaar offers unified billing for software + services. You’ll receive one invoice, and we’ll handle all coordination behind the scenes.",
  },
  {
    question: "Is there a free trial or POC option available?",
    answer: "Some bundles include trial-ready versions or “Proof of Concept” (POC) options. Look for “Try & Deploy” tags on applicable bundles.",
  },
  {
    question: " What if I need post-deployment support?",
    answer: "We’ve got you covered. You can choose add-on managed services or opt for a fully managed bundle with 24x7 support.",
  },
  {
    question: "How do I get started?",
    answer: "Click “Explore Bundles” or “Request a Recommendation” — and we’ll guide you from selection to deployment.",
  },

];

export default function Home() {
  const [search, setSearch] = useState('');
  const [marketplace, setMarketplace] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const sliderRef = useRef(null);
  const router = useRouter();
  const [menu, setMenu] = useState(false)
  const [categories, setCategories] = useState(null)
  const [categoriesSelect, setCategoriesSelect] = useState('')
  const [paginations, setPagination] = useState({
    page: 1,
    limit: 20,
    pages: 0, // suppose 68 pages total
    total: 0,
  });





  const cards = [1, 2, 3];
  const images = [
    "/assests/streamline_bg.png",
    "/assests/unsure_ai_bg.png",
    "/assests/streamline_bg.png",
    "/assests/streamline_bg.png",
    "/assests/streamline_bg.png",
    "/assests/streamline_bg.png",
  ];


  useEffect(() => {
    const checkAuth = () => {
      console.log("🔐 Checking authentication from localStorage...");
      const token = localStorage.getItem("token");

      if (!token || token.trim() === "") {
        console.warn("🚫 No valid token in localStorage. Redirecting to login.");
        router.push('/auth/login');
        return;
      }

      console.log("✅ Token found in localStorage:", token);
    };

    checkAuth();
  }, []);

  async function fetchMarketplace(page = 1, categori) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {

      let query = `?page=${page}&limit=${paginations.limit}`;

      if (search) {
        query += `&search=${encodeURIComponent(search)}`;
      }

      if (categori) {
        query += `&category=${encodeURIComponent(categori)}`;
      }

      const res = await fetch(`http://20.83.163.38:5000/api/catalog/marketplace/products${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMarketplace(data.data);
        setPagination(data.pagination)

      } else {
        console.log('API error:', data.message);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }

  useEffect(() => {
    fetchMarketplace();
  }, [search, categoriesSelect]);



  useEffect(() => {
    let position = 0;
    let slider = sliderRef.current;
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
    const catalog = async () => {
      try {
        const res = await fetch(`http://20.83.163.38:5000/api/catalog/categories`)

        const data = await res.json()

        console.log(data.data)
        setCategories(data.data)

      } catch (error) {
        console.log(error)
      }


    }
    catalog()
    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header></Header>
      <div className="max-w-[1920px]  m-auto">
        <section id="hero-section">
          <div className="relative bg-black overflow-hidden w-full min-h-[400px] md:h-[553px]">
            <Image
              fill

              src="/brand-log/maketplacebanner.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div
              className="absolute text-white font-['CreatoDisplay-LightItalic',_sans-serif] italic font-light 
                     text-lg sm:text-2xl md:text-4xl lg:text-[50px] md:leading-[50px] 
                     top-12 sm:top-[118px] left-4 sm:left-[104px] max-w-[90%] sm:max-w-none"
            >
              Curated Cloud <br />
              Bundles to Accelerate
              <br />
              Transformation & Maximize ROI



            </div>

            <div
              className="absolute text-neutral-400 font-text-sm-regular-font-family font-text-sm-regular-font-weight 
                     text-xs sm:text-sm md:text-base lg:text-[16px] mt-4 
                     top-[180px] sm:top-[309px] left-4 sm:left-[100px] w-[90%] sm:w-[440px]"
            >
              Combine trusted cloud infrastructure from AWS, Azure, and Google Cloud with ready-to-deploy solutions from global ISVs like Zscaler, Acronis, Databricks, and Rubrik — all in one seamless experience.
            </div>
          </div>
        </section>

        <section id="search-section">
          {/* <div className="bg-white border-b border-zinc-200 flex flex-wrap items-center justify-start overflow-hidden"> */}
          <div className="bg-white border-b border-zinc-200 flex flex-wrap items-center justify-start overflow-visible">

            {/* Unsure AI Help Section */}
            <div className="relative bg-white shrink-0 w-[90px] sm:w-[258px] h-[81px] overflow-hidden flex items-center justify-center">
              <Image
                fill
                alt="AI Background"
                src="/assests/unsure_ai_bg.png"
                className="absolute w-full h-full object-cover"
              />
              <div className="relative flex items-center justify-center gap-2 cursor-pointer">
                <Image
                  alt="Sparkle"
                  src="/assests/sparkle_png.png"
                  className="w-6 h-6 sm:w-[30px] sm:h-[30px]"
                  width={20}
                  height={40}
                />
                <div className="text-white text-sm font-bold hidden sm:block">
                  Unsure? Let our AI help
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex items-center justify-start gap-2 flex-1 h-[81px] px-4 sm:px-9 relative">
              <div className="w-6 h-6 relative">
                <Image
                  fill
                  alt="Search Icon"
                  src="/assests/search_icon.png"
                  className="w-full h-full object-contain"
                />
              </div>
              <input
                type="search"
                placeholder="Search Product"
                className="hidden sm:block text-zinc-400 text-sm font-bold outline-none bg-transparent w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categories Section */}
            <div className="relative">
              {/* Main Button */}
              <div
                className="bg-white border-x border-zinc-200 flex items-center gap-2 justify-start px-4 sm:px-9 h-[81px] w-[81px] sm:w-[195px] shrink-0 cursor-pointer"
                onClick={() => setMenu((prev) => !prev)}
              >
                <div className="w-6 h-6 relative">
                  <Image
                    fill
                    alt="Menu Icon"
                    src="/assests/menu_icon.png"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-black text-sm font-bold hidden sm:block">
                  Categories
                </div>
              </div>

              {/* Dropdown Menu */}
              {menu && (
                <div className="absolute top-[85px]  -left-5 w-full bg-white text-black mx-5 shadow-lg border border-zinc-200 rounded-lg z-50 transition-all">
                  <ul className="flex flex-col">
                    {categories && categories.map((cat) => (
                      <li
                        key={cat.id}
                        className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-sm"
                        onClick={(e) => {
                          const selected = e.target.innerText
                          setMenu(false)
                          setCategoriesSelect(selected)
                          fetchMarketplace(paginations.page, selected)
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>



        {categoriesSelect.length === 0 && search.length === 0 && <section id="industry_specific_bundle_section">

          <div className="w-11/12 m-auto mt-20">
            <div className="max-w-[400px]">

              <div className="text-black text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-normal relative flex items-center justify-start ">
                Solve for compliance, scale, and digital transformation — tailored by industry.

              </div>

              <div className="text-neutral-500 text-left text-sm sm:text-base relative flex items-center justify-start ">
                These bundles address regulatory needs, vertical-specific architecture, and legacy modernization challenges.
              </div>
            </div>
          </div>


          <div className="w-11/12 m-auto " id="kitsider">
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
                      className="relative  z-10"
                    />
                  </div>

                  <div className=" flex items-center p-6">
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
                      className="relative  z-10"
                    />
                  </div>

                  <div className=" flex items-center p-6">
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
                      className="relative  z-10"
                    />
                  </div>


                  <div className=" flex items-center p-6">
                    <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                      Regulatory Compliance & Audit Readiness Toolkit
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                  <div className="bg-zinc-100 flex  items-center justify-center aspect-square w-[127px] h-[127px] relative">
                    <Image
                      src="/assests/hybridlearning.webp"
                      alt="Kit Icon"
                      width={35}
                      height={35}
                      className="relative  z-10"
                    />
                  </div>

                  <div className=" flex items-center p-6">
                    <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                      Hybrid Learning Stack
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white border border-zinc-200 h-[127px] w-[400px] relative overflow-hidden flex">
                  <div className="bg-zinc-100 flex items-center  aspect-square justify-center w-[127px] h-[127px] relative">
                    <Image
                      src="/assests/EmployeeLifecycleComplianceKitVisitorCheck.inZohoPeoplePOSHcompliance.webp"
                      alt="Kit Icon"
                      width={35}
                      height={35}
                      className="relative  z-10"
                    />
                  </div>

                  <div className=" flex items-center p-6">
                    <div className="text-black text-[20px] sm:text-[22px] md:text-[25px] font-normal">
                      Employee Lifecycle + Compliance Kit
                    </div>
                  </div>
                </div>
              </SwiperSlide>



            </Swiper>
          </div>
        </section>
        }

        {categoriesSelect.length === 0 && search.length === 0 && <section id="goal_oriented_bundle_section">
          <div className="w-11/12 m-auto mt-18">
            <div className="max-w-[400px]">

              <div className="text-black text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-['CreatoDisplay-Regular',_sans-serif] font-normal relative flex items-center justify-start ">
                Goal-Oriented Bundles
              </div>
              <p className="dark:text-black">Focused on outcomes — not industries.</p>
              <div className="text-neutral-500 text-left text-sm sm:text-base relative flex items-center justify-start ">
                These bundles solve cross-industry challenges like cost optimization, AI enablement, security hardening, and faster go-to-market.
              </div>
            </div>
          </div>

          <div className="w-11/12 m-auto">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}

              loop={true}
              grabCursor={true}
              allowTouchMove={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 1 },
                740: { slidesPerView: 2 },
                968: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation={false}
              pagination={false}
            >
              <SwiperSlide>

                <div className="relative bg-zinc-50 border border-zinc-200 p-2.5 h-[400px] overflow-hidden cursor-pointer w-[295px]]">

                  <Image
                    src="/assests/goal_oriented_bundle_bg.png"
                    alt="Startup Cloud Kit Background"
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute left-5 top-[220px] text-black font-sans text-lg font-normal">
                    Startup Cloud Kit
                  </div>

                  <div className="absolute left-5 top-[257px] right-5 text-neutral-500 text-sm">
                    Get your startup off the ground with essential cloud infrastructure,
                    developer tools, and initial support for rapid prototyping.
                  </div>

                  <div className="absolute left-5 top-[349px] text-blue-600 text-sm pt-3">
                    View Product
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>

                <div className="relative bg-zinc-50 border border-zinc-200 p-2.5 h-[400px] overflow-hidden cursor-pointer w-[295px]]">

                  <Image
                    src="/assests/goal_oriented_bundle_bg.png"
                    alt="Startup Cloud Kit Background"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-5 top-[220px] text-black font-sans text-lg font-normal">
                    Startup Cloud Kit
                  </div>

                  <div className="absolute left-5 top-[257px] right-5 text-neutral-500 text-sm">
                    Get your startup off the ground with essential cloud infrastructure,
                    developer tools, and initial support for rapid prototyping.
                  </div>

                  <div className="absolute left-5 top-[349px] text-blue-600 text-sm pt-3">
                    View Product
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>

                <div className="relative bg-zinc-50 border border-zinc-200 p-2.5 h-[400px] overflow-hidden cursor-pointer w-[295px]]">

                  <Image
                    src="/assests/goal_oriented_bundle_bg.png"
                    alt="Startup Cloud Kit Background"
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute left-5 top-[220px] text-black font-sans text-lg font-normal">
                    Startup Cloud Kit
                  </div>

                  <div className="absolute left-5 top-[257px] right-5 text-neutral-500 text-sm">
                    Get your startup off the ground with essential cloud infrastructure,
                    developer tools, and initial support for rapid prototyping.
                  </div>
                  <div className="absolute left-5 top-[349px] text-blue-600 text-sm pt-3">
                    View Product
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>

                <div className="relative bg-zinc-50 border border-zinc-200 p-2.5 h-[400px] overflow-hidden cursor-pointer w-[295px]]">

                  <Image
                    src="/assests/goal_oriented_bundle_bg.png"
                    alt="Startup Cloud Kit Background"
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute left-5 top-[220px] text-black font-sans text-lg font-normal">
                    Startup Cloud Kit
                  </div>

                  <div className="absolute left-5 top-[257px] right-5 text-neutral-500 text-sm">
                    Get your startup off the ground with essential cloud infrastructure,
                    developer tools, and initial support for rapid prototyping.
                  </div>

                  <div className="absolute left-5 top-[349px] text-blue-600 text-sm pt-3">
                    View Product
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>

                <div className="relative bg-zinc-50 border border-zinc-200 p-2.5 h-[400px] overflow-hidden cursor-pointer w-[295px]]">


                  <Image
                    src="/assests/goal_oriented_bundle_bg.png"
                    alt="Startup Cloud Kit Background"
                    fill
                    className="object-cover"
                    priority
                  />


                  <div className="absolute left-5 top-[220px] text-black font-sans text-lg font-normal">
                    Startup Cloud Kit
                  </div>

                  <div className="absolute left-5 top-[257px] right-5 text-neutral-500 text-sm">
                    Get your startup off the ground with essential cloud infrastructure,
                    developer tools, and initial support for rapid prototyping.
                  </div>

                  <div className="absolute left-5 top-[349px] text-blue-600 text-sm pt-3">
                    View Product
                  </div>
                </div>
              </SwiperSlide>

            </Swiper>


          </div>
        </section>}

        <section id="trending_bundle_section" className={`${search.length > 0 && categoriesSelect.length > 0 ? "my-30" : ""}`}>
          {
            categoriesSelect.length === 0 && search.length === 0 && <div className="w-11/12 m-auto mt-18">
              <div className="max-w-[400px] mt-20">

                <div className="text-black font-['CreatoDisplay-Regular',_sans-serif] text-left text-xl sm:text-2xl mb-5 md:text-[25px] font-normal relative flex items-center justify-start ">
                  Popular & Trending Bundles
                </div>

                <div className="text-neutral-500 text-left text-sm sm:text-base relative flex items-center justify-start ">
                  Ready-to-deploy stacks built with leading ISVs — fully private offer aligned to your AWS MACC or Azure EDP commitments.
                </div>
              </div>
            </div>
          }
          <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-auto  xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-5">
            {Array.isArray(marketplace) && marketplace.map((product, index) => (



              <div key={index} onClick={() => router.push(`/bundle?productid=${product.id}`)}>

                <div className="bg-zinc-50 border border-zinc-200 m-auto h-[400px] cursor-pointer w-[295px]">
                  <div className="w-full h-[250px] relative ">
                    <Image
                      fill
                      alt={product.title || 'Product Image'}
                      className="w-full h-[256px] object-cover rounded-t"
                      src='/image/acronis.png'
                      onError={() => setImgSrc('/image/acronis.png')}
                    />
                  </div>

                  <div className="p-2">
                    <p className="uppercase  text-xs text-zinc-400 tracking-wider">
                      {product.title}

                    </p>
                    <p className="text-black text-left font-['CreatoDisplay-Regular',_sans-serif] text-lg font-normal w-[90%] leading-snug h-12 overflow-hidden line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-blue-600 text-sm pt-3">
                      Starting From {product.starting_price}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* Pagination Component */}
          {/* <PaginationForPages
            currentPage={paginations.page}
            totalPages={paginations.pages}
            onPageChange={(page) => fetchMarketplace(page)}
          /> */}

        </section>

        {
          categoriesSelect.length === 0 && search.length === 0 && <section className="w-11/12 m-auto bg-cover  bg-center rounded-2xl overflow-hidden mt-10 h-[242px] bg-cover bg-[url('/assests/ask_ai_bg.png')]  bg-center rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 gap-3 rounded-2xl">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  {" Not Sure Which Bundle Fits Your Need?"}
                </h2>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                  Tell us your goals — our team will recommend a private offer–aligned bundle built by trusted ISVs and expert partners.
                  We’ll handle the mapping, bundling, and delivery. You just focus on outcomes.
                </p>
              </div>
              <div className="">

              </div>
              <div>
                <a
                  href="#"
                  className="inline-flex items-center  px-6 py-3 text-white text-sm md:text-base font-medium rounded-full
             bg-white/10 backdrop-blur-md  transition hover:bg-white/20"
                >
                  <div className="relative w-5 h-5 mr-2">
                    <Image
                      src="/assests/sparkle_png.png"
                      alt="icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Ask Our AI Assistant
                </a>

              </div>
            </div>
          </section>
        }

        {
          categoriesSelect.length === 0 && search.length === 0 && <section id="streamline_project_section " className="ml-auto w-11/12 mt-20">
            <div className="grid grid-cols-11 ">
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-[55px] items-start justify-start shrink-0 relative    ">
                <div className="text-left font-['-',_sans-serif] text-[25px] lg:text-[37px] font-normal relative  flex items-center justify-start ps-2 ">
                  <span className="text-zinc-500">
                    Your Project, Streamlined in <br />
                    <span className="font-semibold italic text-black">
                      3 Steps
                    </span>
                  </span>
                </div>
                <div className="text-black text-left font-text-lg-regular-font-family text-text-lg-regular-font-size font-text-lg-regular-font-weight relative self-stretch flex items-center justify-start">

                  From discovery to deployment, NeoZaar simplifies your cloud buying journey — with curated bundles and expert-led delivery.                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 ps-3 myshortcard">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1.5}
                  centeredSlides={false}
                  loop={false}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 1.5,
                    },
                  }}
                >
                  {cards.map((card, index) => (
                    <SwiperSlide key={index} className="">
                      <div className="mycardimg text-black px-10 py-16 bg-cover bg-center rounded-2xl h-[261px] w-[320px] md:w-[540px] xl:w[549px] m-auto bg-[url('/assests/your-bg.jpg')]">
                        <div className="flex">
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
        }

        {
          categoriesSelect.length === 0 && search.length === 0 && <section id="faq_section" className="px-4 sm:px-6 lg:px-20 my-28">
            <div className="flex flex-col items-center gap-4 ">
              <div className="text-gray-900 font-['CreatoDisplay-Medium',_sans-serif] text-2xl sm:text-3xl md:text-4xl font-medium leading-snug tracking-tight">
                Frequently asked questions
              </div>

              <div className="text-gray-500 font-text-xl-normal-font-family text-sm sm:text-base md:text-lg font-text-xl-normal-font-weight leading-relaxed max-w-xl">
                Not sure what fits best? Share your goals — our team and AI assistant will guide you to the ideal solution.
              </div>

              <div className="mt-8 w-full max-w-full sm:max-w-lg md:max-w-2xl">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b-2 border-gray-200">
                    <div
                      className="text-gray-900 font-semibold flex justify-between items-center py-6 text-sm sm:text-base md:text-lg cursor-pointer"
                      onClick={() => toggle(index)}
                    >
                      {faq.question}
                      <Image

                        src={
                          openIndex === index
                            ? "/assests/minus-icon.png"
                            : "/assests/plus-icon.png"
                        }
                        alt="Toggle Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 transition-transform duration-300"
                      />
                    </div>

                    {openIndex === index && (
                      <div className="text-gray-600 text-sm sm:text-base pb-6">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      </div>
      <Footer></Footer>
    </>
  );
}