export const seoconfig = {
  default: {
    title: "NeoZaar — Smarter Cloud Marketplace",
    description:
      "NeoZaar helps SaaS and ISVs grow across AWS, Azure, and GCP marketplaces with private offers, co-sell, and AI-powered GTM automation.",
    keywords:
      "cloud marketplace, SaaS marketplace, cloud GTM, ISV growth, co-sell, AWS marketplace, Azure marketplace, GCP marketplace, NeoZaar",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.neozaar.com",
    image: "/images/og-home.jpg",
    locale: "en_US",
    siteName: "NeoZaar",
  },

  analytics: {
    googleAnalyticsId: "G-88XST2Y1BK",
    facebookPixelId: "123456789012345",
  },

  pages: {
    home: {
      title: "NeoZaar | Fast-Track Co-Sell, Private Offers & ISV Growth",
      description:
        "NeoZaar helps SaaS and ISVs grow across AWS, Azure, and GCP marketplaces with private offers, co-sell, and AI-powered GTM automation.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.neozaar.com"}/`,
      keywords:
        "cloud marketplace, SaaS marketplace, cloud solutions, cloud bundles, AWS marketplace partner, Azure EDP accelerator, curated SaaS bundles, ISV enablement, cloud modernization, FinOps, AI for cloud buyers, NeoZaar marketplace, NeoZaar CoSell360, NeoZaar bundles",
      siteName: "NeoZaar",
      icons: {
        icon: "/assests/Favicon _Neozaar.ico",
      },
      robots: {
        index: true,
        follow: true,
        type: "website",
        locale: "en_US",
      },
    },

    marketplace: {
      title: "Marketplace | Explore Cloud Solutions | NeoZaar",
      description:
        "Browse verified SaaS and cloud bundles on NeoZaar Marketplace — aligned with AWS, Azure & GCP ecosystems.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.neozaar.com"}/marketplace/`,
      keywords:
        "cloud marketplace, SaaS marketplace, AWS marketplace listings, Azure marketplace solutions, GCP marketplace bundles, enterprise SaaS, NeoZaar marketplace, NeoZaar bundles",
    },

    isv: {
      title: "ISV Registration | List Your SaaS on NeoZaar Marketplace",
      description:
        "Register as an ISV and list your SaaS, AI, or cloud solution on NeoZaar. Unlock co-sell growth and marketplace visibility.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.neozaar.com"}/partner-registration/`,
      keywords:
        "ISV registration, SaaS listing, cloud marketplace onboarding, ISV partner program, AWS ISV onboarding, Azure marketplace partner, co-sell enablement, private offers, NeoZaar ISV registration, NeoZaar CoSell360, NeoZaar partner program",
    },
  },
};
