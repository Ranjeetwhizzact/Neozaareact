'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';
import { Fascinate } from 'next/font/google';
import { NextSeo } from 'next-seo';




export default function Page() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const router = useRouter();
  const [loading, setloading] = useState(false)

  const [legalEntityTypes, setlegalEntityTypes] = useState([
    { value: "Private Limited", name: "Private Limited" },
    { value: "Public Limited", name: "Public Limited" },
    { value: "Sole Proprietorship", name: "Sole Proprietorship" },
    { value: "Partnership", name: "Partnership" },
    { value: "LLP", name: "LLP" },

  ]);
  const [legalEntityTypesData, setlegalEntityTypesData] = useState(null);


// Revalidate dependent fields when headquater_country changes



  const [headquaterCountry, setHeadquaterCountry] = useState([
    { value: "India", name: "India" },
    { value: "UAE", name: "UAE" },
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
  const [sla_link, setSlaLink] = useState('');
  const [terms_of_use_link, setTermsofuseurl] = useState('');
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
  const [legal_entity_type, setLegalEntityType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ support_desk_email, setDeskEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('12345689');
  // const [showPassword, setShowPassword] = useState(false);
  const [designation, setDesignation] = useState('');
  // const [competencies_certifications, setDeskEmail] = useState('');
  
  const [existing_marketplace_listing, setExistingMarket] = useState([]);
  const [cloud_partnership, setCloudPartnership] = useState([]);
  const [preferred_engagement, setPreferred] = useState('Reseller');
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

  // Revalidate dependent fields when headquater_country changes
useEffect(() => {

  
  if (touched.tax_id) {
    const error = validateField('tax_id', tax_id);
    setErrors(prev => ({ ...prev, tax_id: error }));
  }
}, [headquater_country]);

const validationRules = {
  company_name: {
    required: true,
    pattern: /^[A-Za-z]{3}[A-Za-z\s]*$/,
    message: "Company name should only contain letters and spaces."
  },

  designation: {
    required: true,
    pattern: /^[A-Za-z]{3}[A-Za-z\s]*$/,
    message: "Designation should only contain letters and spaces."
  },

  registered_business_name: {
    required: true,
    pattern: /^[A-Za-z]{3}[A-Za-z\s]*$/,
    message: "Registration name should only contain letters and spaces."
  },

sla_link: {
  required: true,
  validate: (value) => {
    if (!value || value.trim() === "") {
      return "SLA Link is required.";
    }

    // Optional: enforce https:// or http://
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;

    if (!urlPattern.test(value)) {
      return "Please enter a valid URL (e.g., https://example.com/sla).";
    }

    return null;
  },
},
terms_of_use_link: {
  required: true,
  validate: (value) => {
    if (!value || value.trim() === "") {
      return "terms_of_use_link Link is required.";
    }

    // Optional: enforce https:// or http://
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;

    if (!urlPattern.test(value)) {
      return "Please enter a valid URL (e.g., https://example.com/sla).";
    }

    return null;
  },
},

  brand_name: {
    required: true,
    pattern: /^[A-Za-z]{3}[A-Za-z\s]*$/,
    message: "Brand name should only contain letters and spaces."
  },

  website_url: {
    required: true,
    pattern: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
    message: "Enter a valid website URL."
  },

  linkedin_url: {
    required: false,
    pattern: /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_\-\.]+\/?$/,
    message: "Enter a valid LinkedIn URL."
  },

  headquater_country: {
    required: true,
    message: "Please provide the headquarters country."
  },

  tax_id: {
    required: true,
    validate: (value, allValues = {}) => {
      if (!value) return "Tax ID is required.";
      const country = allValues.headquater_country || "";
      
      if (value.length > 20) return "Tax ID must not exceed 20 characters.";

      if (country === "UAE") {
        return /^[0-9]{15}$/.test(value) ? null : "For UAE, Tax ID must be exactly 15 digits.";
      }
      if (country === "India") {
        return /^[0-9A-Z]{15}$/.test(value) ? null : "For India, Tax ID must be exactly 15 alphanumeric characters.";
      }
      
      return /^[A-Za-z0-9-]*$/.test(value) ? null : "Tax ID can only contain letters, numbers, and hyphens.";
    }
  },

  legal_entity_type: {
    required: true,
    message: "Please select your legal entity type."
  },

  brand_logo: {
    required: true,
    validate: (file) => {
      if (!file) return "Brand logo is required.";
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
      
      if (!ALLOWED_TYPES.includes(file.type)) {
        return "Please upload a valid image file (PNG, JPG, JPEG, WEBP, SVG).";
      }
      if (file.size > MAX_FILE_SIZE) {
        return "File size must be less than 1MB.";
      }
      return null;
    }
  },

  name: {
    required: true,
    pattern: /^[A-Za-z]{3}[A-Za-z\s]*$/,
    message: "Personal name should only contain letters and spaces."
  },

mobile: {
  required: true,
  validate: (value, allValues = {}) => {
    if (!value) return "Please provide a mobile number.";

    const countryPhoneLength = {
      IN: 12,
      AE: 12,
      SG: 10,
      US: 11,
      UK: 12,
      SA: 12,
      AU: 11,
      DE: 12,
      FR: 11,
    };

    const selectedCountry = allValues.country_type?.toUpperCase() || "IN";
    const minLen = countryPhoneLength[selectedCountry] ?? 8;

    const digits = value.replace(/\D/g, "");

    if (digits.length < minLen) {
      return `Please provide a valid phone number for ${selectedCountry}`;
    }

    return null;
  }
},


// password: {
//   required: true,
//   minLength: 8,
//   maxLength: 16,
//   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
//   message:
//     "Password must be 8–16 characters long and include uppercase, lowercase, number, and special character."
// }
// ,

email: {
  required: true,
  validate: (value) => {
    if (!value) return "Email is required.";

    // Validate overall email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";

    // Split email into parts
    const [prefix, domainPart] = value.split("@");
    
    // Validate prefix (before @)
    if (prefix.length < 3) {
      return "The part before @ must be at least 3 characters.";
    }

    // Check for allowed characters in prefix (letters or numbers)
    const prefixRegex = /^[A-Za-z0-9]+$/;
    if (!prefixRegex.test(prefix)) {
      return "The part before @ can contain only letters or numbers.";
    }

    // Check if domain part exists
    if (!domainPart) return "Please enter a valid email address.";
    
    // Split domain part to get the part before TLD
    const domainParts = domainPart.split(".");
    if (domainParts.length < 2) {
      return "Please enter a valid email address.";
    }
    
    // Get the part between @ and . (the main domain)
    const domainName = domainParts[0]; // Part between @ and first dot
    
    // Check if there are at least 3 characters between @ and .
    if (!domainName || domainName.length < 3) {
      return "The domain name (part between @ and .) must be at least 3 characters.";
    }

    // Blocked personal domains
    const blockedDomains = [
      "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
      "aol.com", "icloud.com", "protonmail.com", "zoho.com", "yandex.com"
    ];
    
    const fullDomain = domainPart.toLowerCase();
    
    if (blockedDomains.includes(fullDomain)) {
      return "Please provide an official (non-personal) email address.";
    }

    return null;
  }
},

support_desk_email: {
  required: true,
  validate: (value) => {
    if (!value) return "Email is required.";

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";

    // Split email into parts
    const [prefix, domainPart] = value.split("@");
    
    if (prefix.length < 2) {
      return "The part before @ must be at least 3 characters.";
    }

    const prefixRegex = /^[A-Za-z0-9]+$/;
    if (!prefixRegex.test(prefix)) {
      return "The part before @ can contain only letters or numbers.";
    }

    // Check if domain part exists
    if (!domainPart) return "Please enter a valid email address.";
    
    // Split domain part to get the part before TLD
    const domainParts = domainPart.split(".");
    if (domainParts.length < 2) {
      return "Please enter a valid email address.";
    }
    
    // Get the part between @ and . (the main domain)
    const domainName = domainParts[0];
    
    // Check if there are at least 3 characters between @ and .
    if (!domainName || domainName.length < 2) {
      return "The domain name (part between @ and .) must be at least 2 characters.";
    }

    const blockedDomains = [
      "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
      "aol.com", "icloud.com", "protonmail.com", "zoho.com", "yandex.com"
    ];
    
    const fullDomain = domainPart.toLowerCase();
    
    if (blockedDomains.includes(fullDomain)) {
      return "Please provide an official (non-personal) email address.";
    }

    return null;
  }
}
,

  neozaar_tc: {
    required: true,
    message: "Please agree to the Terms & Conditions"
  },

  data_privacy: {
    required: true,
    message: "Please agree to the Privacy Policy"
  },
  businessCert: {
  required: true,
  validate: (file) => {
    if (!file) return "Business certification document is required.";
    const MAX_FILE_SIZE = 200 * 1024; // 200 KB
    const ALLOWED_TYPES = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a valid file (PDF, PNG, JPG, JPEG).";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 200kb.";
    }
    return null;
  }
},
};

  // Validate a single field
// Corrected validateField function
const validateField = (name, value) => {
  const rule = validationRules[name];
  if (!rule) return null; // No validation rule for this field

  if (rule.required) {
    if (value === null || value === undefined || value === '') {
      return rule.message || `Please provide ${name.replace(/_/g, ' ')}.`;
    }
    
    // For checkboxes
    if (typeof value === 'boolean' && !value) {
      return rule.message || `Please provide ${name.replace(/_/g, ' ')}.`;
    }
    
    // For files
    if (value === null) {
      return rule.message || `Please provide ${name.replace(/_/g, ' ')}.`;
    }
  }

  if (rule.pattern && value && !rule.pattern.test(value)) {
    return rule.message;
  }

  if (rule.minLength && value && value.length < rule.minLength) {
    return rule.message;
  }

  if (rule.validate) {
    // Create an object with all current form values to pass to validate functions
    const allValues = {
      company_name,
      registered_business_name,
      sla_link,
      terms_of_use_link,
      brand_name,
      website_url,
      linkedin_url,
      tax_id,
      headquater_country,
      legal_entity_type,
      name,
      designation,
      mobile,
      password,
      email,
       support_desk_email,
      neozaar_tc,
      data_privacy,
      brand_logo,
      businessCert,
    };

    // For sla_link, we need to handle it specially since it uses the state variable directly
    if (name === 'sla_link') {
      return rule.validate(value); // This already uses headquater_country directly
    }
    if (name === 'terms_of_use_link') {
      return rule.validate(value); // This already uses headquater_country directly
    }
    
    // For other fields that need allValues
    return rule.validate(value, allValues);
  }

  return null; // No error
};

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    // Update the field value
    switch (fieldName) {
      case 'company_name': setCompanyName(value); break;
      case 'registered_business_name': setCompanyregisterName(value); break;
      case 'sla_link': setSlaLink(value); break;
      case 'terms_of_use_link': setTermsofuseurl(value); break;
      case 'brand_name': setBrandtName(value); break;
      case 'website_url': setCompanyWebsite(value); break;
      case 'linkedin_url': setLinkedin(value); break;
      case 'tax_id': setTaxId(value); break;
      case 'headquater_country': setHeadQuater(value); break;
      case 'legal_entity_type': setLegalEntityType(value); break;
      case 'name': setName(value); break;
      case 'designation': setDesignation(value); break;
      case 'mobile': setMobile(value); break;
      case 'password': setPassword(value); break;
      case 'email': setEmail(value); break;
      case 'support_desk_email': setDeskEmail(value); break;
      case 'neozaar_tc': setNeozaartc(value); break;
      case 'data_privacy': setDataPrivacy(value); break;
      default: break;
    }

    // Validate the field if it's been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  // Handle field blur events
 // Handle field blur events
const handleBlur = (fieldName) => {
  setTouched(prev => ({ ...prev, [fieldName]: true }));

  // Validate the field
  let value;
  switch (fieldName) {
    case 'company_name': value = company_name; break;
    case 'registered_business_name': value = registered_business_name; break;
    case 'sla_link': value = sla_link; break;
    case 'terms_of_use_link': value = terms_of_use_link; break;
    case 'brand_name': value = brand_name; break;
    case 'website_url': value = website_url; break;
    case 'linkedin_url': value = linkedin_url; break;
    case 'tax_id': value = tax_id; break;
    case 'headquater_country': value = headquater_country; break;
    case 'legal_entity_type': value = legal_entity_type; break;
    case 'name': value = name; break;
    case 'designation': value = designation; break;
    case 'mobile': value = mobile; break;
    case 'password': value = password; break;
    case 'email': value = email; break;
    case 'support_desk_email': value =  support_desk_email; break;
    case 'neozaar_tc': value = neozaar_tc; break;
    case 'data_privacy': value = data_privacy; break;
    case 'brand_logo': value = brand_logo; break;
    case 'businessCert': value = businessCert; break;
    default: value = null;
  }

  const error = validateField(fieldName, value);
  setErrors(prev => ({ ...prev, [fieldName]: error }));
};

  // Validate all fields in current step
// Validate all fields in current step
const validateStep = (stepNumber) => {
  const stepFields = {
    1: ['company_name', 'registered_business_name', 'sla_link',
      'brand_name', 'website_url', 'tax_id', 'headquater_country',
      'legal_entity_type', 'brand_logo'],
    2: ['name', 'designation', 'mobile',  'email','support_desk_email'],
    3: ['neozaar_tc', 'data_privacy','terms_of_use_link']
  };

  const fieldsToValidate = stepFields[stepNumber];
  const newErrors = {};
  let isValid = true;

  // Mark all fields as touched
  const newTouched = { ...touched };
  fieldsToValidate.forEach(field => {
    newTouched[field] = true;

    let value;
    switch (field) {
      case 'company_name': value = company_name; break;
      case 'registered_business_name': value = registered_business_name; break;
      case 'sla_link': value = sla_link; break;
      case 'terms_of_use_link': value = terms_of_use_link; break;
      case 'brand_name': value = brand_name; break;
      case 'website_url': value = website_url; break;
      case 'linkedin_url': value = linkedin_url; break;
      case 'tax_id': value = tax_id; break;
      case 'headquater_country': value = headquater_country; break;
      case 'legal_entity_type': value = legal_entity_type; break;
      case 'name': value = name; break;
      case 'designation': value = designation; break;
      case 'mobile': value = mobile; break;
      case 'password': value = password; break;
      case 'email': value = email; break;
      case 'support_desk_email': value = support_desk_email; break;
      case 'neozaar_tc': value = neozaar_tc; break;
      case 'data_privacy': value = data_privacy; break;
      case 'brand_logo': value = brand_logo; break;
      default: value = null;
    }

    const error = validateField(field, value);
    if (error) {
      newErrors[field] = error;
      isValid = false;
    }
  });

  // 🔥 Extra condition for "Other" in Headquarter Country
  if (stepNumber === 1 && headquater_country === "Other") {
    newErrors.headquater_country = "Please enter the country name and click Add";
    isValid = false;
  }

  setTouched(newTouched);
  setErrors(newErrors);

  return isValid;
};


  // Form navigation
  const handleNext = async () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error("Please fill all required fields correctly");
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
      const error = validateField('brand_logo', file);
      setErrors(prev => ({ ...prev, brand_logo: error }));
    }
  };

  const removeBrandLogo = () => {
    setBrandLogo(null);
    setBrandLogoName('');

    // Clear the error
    setErrors(prev => ({ ...prev, brand_logo: null }));
  };

  const handleBusinessCertChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBusinessCert(file);
      setBusinessCertName(file.name);
    // Validate the file
      const error = validateField('businessCert', file);
    setErrors(prev => ({ ...prev, businessCert: error }));
    }
  };

  const removeBusinessCert = () => {
    setBusinessCert(null);
    setBusinessCertName('');
    // Clear the error
    setErrors(prev => ({ ...prev, businessCert: null }));

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(3)) {
      const toastId = toast.loading('Submitting form...');
      setloading(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('password', password);
      formData.append('role_id', role_id);
      formData.append('company_name', company_name);
      formData.append('registered_business_name', registered_business_name);
      formData.append('brand_name', brand_name);
      formData.append('legal_entity_type', legal_entity_type);
      formData.append('tax_id', tax_id);
      formData.append('headquater_country', headquater_country);
      formData.append('website_url', website_url);
      formData.append('linkedin_url', linkedin_url);
      formData.append('cloud_partnership', JSON.stringify(cloud_partnership));
      formData.append('existing_marketplace_listing', JSON.stringify(existing_marketplace_listing));
      formData.append('neozaar_tc', neozaar_tc);
      formData.append('preferred_engagement', preferred_engagement);
      formData.append('support_desk_email',  support_desk_email);
      formData.append('designation', designation);
      formData.append('sla_link', sla_link);
      formData.append('terms_of_use_link', terms_of_use_link);
      formData.append('data_privacy', data_privacy);

      if (brand_logo) formData.append('brand_logo', brand_logo);
      if (businessCert) formData.append('business_certification', businessCert);

      try {
        // const res = await fetch('https://www.neozaar.com/api/user/register', {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}user/register`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

       if (res.ok) {
        toast.dismiss(toastId);
        toast.success('Registration successful!');
        router.push('/auth/success');
      } else {
        toast.dismiss(toastId);  // ❗ dismiss loading
        setloading(false);
        toast.error(data.message || 'Registration failed. Please try again.');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.dismiss(toastId);  // ❗ dismiss loading
      setloading(false);
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
      if (legal_entity_type === "Other") {
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
  // 🔍 Validate input first
  if (!headquaterCountryData || !headquaterCountryData.value.trim()) {
    setErrors(prev => ({
      ...prev,
      headquater_country: "Please enter the country name before adding"
    }));
    return;
  }

  // ✅ Add new country to the list
  setHeadquaterCountry(prev => [headquaterCountryData, ...prev]);

  // If currently "Other", replace it with the new value
  if (headquater_country === "Other") {
    setHeadQuater(headquaterCountryData.value);
  }

  // Clear temp data and error
  setheadquaterCountryData(null);
  setErrors(prev => ({
    ...prev,
    headquater_country: null
  }));
}

  return (
    <>


 
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
                  <h2 className='text-white text-sm w-56'>Company & Brand Information</h2>
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
                  <h2 className='text-white text-sm w-56'>Primary Contact</h2>
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
                  <h2 className='text-white text-sm w-56'>Partner & Engage</h2>
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
                  <label className='text-sm dark:text-black font-medium font-sans'>Company Name <span className='text-red-500'>*</span></label>
                  <input
                    type='text'
                    value={company_name}

                    onChange={(e) => handleFieldChange('company_name', e.target.value)}
                    onBlur={() => handleBlur('company_name')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.company_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.company_name && (<p className="text-red-500 text-sm mt-1">{errors.company_name}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Brand Name <span className='text-red-500'>*</span></label>
                  <input
                    type='text'
                    value={brand_name}
                    onChange={(e) => handleFieldChange('brand_name', e.target.value)}
                    onBlur={() => handleBlur('brand_name')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.brand_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.brand_name && (<p className="text-red-500 text-sm mt-1">{errors.brand_name}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Group / Holding Company (same as company name) <span className='text-red-500'>*</span></label>
                  <input
                    type='text'
                    value={registered_business_name}
                    onChange={(e) => handleFieldChange('registered_business_name', e.target.value)}
                    onBlur={() => handleBlur('registered_business_name')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.registered_business_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.registered_business_name && (<p className="text-red-500 text-sm mt-1">{errors.registered_business_name}</p>)}
                </div>
        <div className='col-span-2 md:col-span-1'>
  <label className='text-sm dark:text-gray-500 font-medium font-sans'>
    Headquarter Country<span className='text-red-500'>*</span>
  </label>

  <select
    id="entityType"
    value={headquater_country}
    onChange={(e) => handleFieldChange('headquater_country', e.target.value)}
    onBlur={() => handleBlur('headquater_country')}
    className={`border ${
      errors.headquater_country ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'
    } dark:text-black py-2.5 px-3 w-full`}
  >
    <option value="" disabled className='dark:text-black'>
      Select an option
    </option>
    {headquaterCountry.map((item, i) => (
      <option key={i} value={item.value} className='dark:text-black'>
        {item.name}
      </option>
    ))}
  </select>

  {/* Error message for main select */}
  {errors.headquater_country && (
    <p className="text-red-500 text-sm mt-1">{errors.headquater_country}</p>
  )}

  {/* Show input when Other is selected */}
  {headquater_country === "Other" && (
    <div className="m-2 flex gap-2">
     <input
  type="text"
  value={headquaterCountryData?.value || ""}
  onChange={(e) => {
    const val = e.target.value;

    // Allow only letters & spaces
    if (/^[A-Za-z\s]*$/.test(val)) {
      headquaterCountryInput(e);
    }
  }}
  onBlur={(e) => {
    // Show error if less than 3 letters
    if (!/^(?=(?:.*[A-Za-z]){3,})[A-Za-z\s]+$/.test(e.target.value)) {
      setErrors(prev => ({
        ...prev,
        headquater_country: "Minimum 3 letters required (letters and spaces only)"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        headquater_country: null
      }));
    }
  }}
  placeholder="Add Headquarter Country"
  className="bg-zinc-100 outline-1 p-1 dark:text-black"
/>

      <button
        onClick={handleSubmitOtherHC}
        className="bg-gray-950 text-white p-1 rounded cursor-pointer px-3"
      >
        Add
      </button>
    </div>
  )}
</div>

              <div className="col-span-2 md:col-span-1">
  <label className="text-sm dark:text-black font-medium font-sans">SLA Link <span className='text-red-500'>*</span></label>
  <div className="flex">
    <input
      type="text"
      value={sla_link}
      placeholder="https://example.com/sla"
      onChange={(e) => handleFieldChange("sla_link", e.target.value)}
      onBlur={() => {
        const urlPattern =
          /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;
        if (!sla_link.trim()) {
          handleFieldChange("sla_link", "");
          handleBlur("sla_link", "SLA link is required");
        } else if (!urlPattern.test(sla_link)) {
          handleBlur("sla_link", "Please enter a valid URL (e.g., https://example.com)");
        } else {
          handleBlur("sla_link", "");
        }
      }}
      className={`outline-0 w-full py-2 px-3 dark:text-black border ${
        errors.sla_link
          ? "border-red-300 bg-red-500/10"
          : "border-zinc-200 bg-zinc-100"
      }`}
    />
  </div>
  {errors.sla_link && (
    <p className="text-red-500 text-sm mt-1">{errors.sla_link}</p>
  )}
</div>

              
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Legal Entity Type <span className='text-red-500'>*</span></label>

                  <select
                    value={legal_entity_type}
                    onChange={(e) => handleFieldChange('legal_entity_type', e.target.value)}
                    onBlur={() => handleBlur('legal_entity_type')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.legal_entity_type ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  >
                    <option value="" disabled>Select an option</option>
                    {
                      legalEntityTypes.map((item, i) => (
                        <option key={i} value={item.value}>{item.name}</option>
                      ))
                    }
                  </select>

                  {
                    legal_entity_type === "Other" && <div className="m-2 flex gap-2 ">
                      <input type="text" name="" onChange={legalEntityInput} placeholder='add legal entity type' className='bg-zinc-100 outline-1 p-1  dark:text-black' />
                      <button onClick={handleSubmitOther} className='bg-gray-950  text-white p-1 rounded cursor-pointer px-3'>Add</button>
                    </div>
                  }


                  {errors.legal_entity_type && (<p className="text-red-500 text-sm mt-1">{errors.legal_entity_type}</p>)}
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black req font-medium font-sans'>Tax Id <span className='text-red-500'>*</span></label>
                  <div className='flex'>

                    <input
                      type='text'
                      value={tax_id}

                      onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9-]*$/.test(value)) {
      handleFieldChange('tax_id', value);
    }
  }}
                      onBlur={() => handleBlur('tax_id')}
                      className={`w-full py-2 px-3  dark:text-black border ${errors.tax_id ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'} outline-0`}
                    />
                  </div>
                  {errors.tax_id && (<p className="text-red-500 text-sm mt-1">{errors.tax_id}</p>)}
                </div>
              
                <div className='col-span-2'>
                  <label className='text-sm dark:text-black font-medium font-sans'>Website URL<span className='text-red-500'>*</span></label>
                  <input
                    type='text'
                    placeholder=''
                    value={website_url}
                    onChange={(e) => handleFieldChange('website_url', e.target.value)}
                    onBlur={() => handleBlur('website_url')}
                    className={`w-full py-2 px-3 outline-0 border dark:text-black ${errors.website_url ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.website_url && (<p className="text-red-500 text-sm mt-1">{errors.website_url}</p>)}
                </div>
                <div className='col-span-2'>
                  <label className='text-sm  font-medium dark:text-black font-sans'>Linkedin URL</label>
                  <input
                    type='text'
                    placeholder=''
                    value={linkedin_url}
                    onChange={(e) => handleFieldChange('linkedin_url', e.target.value)}
                    onBlur={() => handleBlur('linkedin_url')}
                    // onChange={(e) => setLinkedin(e.target.value)}
                    className={`w-full py-2 px-3 outline-0 dark:text-black border ${errors.linkedin_url ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.linkedin_url && (<p className="text-red-500 text-sm mt-1">{errors.linkedin_url}</p>)}
                </div>
                <div className="col-span-2">
                  <label htmlFor="brand_logo" className="text-sm dark:text-black font-medium font-sans">
                    Upload Brand Logo<span className='text-red-500'>*</span>
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
              <h5 className="text-dark">Primary Contact</h5>
                <div className="col-span-2">
                  <label className="text-sm dark:text-black font-medium font-sans">Contact Person Name<span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.name ? 'border-red-200 bg-red-500/10' : "border-zinc-200 bg-zinc-100"}`}
                  />
                  {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm dark:text-black font-medium font-sans">Designation<span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => handleFieldChange('designation', e.target.value)}
                    onBlur={() => handleBlur('designation')}
                    className={`outline-0 w-full py-2 px-3  dark:text-black border ${errors.designation ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.designation && (<p className="text-red-500 text-sm mt-1">{errors.designation}</p>)}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm dark:text-black font-medium font-sans">Email<span className='text-red-500'>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.email ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'
                      }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm dark:text-black font-medium  font-sans"> Support Desk Email<span className='text-red-500'>*</span></label>
                  <input
                    type="email"
                    value={support_desk_email}
                    onChange={(e) => handleFieldChange('support_desk_email', e.target.value)}
                    onBlur={() => handleBlur('support_desk_email')}
                    className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.support_desk_email ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'
                      }`}
                    required
                  />
                  {errors.support_desk_email && (
                    <p className="text-red-500 text-sm mt-1">{errors.support_desk_email}</p>
                  )}
                </div>
             <div className="col-span-2 md:col-span-1">
  <label className="text-sm dark:text-black font-medium font-sans">Phone Number</label>

<PhoneInput
  country={'in'}
  value={mobile}
  onChange={(value, data) => {
    handleFieldChange('mobile', value);
    setCountryType(data.countryCode.toUpperCase());
  }}
  onBlur={() => handleBlur('mobile')}
  inputClass={`!w-full !px-14 !py-3 !text-sm !rounded-none !outline-none ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100'}`}
  containerClass="!w-full"
  buttonClass={`px-10 ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100'}`}
  inputProps={{
    name: 'mobile',
    required: true,
  }}
/>

{errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}


 
</div>

             <div className="col-span-2 relative">
  {/* <label className="text-sm dark:text-black font-medium font-sans">Password</label> */}

  <input
    type="hidden"
    value={password}
    placeholder="Enter a strong password"
    onChange={(e) => {
      const val = e.target.value;
      handleFieldChange('password', val);

      // 🔒 Inline validation
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

      if (!val) {
        setErrors((prev) => ({ ...prev, password: 'Password is required.' }));
      } else if (val.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password must be at least 8 characters.'
        }));
      } else if (val.length > 16) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password cannot exceed 16 characters.'
        }));
      } else if (!strongPasswordRegex.test(val)) {
        setErrors((prev) => ({
          ...prev,
          password:
            'Password must include uppercase, lowercase, number, and special character.'
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' })); // ✅ Valid password
      }
    }}
    onBlur={() => handleBlur('password')}
    className={`outline-0 w-full py-2 px-3 dark:text-black border ${
      errors.password
        ? 'border-red-400 bg-red-50'
        : 'border-zinc-200 bg-zinc-100'
    } pr-10 rounded-md transition`}
  />
{/* 
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-9 text-zinc-500 hover:text-zinc-700"
    tabIndex={-1}
  >
    {showPassword ? (
      <i className="ri-eye-line"></i>
    ) : (
      <i className="ri-eye-close-line"></i>
    )}
  </button> */}

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
                            className=" h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-2 dark:text-black peer-checked:bg-black peer-checked:text-white"
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
                      <div className="flex items-center gap-2 pe-1 border border-zinc-200 w-[270px] rounded-xl">
                        <input
                          type="text"
                          value={newPlatform}
                          onChange={(e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewPlatform(value);
    }
  }}
                          maxLength={20}
                          placeholder="Enter cloud name"
                          className="px-3 py-1 outline-0 m-1 dark:text-black rounded-lg text-sm"
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
                                 <div className="col-span-2 md:col-span-1">
  <label className="text-sm dark:text-black font-medium font-sans">Terms of use URL <span className='text-red-500'>*</span></label>
  <div className="flex">
    <input
      type="text"
      value={terms_of_use_link}
      placeholder="https://example.com/terms_of_use_link"
      onChange={(e) => handleFieldChange("terms_of_use_link", e.target.value)}
      onBlur={() => {
        const urlPattern =
          /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;
        if (!terms_of_use_link.trim()) {
          handleFieldChange("terms_of_use_link", "");
          handleBlur("terms_of_use_link", "Terms of use URL is required");
        } else if (!urlPattern.test(terms_of_use_link)) {
          handleBlur("terms_of_use_link", "Please enter a valid URL (e.g., https://example.com)");
        } else {
          handleBlur("terms_of_use_link", "");
        }
      }}
      className={`outline-0 w-full py-2 px-3 dark:text-black border ${
        errors.terms_of_use_link
          ? "border-red-300 bg-red-500/10"
          : "border-zinc-200 bg-zinc-100"
      }`}
    />
  </div>
  {errors.terms_of_use_link && (
    <p className="text-red-500 text-sm mt-1">{errors.terms_of_use_link}</p>
  )}
