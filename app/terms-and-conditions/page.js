import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen w-full mx-auto max-w-[1920px] px-6 sm:px-12 lg:px-24 py-12">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-black">NeoZaar Terms of Use</h1>
          <p className="text-sm text-gray-500 mb-8 ">
            Last updated: 10th May, 2025
          </p>

          <p className="mb-6  text-gray-700">
            Welcome to NeoZaar. By accessing or using our platform, services, or
            related offerings, you agree to comply with and be bound by the
            following Terms of Use. Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">1. Acceptance of Terms</h2>
          <p className="mb-6  text-gray-700">
            By using NeoZaar, you agree to these Terms of Use and our Privacy
            Policy. If you do not agree, please do not use the platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">2. Use of the Platform</h2>
          <p className="mb-6  text-gray-700">
            You may only use NeoZaar for lawful purposes and in accordance with
            these terms. You agree not to misuse or attempt to interfere with the
          { `platform's `}integrity, performance, or accessibility.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">3. ISV and Partner Submissions</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2  text-gray-700">
            <li>You are authorized to act on behalf of your organization.</li>
            <li>The information provided is accurate and current.</li>
            <li>
              You have the rights to the intellectual property, licenses, and
              claims made in your listing.
            </li>
          </ul>
          <p className="mb-6  text-gray-700">
            NeoZaar reserves the right to accept, reject, or modify submissions
            at its discretion.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">
            4. Platform Modifications and Availability
          </h2>
          <p className="mb-6  text-gray-700">
            We may update, change, or discontinue parts of the platform without
            notice. We are not liable for any downtime, delays, or data loss
            resulting from platform updates or third-party integrations.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">5. Intellectual Property</h2>
          <p className="mb-6  text-gray-700">
            All trademarks, logos, and platform content (excluding ISV-submitted
            materials) are the property of NeoZaar. You may not reproduce,
            distribute, or modify content without permission.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">6. Third-Party Services</h2>
          <p className="mb-6  text-gray-700">
            NeoZaar may integrate with cloud marketplaces (AWS, Azure, GCP), CRM
            platforms, or partner systems. We are not responsible for third-party
            content or service availability.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">7. Privacy and Data Use</h2>
          <p className="mb-6  text-gray-700">
            Please refer to our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            for information on how we collect, store, and use your data. We do
            not sell your data or share it with unauthorized third parties.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">8. Termination</h2>
          <p className="mb-6  text-gray-700">
            We may suspend or terminate your access to NeoZaar if we believe you
            have violated these terms or acted against the spirit of the platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">9. Disclaimers</h2>
          <p className="mb-6  text-gray-700">
            NeoZaar is provided “as is” and “as available.” We disclaim warranties
            of any kind, express or implied, including merchantability or fitness
            for a particular purpose.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">
            10. Limitation of Liability
          </h2>
          <p className="mb-6  text-gray-700">
            NeoZaar shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the platform or reliance
            on its content.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">11. Changes to These Terms</h2>
          <p className="mb-6  text-gray-700">
            We reserve the right to revise these Terms of Use at any time.
            Continued use of the platform indicates your acceptance of any changes.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-black">12. Contact Us</h2>
          <p className=" text-gray-700">
            For questions about these terms, contact:{" "}
            <a
              href="mailto:legal@neozaar.com"
              className="text-blue-600 hover:underline"
            >
              legal@neozaar.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
