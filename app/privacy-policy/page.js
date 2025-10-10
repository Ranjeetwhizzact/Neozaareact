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
            NeoZaar is a B2B SaaS and cloud marketplace designed to accelerate the go-to-market journey of independent software vendors (ISVs), cloud partners, and digital-first startups. Our platform also offers AI-powered assistants (Nova and Neo), private offers, marketplace readiness support, and co-sell enablement tools.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">2. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>
              <strong>a. Personal Information:</strong> Name, email, phone number,
              company name, job title, business profile,Login credentials and user account preferences
            </li>
            <li>
              <strong>b. Business Information:</strong> ISV product details, solution category, cloud marketplace listings Partner program preferences and service usage data
            </li>
            <li>
              <strong>c. Technical Data:</strong> IP address, browser type, device type,
              cookies, analytics data, usage patterns.
            </li>
            <li>
              <strong>d. AI Interaction Logs:</strong> Queries and prompts submitted to Nova and Neo Feedback and usage history to enhance personalization
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">3. How We Use Your Information</h2>
          <p className="mb-6 text-gray-700">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Deliver and personalize platform services</li>
            <li>Match you with ISVs, partners, and service providers</li>
            <li>Facilitate private offers and co-sell opportunities</li>
            <li>Enhance user experience through AI agents</li>
            <li>Send updates, newsletters, and promotional materials</li>
            <li>Maintain security, debug issues, and improve performance</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">4. How We Share Your Information</h2>
                <p className="mb-6 text-gray-700">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Verified ISVs, Spectrum Partners, or cloud providers when you engage with their services</li>
            <li>Internal teams managing onboarding, support, or marketing</li>
            <li>Third-party tools used for analytics, hosting, CRM, and communication (e.g., Zoho, Wix, OpenAI, Google Analytics)</li>
            <li>Regulatory bodies if legally required</li>
            <li>We do not sell your personal information.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="mb-6  text-gray-700">
            NeoZaar uses cookies and tracking pixels to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Monitor user behavior for analytics and platform improvements</li>
            <li>Customize experiences based on user roles (ISV, buyer, consultant)</li>
            <li>Power retargeting campaigns and lead generation initiatives</li>
            <li>You can control cookie settings in your browser preferences.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">6. Your Rights and Choices</h2>
          <p className="mb-6  text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-black">
            <li>Access or correct your personal information</li>
            <li>Request account deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Restrict certain data processing activities</li>
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
            We implement administrative, technical, and physical safeguards to protect your information, including:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Encrypted communication (HTTPS)</li>
            <li>Access control based on user roles</li>
            <li>Secure cloud infrastructure (e.g., AWS, Azure)</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">8. Data Retention</h2>
          <p className="mb-6  text-gray-700">
            We retain data for as long as your account is active or as needed to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>Provide services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
        

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">9. Children’s Privacy</h2>
          <p className="mb-6  text-gray-700">
            NeoZaar is a B2B platform and not intended for individuals under 18. We
            do not knowingly collect data from minors.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">10. International Data Transfers</h2>
          <p className="mb-6  text-gray-700">
            If you are accessing NeoZaar from outside India, your data may be transferred to and processed in India or other jurisdictions where our service providers operate.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">11. Updates to This Policy</h2>
          <p className="mb-6  text-gray-700">
            We may revise this Privacy Policy from time to time. Changes will be posted with an updated  {"Effective Date"} on this page. 
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">12. Contact Us</h2>
          <p className=" text-gray-700">
            For questions about this policy or your personal data, contact:{" "}
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


