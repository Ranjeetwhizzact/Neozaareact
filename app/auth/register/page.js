'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    company_name: '',
    business_email: '',
    gst: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const role_id = 1;

const validate = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
  const personalDomains = [
    "gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com",
    "icloud.com", "protonmail.com", "zoho.com", "mail.com", "live.com", "gmx.com"
  ];

  const getDomain = (email) => email.split("@")[1]?.toLowerCase();

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Minimum 8 characters";
  }

  if (!formData.mobile.trim()) {
    newErrors.mobile = "Mobile is required";
  } else if (formData.mobile.replace(/\D/g, '').length < 10) {
    newErrors.mobile = "Enter a valid phone number";
  }

  if (!formData.company_name.trim()) {
    newErrors.company_name = "Company name is required";
  }

  // if (!formData.business_email.trim()) {
  //   newErrors.business_email = "Business email required";
  // } else if (!emailRegex.test(formData.business_email)) {
  //   newErrors.business_email = "Invalid email";
  // } else if (personalDomains.includes(getDomain(formData.business_email))) {
  //   newErrors.business_email = "Please use a business email, not a personal one";
  // }

  // if (!formData.gst.trim()) {
  //   newErrors.gst = "GST number is required";
  // } else if (!gstRegex.test(formData.gst.toUpperCase())) {
  //   newErrors.gst = "Invalid GST format";
  // }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          role_id,
          profile_details: {
            company_name: formData.company_name,
            // business_email: formData.business_email,
            // gst: formData.gst.toUpperCase(),
          },
        }),
      });

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        toast.error('Server error: Invalid JSON response');
        return;
      }

      if (res.ok) {
        toast.success(data.message || 'Registration successful');
        // localStorage.setItem('token', data.data?.token || '');
        // localStorage.setItem('user', JSON.stringify(data.data?.user || {}));

        if (data.data?.user?.role_type === 'CLIENT') {
          toast.success(data.message || 'Registration successful');
          router.push('/auth/success');
        }
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-[1920px] m-auto">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <section className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left form section */}
        <div className="bg-black flex flex-col items-center px-6 py-10 w-full md:w-1/2 h-screen overflow-y-auto hide-scrollbar">
          <div className="relative h-12 w-50 mb-6">
            <Image src="/image/logo-s.png" alt="Logo" width={192} height={48} className="object-contain mb-6" />
          </div>

          <p className="text-center text-white text-base md:text-lg mb-6 w-64 lg:w-96">
            Early registration is now open—secure your place today and be among the first to benefit.
          </p>

<form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
      {[{ label: 'Name', key: 'name' },
        { label: 'Work Email', key: 'email', type: 'email' },
        { label: 'Password', key: 'password', type: 'password' },
        { label: 'Company Name', key: 'company_name' },
        // { label: 'Business Email', key: 'business_email' },
        // { label: 'GST Number', key: 'gst' },
      ].map(({ label, key, type = 'text' }) => (
        <div key={key} className="relative">
          {key === 'password' ? (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={label}
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`px-4 py-3 h-[52px] text-sm text-zinc-300 w-full border pr-12 ${
                  errors[key] ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Image
                  src="/image/RiEyeFill.png"
                  alt="Toggle password visibility"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </>
          ) : (
            <input
              type={type}
              placeholder={label}
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className={`px-4 py-3 h-[52px] text-sm text-zinc-300 w-full border ${
                errors[key] ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'
              }`}
            />
          )}
          {errors[key] && <p className="text-red-400 text-xs mt-2">{errors[key]}</p>}
        </div>
      ))}

      {/* Phone Number */}
      <div
        className={`flex items-center text-sm border ${
          errors.mobile ? 'border-red-500 bg-red-400/15' : 'border-zinc-800 bg-zinc-900'
        }`}
      >
        <div className="text-sm w-full">
          <PhoneInput
            country={'in'}
            value={formData.mobile}
            onChange={(phone) => handleChange('mobile', phone)}
            inputClass="!w-full !bg-transparent !text-white !px-14 !py-3 !text-sm !border-none !outline-none placeholder-gray-500"
            containerClass="!w-full"
            buttonClass="!bg-zinc-900 border-zinc-800 px-10"
            inputProps={{
              name: 'mobile',
              required: true,
            }}
          />
        </div>
      </div>
      {errors.mobile && <p className="text-red-500 text-xs mt-2">{errors.mobile}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-medium"
      >
        {loading ? 'Registering...' : 'REGISTER'}
      </button>
    </form>

          <p className="mt-6 text-sm text-zinc-500 text-center">
            Already Have an Account?
            {/* <Link href="/auth/login" className="text-white underline font-bold ml-1">
              Sign In
            </Link> */}
          </p>
        </div>

        {/* Right image section */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto">
          <div className="h-full w-full bg-cover bg-center relative bg-[url('/assests/loginbg.png')]">
            <div className="flex items-center justify-center h-full px-6 py-10 md:py-0">
              <p className="text-white font-light text-[26px] md:text-[35px] leading-snug text-center md:text-left font-['CreatoDisplay-Light',_sans-serif] max-w-[90%] md:max-w-[366px]">
                Access your<br />
                personalized <br />
                cloud solutions<br />
                and manage<br />
                your bundled<br />
                services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
