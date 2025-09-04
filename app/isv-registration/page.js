'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const router = useRouter();

  const [legalEntityTypes, setlegalEntityTypes] = useState([
    { value: "Private Limited", name: "Private Limited" },
    { value: "Public Limited", name: "Public Limited" },
    { value: "Sole Proprietorship", name: "Sole Proprietorship" },
    { value: "Partnership", name: "Partnership" },
    { value: "Other", name: "Other" },
  ]);
  const [legalEntityTypesData, setlegalEntityTypesData] = useState(null);

  const [headquaterCountry, setHeadquaterCountry] = useState([
    { value: "India", name: "India" },
    { value: "United States", name: "United States" },
    { value: "United Kingdom", name: "United Kingdom" },
    { value: "Germany", name: "Germany" },
    { value: "France", name: "France" },
    { value: "Other", name: "Other" },
  ]);
  const [headquaterCountryData, setheadquaterCountryData] = useState(null);

  // Form state
  const role_id = 2;
  const [company_name, setCompanyName] = useState('');
  const [company_registration_number, setCompanyNumber] = useState('');
  const [country_type, setCountryType] = useState('IN');
  const [registered_business_name, setCompanyregisterName] = useState('');
  const [brand_name, setBrandtName] = useState('');
  const [website_url, setCompanyWebsite] = useState('');
  const [linkedin_url, setLinkedin] = useState('');
  const [brand_logo, setBrandLogo] = useState(null);
  const [brandLogoName, setBrandLogoName] = useState('');
  const [headquater_country, setHeadQuater] = useState('');
  const [tax_id, setTaxId] = useState('');
  const [tax_type, setTaxType] = useState('GST');
  const [Legal_entity_type, setLegalEntityType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [designation, setDesignation] = useState('');
  const [competencies_certifications, setBusinessDescription] = useState('');
  const [existing_marketplace_listing, setExistingMarket] = useState([]);
  const [cloud_partnership, setCloudPartnership] = useState([]);
  const [preferred_engagement, setPreferred] = useState('');
  const [neozaar_tc, setNeozaartc] = useState(false);
  const [data_privacy, setDataPrivacy] = useState(false);
  const [businessCert, setBusinessCert] = useState(null);
  const [businessCertName, setBusinessCertName] = useState('');

  // Platform and marketplace states
  const [platforms, setPlatforms] = useState([
    { id: 'aws', label: 'AWS' },
    { id: 'azure', label: 'Azure' },
    { id: 'gcp', label: 'GCP' },
  ]);
  const [marketplace, setMarketplace] = useState([
    { id: 'aws', label: 'AWS' },
    { id: 'azure', label: 'Azure' },
    { id: 'gcp', label: 'GCP' },
  ]);
  const [showPlatformInput, setShowPlatformInput] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [showMarketplaceInput, setShowMarketplaceInput] = useState(false);
  const [newMarketplace, setNewMarketplace] = useState('');

  // Handle field blur events
  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    // Validate the specific field immediately when it loses focus
    if (step === 1) {
      validateFieldStep1(fieldName);
    } else if (step === 2) {
      validateFieldStep2(fieldName);
    } else if (step === 3) {
      validateFieldStep3(fieldName);
    }
  };

  // Individual field validation for Step 1
  const validateFieldStep1 = (fieldName) => {
    const newErrors = { ...errors };
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    const nameRegex = /^[A-Za-z\s]+$/;

    switch (fieldName) {
      case 'company_name':
        if (!company_name.trim()) {
          newErrors.company_name = "Please provide your company name.";
        } else if (!nameRegex.test(company_name)) {
          newErrors.company_name = "Company name should only contain letters and spaces.";
        } else {
          delete newErrors.company_name;
        }
        break;
      
      case 'registered_business_name':
        if (!registered_business_name.trim()) {
          newErrors.registered_business_name = "Please provide your company registration name.";
        } else if (!nameRegex.test(registered_business_name)) {
          newErrors.registered_business_name = "Registration name should only contain letters and spaces.";
        } else {
          delete newErrors.registered_business_name;
        }
        break;
      
      case 'company_registration_number':
        if (!company_registration_number.trim()) {
          newErrors.company_registration_number = "Please provide your company registration number.";
        } else if (country_type === "IN" && !/^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/.test(company_registration_number)) {
          newErrors.company_registration_number = "Please provide a valid company registration number.";
        } else if (country_type === "UAE" && !/^\d{2}-\d{7}$/.test(company_registration_number)) {
          newErrors.company_registration_number = "Please provide a valid company registration number.";
        } else {
          delete newErrors.company_registration_number;
        }
        break;
      
      case 'brand_name':
        if (!brand_name.trim()) {
          newErrors.brand_name = "Please provide the brand name.";
        } else if (!nameRegex.test(brand_name)) {
          newErrors.brand_name = "Brand name should only contain letters and spaces.";
        } else {
          delete newErrors.brand_name;
        }
        break;
      
      case 'website_url':
        if (!website_url.trim()) {
          newErrors.website_url = "Please provide your website link.";
        } else if (!websiteRegex.test(website_url)) {
          newErrors.website_url = "Enter a valid website URL.";
        } else {
          delete newErrors.website_url;
        }
        break;
      
      case 'tax_id':
        if (!tax_id.trim()) {
          newErrors.tax_id = "Please provide your Tax ID.";
        } 
        break;
      
      case 'headquater_country':
        if (!headquater_country.trim()) {
          newErrors.headquater_country = "Please provide the headquarters country.";
        } else {
          delete newErrors.headquater_country;
        }
        break;
      
      case 'Legal_entity_type':
        if (!Legal_entity_type) {
          newErrors.Legal_entity_type = "Please select your legal entity type.";
        } else {
          delete newErrors.Legal_entity_type;
        }
        break;
      
      case 'brand_logo':
        if (!brand_logo) {
          newErrors.brand_logo = "Please upload your brand logo.";
        } else {
          if (!ALLOWED_TYPES.includes(brand_logo.type)) {
            newErrors.brand_logo = "Only png, jpg, jpeg, webp, or svg files are allowed.";
          } else if (brand_logo.size > MAX_FILE_SIZE) {
            newErrors.brand_logo = "File size must not exceed 1 MB.";
          } else {
            delete newErrors.brand_logo;
          }
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Individual field validation for Step 2
  const validateFieldStep2 = (fieldName) => {
    const newErrors = { ...errors };
    const nameRegex = /^[A-Za-z\s]+$/;
    const validateEmail = (email) => {
      if (!website_url) return false;
      const parts = website_url.split('www.');
      const companyDomain = parts.length > 1 ? parts[1] : website_url.replace(/https?:\/\//, '').replace('www.', '');
      const domain = email.split('@')[1]?.toLowerCase();
      return companyDomain === domain;
    };

    switch (fieldName) {
      case 'name':
        if (!name.trim()) {
          newErrors.name = "Please provide the Personal Name";
        } else if (!nameRegex.test(name)) {
          newErrors.name = "Personal name should only contain letters and spaces.";
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'designation':
        if (!designation.trim()) {
          newErrors.designation = " Please provide the Designation";
        } else if (!nameRegex.test(designation)) {
          newErrors.designation = "Designation should only contain letters and spaces.";
        } else {
          delete newErrors.designation;
        }
        break;
      
      case 'mobile':
        if (!mobile.trim()) {
          newErrors.mobile = "Please Provide Mobile Number";
        } else {
          delete newErrors.mobile;
        }
        break;
      
      case 'password':
        if (!password.trim()) {
          newErrors.password = 'Password is required.';
        } else if (password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters.';
        } else {
          delete newErrors.password;
        }
        break;
      
      case 'email':
        if (!email.trim()) {
          newErrors.email = "Please Provide Email Address";
        } else if (!validateEmail(email)) {
          newErrors.email = "Please provide an official (non-personal) email address";
        } else {
          delete newErrors.email;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Individual field validation for Step 3
  const validateFieldStep3 = (fieldName) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'neozaar_tc':
        if (!Boolean(neozaar_tc)) {
          newErrors.neozaar_tc = "Please agree to the Terms & Conditions";
        } else {
          delete newErrors.neozaar_tc;
        }
        break;
      
      case 'data_privacy':
        if (!Boolean(data_privacy)) {
          newErrors.data_privacy = "Please agree to the Privacy Policy";
        } else {
          delete newErrors.data_privacy;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Form navigation
  const handleNext = async () => {
    // Mark all fields as touched when trying to proceed to next step
    const allFieldsTouched = {};
    
    if (step === 1) {
      // Add all step 1 fields to touched
      const step1Fields = [
        'company_name', 'registered_business_name', 'company_registration_number', 
        'brand_name', 'website_url', 'tax_id', 'headquater_country', 'Legal_entity_type', 'brand_logo'
      ];
      step1Fields.forEach(field => {
        allFieldsTouched[field] = true;
      });
      
      setTouched({ ...touched, ...allFieldsTouched });
      
      if (validateStep1()) {
        setStep(2);
      } else {
        toast.error("Please fill all required fields correctly");
      }
    } else if (step === 2) {
      // Add all step 2 fields to touched
      const step2Fields = ['name', 'designation', 'mobile', 'password', 'email'];
      step2Fields.forEach(field => {
        allFieldsTouched[field] = true;
      });
      
      setTouched({ ...touched, ...allFieldsTouched });
      
      if (validateStep2()) {
        setStep(3);
      } else {
        toast.error("Please fill all required fields correctly");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // File handling
  const handleBrandLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandLogo(file);
      setBrandLogoName(file.name);
      
      // Validate the file
      const MAX_FILE_SIZE = 1 * 1024 * 1024;
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
      const newErrors = { ...errors };
      
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.brand_logo = "Only png, jpg, jpeg, webp, or svg files are allowed.";
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.brand_logo = "File size must not exceed 1 MB.";
      } else {
        delete newErrors.brand_logo;
      }
      
      setErrors(newErrors);
    }
  };

  const removeBrandLogo = () => {
    setBrandLogo(null);
    setBrandLogoName('');
    
    // Clear the error
    const newErrors = { ...errors };
    delete newErrors.brand_logo;
    setErrors(newErrors);
  };

  const handleBusinessCertChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBusinessCert(file);
      setBusinessCertName(file.name);
    }
  };

  const removeBusinessCert = () => {
    setBusinessCert(null);
    setBusinessCertName('');
  };

  // Platform and marketplace management
  const handleAddPlatform = () => {
    if (newPlatform.trim()) {
      const id = newPlatform.toLowerCase().replace(/\s+/g, '-');
      setPlatforms([...platforms, { id, label: newPlatform }]);
      setNewPlatform('');
      setShowPlatformInput(false);
    }
  };

  const handleAddMarketplace = () => {
    if (newMarketplace.trim()) {
      const id = newMarketplace.toLowerCase().replace(/\s+/g, '-');
      setMarketplace([...marketplace, { id, label: newMarketplace }]);
      setNewMarketplace('');
      setShowMarketplaceInput(false);
    }
  };

  const handlePlatformCheckboxChange = (platformId, isChecked) => {
    if (isChecked) {
      setCloudPartnership([...cloud_partnership, platformId]);
    } else {
      setCloudPartnership(cloud_partnership.filter(id => id !== platformId));
    }
  };

  const handleMarketplaceCheckboxChange = (marketplaceId, isChecked) => {
    if (isChecked) {
      setExistingMarket([...existing_marketplace_listing, marketplaceId]);
    } else {
      setExistingMarket(existing_marketplace_listing.filter(id => id !== marketplaceId));
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    const MAX_FILE_SIZE = 1 * 1024 * 1024; 
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!company_name.trim()) {
      newErrors.company_name = "Please provide your company name.";
    } else if (!nameRegex.test(company_name)) {
      newErrors.company_name = "Company name should only contain letters and spaces.";
    }

    if (!registered_business_name.trim()) {
      newErrors.registered_business_name = "Please provide your company registration name.";
    } else if (!nameRegex.test(registered_business_name)) {
      newErrors.registered_business_name = "Registration name should only contain letters and spaces.";
    }
        
    if (!company_registration_number.trim()) newErrors.company_registration_number = "Please provide your company registration number.";
    
    
    if (!brand_name.trim()) {
      newErrors.brand_name = "Please provide the brand name.";
    } else if (!nameRegex.test(brand_name)) {
      newErrors.brand_name = "Brand name should only contain letters and spaces.";
    }
    
    if (!website_url.trim()) newErrors.website_url = "Please provide your website link.";
    else if (!websiteRegex.test(website_url)) newErrors.website_url = "Enter a valid website URL.";
    
    if (!tax_id.trim()) newErrors.tax_id = "Please provide your Tax ID.";
   
    
    if (!headquater_country.trim()) newErrors.headquater_country = "Please provide the headquarters country.";
    
    if (!brand_logo) {
      newErrors.brand_logo = "Please upload your brand logo.";
    } else {
      if (!ALLOWED_TYPES.includes(brand_logo.type)) {
        newErrors.brand_logo = "Only png, jpg, jpeg, webp, or svg files are allowed.";
      }

      if (brand_logo.size > MAX_FILE_SIZE) {
        newErrors.brand_logo = "File size must not exceed 1 MB.";
      }
    }
    
    if (!Legal_entity_type) {
      newErrors.Legal_entity_type = "Please select your legal entity type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const newErrors = {};
   const validateEmail = (email) => {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && !personalDomains.includes(domain);
    };

    if (!name.trim()) {
      newErrors.name = "Please provide the Personal Name";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "Personal name should only contain letters and spaces.";
    }
    
    if (!designation.trim()) {
      newErrors.designation = " Please provide the Designation";
    } else if (!nameRegex.test(designation)) {
      newErrors.designation = "Designation should only contain letters and spaces.";
    }
    
    if (!mobile.trim()) newErrors.mobile = "Please Provide Mobile Number";
    
    if (!password.trim()) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    
    if (!email.trim()) newErrors.email = "Please Provide Email Address";
    else if (!validateEmail(email)) newErrors.email = "Please provide an official (non-personal) email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!Boolean(neozaar_tc)) newErrors.neozaar_tc = "Please agree to the Terms & Conditions";
    if (!Boolean(data_privacy)) newErrors.data_privacy = "Please agree to the Privacy Policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all step 3 fields as touched
    const allFieldsTouched = {
      neozaar_tc: true,
      data_privacy: true
    };
    setTouched({ ...touched, ...allFieldsTouched });
    
    if (validateStep3()) {
      toast.loading('Submitting form...');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('password', password);
      formData.append('role_id', role_id);
      formData.append('company_name', company_name);
      formData.append('registered_business_name', registered_business_name);
      formData.append('brand_name', brand_name);
      formData.append('Legal_entity_type', Legal_entity_type);
      formData.append('tax_id', tax_id);
      formData.append('headquater_country', headquater_country);
      formData.append('website_url', website_url);
      formData.append('linkedin_url', linkedin_url);
      formData.append('cloud_partnership', JSON.stringify(cloud_partnership));
      formData.append('existing_marketplace_listing', JSON.stringify(existing_marketplace_listing));
      formData.append('neozaar_tc', neozaar_tc);
      formData.append('preferred_engagement', preferred_engagement);
      formData.append('competencies_certifications', competencies_certifications);
      formData.append('designation', designation);
      formData.append('company_registration_number', company_registration_number);
      formData.append('data_privacy', data_privacy);

      if (brand_logo) formData.append('brand_logo', brand_logo);
      if (businessCert) formData.append('business_certification', businessCert);

      try {
        const res = await fetch('http://20.83.163.38:5000/api/user/register', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          toast.success('Registration successful!');
          router.push('/auth/login');
        } else {
          toast.error(data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    } else {
      toast.error("Please agree to the Terms & Conditions and Privacy Policy");
    }
  };

  function legalEntityInput(e) {
    e.preventDefault();
    const data = {
      name: e.target.value,
      value: e.target.value
    };

    setlegalEntityTypesData(data);
  }

  function handleSubmitOther() {
    if (legalEntityTypesData != null) {
      setlegalEntityTypes([legalEntityTypesData, ...legalEntityTypes]);
      if (Legal_entity_type === "Other") {
        setLegalEntityType(legalEntityTypesData.value);
      }
    }
  }

  function headquaterCountryInput(e) {
    e.preventDefault();
    const data = {
      name: e.target.value,
      value: e.target.value
    };

    setheadquaterCountryData(data);
  }

  function handleSubmitOtherHC() {
    if (headquaterCountryData != null) {
      setHeadquaterCountry([headquaterCountryData, ...headquaterCountry]);
      if (headquater_country === "Other") {
        setHeadQuater(headquaterCountryData.value);
      }
    }
  }
  return (
    <div className='max-w-[1920px] m-auto flex'>
      <div className='h-[100vh] w-[295px] bg-[#212121] hidden lg:flex items-center justify-between'>
        <div className='z-10 w-[260px] mx-5 h-80'>
          <div className='div'>
            <ul>
              <li className='flex gap-2 h-32'>
                <div className='p-0.5 bg-[#212121] block w-6 h-6'>
                  <div className='border border-white w-5 h-5 p-0.5 flex items-center'>
                    <div className='relative w-4 h-4 bg-gray-400'>
                      <Image fill src={step === 1 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='text-white text-sm w-56'>Company & Brand Information</h1>
                  <p className='text-gray-500 text-[10px] w-56'>Tell us who you are and how you’d like your brand to be represented on NeoZaar. This helps us feature your offerings with accurate branding and compliance.</p>
                </div>
              </li>
              <li className='flex gap-2 h-32'>
                <div className='relative flex flex-col items-center'>
                  <div className='relative z-10 before:content-[""] before:absolute before:top-[-104px] before:left-1/2 before:-translate-x-1/2 before:h-[103px] before:w-px before:bg-white
                     after:content-[""] after:absolute after:bottom-[-104px] after:left-1/2 after:-translate-x-1/2 after:h-[103px] after:w-px after:bg-white'>
                    <div className='p-0.5 bg-[#212121] block w-6 h-6'>
                      <div className='border border-white w-5 h-5 p-0.5 flex items-center justify-center'>
                        <div className='relative w-4 h-4 bg-gray-400'>
                          <Image fill className='bg-white' src={step <= 2 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='text-white text-sm w-56'>Primary Contact</h1>
                  <p className='text-gray-500 text-[10px] w-56'>Enter the details of your go-to representative. This person will receive all listing updates, deal alerts, and onboarding communications from our team.</p>
                </div>
              </li>
              <li className='flex gap-2 h-32'>
                <div className='p-0.5 bg-[#212121] block w-6 h-6'>
                  <div className='border border-white w-5 h-5 p-0.5 flex items-center'>
                    <div className='relative w-4 h-4'>
                      <Image fill src={step <= 3 ? '/assests/heart-handshake.png' : '/assests/checkcomplete.png'} alt="building" />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='text-white text-sm w-56'>Partner & Engage</h1>
                  <p className='text-gray-500 text-[10px] w-56'>Let us know how you plan to engage — list your products, offer bundles, or provide services. We’ll use this info to recommend the best GTM opportunities and bundle placements for your brand.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='absolute w-24 h-[90vh]'>
          <div className='relative w-full h-full'>
            <Image fill src="/assests/v-log.png" alt="Logo" className='z-0' />
          </div>
        </div>
      </div>
      <div className='h-[100vh] w-full overflow-y-scroll'>
        <div className='w-10/12 md:w-8/12 mx-auto py-10'>
          <h1 className='text-4xl font-medium dark:text-black'>ISV Registration</h1>
          <p className='text-xs text-zinc-500 mt-2'>List your SaaS, launch private offers, and unlock cloud-aligned growth and CoSell Opportunities.</p>
          <form onSubmit={handleSubmit} className='my-7 space-y-4 grid grid-cols-2 gap-2 md:gap-3'>
            {step === 1 && (
              <>
                <div className='col-span-2'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Company Name</label>
                  <input
                    type='text'
                    value={company_name}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.company_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.company_name && (<p className="text-red-500 text-sm mt-1">{errors.company_name}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Brand name</label>
                  <input
                    type='text'
                    value={brand_name}
                    onChange={(e) => setBrandtName(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.brand_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.brand_name && (<p className="text-red-500 text-sm mt-1">{errors.brand_name}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Group / Holding Company (same as company name)</label>
                  <input
                    type='text'
                    value={registered_business_name}
                    onChange={(e) => setCompanyregisterName(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.registered_business_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.registered_business_name && (<p className="text-red-500 text-sm mt-1">{errors.registered_business_name}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Register Company number</label>
                  <div className='flex'>
           

                  <input
                    type='text'
                    value={company_registration_number}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.company_registration_number ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  </div>
                  {errors.company_registration_number && (<p className="text-red-500 text-sm mt-1">{errors.company_registration_number}</p>)}
                </div>
                
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Legal Entity Type</label>

                  <select
                    value={Legal_entity_type}
                    onChange={(e) => setLegalEntityType(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.Legal_entity_type ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  >
                    <option value="" disabled>Select an option</option>
                    {
                      legalEntityTypes.map((item, i) => (
                        <option key={i} value={item.value}>{item.name}</option>
                      ))
                    }
                  </select>

                  {
                    Legal_entity_type === "Other" && <div className="m-2 flex gap-2 ">
                      <input type="text" name="" onChange={legalEntityInput} placeholder='add legal entity type' className='bg-zinc-100 outline-1 p-1' />
                      <button onClick={handleSubmitOther} className='bg-gray-950  text-white p-1 rounded cursor-pointer px-3'>Add</button>
                    </div>
                  }


                  {errors.Legal_entity_type && (<p className="text-red-500 text-sm mt-1">{errors.Legal_entity_type}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Tax id</label>
                  <div className='flex'>
                   
                    <input
                      type='text'
                      value={tax_id}
                      onChange={(e) => setTaxId(e.target.value)}
                      className={`w-full py-2 px-3  dark:text-black border ${errors.tax_id ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'} outline-0`}
                    />
                  </div>
                  {errors.tax_id && (<p className="text-red-500 text-sm mt-1">{errors.tax_id}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-gray-500 font-medium font-sans'>Headquarter country</label>
                  <select
                    id="entityType"
                    value={headquater_country}
                    onChange={(e) => setHeadQuater(e.target.value)}
                    className={`border ${errors.headquater_country ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'} dark:text-black py-2.5 px-3 w-full`}
                  >
                    <option value="" disabled className='dark:text-black'>Select an option</option>
                    {
                      headquaterCountry.map((item, i) => (
                        <option key={i} value={item.value} className='dark:text-black'>{item.name}</option>
                      ))
                    }
                  </select>

                  {
                    headquater_country === "Other" && <div className="m-2 flex gap-2 ">
                      <input type="text" name="" onChange={headquaterCountryInput} placeholder='add legal entity type' className='bg-zinc-100 outline-1 p-1' />
                      <button onClick={handleSubmitOtherHC} className='bg-gray-950  text-white p-1 rounded cursor-pointer px-3'>Add</button>
                    </div>
                  }

                  {errors.headquater_country && (<p className="text-red-500 text-sm mt-1">{errors.headquater_country}</p>)}
                </div>
                <div className='col-span-2'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Website url</label>
                  <input
                    type='text'
                    placeholder=''
                    value={website_url}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className={`w-full py-2 px-3 outline-0 border dark:text-black ${errors.website_url ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.website_url && (<p className="text-red-500 text-sm mt-1">{errors.website_url}</p>)}
                </div>
                <div className='col-span-2'>
                  <label className='text-sm  font-medium dark:text-black font-sans'>Linkedin url</label>
                  <input
                    type='text'
                    placeholder=''
                    value={linkedin_url}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={`w-full py-2 px-3 outline-0 dark:text-black border ${errors.linkedin_url ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.linkedin_url && (<p className="text-red-500 text-sm mt-1">{errors.linkedin_url}</p>)}
                </div>
                <div className="col-span-2">
                  <label htmlFor="brand_logo" className="text-sm dark:text-black font-medium font-sans">
                    Upload Brand Logo
                  </label>
                  <label
                    htmlFor="brand_logo"
                    className={`cursor-pointer text-sm dark:text-black font-medium font-sans border ${errors.brand_logo
                      ? 'border-red-300 bg-red-500/10 text-red-400'
                      : 'border-zinc-200 bg-zinc-100 text-zinc-400'
                      } py-2 px-3 w-full text-center border-dashed flex justify-center`}
                  >
                    <div className="flex gap-2 items-center">
                      <i className="ri-upload-2-line"></i>
                      Upload
                    </div>
                  </label>
                  <input
                    type="file"
                    id="brand_logo"
                    className="hidden"
                    onChange={handleBrandLogoChange}
                  />
                  {errors.brand_logo && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand_logo}</p>
                  )}
                  {brand_logo && (
                    <div className="mt-1 flex items-center justify-between px-3 py-2 rounded">
                      <p className="text-sm text-zinc-700 truncate">
                        <i className="ri-checkbox-circle-fill text-green-400"></i> {brandLogoName}
                      </p>
                      <button
                        onClick={removeBrandLogo}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="col-span-2">
                  <label className="text-sm dark:text-black font-medium font-sans"> Full Name</label>
                  <input
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.name ? 'border-red-200 bg-red-500/10' : "border-zinc-200 bg-zinc-100"}`}
                  />
                  {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm dark:text-black font-medium font-sans">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.designation ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.designation && (<p className="text-red-500 text-sm mt-1">{errors.designation}</p>)}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm dark:text-black font-medium font-sans">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.email ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'
                      }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="text-sm dark:text-black font-medium font-sans">Phone number</label>
                  <PhoneInput
                    country={'in'}
                    value={mobile}
                    onChange={setMobile}
                    inputClass={`!w-full !px-14 !py-3 !text-sm !rounded-none !outline-none ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100'
                      }`}
                    containerClass="!w-full"
                    buttonClass={`px-10 ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100'
                      }`}
                    inputProps={{
                      name: 'mobile',
                      required: true,
                    }}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                <div className="col-span-2 relative">
                  <label className="text-sm dark:text-black font-medium font-sans">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.password ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-zinc-500 hover:text-zinc-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                {/* ☁️ Cloud Partnerships */}
                <div className="col-span-2">
                  <label className="text-sm font-semibold dark:text-black font-sans mb-1">Cloud Partnerships</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 flex-wrap">
                      {platforms.map((platform) => (
                        <div key={platform.id + "cloud"}>
                          <input
                            type="checkbox"
                            id={platform.id + "cloud"}
                            checked={cloud_partnership.includes(platform.id)}
                            onChange={(e) => handlePlatformCheckboxChange(platform.id, e.target.checked)}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={platform.id + "cloud"}
                            className="w-20 h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-2 dark:text-black peer-checked:bg-black peer-checked:text-white"
                          >
                            {platform.label}
                          </label>
                        </div>
                      ))}
                      {!showPlatformInput && (
                        <button
                          type="button"
                          onClick={() => setShowPlatformInput(true)}
                          className="w-8 h-8 rounded-3xl bg-zinc-300 dark:text-black text-lg flex justify-center items-center"
                        >
                          +
                        </button>
                      )}
                    </div>
                    {showPlatformInput && (
                      <div className="flex items-center gap-2 pe-1 border border-zinc-200 w-[260px] rounded-xl">
                        <input
                          type="text"
                          value={newPlatform}
                          onChange={(e) => setNewPlatform(e.target.value)}
                          placeholder="Enter cloud name"
                          className="px-3 py-1 outline-0 dark:text-black rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowPlatformInput(false);
                            setNewPlatform('');
                          }}
                          className="text-zinc-400 hover:text-zinc-500"
                          title="Cancel"
                        >
                          <i className="ri-close-fill text-red-600 dark:text-red-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddPlatform}
                          className="text-zinc-400 hover:text-zinc-500"
                          title="Add"
                        >
                          <i className="ri-check-fill text-green-500 dark:text-green-500"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 🛒 Marketplace */}
                <div className="col-span-2">
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Existing marketplace listing</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 flex-wrap">
                      {marketplace.map((item) => (
                        <div key={item.id}>
                          <input
                            type="checkbox"
                            id={item.id}
                            checked={existing_marketplace_listing.includes(item.id)}
                            onChange={(e) => handleMarketplaceCheckboxChange(item.id, e.target.checked)}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={item.id}
                            className="w-20 h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-2 peer-checked:bg-black peer-checked:text-white dark:text-black"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                      {!showMarketplaceInput && (
                        <button
                          type="button"
                          onClick={() => setShowMarketplaceInput(true)}
                          className="w-8 h-8 rounded-3xl bg-zinc-300 text-lg flex justify-center items-center dark:text-black"
                        >
                          +
                        </button>
                      )}
                    </div>
                    {showMarketplaceInput && (
                      <div className="flex items-center gap-2 pe-1 border border-zinc-200 w-[260px] rounded-xl">
                        <input
                          type="text"
                          value={newMarketplace}
                          onChange={(e) => setNewMarketplace(e.target.value)}
                          placeholder="Enter marketplace name"
                          className="px-3 py-1 outline-0 rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowMarketplaceInput(false);
                            setNewMarketplace('');
                          }}
                          className="text-zinc-400 hover:text-zinc-500"
                          title="Cancel"
                        >
                          <i className="ri-close-fill text-red-600 dark:text-red-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddMarketplace}
                          className="text-zinc-400 hover:text-zinc-500"
                          title="Add"
                        >
                          <i className="ri-check-fill text-green-500 dark:text-green-500"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Competencies & certifications</label>
                  <textarea
                    rows="5"
                    value={competencies_certifications}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    className='w-full bg-zinc-100 border border-zinc-200'
                  ></textarea>
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans  '>Preferred engagement</label>
                  <div className='bg-zinc-100 px-1 border border-zinc-200'>
                    <select
                      id="entityType"
                      value={preferred_engagement}
                      onChange={(e) => setPreferred(e.target.value)}
                      className='bg-zinc-100 outline-0 py-2.5 px-3 w-full dark:text-black'
                    >
                      <option value=""></option>
                      <option value="Direct">Direct</option>
                      <option value="Reseller">Reseller</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="businesscert" className="text-sm dark:text-black font-medium font-sans">
                    Business Certification
                  </label>
                  <label
                    htmlFor="businesscert"
                    className="cursor-pointer text-sm dark:text-black font-medium font-sans text-zinc-400 border py-2.5 px-3 w-full text-center border-dashed flex justify-center"
                  >
                    <div className="flex items-center">
                      <Image
                        src="/assests/upload.png"
                        alt="upload"
                        width={14}
                        height={14}
                        className="me-1"
                      />
                      Upload
                    </div>
                  </label>
                  <input
                    type="file"
                    id="businesscert"
                    className="hidden"
                    onChange={handleBusinessCertChange}
                  />
                  {businessCert && (
                    <div className="mt-1 flex items-center justify-between px-3 py-2 rounded">
                      <p className="text-sm text-zinc-700 truncate">
                        <i className="ri-checkbox-circle-fill text-green-400"></i> {businessCertName}
                      </p>
                      <button
                        onClick={removeBusinessCert}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <div className='flex'>
                    <div className='me-2'>
                      <input
                        type="checkbox"
                        className="peer/terms hidden"
                        checked={!!neozaar_tc} // always boolean
                        onChange={(e) => setNeozaartc(e.target.checked)}
                        id="treamscondition"
                      />

                      <label
                        htmlFor='treamscondition'
                        className={`block bg-zinc-100 w-5 h-5 border ${errors.neozaar_tc ? 'border-red-200' : 'border-zinc-200'} peer-checked/terms:hidden`}
                      ></label>
                      <label
                        htmlFor='treamscondition' className='hidden justify-center items-center bg-black w-5 h-5 border border-black  peer-checked/terms:flex'><i className="ri-check-line text-white"></i></label>
                    </div>
                    <label htmlFor='treamscondition' className='text-sm dark:text-black '>I agree to the <a href="" className='font-semibold underline'>Terms & Conditions</a>  and consent to the collection and use of my data as outlined in the <a href="" className='font-semibold underline'>Privacy Policy</a> . </label>
                  </div>
                  {errors.neozaar_tc && <p className="text-red-500 text-sm mt-1">{errors.neozaar_tc}</p>}
                </div>
                <div className="col-span-2">
                  <div className='flex '>
                    <div className='me-2'>
                      <input type="checkbox" className=' peer/agree hidden' onChange={(e) => setDataPrivacy(e.target.checked)} checked={!!data_privacy} id="agree" />
                      <label htmlFor='agree' className={`block  bg-zinc-100  ${errors.data_privacy ? 'border-red-200' : 'border-zinc-200'} w-5 h-5 border  peer-checked/agree:hidden`}></label>
                      <label htmlFor='agree' className='hidden justify-center items-center bg-black w-5 h-5 border border-black  peer-checked/agree:flex'><i className="ri-check-line text-white"></i></label>
                    </div>
                    <label htmlFor='agree' className='text-sm dark:text-black'>I have read and agree to the Privacy Policy and consent to the use of my data for the following purposes . </label>
                  </div>
                  <ul className=' ms-10 mt-2 text-sm font-sans text-zinc-500 list-disc'>
                    <li>To provide me with the requested service.</li>
                    <li>To send me product updates and marketing communications.</li>
                    <li>To improve my user experience on this website.</li>
                    <li>To share anonymized data with third-party partners for analytics.</li>
                  </ul>
                  {errors.data_privacy && <p className="text-red-500 text-sm mt-1">{errors.data_privacy}</p>}
                </div>


              </>
            )}

            <div className="flex col-span-2 gap-4 justify-end mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 cursor-pointer w-24 h-10 bg-zinc-200 rounded-3xl text-black"
                >
                  Back
                </button>
              )}


              <button
                type={step === 3 ? "submit" : "button"}
                onClick={step === 3 ? undefined : handleNext}
                className="w-32 h-10 bg-gradient-to-r cursor-pointer from-[#f79331] via-[#e25c08] to-[#e25c08] font-sans font-semibold text-md rounded-3xl text-white"
              >
                {step === 3 ? "Submit" : (
                  <>
                    Next&nbsp;&nbsp;<i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}


