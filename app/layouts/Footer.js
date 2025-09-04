// import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {

  const NAV_LINKS = [
    { href: '/cyber-protect-cloud', label: 'ISV CoSell360' },
    { href: '/isv-registration', label: 'ISV Registration' },
    { href: '/partner-with-us', label: 'Partner With Us' },
    { href: '/', label: "FAQ's" },
    { href: '/', label: 'Contact' },
  ];


  return (

    <footer className="bg-black text-gray-200  relative overflow-hidden m-auto max-w-[1920px]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-11 gap-8 relative z-10 border-t border-white/10 mt-5">
        <div className="md:col-span-4 space-y-4">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed mt-4">
             NeoZaar is a GTM accelerator and AI-powered marketplace for SaaS and cloud-native solutions.
We help ISVs scale through streamlined onboarding, bundled deployment offers, and credit-aligned sales via AWS, Azure, and NeoZaar’s own platform.
            </p>

            <div className="flex flex-wrap gap-[10px] pt-28 pb-8 text-sm items-center">
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
              <a href="#" className="hover:underline">
                FaceBook
              </a>
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block border-l border-white/10 h-auto mx-auto"></div>

        <div className="md:col-span-2">
          <h5 className="font-light tracking-wide text-white text-xl mb-4 mt-4">
            Links
          </h5>
          <div className="space-y-3 text-sm">
           
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={"block text-zinc-700 hover:text-white transition-colors"}
              >
                {link.label}
              </Link>
            ))}
            
          </div>
        </div>

        <div className="hidden md:block border-l border-white/10 h-auto mx-auto"></div>

        <div className="md:col-span-3">
          <h5 className="text-white font-light tracking-wide mb-2 mt-4">
            Subscribe Our
            <br />
            <span className="font-bold">Newsletter</span>
          </h5>
          <form action="#" className="relative mt-4 max-w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 bg-transparent border border-gray-500 rounded text-sm placeholder-gray-400 pl-4 pr-12 focus:outline-none"
            />
            <button type="submit" className="absolute cursor-pointer inset-y-0 right-0">
              <img src="/image/arrow.png" alt="Submit" className="w-12 h-12" />
            </button>
          </form>
          <p className="mt-6 text-sm text-white-400 leading-relaxed">
            Stay Ahead with Cloud GTM Insights
Subscribe to updates on SaaS trends, hyperscaler programs, and exclusive NeoZaar deals.
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 flex justify-center py-6">
          <Link href="/">
        <img src="/image/Logo W.png" alt="Logo" className="w-11/12 m-auto" />
        </Link>
      </div>

      <div className="border-t border-white/10 mt-6 relative z-10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2025, Designed by Smart Itcentre.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline semibold">
              Terms & Condition
            </a>
            <a href="#" className="hover:underline semibold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}