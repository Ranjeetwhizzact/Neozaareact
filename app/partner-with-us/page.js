'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'lucide-react';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [brand_logo, setBrandLogo] = useState(null);
  const [brandLogoName, setBrandLogoName] = useState('');
  const [businessCert, setBusinessCert] = useState(null);
  const [businessCertName, setBusinessCertName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [uploads, setUploads] = useState({
    section1: [],
    section2: [],
    section3: [],
  });
  const [errors, setErrors] = useState({});
  const role_id = 4;
  const [loading, setLoading] = useState(false)



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    company_name: '',
    registered_business_name: '',
    brand_name: '',
    company_registration_number: '',
    country_type: 'IN', // Default to India
    Legal_entity_type: '',
    tax_id: '',
    tax_type: 'gst', // Default to GST
    headquater_country: '',
    website_url: '',
    linkedin_url: '',
    solution_partner_type: '',
    core_service_offer: [],
    vertical_experties: [],
    partner_program_membership: [],
    preferred_engagement_modal: [],
    primary_cloud_alignment: [],
    neozaar_tc: false,
    data_privacy: false,
    designation: '',
    competencies_certificate: '',
    company_profile_upload: [],
    case_studies: [],
    business_certification: [],
    brand_logo: null
  });

  const [platforms, setPlatforms] = useState([
    { id: 'migration', label: 'Migration' },
    { id: 'security', label: 'Security' },
    { id: 'devOps', label: 'DevOps' },
    { id: 'finOps', label: 'FinOps' },
    { id: 'alml', label: 'AI/ML' },
    { id: 'data&analytics', label: 'Data & Analytics' },
    { id: 'mpplicationmodernization', label: 'Application Modernization' },
    { id: 'dm', label: 'Digital Workplace' },
    { id: 'industrysolutions', label: 'Industry Solutions' },
  ]);

  const [marketplace, setMarketplace] = useState([
    { id: 'bfsi', label: 'BFSI' },
    { id: 'Healthcare', label: 'Healthcare' },
    { id: 'retail', label: 'Retail' },
    { id: 'government', label: 'Government' },
    { id: 'manufacturing', label: 'Manufacturing' },
  ]);

  const [showPlatformInput, setShowPlatformInput] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [showMarketplaceInput, setShowMarketplaceInput] = useState(false);
  const [newMarketplace, setNewMarketplace] = useState('');



  // =========================

  const [legalEntityTypes, setLegalEntityTypes] = useState([
    { value: "Private Limited", name: "Private Limited" },
    { value: "Public Limited", name: "Public Limited" },
    { value: "Sole Proprietorship", name: "Sole Proprietorship" },
    { value: "Partnership", name: "Partnership" },
    { value: "Other", name: "Other" },
  ]);

  const [otherEntity, setOtherEntity] = useState("");
  // -------------------

  const [headquaterCountry, setHeadquaterCountry] = useState([
    { value: "India", name: "India" },
    { value: "UAE", name: "UAE" },
    { value: "United States", name: "United States" },
    { value: "United Kingdom", name: "United Kingdom" },
    { value: "Germany", name: "Germany" },
    { value: "France", name: "France" },
    { value: "Other", name: "Other" },
  ])

  const [headquaterCountryData, setheadquaterCountryData] = useState("")


  // =========================


  const validationRules = {
    company_name: {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: "Company name should only contain letters and spaces."
    },
    designation: {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: "designation name should only contain letters and spaces."
    },
    registered_business_name: {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: " Group / Holding Company should only contain letters and spaces."
    },
    name: {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: "Name can only contain letters and spaces",
    },
    email: {
      required: true,
      // At least 2 letters in domain extension (e.g., .com, .in, .org, .co.uk also works)
      pattern: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
      message: "Enter a valid email",
      custom: (value) => {
        if (!formData.website_url) {
          return "Please enter website URL first";
        }

        // Extract company domain from website_url
        let companyDomain = formData.website_url
          .replace(/(^\w+:|^)\/\//, "") // remove http/https
          .replace(/^www\./, "")        // remove www.
          .split("/")[0]
          .toLowerCase();

        const domain = value.split("@")[1]?.toLowerCase();
        const personalDomains = [
          "gmail.com", "yahoo.com", "hotmail.com",
          "outlook.com", "icloud.com"
        ];

        // Personal emails not allowed
        if (personalDomains.includes(domain)) {
          return "Please use your company email (not personal)";
        }

        // Must match company domain (support subdomains)
        if (domain !== companyDomain && !domain.endsWith("." + companyDomain)) {
          return `Please use your company email (must match ${companyDomain})`;
        }

        return true; //  valid
      },
    },

    password: {
      required: true,
      minLength: 8,
      message: "Password must be at least 8 characters",
    },
    brand_name: {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: "Brand name can only contain letters and spaces",
    },
    website_url: {
      required: true,
      pattern: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
      message: "Invalid website URL",
    },
    linkedin_url: {
      required: false,
      // pattern: /^(https?:\/\/)?(www\.)?(linkedin\.)?(com\/)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
      pattern: /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9\_\-\.]+\/?$/,
      message: "Enter a valid website URL."
    },
  };



  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";

    if (rule.required && !value.trim()) {
      return `${name.replace("_", " ")} is required`;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }
    if (rule.custom) {
      const result = rule.custom(value);
      if (result !== true) return result; // returns error string
    }

    return "";
  };



  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let fieldValue = value;

    if (type === "checkbox") {
      if (
        [
          "core_service_offer",
          "vertical_experties",
          "partner_program_membership",
          "preferred_engagement_modal",
          "primary_cloud_alignment",
        ].includes(name)
      ) {
        fieldValue = checked
          ? [...(formData[name] || []), value]
          : formData[name].filter((item) => item !== value);
      } else {
        fieldValue = checked;
      }
    } else if (type === "file") {
      fieldValue = files.length > 1 ? [...files] : files[0];
    }


    setFormData((prev) => ({ ...prev, [name]: fieldValue }));


    // const errorMsg = validateField(name, fieldValue);
    // setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    const errorMsg = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

  };




  const handlePhoneChange = (value, country, e, formattedValue) => {
    setFormData(prev => ({ ...prev, mobile: formattedValue }));
  };

  const handleFileChange = (e, section) => {
    const files = Array.from(e.target.files);
    setUploads(prev => ({
      ...prev,
      [section]: [...prev[section], ...files],
    }));

    if (section === 'section1') {
      setFormData(prev => ({
        ...prev,
        company_profile_upload: [...prev.company_profile_upload, ...files]
      }));
    } else if (section === 'section2') {
      setFormData(prev => ({
        ...prev,
        case_studies: [...prev.case_studies, ...files]
      }));
    } else if (section === 'section3') {
      setFormData(prev => ({
        ...prev,
        business_certification: [...prev.business_certification, ...files]
      }));
    }
  };

  const removeFile = (section, index) => {
    setUploads(prev => {
      const updatedFiles = [...prev[section]];
      updatedFiles.splice(index, 1);
      return { ...prev, [section]: updatedFiles };
    });

    if (section === 'section1') {
      setFormData(prev => {
        const updatedFiles = [...prev.company_profile_upload];
        updatedFiles.splice(index, 1);
        return { ...prev, company_profile_upload: updatedFiles };
      });
    } else if (section === 'section2') {
      setFormData(prev => {
        const updatedFiles = [...prev.case_studies];
        updatedFiles.splice(index, 1);
        return { ...prev, case_studies: updatedFiles };
      });
    } else if (section === 'section3') {
      setFormData(prev => {
        const updatedFiles = [...prev.business_certification];
        updatedFiles.splice(index, 1);
        return { ...prev, business_certification: updatedFiles };
      });
    }
  };

  const handleBrandLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandLogo(file);
      setBrandLogoName(file.name);
      setFormData(prev => ({ ...prev, brand_logo: file }));
    }
  };

  const removeBrandLogo = () => {
    setBrandLogo(null);
    setBrandLogoName('');
    setFormData(prev => ({ ...prev, brand_logo: null }));
  };

  const handleBusinessCertChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBusinessCert(file);
      setBusinessCertName(file.name);
      setFormData(prev => ({
        ...prev,
        business_certification: [...prev.business_certification, file]
      }));
    }
  };

  const removeBusinessCert = () => {
    setBusinessCert(null);
    setBusinessCertName('');
    setFormData(prev => ({
      ...prev,
      business_certification: prev.business_certification.filter(f => f !== business_certification)
    }));
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep1 = () => {
    const newErrors = {};
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/;
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml"
    ];

    const onlyLettersAndSpaces = /^[A-Za-z\s]+$/;

    if (!formData.brand_name.trim()) {
      newErrors.brand_name = "Brand name required";
    } else if (!onlyLettersAndSpaces.test(formData.brand_name)) {
      newErrors.brand_name = "Brand name can only contain letters and spaces";
    }

    // ✅ Company name validation
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name required";
    } else if (!onlyLettersAndSpaces.test(formData.company_name)) {
      newErrors.company_name = "Company name can only contain letters and spaces";
    }


    if (!formData.registered_business_name.trim()) {
      newErrors.registered_business_name = "Group / Holding Company name required";
    }
    if (!formData.company_registration_number.trim()) {
      newErrors.company_registration_number = "Registration number required";
    }


    if (!formData.website_url.trim()) newErrors.website_url = "Website required";
    else if (!websiteRegex.test(formData.website_url)) newErrors.website_url = "Invalid website URL";
    // if (!formData.linkedin_url.trim()) newErrors.linkedin_url = "LinkedIn URL required";
    // else if (!linkedinRegex.test(formData.linkedin_url)) newErrors.linkedin_url = "Invalid LinkedIn URL";
    if (!formData.tax_id.trim()) {
      newErrors.tax_id = "Tax ID required";


    }

    if (!formData.headquater_country.trim()) newErrors.headquater_country = "Country required";
    if (!formData.brand_logo) {
      newErrors.brand_logo = "Brand logo required";
    } else {
      if (!ALLOWED_TYPES.includes(formData.brand_logo.type)) {
        newErrors.brand_logo = "Only PNG, JPG, JPEG, WEBP, or SVG are allowed";
      }
      if (formData.brand_logo.size > MAX_FILE_SIZE) {
        newErrors.brand_logo = "File size must not exceed 1 MB";
      }
    }
    if (!formData.Legal_entity_type.trim()) newErrors.Legal_entity_type = "Legal entity required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const onlyLettersAndSpaces = /^[A-Za-z\s]+$/;
    const newErrors = {};
    const validateEmail = (email) => {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && !personalDomains.includes(domain);
    };

    // if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile required";
    if (!formData.name.trim()) {
      newErrors.name = " Name required";
    } else if (!onlyLettersAndSpaces.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!formData.designation.trim()) {
      newErrors.designation = " Designation required";
    } else if (!onlyLettersAndSpaces.test(formData.designation)) {
      newErrors.designation = "Designation can only contain letters and spaces";
    }
    // if (!formData.designation.trim()) newErrors.designation = "Designation required";
    if (!formData.password.trim()) newErrors.password = 'Password required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!validateEmail(formData.email)) newErrors.email = "Use company email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.solution_partner_type) newErrors.solution_partner_type = "Partner type required";
    if (formData.core_service_offer.length === 0) newErrors.core_service_offer = "Select at least one service";
    if (formData.vertical_experties.length === 0) newErrors.vertical_experties = "Select at least one expertise";
    if (formData.primary_cloud_alignment.length === 0) newErrors.primary_cloud_alignment = "Select at least one cloud";
    if (!formData.competencies_certificate) newErrors.competencies_certificate = "Description required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml"
    ];
    const ALLOWED_TYPESPDF = [
      // Images
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",

      // PDF
      "application/pdf"
    ];
    const PDF = [
      "application/pdf"
    ];
    // if (!ALLOWED_TYPES.includes(formData.company_profile_upload)) {
    //   newErrors.company_profile_upload = "Only PNG, JPG, JPEG, WEBP, or SVG are allowed";
    // }
    // if (!ALLOWED_TYPESPDF.includes(formData.business_certification)) {
    //   newErrors.business_certification = "Only PNG, JPG, JPEG, WEBP, PDF,or SVG are allowed";
    // }
    // if (!PDF.includes(formData.case_studies)) {
    //   newErrors.case_studies = "Only PDF are allowed";
    // }

    // Ensure the fields are explicitly true
    if (formData.neozaar_tc !== true) {
      newErrors.neozaar_tc = "Accept terms";
    }
    if (formData.data_privacy !== true) {
      newErrors.data_privacy = "Accept privacy policy";
    }

    setErrors(newErrors);

    // Valid only if there are no errors
    return Object.keys(newErrors).length === 0;
  };







  const handleSubmit = async (e) => {

    e.preventDefault()


    if (validateStep4()) {
      const toastId = toast.loading('Submitting form...');
      setLoading(true)

      try {
        const formDataToSend = new FormData();

        // Normal fields (single append only)
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('company_name', formData.company_name);
        formDataToSend.append('registered_business_name', formData.registered_business_name);
        formDataToSend.append('brand_name', formData.brand_name);
        formDataToSend.append('company_registration_number', formData.company_registration_number);
        formDataToSend.append('Legal_entity_type', formData.Legal_entity_type);
        formDataToSend.append('tax_id', formData.tax_id);
        formDataToSend.append('headquater_country', formData.headquater_country);
        formDataToSend.append('website_url', formData.website_url);
        formDataToSend.append('linkedin_url', formData.linkedin_url);
        formDataToSend.append('solution_partner_type', formData.solution_partner_type);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('competencies_certificate', formData.competencies_certificate);
        formDataToSend.append('neozaar_tc', formData.neozaar_tc ? 'true' : 'false');
        formDataToSend.append('data_privacy', formData.data_privacy ? 'true' : 'false');
        formDataToSend.append('role_id', String(role_id));

        // Arrays
        const arrayFields = [
          'core_service_offer', 'vertical_experties',
          'partner_program_membership', 'preferred_engagement_modal',
          'primary_cloud_alignment'
        ];
        arrayFields.forEach(field => {
          if (formData[field]?.length) {
            formDataToSend.append(field, JSON.stringify(formData[field]));
          }
        });

        // Files
        if (formData.brand_logo) {
          formDataToSend.append('brand_logo', formData.brand_logo);
        }
        formData.company_profile_upload.forEach(file => {
          formDataToSend.append('company_profile_upload', file);
        });
        formData.case_studies.forEach(file => {
          formDataToSend.append('case_studies', file);
        });
        formData.business_certification.forEach(file => {
          formDataToSend.append('business_certification', file);
        });

        // Debug
        // console.log('Sending form data...');
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value instanceof File ? `[FILE] ${value.name}` : value);
        }
        setLoading(true)
        const response = await fetch('http://20.83.163.38:5000/api/user/register', {
          method: 'POST',
          body: formDataToSend,
        });

        const data = await response.json();
        // console.log(data)
        setLoading(false)
        if (!response.ok) {
          throw new Error(data.message || 'Unknown error');
        }
        toast.dismiss(toastId)
        toast.success('Registration successful!', { id: toastId });
        router.push('/auth/success');

      } catch (error) {
        setLoading(false)
        console.error('Submission error:', error);
        toast.error(error.message || 'An unexpected error occurred', { id: toastId });
      }
      // console.log("it's work validate 4")
    } else {
      setLoading(false)
      console.log("else call")
    }

  };





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











  const renderUploadSection = (label, sectionKey) => (
    <div className="col-span-2 mb-4">
      <label className="text-sm font-medium font-sans dark:text-black">{label}</label>
      <label
        htmlFor={sectionKey}
        className="cursor-pointer text-sm font-medium font-sans text-zinc-400 border py-2 px-3 w-full text-center border-dashed flex justify-center mt-1"
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
        id={sectionKey}
        className="hidden"
        multiple
        onChange={(e) => handleFileChange(e, sectionKey)}
      />
      {uploads[sectionKey].length > 0 && (
        <div className="mt-2 space-y-1 px-2">
          {uploads[sectionKey].map((file, idx) => (
            <div key={idx} className="flex items-center justify-between px-1 py-1 rounded">
              <p className="text-sm text-zinc-700 truncate">
                <i className="ri-checkbox-circle-fill text-green-400"></i> {file.name}
              </p>
              <button
                onClick={() => removeFile(sectionKey, idx)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="ri-delete-bin-6-line"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );





  // ===============

  const handleSubmitOther = () => {
    if (otherEntity.trim() !== "") {
      const newOption = { name: otherEntity, value: otherEntity };
      setLegalEntityTypes((prev) => [newOption, ...prev]);
      setFormData((prev) => ({
        ...prev,
        Legal_entity_type: otherEntity,
      }));
      setOtherEntity("");
    }
  };

  const handleSubmitOtherHC = () => {
    if (headquaterCountryData.trim() !== "") {
      const newOption = { name: headquaterCountryData, value: headquaterCountryData };
      setHeadquaterCountry((prev) => [newOption, ...prev]);
      setFormData((prev) => ({
        ...prev,
        headquater_country: headquaterCountryData,
      }));
      setheadquaterCountryData("");
    }
  };


  return (
    <div className='max-w-[1920px] m-auto flex'>
      <div className='h-[100vh] w-[295px]  bg-[#212121] hidden lg:flex items-center justify-between '>
        <div className=' z-10 w-[260px] mx-5 h-[450px]'>
          <div className='div'>
            <ul >
              <li className='flex gap-2  h-32'>
                <div className='p-0.5 bg-[#212121] block w-6 h-6 '>

                  <div className='border border-white   w-5 h-5 p-0.5 flex  items-center '>

                    <div className='relative w-4 h-4  bg-gray-400'>
                      <Image fill src={step === 1 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                    </div>
                  </div>
                </div>
                <div className=' '>

                  <h1 className='text-white text-sm w-56'>Company & Brand Information</h1>
                  < p className='text-gray-500 text-[10px] w-56'>Share the key point of contact for your organization — we’ll use this for partner coordination, lead routing, and co-marketing outreach.
                  </p>
                </div>

              </li>
              <li className='flex gap-2  h-32'>
                <div className='relative flex flex-col items-center'>
                  <div className='relative z-10 before:content-[""] before:absolute before:top-[-103px] before:left-1/2 before:-translate-x-1/2 before:h-[102px] before:w-px before:bg-white
                     after:content-[""] after:absolute after:bottom-[-101px] after:left-1/2 after:-translate-x-1/2 after:h-[100px] after:w-px after:bg-white'>

                    <div className='p-0.5 bg-[#212121] block w-6 h-6'>
                      <div className='border border-white w-5 h-5 p-0.5 flex items-center justify-center'>
                        <div className='relative w-4 h-4 bg-gray-400 '>
                          <Image fill src={step <= 2 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className=' '>

                  <h1 className='text-white text-sm w-56'>Primary Contact</h1>
                  < p className='text-gray-500 text-[10px] w-56'>Share the key point of contact for your organization — we’ll use this for partner coordination, lead routing, and co-marketing outreach.</p>
                </div>

              </li>
              <li className='flex gap-2  h-32'>
                <div className='p-0.5 bg-[#212121] block w-6 h-6 '>

                  <div className='border border-white   w-5 h-5 p-0.5 flex  items-center '>

                    <div className='relative w-4 h-4  bg-gray-400  after:content-[""] after:absolute after:bottom-[-107px] after:left-1/2 after:-translate-x-1/2 after:h-[100px] after:w-px after:bg-white'>
                      <Image fill src={step <= 3 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                    </div>
                  </div>
                </div>
                <div className=' '>

                  <h1 className='text-white text-sm w-56'>Solution & Expertise Details </h1>
                  < p className='text-gray-500 text-[10px] w-56'>Tell us about the services you offer — from migration and FinOps to security and custom development. We’ll use this to match you with relevant ISVs, bundles, and customers.</p>
                </div>

              </li>
              <li className='flex gap-2  h-32'>
                <div className='p-0.5 bg-[#212121] block w-6 h-6 '>

                  <div className='border border-white   w-5 h-5 p-0.5 flex  items-center '>

                    <div className='relative w-4 h-4  bg-gray-400'>
                      <Image fill src={step <= 4 ? '/assests/buildingactive.png' : '/assests/checkcomplete.png'} alt="building" />
                    </div>
                  </div>
                </div>
                <div className=' '>

                  <h1 className='text-white text-sm w-56'>Marketplace & Collaterals </h1>
                  < p className='text-gray-500 text-[10px] w-56'>Upload brochures, service catalogs, or packaged offerings you want listed on NeoZaar. This helps us prepare your Marketplace-ready profile and co-sell bundles.</p>
                </div>

              </li>

            </ul>
          </div>
        </div>
        <div className='absolute  w-24 h-[90vh] '>
          <div className='relative w-full  h-full'>

            <Image fill src="/assests/v-log.png" alt="Logo" className='z-0' />
          </div>
        </div>
      </div>
      <div className='h-[100vh] w-full overflow-y-scroll'>
        <div className='w-10/12 md:w-8/12 mx-auto py-10'>
          <h1 className='text-4xl font-medium dark:text-black'>Solution Partner Registration</h1>
          <p className='text-xs text-zinc-500 mt-2 dark:text-black'>Join our ecosystem of certified experts and delivery partners.</p>
          <form onSubmit={handleSubmit} className='my-7 space-y-4 grid grid-cols-2 gap-2 md:gap-3'>
            {step === 1 && (
              <>
                <div className='col-span-2'>
                  <label className='text-sm font-medium font-sans dark:text-black'>Company Name</label>
                  <input
                    type='text'
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.company_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium dark:text-black font-sans'>Brand name</label>
                  <input
                    type='text'
                    name="brand_name"
                    value={formData.brand_name}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.brand_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.brand_name && <p className="text-red-500 text-xs mt-1">{errors.brand_name}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium dark:text-black font-sans'>Group / Holding Company (or same as company name)</label>
                  <input
                    type='text'
                    name="registered_business_name"
                    value={formData.registered_business_name}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.registered_business_name ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.registered_business_name && <p className="text-red-500 text-xs mt-1">{errors.registered_business_name}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium dark:text-black font-sans'>Company registration number</label>
                  <div className='flex'>

                    <input
                      type='text'
                      name="company_registration_number"
                      value={formData.company_registration_number}
                      maxLength={20}
                                             onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9-]*$/.test(value)) {
      handleChange(e);
    }
  }}
                      className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.company_registration_number ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                    />
                  </div>
                  {errors.company_registration_number && <p className="text-red-500 text-xs mt-1">{errors.company_registration_number}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium font-sans dark:text-black'>Legal entity type</label>


                  <select
                    id="Legal_entity_type"
                    name="Legal_entity_type"
                    value={formData.Legal_entity_type}
                    onChange={handleChange}
                    className="outline-0 w-full py-2 px-3 border dark:text-black border-zinc-200 bg-zinc-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {legalEntityTypes.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {formData.Legal_entity_type === "Other" && (
                    <div className="m-2 flex gap-2">
                      <input
                        type="text"
                        value={otherEntity}
                        onChange={(e) => setOtherEntity(e.target.value)}
                        placeholder="add legal entity type"
                        className="bg-zinc-100 outline-1 p-1 dark:text-black"
                      />
                      <button
                        type="button"
                        onClick={handleSubmitOther}
                        className="bg-gray-950 text-white p-1 dark:text-white rounded cursor-pointer px-3"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {errors.Legal_entity_type && <p className="text-red-500 text-xs mt-1">{errors.Legal_entity_type}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium dark:text-black font-sans'>Tax id</label>
                  <div className='flex'>

                    <input
                      type='text'
                      name="tax_id"
                      value={formData.tax_id}
                      maxLength={20}
                       onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9-]*$/.test(value)) {
      handleChange(e);
    }
  }}
                      className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.tax_id ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                    />
                  </div>
                  {errors.tax_id && <p className="text-red-500 text-xs mt-1">{errors.tax_id}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-medium font-sans dark:text-black'>Headquarter country</label>
                  <select
                    id="headquater_country"
                    name="headquater_country"
                    value={formData.headquater_country}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3  border ${errors.headquater_country ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100 dark:text-black'}`}
                  >
                    <option value="" disabled className='dark:text-black'>
                      Select an option
                    </option>
                    {
                      headquaterCountry.map((item, i) => (
                        <option key={i} value={item.value} className='dark:text-black'>{item.name}</option>
                      ))
                    }
                  </select>

                  {formData.headquater_country === "Other" && (
                    <div className="m-2 flex gap-2">
                      <input
                        type="text"
                        value={headquaterCountryData}
                        onChange={(e) => setheadquaterCountryData(e.target.value)}
                        placeholder="add legal entity type"
                        className="bg-zinc-100 dark:text-black outline-1 p-1"
                      />
                      <button
                        type="button"
                        onClick={handleSubmitOtherHC}
                        className="bg-gray-950 text-white p-1 rounded cursor-pointer px-3 dark:text-white"
                      >
                        Add
                      </button>
                    </div>
                  )}




                  {errors.headquater_country && <p className="text-red-500 text-xs mt-1">{errors.headquater_country}</p>}
                </div>

                <div className='col-span-2'>
                  <label className='text-sm font-medium dark:text-black font-sans'>Website url</label>
                  <input
                    type='text'
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.website_url ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100 dark:text-black'}`}
                  />
                  {errors.website_url && <p className="text-red-500  text-xs mt-1">{errors.website_url}</p>}
                </div>

                <div className='col-span-2'>
                  <label className='text-sm font-medium font-sans dark:text-black'>Linkedin url</label>
                  <input
                    type='text'
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 border dark:text-black ${errors.linkedin_url ? 'border-red-300 bg-red-500/10' : 'border-zinc-200 bg-zinc-100 dark:text-black'}`}
                  />
                  {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url}</p>}
                </div>

                {/* Brand Logo */}
                <div className="col-span-2">
                  <label htmlFor="brandlogo" className="text-sm font-medium dark:text-black font-sans">
                    Upload Brand Logo
                  </label>
                  <label
                    htmlFor="brandlogo"
                    className={`cursor-pointer text-sm font-medium font-sans border ${errors.brand_logo
                      ? 'border-red-300 bg-red-500/10 text-red-400'
                      : 'border-zinc-200 bg-zinc-100 text-zinc-400'
                      } py-2 px-3 w-full text-center border-dashed flex justify-center`}
                  >
                    <div className="flex dark:text-black items-center">
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
                    id="brandlogo"
                    name="brand_logo"
                    className="hidden"
                    onChange={handleBrandLogoChange}
                  />
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
                  {errors.brand_logo && <p className="text-red-500 text-xs mt-1">{errors.brand_logo}</p>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="col-span-2">
                  <label className="text-sm font-medium font-sans dark:text-black">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.name ? 'border-red-200 bg-red-500/10' : "border-zinc-200 bg-zinc-100"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm font-medium dark:text-black font-sans">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.designation ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100'}`}
                  />
                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm font-medium font-sans dark:text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 dark:text-black border ${errors.email ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100 dark:text-black'
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium font-sans dark:text-black">Phone number</label>
                  <PhoneInput
                    country={'in'}
                    value={formData.mobile}
                    onChange={handlePhoneChange}
                    inputClass={`!w-full !px-14 !py-3 !text-sm !rounded-none !outline-none ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100 !dark:text-black'
                      }`}
                    containerClass="!w-full"
                    buttonClass={`px-10 ${errors.mobile ? '!border-red-200 !bg-red-500/10' : '!border-zinc-200 !bg-zinc-100 !dark:text-black'
                      }`}
                    inputProps={{
                      name: 'mobile',
                      required: true,
                    }}
                  />
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>

                <div className="col-span-2 relative">
                  <label className="text-sm font-medium font-sans dark:text-black">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`outline-0 w-full py-2 px-3 border ${errors.password ? 'border-red-200 bg-red-500/10' : 'border-zinc-200 bg-zinc-100 dark:text-black'} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-zinc-500 hover:text-zinc-700 dark:text-black"
                    tabIndex={-1}
                  >
                    {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
                  </button>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className='col-span-2'>
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Primary cloud alignment</label>
                  <div className="flex gap-3 flex-wrap">
                    {['AWS', 'Azure', 'GCP', 'Multi-Cloud'].map(cloud => (
                      <div key={cloud}>
                        <input
                          type="checkbox"
                          id={cloud.toLowerCase()}
                          name="primary_cloud_alignment"
                          value={cloud}
                          checked={formData.primary_cloud_alignment.includes(cloud)}
                          onChange={handleChange}
                          className='peer hidden'
                        />
                        <label
                          htmlFor={cloud.toLowerCase()}
                          className='h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-4 peer-checked:bg-black peer-checked:text-white dark:text-black'
                        >
                          {cloud}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.primary_cloud_alignment && <p className="text-red-500 text-xs mt-1">{errors.primary_cloud_alignment}</p>}
                </div>

                <div className='col-span-2'>
                  <label className='text-sm font-medium font-sans dark:text-black'>Solution partner type</label>
                  <div className='px-1 bg-zinc-100 border border-zinc-200'>
                    <select
                      id="solution_partner_type"
                      name="solution_partner_type"
                      value={formData.solution_partner_type}
                      onChange={handleChange}
                      className='bg-zinc-100 dark:text-black outline-0 py-2.5 px-3 w-full'
                    >
                      <option value=""></option>
                      <option value="technology">Technology Partner</option>
                      <option value="service">Service Partner</option>
                      <option value="consulting">Consulting Partner</option>
                    </select>
                  </div>
                  {errors.solution_partner_type && <p className="text-red-500 text-xs mt-1">{errors.solution_partner_type}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-semibold font-sans mb-1 dark:text-black">Core service offer</label>
                  <div className="flex flex-col gap-4 dark:text-black">
                    <div className="flex gap-3 flex-wrap dark:text-black">
                      {platforms.map((platform) => (
                        <div key={platform.id}>
                          <input
                            type="checkbox"
                            id={platform.id}
                            name="core_service_offer"
                            value={platform.label}
                            checked={formData.core_service_offer.includes(platform.label)}
                            onChange={handleChange}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={platform.id}
                            className="px-4 h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl peer-checked:bg-black peer-checked:text-white dark:text-black"
                          >
                            {platform.label}
                          </label>
                        </div>
                      ))}
                      {!showPlatformInput && (
                        <button
                          type="button"
                          onClick={() => setShowPlatformInput(true)}
                          className="w-8 h-8 rounded-3xl bg-zinc-300 text-lg flex justify-center items-center dark:text-black"
                        >
                          +
                        </button>
                      )}
                    </div>

                    {showPlatformInput && (
                      <div className="flex items-center gap-2 pe-1 border border-zinc-200  w-[270px] rounded-xl dark:text-black">
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
                          className="px-3 py-1 m-1 outline-0 rounded-lg text-sm dark:text-black"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowPlatformInput(false);
                            setNewPlatform('');
                          }}
                          className="text-zinc-400 dark:text-black hover:text-zinc-500"
                          title="Cancel"
                        >
                          <i className="ri-close-fill text-red-600 dark:text-red-600"></i>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddPlatform}
                          className="text-zinc-400 dark:text-black hover:text-zinc-500"
                          title="Add"
                        >
                          <i className="ri-check-fill text-green-500 dark:text-green-500"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.core_service_offer && <p className="text-red-500 text-xs mt-1">{errors.core_service_offer}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Vertical Expertise</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 flex-wrap">
                      {marketplace.map((item) => (
                        <div key={item.id}>
                          <input
                            type="checkbox"
                            id={item.id}
                            name="vertical_experties"
                            value={item.label}
                            checked={formData.vertical_experties.includes(item.label)}
                            onChange={handleChange}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={item.id}
                            className="h-8 border border-zinc-200 bg-zinc-100 dark:text-black text-xs flex capitalize justify-center items-center rounded-3xl px-4 peer-checked:bg-black peer-checked:text-white"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                      {!showMarketplaceInput && (
                        <button
                          type="button"
                          onClick={() => setShowMarketplaceInput(true)}
                          className="w-8 h-8 rounded-3xl bg-zinc-300 dark:text-black text-lg flex justify-center items-center"
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
                          className="px-3 py-1 dark:text-black  m-1 outline-0 rounded-lg text-sm"
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
                  {errors.vertical_experties && <p className="text-red-500 text-xs mt-1">{errors.vertical_experties}</p>}
                </div>

                <div className='col-span-2'>
                  <label className="text-sm block dark:text-black font-semibold font-sans mb-1">Partner Program Membership</label>
                  <div className="flex gap-3 flex-wrap">
                    {['aws', 'azure', 'gcp', 'multicloud'].map((item) => (
                      <div key={item}>
                        <input
                          type="checkbox"
                          id={`Partner${item}`}
                          value={item}
                          checked={formData.partner_program_membership.includes(item)}
                          onChange={handleChange}
                          className="peer hidden"
                          name="partner_program_membership"
                        />
                        <label
                          htmlFor={`Partner${item}`}
                          className="h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-4 peer-checked:bg-black peer-checked:text-white dark:text-black"
                        >
                          {item.replace(/-/g, ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='col-span-2'>
                  <label className="text-sm block font-semibold font-sans mb-1 dark:text-black">Preferred Engagement Mode</label>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { id: 'sppo', label: 'Solution Partner Private Offers (SPPO)' },
                      { id: 'cosell', label: 'Co-sell' },
                      { id: 'managedservices', label: 'Managed Services' },
                      { id: 'support', label: 'Support' },
                      { id: 'implementation', label: 'Implementation' },
                    ].map((item) => (
                      <div key={item.id}>
                        <input
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          checked={formData.preferred_engagement_modal.includes(item.id)}
                          onChange={handleChange}
                          className="peer hidden"
                          name="preferred_engagement_modal"
                        />
                        <label
                          htmlFor={item.id}
                          className="h-8 border border-zinc-200 bg-zinc-100 text-xs flex capitalize justify-center items-center rounded-3xl px-4 peer-checked:bg-black peer-checked:text-white dark:text-black"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col-span-2'>
                  <label htmlFor="competencies_certificate" className="text-sm block dark:text-black font-semibold font-sans mb-1">
                    Competencies & Certifications
                  </label>
                  <textarea
                    id="competencies_certificate"
                    name="competencies_certificate"
                    value={formData.competencies_certificate}
                    onChange={handleChange}
                    rows="5"
                    className='w-full bg-zinc-100 border dark:text-black border-zinc-200 rounded-md p-2 text-sm'
                  ></textarea>
                </div>





              </>
            )}
            {step === 4 && (
              <>

                {renderUploadSection("Company Profile Upload", "section1")}
                {renderUploadSection("Case Studies / Reference Projects Upload", "section2")}
                {renderUploadSection("Business Certificate Upload", "section3")}

                <div className="col-span-2">
                  <div className='flex'>
                    <div className='me-2'>
                      <input
                        type="checkbox"
                        id="treamscondition"
                        name="neozaar_tc"
                        checked={formData.neozaar_tc}
                        onChange={handleChange}
                        className='peer/terms hidden '
                      />
                      <label htmlFor='treamscondition' className='block bg-zinc-100 w-5 h-5 border border-zinc-200 peer-checked/terms:hidden dark:text-black'></label>
                      <label htmlFor='treamscondition' className='hidden justify-center items-center bg-black w-5 h-5 border border-black peer-checked/terms:flex'>
                        <i className="ri-check-line text-white "></i>
                      </label>
                    </div>
                    <label htmlFor='treamscondition' className='text-sm dark:text-black'>
                      I agree to the <Link href="/terms-and-conditions" className='font-semibold underline'>Terms & Conditions</Link> and consent to the collection and use of my data as outlined in the <Link href="/privacy-policy" className='font-semibold underline'>Privacy Policy</Link>.
                    </label>
                  </div>
                  {errors.neozaar_tc && <p className="text-red-500 text-xs mt-1">{errors.neozaar_tc}</p>}
                </div>

                <div className="col-span-2">
                  <div className='flex'>
                    <div className='me-2'>
                      <input
                        type="checkbox"
                        id="agree"
                        name="data_privacy"
                        checked={formData.data_privacy}
                        onChange={handleChange}
                        className='peer/agree hidden'
                      />
                      <label htmlFor='agree' className='block bg-zinc-100 w-5 h-5 border border-zinc-200 peer-checked/agree:hidden'></label>
                      <label htmlFor='agree' className='hidden justify-center items-center bg-black w-5 h-5 border border-black peer-checked/agree:flex'>
                        <i className="ri-check-line text-white"></i>
                      </label>
                    </div>
                    <label htmlFor='agree' className='text-sm dark:text-black'>
                      I have read and agree to the Privacy Policy and consent to the use of my data for the following purposes.
                    </label>
                  </div>

                  <ul className='ms-10 mt-2 text-sm font-sans text-zinc-500 list-disc dark:text-black'>
                    <li>To provide me with the requested service.</li>
                    <li>To send me product updates and marketing communications.</li>
                    <li>To improve my user experience on this website.</li>
                    <li>To share anonymized data with third-party partners for analytics.</li>
                  </ul>

                  {errors.data_privacy && <p className="text-red-500 text-xs mt-1">{errors.data_privacy}</p>}
                </div>

              </>
            )}

            <div className="flex col-span-2 gap-4 justify-end mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 w-24 h-10 bg-zinc-200 rounded-3xl text-black"
                >
                  Back
                </button>
              )}


              <button
                type={"button"}
                onClick={step === 4 ? handleSubmit : handleNext}
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
                ) : step === 4 ? (
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
  );
}