'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons from lucide-react

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
    acceptTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'text-gray-400',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    }
  });

  const role_id = 1;

  // Check password strength
  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(requirements).filter(Boolean).length;
    let message = '';
    let color = '';

    switch (score) {
      case 5:
        message = 'Very Strong';
        color = 'text-green-500';
        break;
      case 4:
        message = 'Strong';
        color = 'text-green-400';
        break;
      case 3:
        message = 'Good';
        color = 'text-yellow-500';
        break;
      case 2:
        message = 'Weak';
        color = 'text-orange-500';
        break;
      case 1:
        message = 'Very Weak';
        color = 'text-red-500';
        break;
      default:
        message = '';
        color = 'text-gray-400';
    }

    setPasswordStrength({
      score,
      message,
      color,
      requirements
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    const personalDomains = [
      "gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com",
      "icloud.com", "protonmail.com", "zoho.com", "mail.com", "live.com", "gmx.com"
    ];

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.includes(' ')) {
      newErrors.email = "Email cannot contain spaces";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const requirements = passwordStrength.requirements;
      
      if (!requirements.length) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (!requirements.uppercase) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!requirements.lowercase) {
        newErrors.password = "Password must contain at least one lowercase letter";
      } else if (!requirements.number) {
        newErrors.password = "Password must contain at least one number";
      } else if (!requirements.special) {
        newErrors.password = "Password must contain at least one special character (!@#$%^&* etc.)";
      } else if (passwordStrength.score < 4) {
        newErrors.password = "Password is not strong enough. Please make it stronger";
      }
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const cleanedMobile = formData.mobile.replace(/\D/g, '');
      if (cleanedMobile.length < 10) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number";
      } else if (cleanedMobile.length > 13) {
        newErrors.mobile = "Mobile number is too long";
      }
    }

    // Company name validation
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
    } else if (formData.company_name.length < 2) {
      newErrors.company_name = "Company name must be at least 2 characters";
    } else if (formData.company_name.length > 100) {
      newErrors.company_name = "Company name is too long (max 100 characters)";
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms of Use and Privacy Policy to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}user/register`, {
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
          },
        }),
      });

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        toast.error('Server error: Invalid response from server');
        return;
      }

      if (res.ok) {
        toast.success(data.message || 'Registration successful! Welcome aboard!');
        if (data.data?.user?.role_type === 'CLIENT') {
          setTimeout(() => {
            router.push('/auth/success');
          }, 1500);
        }
      } else {
        // Handle specific server errors
        if (data.message?.toLowerCase().includes('email') || data.message?.toLowerCase().includes('already exists')) {
          toast.error('This email is already registered. Please use a different email or try logging in.');
        } else if (data.message?.toLowerCase().includes('phone') || data.message?.toLowerCase().includes('mobile')) {
          toast.error('This mobile number is already registered.');
        } else {
          toast.error(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Check password strength when password changes
    if (field === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }));
  };

  // Password requirement checklist component
  const PasswordRequirements = () => (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
      <div className="grid grid-cols-2 gap-1 text-xs">
        {[
          { key: 'length', label: 'At least 8 characters' },
          { key: 'uppercase', label: 'One uppercase letter' },
          { key: 'lowercase', label: 'One lowercase letter' },
          { key: 'number', label: 'One number' },
          { key: 'special', label: 'One special character' },
        ].map((req) => (
          <div key={req.key} className="flex items-center">
            <span className={`mr-2 ${passwordStrength.requirements[req.key] ? 'text-green-500' : 'text-gray-500'}`}>
              {passwordStrength.requirements[req.key] ? '✓' : '○'}
            </span>
            <span className={passwordStrength.requirements[req.key] ? 'text-green-400' : 'text-gray-400'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
      {formData.password && passwordStrength.message && (
        <div className={`mt-2 text-xs font-medium ${passwordStrength.color}`}>
          Password strength: {passwordStrength.message}
          <div className="w-full bg-gray-700 h-1 mt-1 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                passwordStrength.score === 1 ? 'w-1/5 bg-red-500' :
                passwordStrength.score === 2 ? 'w-2/5 bg-orange-500' :
                passwordStrength.score === 3 ? 'w-3/5 bg-yellow-500' :
                passwordStrength.score === 4 ? 'w-4/5 bg-green-400' :
                passwordStrength.score === 5 ? 'w-full bg-green-500' :
                'w-0'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1920px] m-auto">
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            style: {
              background: '#065f46',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#7f1d1d',
              color: '#fff',
            },
          },
        }}
      />
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
            {[
              { 
                label: 'Full Name', 
                key: 'name',
                validationMessage: 'Enter your full name as it appears on official documents'
              },
              { 
                label: 'Work Email', 
                key: 'email', 
                type: 'email',
                validationMessage: 'Please use your company email address'
              },
              { 
                label: 'Password', 
                key: 'password', 
                type: 'password',
                validationMessage: 'Create a strong password with mix of letters, numbers, and symbols'
              },
              { 
                label: 'Company Name', 
                key: 'company_name',
                validationMessage: 'Enter your registered company name'
              },
            ].map(({ label, key, type = 'text', validationMessage }) => (
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
                      className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-white  transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
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
                {errors[key] ? (
                  <p className="text-red-400 text-xs mt-2">{errors[key]}</p>
                ) : (
                  <p className="text-gray-500 text-xs mt-2">{validationMessage}</p>
                )}
                {key === 'password' && <PasswordRequirements />}
              </div>
            ))}

            {/* Phone Number */}
            <div>
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
                      placeholder: 'Mobile Number'
                    }}
                  />
                </div>
              </div>
              {errors.mobile ? (
                <p className="text-red-500 text-xs mt-2">{errors.mobile}</p>
              )  : (
                <p className="text-gray-500 text-xs mt-2">Enter your 10-digit mobile number with country code</p>
              )}
            </div>
            
            {/* Checkbox Section */}
            <div className="mt-6 p-3 border border-zinc-800 rounded bg-zinc-900/50">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="accept"
                  id="accept"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-5 w-5 text-orange-600 bg-zinc-900 border-zinc-700 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                />
                <label htmlFor="accept" className="ml-3 text-sm text-zinc-300">
                  I have read and agree to the{' '}
                  <Link 
                    href="/terms-of-use/" 
                    className="font-semibold text-orange-400 hover:text-orange-300 underline"
                    target="_blank"
                  >
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link 
                    href="/privacy-policy" 
                    className="font-semibold text-orange-400 hover:text-orange-300 underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>.
                </label>
              </div>
              {errors.acceptTerms ? (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <span className="mr-1">⚠</span> {errors.acceptTerms}
                </p>
              ) : formData.acceptTerms ? (
                <p className="text-green-400 text-xs mt-2 flex items-center">
                  <span className="mr-1">✓</span> Terms accepted
                </p>
              ) : (
                <p className="text-gray-500 text-xs mt-2">
                  Please read and accept the terms to continue
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className={`w-full py-3 text-white font-medium transition-all duration-300 text-lg ${
                loading || !formData.acceptTerms
                  ? 'bg-gray-700 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 hover:shadow-lg hover:shadow-orange-900/30'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'SIGN UP NOW'
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              By signing up, you agree to receive important updates about your account
            </p>
          </form>

          <p className="mt-8 text-sm text-zinc-500 text-center">
            Already Have an Account?{' '}
            <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-semibold underline ml-1">
              Sign In Here
            </Link>
          </p>
        </div>

        {/* Right image section */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto">
          <div className="h-full w-full bg-cover bg-center relative bg-[url('/assests/loginbg.png')]">
            <div className="flex items-center justify-center h-full px-6 py-10 md:py-0">
              <p className="text-white dark:text-white font-light text-[26px] md:text-[35px] leading-snug text-center md:text-left font-['CreatoDisplay-Light',_sans-serif] max-w-[90%] md:max-w-[366px]">
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