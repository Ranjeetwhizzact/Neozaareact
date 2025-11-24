

"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '../layouts/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CookieConsent from "../components/CookieConsent";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from "../layouts/Footer";
import Link from 'next/link';
import { useRouter } from "next/navigation";
// import { useEffect } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';



export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

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
        { href: '/isv-registration', label: 'ISV Registration' },
        { href: '/partner-with-us', label: 'Partner With Us' },
        { href: '/contact-us', label: 'Contact' },
    ];

    const handleMarketplaceClick = () => {
        const isLoggedIn = localStorage.getItem("token"); // or cookie/session check
        if (isLoggedIn) {
            router.push("/market_place");
        } else {
            router.push("/auth/login");
        }
    };
    return (
        <>
            <main className="bg-black min-h-screen w-full mx-auto max-w-[1920px]">
                {/* Hero Section */}
                <section className="relative w-full flex flex-col items-center justify-start pt-8 px-2 sm:px-6 pb-15 min-h-screen lg:min-h-screen 2xl:min-h-auto">
                    {/* Background Video */}
                    <div className='w-full h-full absolute z-0 bg-black'></div>
                    <video
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ opacity: 0.7, pointerEvents: 'none' }}
                    >
                        <source src="/assests/homepagevideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="text-white px-4 sm:px-6 lg:px-10 py-3 z-10 m-auto my-0 w-full h-full">
                        <Header />
                    </div>
                    {/* Hero Content */}
                    <div className="relative mx-auto md:my-35 lg:my-25 my-40 w-full max-w-full sm:max-w-[800px] flex flex-col items-center justify-center rounded-lg text-center px-2">
                        <h1 className="text-white font-light font-['serif'] text-3xl sm:text-4xl md:text-5xl mb-4 leading-snug">
                            Join The NeoZaar ISV<br />Market Place Today!
                        </h1>
                        <p className="text-gray-200 mb-6 px-2 sm:px-6 text-sm sm:text-base font-['Inter',_sans-serif] mt-3">
                            Partner with NeoZaar to accelerate your software distribution and<br className="hidden sm:inline" />
                            reach new markets through our comprehensive ISV program<br className="hidden sm:inline" />

                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                            <Link
                                href="/auth/register"
                                className="min-w-[180px] cursor-pointer font-['Inter',_sans-serif] sm:w-auto px-6 bg-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-black transition h-12 flex items-center justify-center"
                            >
                                <span className='text-base font-semibold'>Apply Now</span>
                            </Link>
                            <Link
                                href="/auth/register"
                                className="min-w-[200px] cursor-pointer font-['Inter',_sans-serif] py-3 border border-white text-white font-semibold rounded-full hover:bg-white/40 hover:text-white transition flex items-center justify-center"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>



                {/* Features Section */}
                <section className="w-full pt-6 pb-12 sm:py-16 px-2 sm:px-10 lg:px-25 flex flex-col items-center">
                    <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-['inter'] mb-4 md:mb-6">
                            CoSell Benefits
                        </h2>

                        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                            Join thousands of software vendors who trust NeoZaar to expand their
                            <br /> market reach and accelerate growth
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[940px] mx-auto px-2 sm:px-6 lg:px-8 xl:px-0">
                        {[
                            {
                                src: '/assests/isv-program/b1.png',
                                title: 'Global Marketplace',
                                text: 'Access millions of potential customers worldwide through our established marketplace platform',
                            },
                            {
                                src: '/assests/isv-program/b2.png',
                                title: 'Accelerated Growth',
                                text: ' Leverage our marketing channels and partner network to accelerate your software adoption',
                            },
                            {
                                src: '/assests/isv-program/b3.png',
                                title: 'Strategic Partnerships',
                                text: ' Build meaningful partnerships with other ISVs and enterprise customers in our ecosystem',
                            },
                            {
                                src: '/assests/isv-program/b4.png',
                                title: 'Revenue Optimization',
                                text: 'Maximize your revenue potential with our flexible pricing models and revenue sharing options',
                            },
                            {
                                src: '/assests/isv-program/b5.png',
                                title: 'Enterprise Security',
                                text: 'Benefit from enterprise-grade security and compliance standards that customers trust',
                            },
                            {
                                src: '/assests/isv-program/b6.png',
                                title: 'Dedicated Support',
                                text: ' Get dedicated partner support and resources to help you succeed on our platform',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="w-[295px] h-[327px] relative bg-black/80 border border-gray-700 rounded-[5px] p-6 mx-auto flex flex-col"
                                style={{
                                    backgroundImage: "url('/assests/bacground.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="flex items-start justify-start my-8 h-52">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-start text-left mb-3">
                                    <h3 className="font-['CreatoDisplay-Light',_sans-serif] text-xl sm:text-2xl mb-2 text-white max-w-[200px] h-15 overflow-hidden line-clamp-2">
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


                {/* Program Benefits Section */}
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24 bg-black text-white">
                    <div className="max-w-7xl mx-auto">
                        {/* Title */}
                        <div className="text-2xl md:text-3xl lg:text-4xl font-['Inter'] font-normal text-center mb-16 md:mb-20 lg:mb-24">
                            Program Benefits
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
                            {/* Left Side - Benefits List */}
                            <div className="space-y-4 md:space-y-6 lg:space-y-6">
                                {/* Benefit 1 */}
                                <div className="flex gap-4 items-start">
                                    {/* Checkmark Icon */}
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 md:w-4 md:h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 md:w-3 md:h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="font-['Arial'] font-normal text-lg leading-7 mb-2">
                                            Co-Marketing Opportunities
                                        </div>
                                        <div className="text-gray-400 font-['Arial'] font-normal text-base leading-6">
                                            Joint marketing campaigns, case studies, and promotional activities to boost your visibility
                                        </div>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 md:w-4 md:h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 md:w-3 md:h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="font-['Arial'] font-normal text-lg leading-7 mb-2">
                                            Technical Integration Support
                                        </div>
                                        <div className="text-gray-400 font-['Arial'] font-normal text-base leading-6">
                                            Comprehensive API documentation, SDKs, and technical support for seamless integration
                                        </div>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 md:w-4 md:h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 md:w-3 md:h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="font-['Arial'] font-normal text-lg leading-7 mb-2">
                                            Sales Enablement Tools
                                        </div>
                                        <div className="text-gray-400 font-['Arial'] font-normal text-base leading-6">
                                            Access to sales tools, training materials, and lead generation resources
                                        </div>
                                    </div>
                                </div>

                                {/* Benefit 4 */}
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 md:w-4 md:h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 md:w-3 md:h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="font-['Arial'] font-normal text-lg leading-7 mb-2">
                                            Priority Listing
                                        </div>
                                        <div className="text-gray-400 font-['Arial'] font-normal text-base leading-6">
                                            Enhanced visibility in search results and featured placement opportunities
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Image and CTA */}
                            <div className="flex flex-col items-center justify-start mt-6 lg:mt-0">
                                {/* Image */}
                                <div className="mb-3 md:mb-4 lg:mb-1 w-full flex justify-center">
                                    <img
                                        src="/assests/isv-program/gain.png"
                                        alt=""
                                        className="w-[400px] h-[400px] md:w-75 md:h-75 lg:w-85 lg:h-85 object-contain"
                                    />
                                </div>

                                {/* CTA Section */}
                                <div className="text-center px-2 w-full max-w-lg mt-8">
                                    <div className="font-['Arial'] font-normal text-xl md:text-2xl leading-8 mb-3">
                                        Ready to Get Started?
                                    </div>
                                    <div className="text-gray-400 font-['Arial'] font-normal text-base leading-5 mb-5 px-3">
                                        Join our ISV program and unlock new growth opportunities
                                    </div>
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-['Arial'] font-medium px-10 py-3 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                        Apply Today
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Section */}
                <section className="relative w-full flex flex-col items-center justify-start pt-6 px-4 sm:px-6 min-h-[300px] sm:min-h-[500px] mb-0">

                    <div className="relative mx-auto w-full max-w-2xl text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#F79331] via-[#39C6FF] to-white  mb-4 font-['sans'] font-normal text-[40px] leading-[100%] tracking-normal text-center">
                            Ready to Transform Your Software Sales?
                        </h2>
                        <p className="text-gray-200 text-sm sm:text-base mb-3">
                            Join the NeoZaar ISV Program and unlock new opportunities for growth and partnership success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                            <button onClick={handleMarketplaceClick} className="inline-flex items-center justify-center bg-gray-700 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full cursor-pointer px-6 py-2 sm:py-3 text-sm sm:text-base">
                                <span className="mr-2"> Start Your Application</span>
                            </button>
                            <button onClick={handleMarketplaceClick} className="inline-flex items-center justify-center bg-gray-700 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full cursor-pointer px-6 py-2 sm:py-3 text-sm sm:text-base">
                                <span className="mr-2"> Explore CoSell360</span>
                                <Image src="/image/kg.png" alt="" width={15} height={15} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <div className='w-1/3 m-auto'>

                <CookieConsent />
            </div>
            <Footer />
        </>
    );
}