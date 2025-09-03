"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from "./layouts/Footer";
import Header from './layouts/Header';
export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const NAV_LINKS = [
    { href: '/cyber-protect-cloud', label: 'ISV CoSell360' },
    { href: '/isv-registration', label: 'ISV Registration' },
    { href: '/partner-with-us', label: 'Partner With Us' },
    { href: '/', label: "FAQ's" },
    { href: '/', label: 'Contact' },
  ];

  return (
    <>
      <main className="bg-black min-h-screen w-full mx-auto max-w-[1920px]">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-start pt-8 px-2 sm:px-6 pb-15 min-h-screen lg:min-h-screen 2xl:min-h-auto">
          {/* Background Video */}
          <div className='w-full h-full absolute z-1 bg-black'></div>
          <video
            className="absolute inset-0 w-full h-full object-cover z-0 "
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: 0.7, pointerEvents: 'none' }}
          >
            <source src="/video/bg_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="text-white px-4 sm:px-6 lg:px-10 py-3 z-5 m-auto my-0 w-full h-full">
            <Header />
          </div>
          {/* Hero Content */}
          <div className="relative mx-auto md:my-35 lg:my-25 my-10 w-full max-w-full sm:max-w-[800px] flex flex-col items-center justify-center rounded-lg text-center px-2">
            <h1 className="text-white font-light font-['CreatoDisplay',_sans-serif] text-3xl sm:text-5xl md:text-6xl mb-4 leading-snug">
              Affordable Cloud Solutions & AI-Powered Guidance For Every Need
            </h1>
            <p className="text-gray-200 mb-6 px-2 sm:px-6 text-sm sm:text-base font-['Inter',_sans-serif]">
              Access cutting-edge cloud storage, bundles, and expert support from <br className="hidden sm:inline" />top ISV and service partners at unbeatable prices compared to AWS,<br className="hidden sm:inline" /> Azure, and GCP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <button className="min-w-[220px] cursor-pointer font-['Inter',_sans-serif] sm:w-auto px-6 bg-white/20 text-white font-600 rounded-4xl hover:bg-white hover:text-black transition h-12 rounded-full">
                <span className='text-6 font-600'>Explore Now</span> <span className="pl-12 inline text-8 font-extrabold">↗</span>
              </button>
              <button className="min-w-[290px] cursor-pointer font-['Inter',_sans-serif] py-3 border border-white text-white font-600 rounded-4xl hover:bg-white/40 hover:text-white transition rounded-full">
                <img src="/assests/sparkle_png.png" alt="sparkle icon" className="hover:text-black w-6 h-6 inline-block mr-4" />Let AI Find Your Solution
              </button>
            </div>
          </div>
        </section>

        {/* Brand Logos Carousel */}
        <section className="w-full px-2 sm:px-8 h-60 ">
          <Swiper
            className="w-full !p-0 [&>.swiper-wrapper]:!m-0 !mt-4 "
            modules={[Autoplay]}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              320: { slidesPerView: 2.5 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.5 },
              1400: { slidesPerView: 3 },
              1600: { slidesPerView: 4 },
            }}
          >
            {[
              '/image/abbive.png',
              '/image/Abbott.png',
              '/image/ADP.png',
              '/image/AMETEK.png',
              '/image/Capital.png',
            ].map((src, idx) => (
              <SwiperSlide key={idx} className="flex items-center justify-center">
                <div className='flex items-center justify-center'>
                  <Image
                    src={src}
                    alt="Brands"
                    width={300}
                    height={50}
                    className="md:h-20 w-auto h-6"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Features Section */}
        <section className="w-full pt-6 pb-12 sm:py-16 px-2 sm:px-10 lg:px-25 flex flex-col items-center">
          <h2 className="text-white font-['CreatoDisplay-Light',_sans-serif] text-3xl md:text-4xl xl:text-5xl font-normal mt-6 mb-10 text-center leading-tight">
            The Smart Alternative to <br /> the Hyperscalers
          </h2>
          <div className="xl:h-[427px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1240px] mx-auto px-2 sm:px-6 lg:px-8 xl:px-0" >
            {[
              {
                src: '/image/dollar.png',
                title: 'Cost-Effective Solutions',
                text: 'Save up to 80% compared to leading hyperscalers.',
              },
              {
                src: '/image/cube.png',
                title: 'Diverse Products & Bundles',
                text: 'Choose from a wide range of cloud storage and ISV bundles.',
              },
              {
                src: '/image/headset.png',
                title: 'Expert Support',
                text: 'Access integrated, knowledgeable support from ISV and cloud service providers.',
              },
              {
                src: '/image/arrow_star.png',
                title: 'AI-Powered Recommendations',
                text: 'Our AI will help you find the best products, bundles, & services.',
              },
            ].map((item, idx) => (

              <div
                key={idx}
                className="w-[295px] h-[427px] relative bg-black/80 border border-gray-700 rounded-[5px] p-6 mx-auto "
                style={{
                  backgroundImage: "url('/assests/bacground.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                
                }}
              >
                <div className="flex items-center justify-center my-15 h-52 ">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: 'auto',
                      borderRadius: '20px',
                    
                    }}
                  />
                </div>
                <div className="flex flex-col items-start text-left mb-3">
                  <h3 className="font-bold font-['CreatoDisplay-Light',_sans-serif] text-xl sm:text-2xl mb-2 text-white max-w-[200px] h-15 overflow-hidden line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[#FFFFFF80] font-['Inrai',_sans-serif] text-sm sm:text-base lg:max-w-[250px] xl:max-w-[300px] line-clamp-3">
                    {item.text}
                  </p>
                </div>
              </div>

            ))}
          </div>
        </section>

        {/* Find Exactly What You Need Section */}
        <section className="max-w-[1240px] mx-auto   flex flex-col items-center">
          <h2 className="text-white text-3xl sm:text-3xl md:text-5xl font-['CreatoDisplay-Light',_sans-serif] font-normal sm:mb-10 mb-7 text-center sm:text-left w-full leading-snug">
            Find Exactly What <br /> You Need
          </h2>

          {/* Laptop View */}
          <div className="hidden lg:grid grid-cols-3 w-full h-[532px] border-image-horizontal">
            {[
              {
                img: "/image/find_exactly_1.png",
                title: "Individual Products",
                desc: "Choose from a wide catalog of 1–3rd-party cloud products. Find the best solution for storage, compute, networking, and more. Includes leading Independent Software Vendors (ISVs).",
                btn: "Explore Products",
              },
              {
                img: "/image/find_exactly_1.png",
                title: "Curated Bundles",
                desc: "Get more value with pre-configured packages. Our bundles combine storage, compute, and ISV solutions for maximum flexibility, scalability, and savings in key pipelines.",
                btn: "Discover Bundles",
              },
              {
                img: "/image/find_exactly_2.png",
                title: "Expert Services",
                desc: "Access integrated, knowledgeable support from certified professionals. Take advantage of consulting, migration, optimization, and ongoing support.",
                btn: "Find a Partner",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-black/80 p-6 px-10 flex flex-col items-start text-left h-full ${idx !== 0 ? 'border-l-[1px] border-gray-700 border-image-vertical' : ''
                  }`}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={320}
                  height={160}
                  className="mb-4 w-full rounded-[20px] "
                  style={{ height: "232px", objectFit: "cover" }}
                />
                <h3 className="text-white font-['CreatoDisplay-Light',_sans-serif] text-[22px] md:text-[25px] h-15 overflow-hidden line-clamp-2 font-normal mb-2 pl-2 mt-2">
                  {card.title}
                </h3>
                <p className="text-[#71717A] text-sm mb-6 pl-2 font-['Inter',_sans-serif] overflow-hidden line-clamp-4">
                  {card.desc}
                </p>
                <div className="mt-auto pl-2 w-full">
                  <button className="px-5 py-2 cursor-pointer bg-zinc-700 text-white rounded-[27px] hover:bg-white hover:text-black transition w-auto">
                    {card.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet View */}
          <div className="hidden md:grid lg:hidden grid-cols-2 w-full border-image-horizontal">
            {[
              {
                img: "/image/find_exactly_1.png",
                title: "Individual Products",
                desc: "Choose from a wide catalog of 1–3rd-party cloud products. Find the best solution for storage, compute, networking, and more. Includes leading Independent Software Vendors (ISVs).",
                btn: "Explore Products",
              },
              {
                img: "/image/find_exactly_1.png",
                title: "Curated Bundles",
                desc: "Get more value with pre-configured packages. Our bundles combine storage, compute, and ISV solutions for maximum flexibility, scalability, and savings in key pipelines.",
                btn: "Discover Bundles",
              },
              {
                img: "/image/find_exactly_2.png",
                title: "Expert Services",
                desc: "Access integrated, knowledgeable support from certified professionals. Take advantage of consulting, migration, optimization, and ongoing support.",
                btn: "Find a Partner",
              },
            ].map((card, idx) => (
              <div key={idx} className="relative h-full">
                {(idx === 0 || idx === 1) && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] border-image-horizontal pointer-events-none" />
                )}
                {idx === 1 && (
                  <div className="absolute top-0 bottom-0 left-0 w-[1px] border-image-vertical pointer-events-none" />
                )}
                <div className="bg-black/80 p-6 md:px-10 flex flex-col items-start text-left h-full">
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={320}
                    height={160}
                    className="mb-4 w-full rounded-[20px] "
                    style={{ height: "232px", objectFit: "cover" }}
                  />
                  <h3 className="text-white font-['CreatoDisplay-Light',_sans-serif] text-[22px] md:text-[25px] h-15 overflow-hidden line-clamp-2 font-normal mb-2 pl-2 mt-2">
                    {card.title}
                  </h3>
                  <p className=" text-sm mb-6 pl-2 font-['Inter',_sans-serif] overflow-hidden line-clamp-4">
                    {card.desc}
                  </p>
                  <div className="mt-auto pl-2 w-full">
                    <button className="px-5 py-2 cursor-pointer bg-zinc-700 text-white rounded-[27px] hover:bg-white hover:text-black transition w-auto">
                      {card.btn}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
        <div className="grid md:hidden grid-cols-1 w-full border-image-horizontal">
  {[
    {
      img: "/image/find_exactly_1.png",
      title: "Individual Products",
      desc: "Choose from a wide catalog of 1–3rd-party cloud products. Find the best solution for storage, compute, networking, and more. Includes leading Independent Software Vendors (ISVs).",
      btn: "Explore Products",
    },
    {
      img: "/image/find_exactly_1.png",
      title: "Curated Bundles",
      desc: "Get more value with pre-configured packages. Our bundles combine storage, compute, and ISV solutions for maximum flexibility, scalability, and savings in key pipelines.",
      btn: "Discover Bundles",
    },
    {
      img: "/image/find_exactly_2.png",
      title: "Expert Services",
      desc: "Access integrated, knowledgeable support from certified professionals. Take advantage of consulting, migration, optimization, and ongoing support.",
      btn: "Find a Partner",
    },
  ].map((card, idx) => (
    <div
      key={idx}
      className="bg-black/80 p-6 flex flex-col items-start text-left h-full"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/assests/bacground.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        // ✅ should be decimal (40% opacity), not 40
      }}
    >
      <Image
        src={card.img}
        alt={card.title}
        width={320}
        height={160}
        className="mb-4 w-full rounded-[20px]"
        style={{ height: "232px", objectFit: "cover" }}
      />
      <h3 className="text-white font-['CreatoDisplay-Light',_sans-serif] text-[22px] md:text-[25px] h-15 overflow-hidden line-clamp-2 font-normal mb-2 pl-2 mt-2">
        {card.title}
      </h3>
      <p className="text-[#71717A] text-sm mb-6 pl-2 font-['Inter',_sans-serif] overflow-hidden line-clamp-4">
        {card.desc}
      </p>
      <div className="mt-auto pl-2 w-full">
        <button className="px-5 py-2 cursor-pointer bg-zinc-700 text-white rounded-[27px] hover:bg-white hover:text-black transition w-auto">
          {card.btn}
        </button>
      </div>
    </div>
  ))}
</div>


          {/* Discover & Connect + Build & Manage */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full bg-black/80"
            style={{
              borderBottom: '1px solid',
              borderImageSource:
                'linear-gradient(270deg, rgba(63, 63, 70, 0) 0%, #3F3F46 20%, #3F3F46 80%, rgba(63, 63, 70, 0) 100%)',
              borderImageSlice: 1,
            }}
          >
            <div className="bg-transparent text-white p-6 sm:p-8 pt-12 flex flex-col justify-betweens md:pt-16 max-w-full xl:w-135 border-image-horizontal">
              <h4 className="text-2xl font-normal mb-4 font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">Discover & Connect</h4>
              <p className="text-[#71717A] mb-4 text-sm sm:text-base font-['Inter',_sans-serif] overflow-hidden line-clamp-4">
                Explore our marketplace of top-tier cloud software and expert services. We connect you directly with our vetted partners who will handle demos, billing, and support, giving you the best-in-class solution for every part of your stack.
              </p>
              <div className="flex flex-row gap-4 sm:gap-8 mb-8">
                <div>
                  <h5 className="font-semibold mb-1 underline text-[16px] font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">Products</h5>
                  <p className="text-[#71717A] text-sm font-['Inter',_sans-serif] overflow-hidden line-clamp-4">Find the perfect storage, database, or security tool from leading ISVs.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 underline text-[16px] font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">Services</h5>
                  <p className="text-[#71717A] text-sm font-['Inter',_sans-serif] overflow-hidden line-clamp-4">Engage expert partners for DevOps, migration, or custom development.</p>
                </div>
              </div>
              <button className="font-['Inter'] cursor-pointer self-start px-5 py-2 mb-10 bg-zinc-700 text-white rounded-[27px] hover:bg-white hover:text-black transition w-auto">
                Explore the Marketplace
              </button>
            </div>
            <div className="flex flex-col justify-between bg-transparent text-white p-6 sm:py-8 sm:pt-16 md:pl-20 max-w-full md:border-l border-gray-700 xl:w-125">
              <h4 className="text-2xl font-normal mb-4 font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">Build & Manage</h4>
              <p className="text-[#71717A] mb-4 text-sm sm:text-base font-['Inter',_sans-serif] overflow-hidden line-clamp-4">
                For a seamless, end-to-end experience, choose our all-in-one bundles. Your expert team at [Your Company Name] will handle everything for you—from initial configuration and setup to final deployment and ongoing support.
              </p>
              <div className="flex flex-row gap-4 sm:gap-8 mb-8">
                <div>
                  <h5 className="font-semibold mb-1 text-[14px] sm:text-[16px] underline font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">One Point of Contact</h5>
                  <p className="text-[#71717A] text-sm font-['Inter',_sans-serif] overflow-hidden line-clamp-3">Your dedicated project lead.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-[16px] underline font-['CreatoDisplay-Light',_sans-serif] overflow-hidden line-clamp-2">Unified Billing & Support</h5>
                  <p className="text-[#71717A] text-sm font-['Inter',_sans-serif] overflow-hidden line-clamp-3">We handle all the complexity for you.</p>
                </div>
              </div>
              <button className="px-5 font-['Inter'] cursor-pointer py-2 mb-10 bg-zinc-700 text-white rounded-[27px] hover:bg-white hover:text-black transition w-auto self-start">
                View Our Bundles
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-col items-center justify-center relative">
          {/* Title */}

          <div className='absolute inset-0 w-full h-full z-0 hidden md:block' style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url('/image/Rectangle 112.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            opacity: 40,
            backgroundSize: 'auto',
          }}></div>

          <h1 className="text-3xl sm:text-4xl text-white md:text-5xl py-10  md:mb-16 text-center font-['CreatoDisplay-Light',_sans-serif] w-full
                sm:w-[600px] z-50 aspect-[3/1]"
          >
            Your Journey, <br /> Simplified
          </h1>
        </div>

        {/* bg Image */}
        <div className="relative max-w-[1240px] mx-auto  h-[500px]  items-center justify-start md:py-8  hidden md:block border-image-horizontal">
          <Image
            src="/image/Group 408.png"
            fill
            style={{ objectFit: 'contain' }}
            alt="Group 408"
          />

        </div>

        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden sm:hidden">

            {/* Card 1 */}
            <div className="rounded-2xl bg-[#2E1700]  bg-[linear-gradient(153.84deg,#361B00_0%,#000000_21.19%,#0C0C0C_100%)] text-white p-6 [border-width:1px] border-solid border-transparent [border-image-source:linear-gradient(154.42deg,#F79331_0%,#000000_33%)] [border-image-slice:1] shadow-md flex flex-col justify-between min-h-[300px]">

              <div className="mb-4">
                <div className="bg-[#2E1700] rounded-lg p-3 inline-block">
                  <img src="/image/Vector.png" alt="Icon" className="w-5 h-5 block" />
                </div>
              </div>

              <h2 className="text-base/semibold font-['inter'] mb-6">
                Using the Marketplace
              </h2>

              <p className="font-['Inter'] text-gray-400 font-normal text-[12px] leading-[1]  tracking-[0] align-middle mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm font-['Inter'] leading-relaxed mb-2">Discover</div>
                <p className="text-xs text-gray-400">
                  Find the right product or service partner in our catalog.
                </p>
              </div>
              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm font-['Inter'] leading-relaxed mb-2">Connect</div>
                <p className="text-xs text-gray-400">
                  We introduce you directly to the vetted partner.
                </p>
              </div>
              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm font-['Inter'] leading-relaxed mb-2">Engage</div>
                <p className="text-xs text-gray-400">
                  The partner takes it from there with demos, quotes, and direct support.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#2E1700] bg-[linear-gradient(153.84deg,#361B00_0%,#000000_21.19%,#0C0C0C_100%)] text-white p-6 [border-width:1px] border-solid border-transparent [border-image-source:linear-gradient(154.42deg,#F79331_0%,#000000_33%)] [border-image-slice:1] shadow-md flex flex-col justify-between min-h-[300px]">

              <div className="mb-4">
                <div className="bg-[#2E1700] rounded-lg p-3 inline-block">
                  <img src="/image/Vector.png" alt="Icon" className="w-5 h-5 block" />
                </div>
              </div>

              <h2 className="text-base/semibold font-['inter'] mb-6">
                Choosing a Managed Bundle
              </h2>

              <p className="font-['Inter'] text-gray-400 font-normal text-[12px] leading-[1] tracking-[0] align-middle mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm font-['Inter'] leading-relaxed mb-2">Inquires</div>
                <p className="text-xs text-gray-400">
                  Submit a query for one of our bundles.
                </p>
              </div>
              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm font-['Inter'] leading-relaxed mb-2">Consult</div>
                <p className="text-xs text-gray-400">
                  Our architects design your perfect, configured solution.
                </p>
              </div>
              <div className="border-t border-gray-700 mb-6" />

              <div>
                <div className="text-sm leading-relaxed font-['Inter'] mb-2">Launch</div>
                <p className="text-xs text-gray-400">
                  We deploy and manage your entire stack, providing unified support.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Key Offerings Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-16 max-w-[1240px] mx-auto">
          <div className="bg-black rounded-lg p-4">
            <h3 className="text-base font-['Inter'] text-white mb-2 line-clamp-2">Expert Curation, Not Endless Choice</h3>
            <p className="text-gray-400 text-sm line-clamp-5">
              In an era of overwhelming options, we curate each cloud service and partner to ensure high quality, reliability, and relevance—so you get fewer choices and better outcomes.
            </p>
          </div>
          <div className="bg-black rounded-lg p-4">
            <h3 className="text-base font-['Inter'] mb-2 line-clamp-2 text-white">Your In-House Cloud Concierge</h3>
            <p className="text-gray-400 text-sm line-clamp-5">
              Think of us as your internal cloud team—white-glove support for onboarding, optimization, vendor coordination, and strategy—from planning to execution.
            </p>
          </div>
          <div className="bg-black rounded-lg p-4">
            <h3 className="text-base font-['Inter'] mb-2 line-clamp-5 text-white">Unbiased, Flexible Solutions</h3>
            <p className="text-gray-400 text-sm line-clamp-5">
              Avoid vendor lock-in. Whether you choose a partner solution or managed bundle, our goal is to build the best stack for your needs—not ours.
            </p>
          </div>
          <div className="bg-black rounded-lg p-4">
            <h3 className="text-base font-['Inter'] mb-2 line-clamp-2 text-white">Simplified Discovery</h3>
            <p className="text-gray-400 text-sm line-clamp-5">
              Stop jumping between dozens of vendor sites. We bring vetted providers and products together in one easy-to-navigate marketplace.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 max-w-[1240px] mx-auto  bg-black text-white">
          <h2 className="text-4xl sm:text-5xl text-center font-['CreatoDisplay-Light',_sans-serif] text-[25px] md:text-[40px] lg:text-[40px] mb-10">
            What Our Customers and <br /> Partners are Saying
          </h2>
          <div className='relative h-[1400px] md:h-[850px] shadow-2xl overflow-hidden'>
            <div className="space-y-10   bg-black h-[360vh] md:h-[150vh] lg:h-[130vh] overflow-hidden">
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 & 4 */}
                <div className="w-[320px] md:w-[400px]  flex flex-col gap-6 mx-auto">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-10 rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        We were facing a massive, complex migration from our on-premise servers to a multi-cloud environment. The quotes from the big providers were astronomical, and their solutions felt one-size-fits-all. Through the Neozaar marketplace, we discovered a specialized cloud migration partner with deep expertise in our industry. Not only did they de-risk the entire process, but their guidance also helped us architect a more resilient and cost-effective infrastructure. Neozaar didn&apos;t just give us a list; they gave us confidence by connecting us with a truly vetted expert.
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/sarah.png" alt="Sarah Jenkins" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Sarah Jenkins</p>
                            <p className="text-xs text-orange-400">IT Director, FinCorp Solutions</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative min-h-[300px]">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-10 rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        Our cloud storage costs were spiraling out of control. We needed an S3-compatible object storage solution that was cheaper but just as reliable. The Neozaar marketplace allowed us to easily compare several vetted providers side-by-side. We found a fantastic ISV partner offering enterprise-grade storage at a fraction of the cost.
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/sarah.png" alt="Elena Rodriguez" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Elena Rodriguez</p>
                            <p className="text-xs text-orange-400">CTO, MediaStream Co</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 2 & 5 */}
                <div className="w-[320px] md:w-[400px] flex flex-col gap-6 mx-auto">
                  {/* Card 2 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-100% rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        We are a fast-growing SaaS company, and our primary focus has to be on shipping new features for our customers. We simply don&apos;t have the bandwidth to become infrastructure experts. We chose a managed application hosting bundle from Neozaar, and it&apos;s been the best strategic decision we&apos;ve made.<br />They provide 24/7 monitoring, handle all the patching and scaling, and work as a true extension of our team. Our uptime is fantastic, and my engineers are happier because they&apos;re building our product, not fighting fires.<br />
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/Tom.png" alt="Tom Ramirez" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Tom Ramirez</p>
                            <p className="text-xs text-orange-400">Head of Operations, Global Logistics Inc</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 5 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-10 rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        My biggest headache was vendor management. We had separate bills for compute, our CDN, our database, and our support contract. It was a logistical nightmare. The managed bundle allowed us to consolidate everything. The Neozaar team took our requirements and built a custom stack for us, managed entirely under one roof. Our total cost of ownership went down, our performance went up, and I got back hours of my week that I used to spend juggling vendors and invoices.
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/sarah.png" alt="Anonymous" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Anonymous</p>
                            <p className="text-xs text-orange-400">HealthSync</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 3 & 6 */}
                <div className="w-[320px] md:w-[400px]  flex flex-col gap-6 mx-auto">
                  {/* Card 3 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-10 rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        As a DevOps lead, I&apos;m always looking for best-in-class tools to improve our CI/CD pipeline. I was tired of endless free trials and sales calls for tools that didn&apos;t fit. I found a powerful, niche logging and monitoring solution on the marketplace that I&apos;d never heard of before.
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/marcus.png" alt="Marcus Thorne" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Marcus Thorne</p>
                            <p className="text-xs text-orange-400">Lead DevOps Engineer, Innovatech</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 6 */}
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
                    <div className="absolute inset-0 bg-[url('/image/card.png')] bg-cover bg-center opacity-10 rounded-2xl" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-sm text-gray-200 leading-relaxed font-['Inter'] mb-6">
                        Our development team is fantastic at building our application, but we don&apos;t have a dedicated security expert. For our latest feature, we needed to ensure we were following all the best practices for data encryption and network security. We used the marketplace to find a security consulting service. Within two days, we were on a call with a world-class security architect who performed a full audit and provided a clear, actionable report. It was the fastest way to access top-tier talent for a critical, short-term project.
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image src="/image/sarah.png" alt="user" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Ben Carter</p>
                            <p className="text-xs text-orange-400">VP of Engineering, HealthSync</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 relative">
                          <Image src="/image/icon.png" alt="icon" fill className="object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-75 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-16">
            <Link
              href={"/"}
              className="group inline-flex items-center justify-center bg-black text-white border border-white/20 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base transition-all duration-200"
            >
              <img src="/image/writing-sign.png" alt="Write" className="w-5 h-5" />
              <span className="mx-2">Write Review</span>
              <img src="/image/arrow-up.png" alt="arrow" className="w-5 h-5 transform transition-transform duration-300" />
            </Link>
          </div>
        </section>

        {/* Final Section */}
        <section className="relative w-full flex flex-col items-center justify-start pt-8 px-4 sm:px-6 min-h-[300px] sm:min-h-[500px] mb-0">
          <div
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: "url('/image/Desktop - 14.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.5,
            }}
          />
          <div className="relative mx-auto w-full max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#F79331] via-[#39C6FF] to-white font-['CreatoDisplay-Light',_sans-serif] text-[20px] font-300 mb-4">
              Ready to Find Your Perfect <br /> Cloud Solution?
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mb-4">
              Whether you&apos;re looking for a single product or a fully managed stack,<br className="hidden sm:inline" /> your journey starts here.
            </p>
            <Link href={"/"} className="inline-flex items-center justify-center bg-gray-700 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full cursor-pointer px-6 py-2 sm:py-3 text-sm sm:text-base">
              <span className="mr-2">Let’s Get Started</span>
              <img src="/image/arrow-up.png" alt="arrow" className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}