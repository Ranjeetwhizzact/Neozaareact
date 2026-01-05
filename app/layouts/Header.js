'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  
  // Separate dropdown states
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [tabletDropdownOpen, setTabletDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  
  const desktopDropdownRef = useRef(null);
  const tabletDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Get the base URL for the app dynamically
  const getAppBaseUrl = () => {
    return process.env.NEXT_PUBLIC_APP_BASE_URL || "http://135.235.138.35/";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
      if (tabletDropdownRef.current && !tabletDropdownRef.current.contains(event.target)) {
        setTabletDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role_type;
    const id = user?.id;

    const isAuth = !!token && token.trim() !== "";
    
    setIsAuthenticated(isAuth);
    setUserRole(role);
    setUserId(id);
  }, []);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

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

  // Cross-app logout listener
  useEffect(() => {
    const allowedOrigins = [
      "http://app.neozaar.skilladders.com",
      getAppBaseUrl()
    ];

    const messageHandler = (event) => {
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.type === "LOGOUT") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, []);

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === "logout-event") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
        router.push("/auth/login");
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);

      localStorage.setItem("logout-event", Date.now());

      toast.success("Logout Success");
      router.push("/auth/login");

    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle profile click - opens external URL
  const handleProfileClick = () => {
    const profileUrl = `${getAppBaseUrl()}/app/profile/view/${userId}`;
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  // Function to handle dashboard click - opens external URL
  const handleDashboardClick = () => {
    const dashboardUrl = `${getAppBaseUrl()}/app/dashboard`;
    window.open(dashboardUrl, '_blank', 'noopener,noreferrer');
  };

  const NAV_LINKS = [
    { href: '/isv-program', label: 'Partner With Us' },
    { href: '/contact-us', label: 'Contact' },
  ];

  // Check if user is ISV and authenticated
  const isISVUser = isAuthenticated && userRole === "ISV";

  // 1. Desktop Dropdown (≥1024px)
  const DesktopDropdown = () => (
    <div className="absolute right-0 top-14 w-48 rounded-md bg-gray-800 shadow-lg z-50">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="text-xs text-gray-400">Role: {userRole}</div>
      </div>
      <ul className="py-2 text-base text-white">
        <li>
          <button
            onClick={() => {
              setDesktopDropdownOpen(false);
              handleProfileClick();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Profile
          </button>
        </li>
        {isISVUser && (
          <li>
            <button
              onClick={() => {
                setDesktopDropdownOpen(false);
                handleDashboardClick();
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
            >
              Dashboard
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              setDesktopDropdownOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  // 2. Tablet Dropdown (≥768px to <1024px)
  const TabletDropdown = () => (
    <div className="absolute right-0 top-14 w-48 rounded-md bg-gray-800 shadow-lg z-50">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="text-xs text-gray-400">Role: {userRole}</div>
      </div>
      <ul className="py-2 text-base text-white">
        <li>
          <button
            onClick={() => {
              setTabletDropdownOpen(false);
              handleProfileClick();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Profile
          </button>
        </li>
        {isISVUser && (
          <li>
            <button
              onClick={() => {
                setTabletDropdownOpen(false);
                handleDashboardClick();
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
            >
              Dashboard
            </button>
          </li>
        )}
        {!isISVUser && (
          <li>
            <button
              onClick={() => {
                setTabletDropdownOpen(false);
                router.push("/market_place");
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
            >
              Marketplace
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              setTabletDropdownOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  // 3. Mobile Dropdown (<768px)
  const MobileDropdown = () => (
    <div className="absolute right-0 top-14 w-48 rounded-md bg-gray-800 shadow-lg z-50">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="text-xs text-gray-400">Role: {userRole}</div>
      </div>
      <ul className="py-2 text-base text-white">
        <li>
          <button
            onClick={() => {
              setMobileDropdownOpen(false);
              handleProfileClick();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Profile
          </button>
        </li>
        {isISVUser && (
          <li>
            <button
              onClick={() => {
                setMobileDropdownOpen(false);
                handleDashboardClick();
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
            >
              Dashboard
            </button>
          </li>
        )}
        {!isISVUser && (
          <li>
            <button
              onClick={() => {
                setMobileDropdownOpen(false);
                router.push("/market_place");
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
            >
              Marketplace
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              setMobileDropdownOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <header
      className={`bg-black text-white border-b border-white/10 relative h-20 max-w-[1920px] m-auto ${
        isHomePage ? 'bg-transparent' : 'bg-black'
      }`}
    >
      {/* XL & LG Desktop (≥1024px) */}
      <div className="hidden lg:flex items-center absolute z-3 w-full px-4 sm:px-6 lg:px-10 py-3 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src="/image/Logo.png" alt="Logo" width={210} height={50} priority />
          </Link>
          <div className="h-[40px] w-px bg-white/10" />
          <nav className="flex gap-6 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-white transition ${
                  pathname === link.href ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-6 relative" ref={desktopDropdownRef}>
            {/* Show marketplace button only if user is NOT ISV */}
            {!isISVUser && (
              <>
                <Link href="/market_place">
                  <button className="bg-[#F79331] cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                    Go to marketplace
                  </button>
                </Link>
                <div className="h-[40px] w-px bg-white/10" />
              </>
            )}
            
            <button onClick={() => setDesktopDropdownOpen((prev) => !prev)} className="flex items-center gap-2">
              <Image
                src="/image/blank-profile.webp"
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer border border-gray-600"
              />
            </button>

            {desktopDropdownOpen && <DesktopDropdown />}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <button className="bg-orange-600 cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-orange-700 transition">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Tablet (≥768px to <1024px) */}
      <div className="hidden md:flex lg:hidden items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/image/Logo.png" alt="Logo" width={189} height={45} priority />
          </Link>
          <div className="h-[35px] w-px bg-white/10" />
          <nav className="flex gap-4 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-white transition ${
                  pathname === link.href ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-6 relative" ref={tabletDropdownRef}>
            {/* Show marketplace button only if user is NOT ISV */}
            {!isISVUser && (
              <>
                <Link href="/market_place">
                  <button className="bg-[#F79331] cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                    Go to marketplace
                  </button>
                </Link>
                <div className="h-[40px] w-px bg-white/10" />
              </>
            )}
            
            <button onClick={() => setTabletDropdownOpen((prev) => !prev)} className="flex items-center gap-2">
              <Image
                src="/image/blank-profile.webp"
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer border border-gray-600"
              />
            </button>

            {tabletDropdownOpen && <TabletDropdown />}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <button className="bg-orange-600 cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-orange-700 transition">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile (<768px) */}
      <div className="md:hidden flex items-center justify-between px-3 md:px-6 py-3 md:py-7">
        <Link href="/">
          <Image
            src="/image/Logo.png"
            alt="Logo"
            width={168}
            height={40}
            priority
            className={`transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button onClick={() => setMobileDropdownOpen((prev) => !prev)} className="flex items-center gap-2">
                <Image
                  src="/image/blank-profile.webp"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer border border-gray-600"
                />
              </button>

              {mobileDropdownOpen && <MobileDropdown />}
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="bg-orange-600 cursor-pointer text-sm px-4 py-2 rounded-full hover:bg-orange-700 transition">
                Login
              </button>
            </Link>
          )}
          <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu (<768px) */}
      {isOpen && (
        <div role="presentation" className="fixed inset-0 z-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className={`fixed right-0 top-0 h-full w-60 bg-black transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4">
              <Image src="/image/Logo.png" alt="Logo" width={147} height={35} />
              <button onClick={() => setIsOpen(false)} className="text-white ml-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {isAuthenticated && (
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="text-xs text-gray-400">Role: {userRole}</div>
              </div>
            )}
            <nav className="px-6 py-6 space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block text-lg transition ${
                    pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-4 space-y-3">
              {!isAuthenticated ? (
                <div className="mb-3">
                  <Link href="/auth/login">
                    <button className="bg-orange-600 text-sm px-6 py-2 rounded-full hover:bg-orange-700 transition w-full">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleProfileClick();
                    }}
                    className="bg-blue-600 text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition w-full"
                  >
                    Profile
                  </button>
                  
                  {isISVUser && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleDashboardClick();
                      }}
                      className="bg-green-600 text-sm px-6 py-2 rounded-full hover:bg-green-700 transition w-full"
                    >
                      Dashboard
                    </button>
                  )}
                  
                  {!isISVUser && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/market_place");
                      }}
                      className="bg-[#F79331] text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition w-full"
                    >
                      Go to marketplace
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="bg-red-600 text-sm px-6 py-2 rounded-full hover:bg-red-700 transition w-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}