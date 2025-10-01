import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen w-full mx-auto max-w-[1920px] px-6 sm:px-12 lg:px-24 py-12">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4  text-black">Privacy Policy</h1>
          <p className="text-sm  mb-8  text-gray-700">
            Effective Date: 10th May, 2025 <br />
            Last Updated: 10th May, 2025
          </p>

          <p className="mb-6  text-gray-700"> 
            Welcome to NeoZaar. We value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines how we collect,
            use, disclose, and safeguard your data when you visit our website{" "}
            <a
              href="https://www.neozaar.com"
              className="text-blue-600 hover:underline"
            >
              www.neozaar.com
            </a>
            , use our services, or engage with our platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">1. Who We Are</h2>
          <p className="mb-6 text-gray-700">
            NeoZaar is a B2B SaaS and cloud marketplace designed to accelerate the
            go-to-market journey of independent software vendors (ISVs), cloud
            partners, and digital-first startups. Our platform also offers
            AI-powered assistants (Nova and Neo), private offers, marketplace
            readiness support, and co-sell enablement tools.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">2. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              company name, job title, login credentials, and preferences.
            </li>
            <li>
              <strong>Business Information:</strong> ISV product details, solution
              category, cloud listings, partner program preferences.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device type,
              cookies, and analytics data.
            </li>
            <li>
              <strong>AI Interaction Logs:</strong> Queries, prompts, feedback, and
              usage history with Nova and Neo.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Deliver and personalize platform services</li>
            <li>Match you with ISVs, partners, and providers</li>
            <li>Facilitate private offers and co-sell opportunities</li>
            <li>Enhance user experience with AI agents</li>
            <li>Send updates, newsletters, and promotions</li>
            <li>Maintain security, debug issues, and improve performance</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">4. How We Share Your Information</h2>
          <p className="mb-6  text-gray-700">
            We may share your information with verified ISVs, partners, internal
            teams, third-party tools (Zoho, Wix, OpenAI, Google Analytics), or
            regulators if legally required. We do <strong>not</strong> sell your
            personal information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="mb-6  text-gray-700">
            NeoZaar uses cookies and tracking pixels for analytics, customization,
            and retargeting campaigns. You can manage cookie settings in your
            browser preferences.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">6. Your Rights and Choices</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-black">
            <li>Access or correct your personal information</li>
            <li>Request account deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Restrict certain processing activities</li>
          </ul>
          <p className="mb-6 text-black">
            To make a request, contact us at{" "}
            <a
              href="mailto:admin@neozaar.com"
              className="text-blue-600 hover:underline"
            >
              admin@neozaar.com
            </a>
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">7. Data Security</h2>
          <p className="mb-6  text-gray-700">
            We use safeguards like HTTPS encryption, role-based access control, and
            secure cloud infrastructure (AWS, Azure) to protect your data.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">8. Data Retention</h2>
          <p className="mb-6  text-gray-700">
            Data is retained as long as your account is active or as needed to
            provide services, comply with laws, resolve disputes, and enforce
            agreements.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">9. Children’s Privacy</h2>
          <p className="mb-6  text-gray-700">
            NeoZaar is a B2B platform and not intended for individuals under 18. We
            do not knowingly collect data from minors.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">10. International Data Transfers</h2>
          <p className="mb-6  text-gray-700">
            If you access NeoZaar outside India, your data may be processed in India
            or other jurisdictions where our providers operate.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">11. Updates to This Policy</h2>
          <p className="mb-6  text-gray-700">
            We may revise this Privacy Policy from time to time. Updates will be
            posted here with the latest {"Effective Date."}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">12. Contact Us</h2>
          <p className=" text-gray-700">
            For questions about this policy, contact:{" "}
            <a
              href="mailto:admin@neozaar.com"
              className="text-blue-600 hover:underline"
            >
              admin@neozaar.com
            </a>{" "}
            <br />
            Navi Mumbai, India
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
