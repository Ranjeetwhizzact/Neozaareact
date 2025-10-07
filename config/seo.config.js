export const SEO_DATA = {
  default: {
    title: "NeoZaar — Smarter Cloud Marketplace",
    description:
      "Discover smarter cloud solutions with NeoZaar — curated SaaS bundles, verified ISVs, and managed services aligned with your AWS, Azure & GCP goals.",
    keywords:
      "cloud marketplace, SaaS marketplace, cloud solutions, NeoZaar marketplace",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    image: "/images/og-home.jpg",
  },
  pages: {
    home: {
      title: "NeoZaar | Smarter Cloud Marketplace",
      description:
        "Discover smarter cloud solutions with NeoZaar — curated SaaS bundles, verified ISVs, and managed services aligned with your AWS, Azure & GCP goals.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/`,
    },
    marketplace: {
      title: "Marketplace | Explore Cloud Solutions | NeoZaar",
      description:
        "Browse verified SaaS and cloud bundles on NeoZaar Marketplace — aligned with AWS, Azure & GCP ecosystems.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/marketplace/`,
    },
    isv: {
      title: "ISV Registration | List Your SaaS on NeoZaar Marketplace",
      description:
        "Register as an ISV and list your SaaS, AI, or cloud solution on NeoZaar. Unlock co-sell growth and marketplace visibility.",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/isv-registration/`,
    },
  },
};
