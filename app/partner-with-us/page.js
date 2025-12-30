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
import { useState, useEffect } from 'react';
import {
  Rocket,
  TrendingUp,
  Zap,
  Globe,
  Layers, // For Bundles
  CheckCircle2,
  ArrowRight,
  Search, // For Visibility
  Users, // For Co-Sell
  Plus,
  Minus,
  ShieldCheck,
  Terminal,
  MessageSquare,
  PieChart,
  Brain,
  CreditCard
} from 'lucide-react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(1);

  const categories = [
    { title: "Security & Compliance", content: "Comprehensive solutions for data protection, threat detection, and regulatory compliance across all your cloud environments." },
    { title: "DevOps & Infrastructure", content: "Tools and platforms to streamline development workflows, manage infrastructure as code, and optimize cloud performance." },
    { title: "CRM, Helpdesk, & Collaboration", content: "Enterprise-grade software to enhance customer relationships, support operations, and team collaboration." },
    { title: "FinOps & IT Spend Management", content: "Solutions to track, analyze, and optimize your cloud spending." },
    { title: "AI, ML, and Data Platforms", content: "Advanced analytics, machine learning models, and big data platforms to drive intelligent insights." },
    { title: "Billing & Payments", content: "Seamless billing engines and payment processing systems integrated with cloud marketplaces." },
  ];

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

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

  const handleMarketplaceClick = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      router.push("/market_place");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <main className="bg-black min-h-screen w-full mx-auto max-w-[1920px] overflow-hidden">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-start pt-8 px-2 sm:px-6 pb-15 min-h-[90vh] lg:min-h-screen">
          {/* Background Video/Effect */}
          <div className='w-full h-full absolute z-0 bg-black'></div>
          <div className="absolute inset-0 w-full h-full z-0 opacity-60">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              style={{ opacity: 0.5, pointerEvents: 'none' }}
            >
              <source src="/assests/homepagevideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
          </div>

          <div className="text-white px-4 sm:px-6 lg:px-10 py-3 z-10 m-auto my-0 w-full h-full">
            <Header />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto mt-20 sm:mt-32 lg:mt-40 w-full max-w-5xl flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-200">NeoZaar Partner Program</span>
            </div>

            <h1 className="text-white font-light font-['serif'] text-4xl sm:text-5xl lg:text-[64px] mb-6 leading-tight tracking-tight">
              Accelerate Your SaaS Growth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 font-normal">Across AWS, Azure, and GCP</span>
            </h1>

            <p className="text-gray-300 mb-10 text-base sm:text-lg max-w-2xl font-['Inter',_sans-serif] leading-relaxed">
              Turn your software into a ready-to-sell powered growth engine. We help you list, sell, and scale your SaaS products across major cloud marketplaces—all while you focus on building great software.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              <Link
                href="/partner-registration"
                className="group min-w-[180px] px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Connect with us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Key Benefits Grid (Why NeoZaar is Different) */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 font-['serif']">
                Why NeoZaar is Different
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We don't just list you. We accelerate you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Rocket className="w-8 h-8 text-orange-400" />,
                  title: "Accelerated Go-to-Market",
                  desc: "Skip the steep learning curve. We handle the complexities of cloud marketplace listings so you can start selling in weeks, not months."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
                  title: "Productization That Sells",
                  desc: "We help structuring your product into tiered bundles and compelling offers that resonate with enterprise buyers."
                },
                {
                  icon: <Search className="w-8 h-8 text-purple-400" />,
                  title: "Nova-Driven Visibility",
                  desc: "Your solutions are showcased to our extensive library of enterprises, resellers, and managed service partners."
                },
                {
                  icon: <Users className="w-8 h-8 text-green-400" />,
                  title: "Built-In Co-Sell Support",
                  desc: "We actively co-sell your solutions alongside our sales teams, maximizing your reach and deal closure rates."
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors group">
                  <div className="mb-6 bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-['Inter']">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FastTrack FlexBundles (Split Section) */}
        <section className="w-full py-24 bg-black relative overflow-hidden">
          {/* Decorative blurred blobs */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-stretch gap-16">
              <div className="lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 font-['serif'] leading-tight">
                  FastTrack FlexBundles: <br />
                  <span className="text-gray-500">SaaS + Services, Ready to Deploy</span>
                </h2>
                <p className="text-gray-300 mb-8 font-['Inter']">
                  Give customers what they really want—complete solutions, not just software licenses. With FastTrack FlexBundles, you can bundle your SaaS product with necessary implementation services or complementary tools.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Why ISVs Love It?",
                      items: ["Higher deal value offering", "Reduced churn due to better initial implementation", "Faster path to customer value"]
                    },
                    {
                      title: "Why Buyers Love It?",
                      items: ["One-click purchasing", "Guaranteed compatibility and integration", "Simplified procurement and billing"]
                    }
                  ].map((section, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-3">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 w-full min-h-[500px] lg:min-h-auto">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                  <Image
                    src="/assests/partner-with-us/flex_bundle_visual.png"
                    alt="FastTrack FlexBundles"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-16 font-['serif'] text-center">
              How the NeoZaar Process Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Submit Your Product", text: "Share details about your solution, target audience, and current cloud marketplace status." },
                { step: "02", title: "Review & Build", text: "We review your application and help you define your marketplace offer structure." },
                { step: "03", title: "Activate GTM", text: "Once listed, we activate our sales channel and marketing engine to drive visibility." },
                { step: "04", title: "Scale & Grow", text: "Leverage our analytics and ongoing support to optimize sales and expand into new regions." },
              ].map((item, idx) => (
                <div key={idx} className="relative bg-black border border-zinc-800 p-8 rounded-xl hover:border-orange-500/50 transition-all text-left group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-[900] text-6xl text-gray-500 group-hover:text-orange-500 transition-colors">
                    {item.step}
                  </div>
                  <div className="relative z-10 pt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planned ISV Impact Section */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto bg-zinc-900/30 rounded-3xl p-8 lg:p-16 border border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white font-['serif']">Planned ISV Impact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '50% Faster', subtitle: 'Marketplace Readiness', desc: 'Standardize your onboarding process to get live and transacting in record time.' },
                { title: '< 30 Days', subtitle: 'Launch-to-Lead', desc: 'Our marketing engine starts working for you immediately after listing.' },
                { title: '2x Conversion', subtitle: 'in Bundled Offers', desc: 'Customers prefer complete solutions over standalone tools.' },
              ].map((card, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 mb-2 font-['Inter']">
                    {card.title}
                  </div>
                  <div className="text-lg font-semibold text-white mb-3">{card.subtitle}</div>
                  <p className="text-sm text-gray-400 max-w-xs">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Categories Section (Redesigned Tabs) */}
        <section className="w-full py-24 bg-black text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-light font-['serif'] mb-6">
                Marketplace <br /> <span className="text-gray-500">Categories</span>
              </h2>
              <div className="h-1 w-20 bg-orange-500"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Desktop: Left Tabs / Mobile: Hidden (logic handled via css classes if needed, or just stack) */}
              {/* We will build a responsive component where mobile is a stack of active cards? 
                   Actually, let's keep it simple: On mobile, it acts as list. On Desktop, side-by-side. 
               */}

              <div className="lg:w-1/3 flex flex-col gap-2">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`text-left px-6 py-5 rounded-xl transition-all duration-300 flex items-center justify-between group border ${activeCategory === idx
                      ? 'bg-zinc-900 border-orange-500/50 text-white shadow-lg shadow-orange-900/10'
                      : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/50 hover:text-gray-200 chat-hover'
                      }`}
                  >
                    <span className="font-medium text-lg">{cat.title}</span>
                    {activeCategory === idx && <ArrowRight className="w-5 h-5 text-orange-500 animate-pulse" />}
                  </button>
                ))}
              </div>

              {/* Right Content Area */}
              <div className="lg:w-2/3 relative min-h-[400px]">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col justify-center p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm ${activeCategory === idx ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 z-0 pointer-events-none'
                      }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-8 shadow-xl">
                      {idx === 0 && <ShieldCheck className="w-8 h-8 text-white" />}
                      {idx === 1 && <Terminal className="w-8 h-8 text-white" />}
                      {idx === 2 && <MessageSquare className="w-8 h-8 text-white" />}
                      {idx === 3 && <PieChart className="w-8 h-8 text-white" />}
                      {idx === 4 && <Brain className="w-8 h-8 text-white" />}
                      {idx === 5 && <CreditCard className="w-8 h-8 text-white" />}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light mb-6 text-white font-['serif']">{cat.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {cat.content}
                    </p>
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-orange-400 cursor-pointer hover:text-orange-300 transition-colors">
                      <span className="font-semibold tracking-wide text-sm uppercase">Explore Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative w-full flex flex-col items-center justify-start pt-20 px-4 sm:px-6 min-h-[400px] sm:min-h-[300px] mb-0">

          <div className="relative mx-auto w-full max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#F79331] via-[#39C6FF] to-white  mb-4 font-normal text-[40px] leading-[100%] tracking-normal text-center">
              Grow Smarter. Sell Faster.
            </h2>
            <p className="text-gray-200 text-sm sm:text-base mb-6 ">
              Start with NeoZaar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                href="/partner-registration"
                className="group min-w-[180px] px-8 py-4 bg-[#F79331] text-white font-bold rounded-full hover:bg-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Your Application
              </Link>

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