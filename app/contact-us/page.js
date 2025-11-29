'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default function Page() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errs = {};
    if (!fullName) errs.fullName = 'Full name required';
    if (!email) {
      errs.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid Email';
    }
   if (!mobile) {
  errs.mobile = 'Phone number is required';
} else if (!/^\d{12}$/.test(mobile)) {
 errs.mobile = 'Please enter a valid phone number.';
}
    if (!message) errs.message = 'Message required';
    if (!inquiryType) errs.inquiryType = 'Please select a category';
    if (!consent) errs.consent = 'You must agree to the terms and conditions';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formattedPhone = mobile.startsWith('+') ? mobile : `+${mobile}`;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          business_email: email,
          phone_number: formattedPhone,
          company_name: companyName,
          country: country || 'India',
          message,
          help_type: inquiryType,
          heard_about: referralSource || 'Other',
          consent_given: consent,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Form submitted successfully!');
        setFullName('');
        setEmail('');
        setMobile('');
        setCompanyName('');
        setCountry('');
        setMessage('');
        setInquiryType('');
        setReferralSource('');
        setConsent(false);
        setErrors({});
      } else {
        e.target.reset();
        toast.error(data.error || 'Submission failed.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-[1920px] m-auto">
        <Header></Header>
      {/* <Toaster position="top-right" /> */}
      <section className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="bg-black flex flex-col items-center px-6 py-10 w-full md:w-1/2 md:h-screen md:overflow-y-auto hide-scrollbar">
          <div className="relative h-12 w-50 mb-6 text-3xl font-bold ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-800">CONTACT US</span>
          </div>

          <p className="text-center text-white text-base md:text-lg mb-6">
            We’re here to help you with your inquiries. <br />
            Please fill out the form below and we’ll get back to you <br />
            as soon as possible.
          </p>

          <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
            <InputField label="Full Name" value={fullName} onChange={setFullName} error={errors.fullName} />
            <InputField type="email" label="BusinessEmail" value={email} onChange={setEmail} error={errors.email} />

            <div className={`flex items-center bg-zinc-900 text-sm border ${errors.mobile ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'}`}>
              <div className="text-sm w-full">
                <PhoneInput
                  country={'in'}
                  value={mobile}
                  onChange={(phone) => setMobile(phone)}
                  inputClass="!w-full !bg-transparent !text-white !px-14 !py-3 !text-sm !border-none !outline-none placeholder-gray-500"
                  containerClass={`!w-full ${errors.mobile ? '!border-red-500 !bg-red-400/15' : '!border-zinc-800 !bg-zinc-900'} !border`}
                  buttonClass="!bg-zinc-900 border-zinc-800 px-10"
                  inputProps={{ name: 'phone', required: true }}
                />
              </div>
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-2">{errors.mobile}</p>}

            <InputField label="Company Name" value={companyName} onChange={setCompanyName} />
            <InputField label="Country / Location" value={country} onChange={setCountry} />

            <div>
              <label htmlFor="inquiryType" className="text-white text-md block mb-1">
                What Do You Need Help With?
              </label>
              <select
                id="inquiryType"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className={`lg:w-full w-3xs h-[52px] text-white text-sm border px-4 py-2 focus:outline-none ${
                  errors.inquiryType ? 'border-red-500 bg-zinc-900 ' : 'border-zinc-800 bg-zinc-900'
                }`}
              >
                <option value="">-- Select Type --</option>
                <option value="Product Enquiry">Product Enquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Billing Enquiry">Billing Enquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Other">Other</option>
              </select>
              {errors.inquiryType && <p className="text-red-500 text-xs mt-2">{errors.inquiryType}</p>}
            </div>

            <div>
              <label htmlFor="message" className="text-white text-md block mb-1">
                Your Message
              </label>
              <textarea
                placeholder="describe your requirement properly"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 text-sm text-zinc-300 border resize-none ${
                  errors.message ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'
                }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message}</p>}
            </div>

            <div>
              <label htmlFor="referralSource" className="text-white text-md block mb-1">
                How Did You Hear About Us?
              </label>
              <select
                id="referralSource"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                className="w-full h-[52px] bg-zinc-900 text-white text-sm border border-zinc-800 px-4 py-2 focus:outline-none"
              >
                <option value="">-- Select Type --</option>
                <option value="Google">Google</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-start space-x-2 text-sm text-white">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-orange-500 w-4 h-4"
              />
              <label htmlFor="consent" className="cursor-pointer">
                I agree to receive communications regarding my enquiry
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs mt-2">{errors.consent}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-medium"
            >
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 relative h-[30rem] md:h-screen bg-zinc-900">
          <div className="md:absolute inset-0 p-4 md:p-10">
            <iframe
              title="NeoZaar Location"
              className="w-full h-[26rem] md:h-full border-none rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.361168874371!2d73.0059918!3d19.0664214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c145af38a625%3A0x303fd73974a38c1c!2sG%20Square%20Business%20Park!5e0!3m2!1sen!2sin!4v1721123456789!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href="https://www.google.com/maps/dir/29.2387816,79.5371673/G-Square+Business+Park,+opp,+Sanpada+Railway+Station+Road,+Sector+30A,+Vashi,+Navi+Mumbai,+Maharashtra+400703"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md text-sm md:text-lg font-medium text-blue-700 hover:underline z-10"
          >
            Get Directions
          </a>
        </div>
      </section>
<Footer></Footer>
    </div>
  );
}

function InputField({ label, value, onChange, error, type = 'text', readOnly = false }) {
  return (
    <div>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        readOnly={readOnly}
        className={`px-4 py-3 h-[52px] text-sm text-zinc-300 w-full border ${
          error ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
