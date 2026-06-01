import React, { useState } from 'react';
import { UserPlus, RotateCcw, Printer, Cpu, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PatientForm({ onAddPatient, nextTokenVal }) {
  const initialFormState = {
    fullName: '',
    gender: '',
    age: '',
    weight: '',
    mobileNumber: '',
    address: '',
    doctorName: '',
    sampleType: '',
    testType: '',
    dateOfVisit: new Date().toISOString().split('T')[0],
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showTokenAlert, setShowTokenAlert] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastSavedPatient, setLastSavedPatient] = useState(null);

  // Common pathology tests suggestion list
  const commonTests = [
    "Complete Blood Count (CBC)",
    "Lipid Profile",
    "Thyroid Profile (T3, T4, TSH)",
    "HbA1c & Fasting Blood Sugar (FBS)",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT) / Renal Profile",
    "Routine Urine Analysis & Culture",
    "Vitamin D3 & B12 Test",
    "Dengue NS1 Antigen & IgG/IgM",
    "Hemoglobin (Hb) Est."
  ];

  // Common referring doctors suggestions
  const commonDoctors = [
    "Self-Prescribed / Walk-in",
    "Dr. Sandeep Patwardhan (MD, Medicine)",
    "Dr. Anita Mehta (Gynecologist)",
    "Dr. Vikram Ranade (Cardiologist)",
    "Dr. Ritu Karidhal (Endocrinologist)",
    "Dr. K. K. Aggarwal (General Physician)"
  ];

  // Handle fields changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Field validation on Blur (done with user interaction)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'fullName' && !value.trim()) {
      errorMsg = 'Full name is required';
    } else if (name === 'age') {
      if (!value) errorMsg = 'Age is required';
      else if (parseInt(value) <= 0 || parseInt(value) > 120) errorMsg = 'Please enter a valid age (1-120)';
    } else if (name === 'mobileNumber') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value) errorMsg = 'Mobile number is required';
      else if (!phoneRegex.test(value)) errorMsg = 'Enter a valid 10-digit mobile number';
    } else if (name === 'address' && !value.trim()) {
      errorMsg = 'Address is required';
    } else if (name === 'doctorName' && !value.trim()) {
      errorMsg = 'Please enter referring doctor or select Walk-in';
    } else if (name === 'testType' && !value.trim()) {
      errorMsg = 'Test type is required';
    } else if (name === 'gender' && !value) {
      errorMsg = 'Please select gender';
    } else if (name === 'sampleType' && !value) {
      errorMsg = 'Please select sample type';
    }

    setErrors(prev => {
      if (errorMsg) {
        return { ...prev, [name]: errorMsg };
      } else {
        const next = { ...prev };
        delete next[name];
        return next;
      }
    });

    return !errorMsg;
  };

  // Validate whole form
  const validateForm = () => {
    const currentErrors = {};
    
    if (!formData.fullName.trim()) currentErrors.fullName = 'Full name is required';
    if (!formData.gender) currentErrors.gender = 'Gender is required';
    if (!formData.age) currentErrors.age = 'Age is required';
    else if (parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) currentErrors.age = 'Enter valid age';
    if (!formData.mobileNumber) currentErrors.mobileNumber = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) currentErrors.mobileNumber = 'Enter 10-digit number';
    if (!formData.address.trim()) currentErrors.address = 'Address is required';
    if (!formData.doctorName.trim()) currentErrors.doctorName = 'Referring doctor is required';
    if (!formData.sampleType) currentErrors.sampleType = 'Sample type is required';
    if (!formData.testType.trim()) currentErrors.testType = 'Test type is required';
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add patient callback
      const newPatient = {
        ...formData,
        token: nextTokenVal,
        status: 'Pending',
        weight: formData.weight ? parseInt(formData.weight) : 'N/A'
      };
      
      onAddPatient(newPatient);
      setLastSavedPatient(newPatient);
      
      // Fun visual feedback
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0284c7', '#38bdf8', '#bae6fd', '#ffffff']
      });

      // Show temporary token generation confirmation
      setGeneratedToken(nextTokenVal);
      setShowTokenAlert(true);
      
      // Reset form
      setFormData(initialFormState);
      setErrors({});
    } else {
      // Highlight errors by shaking the form element
      const formEl = document.getElementById('patient-reg-form');
      if (formEl) {
        formEl.classList.add('shake-animation');
        setTimeout(() => formEl.classList.remove('shake-animation'), 400);
      }
    }
  };

  // Clear all fields
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the registration form?")) {
      setFormData(initialFormState);
      setErrors({});
      setShowTokenAlert(false);
    }
  };

  // Print Receipt Action
  const handlePrintReceipt = () => {
    if (lastSavedPatient) {
      setShowReceiptModal(true);
    } else {
      alert("No patient registered recently in this session. Please save a patient first before printing the receipt.");
    }
  };

  // Generate Token Action (standalone check)
  const handleGenerateToken = () => {
    alert(`Token reservation successful! The reserved token for the next patient is: ${nextTokenVal}. Please complete the registration form.`);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-medical p-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-medical-50 border border-medical-100 flex items-center justify-center text-medical-600">
          <UserPlus className="w-5.5 h-5.5 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800">New Patient Registration</h2>
          <p className="text-xs text-slate-400 font-medium">Register a patient and sample records in the system</p>
        </div>
        <div className="ml-auto bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-right">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Token Assigned</p>
          <p className="text-sm font-extrabold text-medical-600 tracking-tight leading-none mt-1">{nextTokenVal}</p>
        </div>
      </div>

      {/* Main Registration Form */}
      <form id="patient-reg-form" onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Row 1: Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="label-medical">Patient Full Name <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              autocomplete="name"
              placeholder="e.g. Rajesh Kumar"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-medical"
              required
            />
            {errors.fullName && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.fullName}</span>}
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label htmlFor="age" className="label-medical">Age (Years) <span className="text-rose-500">*</span></label>
            <input 
              type="number" 
              id="age" 
              name="age"
              min="1"
              max="120"
              inputmode="numeric"
              placeholder="e.g. 42"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-medical"
              required
            />
            {errors.age && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.age}</span>}
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <label htmlFor="weight" className="label-medical">Weight (kg)</label>
            <input 
              type="number" 
              id="weight" 
              name="weight"
              min="1"
              max="300"
              inputmode="numeric"
              placeholder="e.g. 68"
              value={formData.weight}
              onChange={handleChange}
              className="input-medical"
            />
          </div>
        </div>

        {/* Row 2: Demographics and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Gender selection - Mutually exclusive options as visible radio buttons as per Guidelines */}
          <div className="flex flex-col">
            <span className="label-medical">Gender <span className="text-rose-500">*</span></span>
            <div className="flex items-center gap-4 py-2 border border-slate-100 rounded-lg px-3 bg-slate-50/50 h-[38px]">
              {['Male', 'Female', 'Other'].map(opt => (
                <label key={opt} className="flex items-center gap-1.5 text-sm text-slate-600 font-medium cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value={opt}
                    checked={formData.gender === opt}
                    onChange={handleChange}
                    className="w-4 h-4 text-medical-600 border-slate-300 focus:ring-medical-400"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {errors.gender && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.gender}</span>}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label htmlFor="mobileNumber" className="label-medical">Mobile Number <span className="text-rose-500">*</span></label>
            <input 
              type="tel" 
              id="mobileNumber" 
              name="mobileNumber"
              autocomplete="tel"
              inputmode="tel"
              placeholder="e.g. 9876543210"
              value={formData.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-medical"
              required
            />
            {errors.mobileNumber && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.mobileNumber}</span>}
          </div>

          {/* Date of Visit */}
          <div className="flex flex-col">
            <label htmlFor="dateOfVisit" className="label-medical">Date of Visit <span className="text-rose-500">*</span></label>
            <input 
              type="date" 
              id="dateOfVisit" 
              name="dateOfVisit"
              value={formData.dateOfVisit}
              onChange={handleChange}
              className="input-medical"
              required
            />
          </div>
        </div>

        {/* Row 3: Patient Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="label-medical">Patient Residential Address <span className="text-rose-500">*</span></label>
          <textarea 
            id="address" 
            name="address"
            rows="2"
            autocomplete="street-address"
            placeholder="Complete postal address for reports delivery..."
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input-medical py-2.5 resize-y"
            required
          ></textarea>
          {errors.address && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.address}</span>}
        </div>

        {/* Row 4: Medical / Diagnostic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Prescribing Doctor */}
          <div className="flex flex-col">
            <label htmlFor="doctorName" className="label-medical">Referred Doctor <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              id="doctorName" 
              name="doctorName"
              list="doctors-list"
              placeholder="e.g. Dr. Anita Mehta"
              value={formData.doctorName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-medical"
              required
            />
            <datalist id="doctors-list">
              {commonDoctors.map((doc, idx) => (
                <option key={idx} value={doc} />
              ))}
            </datalist>
            {errors.doctorName && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.doctorName}</span>}
          </div>

          {/* Sample Type selection - Mutually exclusive options as visible radio buttons as per Guidelines */}
          <div className="flex flex-col">
            <span className="label-medical">Sample Type <span className="text-rose-500">*</span></span>
            <div className="flex items-center gap-4 py-2 border border-slate-100 rounded-lg px-3 bg-slate-50/50 h-[38px]">
              {['Blood', 'Urine', 'Other'].map(opt => (
                <label key={opt} className="flex items-center gap-1.5 text-sm text-slate-600 font-medium cursor-pointer">
                  <input 
                    type="radio" 
                    name="sampleType" 
                    value={opt}
                    checked={formData.sampleType === opt}
                    onChange={handleChange}
                    className="w-4 h-4 text-medical-600 border-slate-300 focus:ring-medical-400"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {errors.sampleType && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.sampleType}</span>}
          </div>

          {/* Test Type with datalist suggestions */}
          <div className="flex flex-col">
            <label htmlFor="testType" className="label-medical">Test Type <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              id="testType" 
              name="testType"
              list="tests-list"
              placeholder="Select or type test..."
              value={formData.testType}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-medical"
              required
            />
            <datalist id="tests-list">
              {commonTests.map((t, idx) => (
                <option key={idx} value={t} />
              ))}
            </datalist>
            {errors.testType && <span className="text-rose-500 text-[11px] mt-1 font-semibold" role="alert">{errors.testType}</span>}
          </div>
        </div>

        {/* Row 5: Notes/Remarks */}
        <div className="flex flex-col">
          <label htmlFor="notes" className="label-medical">Diagnostic Notes / Staff Remarks</label>
          <textarea 
            id="notes" 
            name="notes"
            rows="2"
            placeholder="Clinical details, fasting state, urgent marking, pre-existing medication info..."
            value={formData.notes}
            onChange={handleChange}
            className="input-medical py-2.5 resize-y"
          ></textarea>
        </div>

        {/* Buttons Actions Bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button 
              type="submit" 
              className="btn-primary"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Save Patient</span>
            </button>

            <button 
              type="button" 
              onClick={handleClear} 
              className="btn-danger"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear Form</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={handleGenerateToken} 
              className="btn-secondary"
            >
              <Cpu className="w-4 h-4" />
              <span>Generate Token</span>
            </button>

            <button 
              type="button" 
              onClick={handlePrintReceipt} 
              className="btn-secondary"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </form>

      {/* SUCCESS CONFIRMATION ALERT (TOKEN) */}
      {showTokenAlert && (
        <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3.5 animate-slide-up">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-800">Patient Saved & Token Assigned!</h4>
            <p className="text-xs text-emerald-600 font-medium mt-0.5">
              Registration code generated: <strong className="font-extrabold text-emerald-700 bg-white border border-emerald-150 px-2 py-0.5 rounded text-sm">{generatedToken}</strong>. The sample collector can now label the test tubes.
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => setShowTokenAlert(false)} 
            className="ml-auto text-emerald-400 hover:text-emerald-600 text-xs font-bold self-start mt-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MOCK RECEIPT MODAL */}
      {showReceiptModal && lastSavedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-100 rounded-2xl w-full max-w-md shadow-medical-xl p-6 relative animate-slide-up">
            <div className="text-center border-b border-dashed border-slate-200 pb-4 mb-4">
              <h3 className="text-sm font-extrabold tracking-widest text-slate-400 uppercase">Receipt and Slip</h3>
              <h1 className="text-base font-bold text-slate-800 mt-1">NIDAN Diagnocare Labs</h1>
              <p className="text-[10px] text-slate-400">Sector 15, Vashi, Navi Mumbai | Tel: 022-27894562</p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">Token / ID:</span>
                <span className="font-bold text-slate-800">{lastSavedPatient.token}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Patient Name:</span>
                <span className="font-bold text-slate-800">{lastSavedPatient.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Demographics:</span>
                <span className="text-slate-700">{lastSavedPatient.gender}, {lastSavedPatient.age} Yrs ({lastSavedPatient.weight} kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Mobile Number:</span>
                <span className="text-slate-700">{lastSavedPatient.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Referred By:</span>
                <span className="text-slate-700 italic">{lastSavedPatient.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Visit Date:</span>
                <span className="text-slate-700">{lastSavedPatient.dateOfVisit}</span>
              </div>
              <div className="h-px bg-dashed bg-slate-200 my-3"></div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-700">Diagnostic Test Type:</span>
                <span className="font-extrabold text-medical-600 text-right max-w-[200px] truncate">{lastSavedPatient.testType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Sample Received:</span>
                <span className="font-bold text-slate-800">{lastSavedPatient.sampleType} specimen</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-6 text-center text-[10px] text-slate-400">
              <p>Reports will be available online or via message link in 12-24 hours.</p>
              <p className="mt-1 font-semibold text-slate-500">Scan QR on receipt stub to track report.</p>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => {
                  window.print();
                  setShowReceiptModal(false);
                }}
                className="btn-primary flex-1"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>
              <button 
                type="button" 
                onClick={() => setShowReceiptModal(false)}
                className="btn-secondary flex-1"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
