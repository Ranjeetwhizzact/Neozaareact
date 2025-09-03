'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);



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


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://20.83.163.38:5000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })

      localStorage.clear("token")
      toast.success("Logout Success")
      router.push('/')

    } catch (error) {
      console.error(error)
    }
  }


  const NAV_LINKS = [
    { href: '/cyber-protect-cloud', label: 'ISV CoSell360' },
    { href: '/isv-registration', label: 'ISV Registration' },
    { href: '/partner-with-us', label: 'Partner With Us' },
    { href: '/faq', label: "FAQ's" },
    { href: '/contact-us', label: 'Contact' },
  ];

  return (
    <header
      className={`bg-black text-white  border-b border-white/10 relative h-20 max-w-[1920px] m-auto ${isHomePage ? 'bg-transparent' : 'bg-black'
        }`}
    >
      {/* XL Desktop */}
      <div className="hidden xl:flex items-center  absolute z-3 w-full px-4 sm:px-6 lg:px-10 py-3  justify-between">
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
                className={`hover:text-white transition ${pathname === link.href ? 'text-white' : 'text-zinc-400'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center ">
          {pathname === "/" ? (
            <div>
              <Link href="/auth/login">
                <button className="bg-orange-600 mx-2 cursor-pointer text-sm px-4 py-2 rounded-full hover:bg-zinc-700 transition">
                  login
                </button>
              </Link>
              <Link href="/market_place">
                <button className="bg-[#F79331] cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                  Go to marketplace
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-6 relative" ref={dropdownRef}>
                <button className="bg-zinc-800 cursor-pointer text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                  Book a Call
                </button>
                <div className="h-[40px] w-px bg-white/10" />
                <button onClick={() => setDropdownOpen((prev) => !prev)}>
                  <Image
                    src="/image/Shape.png"
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer border border-gray-600"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-44 rounded-md bg-gray-800 shadow-lg z-50">
                    <ul className="py-2 text-base text-white">
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-3 hover:bg-gray-700 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* LG Desktop */}
      <div className="hidden lg:flex xl:hidden items-center justify-between">
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
                className={`hover:text-white transition ${pathname === link.href ? 'text-white' : 'text-zinc-400'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {isHomePage ? (
            <Link href="/market_place">
              <button className="bg-[#F79331] text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                Go to marketplace
              </button>
            </Link>
          ) : (
            <>
              <button className="bg-zinc-800 text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition">
                Book a Call
              </button>
              <div className="h-[40px] w-px bg-white/10" />
              <button onClick={() => setDropdownOpen((prev) => !prev)}>
                <Image
                  src="/image/Shape.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer border border-gray-600"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-44 rounded-md bg-gray-800 shadow-lg z-50">
                  <ul className="py-2 text-base text-white">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 hover:bg-gray-700 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-3 md:px-6  py-3 md:py-7">
            <Link href="/">
        <Image
          src="/image/Logo.png"
          alt="Logo"
          width={168}
          height={40}
          priority
          className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        />
        </Link>
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <>
              <button onClick={() => setDropdownOpen((prev) => !prev)}>
                <Image
                  src="/image/Shape.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer border border-gray-600"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-44 rounded-md bg-gray-800 shadow-lg z-50">
                  <ul className="py-2 text-base text-white">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 hover:bg-gray-700 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}

            </>
          )}
          <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      {isOpen && (
        <div role="presentation" className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className={`fixed right-0 top-0 h-full w-60 bg-black transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
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
            <nav className="px-6 py-6 space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block text-lg transition ${pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
                
            </nav>
            <div className="px-6 py-4">
              <div className='mb-3'>

                <Link href="/auth/login" >
                 <button className="bg-orange-600 text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition w-full">
                 login
                 </button>
               </Link>
              </div>
              {isHomePage ? (
             
                <Link href="/market_place">
                  <button className="bg-[#F79331] text-sm px-6 py-2 rounded-full hover:bg-zinc-700 transition w-full">
                    Go to marketplace
                  </button>
                </Link>
              ) : (
                <button className="w-full bg-zinc-800 text-sm px-6 py-3 rounded-full hover:bg-zinc-700 transition">
                  Book a Call
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}