</div>
                {/* 🛒 Marketplace */}
                <div className="col-span-2">
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Existing Marketplace Listing</label>
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
                            className=" h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-2 peer-checked:bg-black peer-checked:text-white dark:text-black"
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
                      <div className="flex items-center gap-2 pe-1 border border-zinc-200 w-[270px] rounded-xl">
                        <input
                          type="text"
                          value={newMarketplace}
                                                    onChange={(e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewMarketplace(value);
    }
  }}
                          maxLength={20}
                          placeholder="Enter marketplace name"
                          className="px-3 py-1 m-1 text-black outline-0 rounded-lg text-sm"
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

                {/* <div className="col-span-2">
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Competencies & certifications</label>
                  <textarea
                    rows="5"
                    value={competencies_certifications}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    className='w-full bg-zinc-100 border  p-4 dark:text-black border-zinc-200'
                  ></textarea>
                </div> */}
                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm dark:text-black font-medium font-sans  '>Preferred Engagement</label>
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
                      <option value="Accelerator">Accelerator</option>
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
                  {errors.businessCert && (
    <p className="text-red-500 text-sm mt-1">{errors.businessCert}</p>
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
                   <label htmlFor="termsCondition" className="text-sm dark:text-black">
  I agree to the{" "}
  <a href="/terms-and-conditions"     target="_blank"
    rel="noopener noreferrer" className="font-semibold underline">
    Terms & Conditions
  </a>{" "}
  and consent to the collection and use of my data as outlined in the{" "}
  <a href="/privacy-policy"    target="_blank"
    rel="noopener noreferrer" className="font-semibold underline">
    Privacy Policy
  </a>.
</label>

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
  type="button"
  onClick={step === 3 ? handleSubmit : handleNext}
  disabled={loading}
  className={`w-32 h-10 font-sans font-semibold text-md rounded-3xl text-white
    ${loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-[#f79331] via-[#e25c08] to-[#e25c08] cursor-pointer"
    }`}
>
  {loading ? (
    <>
      <span className="spinner"></span> Submitting...
    </>
  ) : step === 3 ? (
    "Submit"
  ) : (
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
    </>
  );
}


