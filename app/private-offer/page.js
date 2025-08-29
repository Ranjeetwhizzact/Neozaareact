'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import toast from 'react-hot-toast';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useForm } from 'react-hook-form';
import Image from 'next/image';


function CloudDetailsTab({ cloudType, formData, setFormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data) => {
    setFormData(data);
    toast.success(`${cloudType} Info Saved`);
  };

  const formSchema = {
    AWS: [
      { name: 'phone', label: 'Phone Number', type: 'text', required: true, placeholder: 'XXX-XXX-XXXX' },
      { name: 'awsaccountid', label: 'AWS Account ID (12-digit)', type: 'text', required: true, placeholder: 'XXXX-XXXX-XXXX' },
      { name: 'Country', label: 'Country / Region', type: 'text', required: true, placeholder: '(eg. India, USA)' },
      { name: 'usageLevel', label: 'Current AWS Usage Level', type: 'select', required: false, options: ['<$500/month', '$500-$2,000/month', '$2,000-$10,000/month', '$10,000/month', 'Not using AWS yet'] },
      { name: 'dealSize', label: 'Estimated Usage or Deal Size', type: 'textarea', required: false, placeholder: 'Optional' },
      { name: 'requirement', label: 'Describe Your Requirement', type: 'textarea', required: true, placeholder: 'Please describe your needs...' },
      { name: 'awsConsent', label: 'I consent to receive AWS communications.', type: 'checkbox', required: true },
    ],
    Azure: [
      { name: 'tenantId', label: 'Azure Tenant ID', type: 'text', required: true, placeholder: 'GUID from Azure' },
      { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
      { name: 'azureTenantId', label: 'Azure Tenant ID (Test, Optional)', type: 'text', required: false, placeholder: 'GUID from Azure AD' },
      { name: 'startTimeline', label: 'Preferred Timeline to Start', type: 'select', required: true, options: ['Immediately', '1-3 months', '3-6 months', 'Just exploring'] },
      { name: 'azureSubscriptionId', label: 'Azure Subscription ID', type: 'text', required: false },
      { name: 'productInterest', label: 'Which product/service are you interested in?', type: 'select', required: true, options: ['Azure VM', 'Azure SQL', 'Azure Storage', 'Other'] },
      { name: 'msDealSize', label: 'Expected usage / Deal Size', type: 'textarea', required: false, placeholder: 'Optional' },
      { name: 'msRequirement', label: 'Describe Your Requirement / Terms Needed', type: 'textarea', required: true },
      { name: 'msConsent', label: 'I consent to receive Azure communications.', type: 'checkbox', required: true },
    ],
  };

  const renderField = (field) => {
    const isFullWidth = field.type === 'textarea' || field.type === 'checkbox';
    return (
      <div key={field.name} className={`mb-4 ${isFullWidth ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>
        {field.type !== 'checkbox' && <label className="block mb-1 text-white">{field.label}</label>}

        {field.type === 'select' ? (
          <select
            {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
            className="w-full px-3 py-3.5 text-white border bg-zinc-900 border-zinc-700 outline-none"
          >
            <option value="">Select...</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
            className="w-full px-3 py-3 text-white border border-zinc-700 outline-none"
            placeholder={field.placeholder}
            rows={4}
          />
        ) : field.type === 'checkbox' ? (
          <label className="flex items-center text-white space-x-2">
            <input type="checkbox" {...register(field.name, { required: field.required })} />
            <span>{field.label}</span>
          </label>
        ) : (
          <input
            type={field.type}
            {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
            className="w-full px-3 py-3 text-white border border-zinc-700 outline-none"
            placeholder={field.placeholder}
          />
        )}

        {errors[field.name] && <p className="text-red-400 text-sm mt-1">{errors[field.name].message}</p>}
      </div>
    );
  };
  const router =useRouter();
  useEffect(() => {
    const checkAuth = () => {
      console.log("🔐 Checking authentication from localStorage...");
      const token = localStorage.getItem("token");

      if (!token || token.trim() === "") {
        console.warn("🚫 No valid token in localStorage. Redirecting to login.");
          router.push('/auth/login'); 
        return;
      }

      console.log("✅ Token found in localStorage:", token);
    };

    checkAuth();
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      {(formSchema[cloudType] || []).map(renderField)}
      <div className="col-span-2 text-right mt-4">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save {cloudType} Info
        </button>
      </div>
    </form>
  );
}

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [cloudTypes, setCloudTypes] = useState([]);
  const [awsForm, setAwsForm] = useState({});
  const [azureForm, setAzureForm] = useState({});

  // Basic fields
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [cloudPlatform, setCloudPlatform] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const role_id = 2;

  useEffect(() => {
    const storedType = localStorage.getItem('cloud_type');
    let types = [];
    try {
      types = JSON.parse(storedType);
      if (!Array.isArray(types)) types = [];
    } catch {
      types = [];
    }
    const valid = types.filter(t => ['AWS', 'Azure'].includes(t));
    setCloudTypes(valid.length ? valid : ['AWS', 'Azure']);
    setActiveTab(valid.length ? valid[0] : 'AWS', 'Azure');
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!companyName.trim()) errs.companyName = 'Company Name is required';
    if (!fullName.trim()) errs.fullName = 'First Name is required';
    if (!lastName.trim()) errs.lastName = 'Last Name is required';
    if (!mobile.trim()) errs.mobile = 'Phone Number is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid Email is required';
    if (!password || password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!productName.trim()) errs.productName = 'Product Name is required';
    if (!cloudPlatform.trim()) errs.cloudPlatform = 'Cloud Platform is required';
    if (!/^https?:\/\/[^\s]+\.[^\s]+$/.test(companyWebsite)) errs.companyWebsite = 'Valid Website URL required';
    if (!preferredContact) errs.preferredContact = 'Preferred contact is required';
    if (!consent) errs.consent = 'You must agree to receive communications';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const payload = {
      basic_info: {
        companyName,
        fullName,
        lastName,
        mobile,
        email,
        productName,
        cloudPlatform,
        companyWebsite,
        password,
        role_id,
        preferredContact,
        consent,
      },
      aws_info: cloudTypes.includes('AWS') ? awsForm : undefined,
      azure_info: cloudTypes.includes('Azure') ? azureForm : undefined,
    };

    try {
      const res = await fetch('http://your-api-url.com/api/enquiry/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        toast.success('Enquiry Submitted!');
        router.push('/thank-you');
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1920px] m-auto bg-black">
      <Header />
      <div className="p-6 grid grid-cols-7 gap-6 text-white">
        <div className="col-span-5">
          <a href="#" className="inline-block px-6 py-2 bg-red-500 text-white font-medium">Back</a>
        </div>

        <div className="px-6 py-6 w-full col-span-7 lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <h2 className="text-xl font-medium mb-4">Enquiry Form</h2>

          <div className="flex space-x-4 border-b border-white/30 mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'basic' ? 'border-b-2 border-orange-500 text-orange-400' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Enquiry
            </button>
            {cloudTypes.map(type => (
              <button
                key={type}
                className={`px-4 py-2 ${activeTab === type ? 'border-b-2 border-orange-500 text-orange-400' : ''}`}
                onClick={() => setActiveTab(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {activeTab === 'basic' && (
            <div className="space-y-4 grid grid-cols-2 gap-4">
              <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="First Name" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <PhoneInput country={'in'} value={mobile} onChange={setMobile} inputClass="!w-full !bg-transparent !text-white !px-14 !text-sm !border-zinc-700 !py-3.5 !outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Business Email" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={cloudPlatform} onChange={(e) => setCloudPlatform(e.target.value)} placeholder="Cloud Platform" className="col-span-2 md:col-span-1 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} placeholder="Company Website" className="col-span-2 px-3 py-3 border border-zinc-700 bg-transparent" />
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="col-span-2 px-3 py-3 border border-zinc-700 bg-transparent" />

              <div className="col-span-2">
                <label className="block mb-1">Preferred Contact</label>
                <div className="flex space-x-4">
                  {['call', 'email', 'whatsapp'].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input type="radio" value={method} checked={preferredContact === method} onChange={(e) => setPreferredContact(e.target.value)} />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center space-x-2 col-span-2">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>I agree to receive communications</span>
              </label>
            </div>
          )}

          {cloudTypes.includes(activeTab) && (
            <CloudDetailsTab
              cloudType={activeTab}
              formData={activeTab === 'AWS' ? awsForm : azureForm}
              setFormData={activeTab === 'AWS' ? setAwsForm : setAzureForm}
            />
          )}

          <div className="col-span-2 text-right mt-6">
            <button onClick={handleEnquirySubmit} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </div>
        </div>

     
        <div className="col-span-7 lg:col-span-3">
       
          <div className="px-7 py-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6">
            <div className="flex gap-6">
              <Image src="/image/acronis.png" alt="Logo" width={120} height={120} />
              <div>
                <h2 className="text-xl font-semibold mb-3">Product Name</h2>
                <p className="text-sm line-clamp-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
              </div>
            </div>
          </div>

       
          <div className="px-7 py-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <h5 className="text-lg font-semibold mb-3">Company Information</h5>
            <p className="text-sm mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <div className="space-y-1 text-sm">
              <p><strong>Contact Number:</strong> +1 (234) 567-8901</p>
              <p><strong>Email:</strong> contact@company.com</p>
              <p><strong>Address:</strong> 123 Street, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
