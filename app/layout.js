import "./globals.css";
import { Image } from "lucide-react";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { seoconfig } from "./seoconfig"; // adjust path if needed

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// =============================================================
// ✅ Dynamic Metadata (Next.js 15 App Router)
// =============================================================
export const metadata = {
  openGraph: {
    url: seoconfig.default.url,
    siteName: "NeoZaar",
    images: [
      {
        url: seoconfig.default.image,
        width: 1200,
        height: 630,
        alt: "NeoZaar Cloud Marketplace",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seoconfig.default.title,
    description: seoconfig.default.description,
    images: [seoconfig.default.image],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assests/Favicon _Neozaar.ico",
  },
};

// =============================================================
// ✅ Root Layout
// =============================================================
export default function RootLayout({ children }) {
  // You can still use env vars if you want:
  const FB_PIXEL_ID = seoconfig.pages.isv;

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}

        <Toaster position="top-right" reverseOrder={false} />

        {/* ========================================================= */}
        {/* 📈 GOOGLE ANALYTICS (GA4) — your live tag */}
        {/* ========================================================= */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-88XST2Y1BK"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-88XST2Y1BK');
          `}
        </Script>

        {/* ========================================================= */}
        {/* 🔗 LINKEDIN INSIGHTS TAG */}
        {/* ========================================================= */}
        <Script id="linkedin-insights" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "9182225";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        
        <Script id="linkedin-insights-script" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){
                window.lintrk = function(a,b){
                  window.lintrk.q.push([a,b])
                };
                window.lintrk.q=[];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=9182225&fmt=gif"
          />
        </noscript>

        {/* ========================================================= */}
        {/* 📱 FACEBOOK PIXEL */}
        {/* ========================================================= */}
        {FB_PIXEL_ID && (
          <>
            <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <Image
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt="facebook-pixel"
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}