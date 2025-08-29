'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    company_name: '',
    registered_business_name: '',
    brand_name: '',
    company_registration_number: '',
    Legal_entity_type: '',
    tax_id: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (['core_service_offer', 'vertical_experties', 'partner_program_membership', 
           'preferred_engagement_modal', 'primary_cloud_alignment'].includes(name)) {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      // Handled separately
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
    } else if (step === 4 && validateStep4()) {
      await handleSubmit({ preventDefault: () => {} });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep1 = () => {
    const newErrors = {};
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/;
    
    if (!formData.company_name.trim()) newErrors.company_name = "Company name required";
    if (!formData.registered_business_name.trim()) newErrors.registered_business_name = "Registration name required";
    if (!formData.company_registration_number.trim()) newErrors.company_registration_number = "Registration number required";
    if (!formData.brand_name.trim()) newErrors.brand_name = "Brand name required";
    if (!formData.website_url.trim()) newErrors.website_url = "Website required";
    else if (!websiteRegex.test(formData.website_url)) newErrors.website_url = "Invalid website URL";
    if (!formData.linkedin_url.trim()) newErrors.linkedin_url = "LinkedIn URL required";
    else if (!linkedinRegex.test(formData.linkedin_url)) newErrors.linkedin_url = "Invalid LinkedIn URL";
    if (!formData.tax_id.trim()) newErrors.tax_id = "Tax ID required";
    if (!formData.headquater_country.trim()) newErrors.headquater_country = "Country required";
    if (!formData.brand_logo) newErrors.brand_logo = "Brand logo required";
    if (!formData.Legal_entity_type.trim()) newErrors.Legal_entity_type = "Legal entity required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const validateEmail = (email) => {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && !personalDomains.includes(domain);
    };

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile required";
    if (!formData.designation.trim()) newErrors.designation = "Designation required";
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
    e?.preventDefault();
    const toastId = toast.loading('Submitting form...');

    try {
      const formDataToSend = new FormData();
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
    formDataToSend.append('core_service_offer', JSON.stringify(formData.core_service_offer));
    formDataToSend.append('vertical_experties', JSON.stringify(formData.vertical_experties));
    formDataToSend.append('partner_program_membership', JSON.stringify(formData.partner_program_membership));
    formDataToSend.append('preferred_engagement_modal', JSON.stringify(formData.preferred_engagement_modal));
    formDataToSend.append('primary_cloud_alignment', JSON.stringify(formData.primary_cloud_alignment));
    formDataToSend.append('neozaar_tc', formData.neozaar_tc.toString());
    formDataToSend.append('data_privacy', formData.data_privacy.toString());
    formDataToSend.append('role_id', role_id.toString());

    
    
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        
        // Skip file fields and arrays for now
        if (key === 'brand_logo' || 
            key === 'company_profile_upload' || 
            key === 'case_studies' || 
            key === 'business_certification') {
          return;
        }
        
        if (Array.isArray(value)) {
          // Stringify array fields
          formDataToSend.append(key, JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          // Convert boolean to string
          formDataToSend.append(key, value.toString());
        } else {
          // Append regular fields
          formDataToSend.append(key, value);
        }
      });

      // Append brand logo if exists
      if (formData.brand_logo) {
        formDataToSend.append('brand_logo', formData.brand_logo);
      }

      // Append company profile uploads
      formData.company_profile_upload.forEach((file, index) => {
        formDataToSend.append(`company_profile_upload_${index}`, file);
      });

      // Append case studies
      formData.case_studies.forEach((file, index) => {
        formDataToSend.append(`case_studies_${index}`, file);
      });

      // Append business certifications
      formData.business_certification.forEach((file, index) => {
        formDataToSend.append(`business_certification_${index}`, file);
      });

      // Debug: Log form data before sending
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value instanceof File ? `[FILE] ${value.name}` : value);
      }

      const response = await fetch('http://20.83.163.38:5000/api/user/register', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - the browser will set it automatically with the correct boundary
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      toast.success('Registration successful!', { id: toastId });
      router.push('/success');

    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'An unexpected error occurred', { id: toastId });
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
      <label className="text-sm font-medium font-sans">{label}</label>
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

}