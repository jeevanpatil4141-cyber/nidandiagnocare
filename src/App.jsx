import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import LoadingSkeleton from './components/LoadingSkeleton';
import { mockPatients, getDashboardStats } from './data/mockPatients';
import { 
  LayoutDashboard, 
  UserPlus, 
  FileSpreadsheet, 
  ClipboardList, 
  CreditCard, 
  Settings as SettingsIcon,
  MessageSquare,
  FileDown,
  Coins,
  ShieldCheck,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function App() {
  // Initialize patient records state, fetching from localStorage if exists
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('nidan_patients');
    return saved ? JSON.parse(saved) : mockPatients;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalToday: 0, pending: 0, samplesCollected: 0, completed: 0 });

  // Update stats whenever patient state changes
  useEffect(() => {
    localStorage.setItem('nidan_patients', JSON.stringify(patients));
    setStats(getDashboardStats(patients));
  }, [patients]);

  // Generate next available token ND-XXX
  const generateNextToken = () => {
    if (patients.length === 0) return 'ND-201';
    const nums = patients.map(p => {
      const numPart = p.token.replace('ND-', '');
      const num = parseInt(numPart, 10);
      return isNaN(num) ? 200 : num;
    });
    const max = Math.max(...nums, 200);
    return `ND-${max + 1}`;
  };

  // Add a new patient record
  const handleAddPatient = (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  // Change patient status
  const handleUpdateStatus = (patientId, nextStatus) => {
    setPatients(prev => 
      prev.map(p => p.id === patientId ? { ...p, status: nextStatus } : p)
    );
  };

  // Delete a patient record
  const handleDeletePatient = (patientId) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
  };

  // Billing ledger states
  const [selectedTests, setSelectedTests] = useState([]);
  const [billingPaid, setBillingPaid] = useState(false);
  const [billingName, setBillingName] = useState('');

  const testPrices = [
    { name: "Complete Blood Count (CBC)", price: 350 },
    { name: "Lipid Profile (Cholesterol)", price: 650 },
    { name: "Thyroid Profile (T3, T4, TSH)", price: 800 },
    { name: "HbA1c & Fasting Glucose", price: 550 },
    { name: "Liver Function Test (LFT)", price: 750 },
    { name: "Kidney Function Test (KFT)", price: 700 },
    { name: "Urine Routine Analysis", price: 250 }
  ];

  const handleTestToggle = (test) => {
    if (selectedTests.some(t => t.name === test.name)) {
      setSelectedTests(prev => prev.filter(t => t.name !== test.name));
    } else {
      setSelectedTests(prev => [...prev, test]);
    }
  };

  const calculateTotal = () => {
    return selectedTests.reduce((acc, curr) => acc + curr.price, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-medical-100 selection:text-medical-900">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <div className="flex-1 flex relative">
        {/* Left Desktop Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Panel */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-y-auto h-[calc(100vh-69px-64px)] md:h-[calc(100vh-69px)]">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Good evening, Jeev</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Welcome back to the NIDAN Diagnocare dashboard. Lab systems are active.</p>
                </div>
                <button
                  onClick={() => setActiveTab('add-patient')}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Patient</span>
                </button>
              </div>

              {/* Stats Grid */}
              <StatsCard stats={stats} />

              {/* Dashboard Layout Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Registrations Table */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-medical p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Recent Registrations</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Last 4 patients registered today</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('records')}
                        className="text-xs font-bold text-medical-600 hover:text-medical-700 hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {patients.slice(0, 4).map((p) => (
                        <div key={p.id} className="py-3 flex items-center justify-between group hover:bg-slate-50/20 px-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-extrabold text-slate-700 bg-slate-100 border border-slate-150 px-2 py-0.5 rounded font-mono">
                              {p.token}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 group-hover:text-medical-600 transition-colors">{p.fullName}</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">{p.testType} • Dr. {p.doctorName.replace("Dr. ", "")}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            p.status === 'Completed' 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : p.status === 'In Progress' 
                                ? 'bg-blue-50 text-blue-600' 
                                : 'bg-amber-50 text-amber-600'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Database secure. Cloud synced 2m ago.</span>
                    <span className="font-bold text-slate-500">Active tokens: {patients.length}</span>
                  </div>
                </div>

                {/* Connected Analyzer Equipment Systems Widget */}
                <div>
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          )}

          {/* Add Patient Tab */}
          {activeTab === 'add-patient' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Patient Intake Portal</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Please ensure patient details match the printed doctor prescription.</p>
              </div>
              <PatientForm onAddPatient={handleAddPatient} nextTokenVal={generateNextToken()} />
            </div>
          )}

          {/* Patient Records Tab */}
          {activeTab === 'records' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Digital Patient Database</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage details, modify laboratory statuses, or print label tokens.</p>
              </div>
              <PatientList 
                patients={patients} 
                onUpdateStatus={handleUpdateStatus} 
                onDeletePatient={handleDeletePatient} 
              />
            </div>
          )}

          {/* Reports Portal Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Diagnostic Reports Desk</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Dispatch reports to patient health vaults, download verified reports, or trigger WhatsApp links.</p>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl shadow-medical p-5">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-800">Verified Pathology Report List</h3>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 border border-emerald-100 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NABL Accredited Lab Sign-offs Active</span>
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {patients.map((p) => (
                    <div key={p.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 border border-slate-150 px-2 py-0.5 rounded font-mono">
                            {p.token}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800">{p.fullName}</h4>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                            p.status === 'Completed' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {p.status === 'Completed' ? 'Accredited Sign-off' : 'Processing'}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mt-1">{p.testType}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Approved by: Dr. Anita Mehta • Lab Director</p>
                      </div>

                      {p.status === 'Completed' ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => alert(`Downloading verified PDF report for ${p.fullName} (Token ${p.token})...`)}
                            className="btn-secondary flex-1 sm:flex-initial py-1 px-3 text-xs"
                          >
                            <FileDown className="w-3.5 h-3.5 text-slate-400" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => alert(`WhatsApp notification containing secure PDF link dispatched to +91 ${p.mobileNumber}`)}
                            className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-white border-0 py-1 px-3 text-xs flex-1 sm:flex-initial"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Report</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs text-amber-500 font-semibold flex items-center gap-1.5 bg-amber-50/50 px-3 py-1.5 border border-amber-100/40 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                          <span>Specimen under centrifuging / processing</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Lab Billing Desk</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Calculate diagnostic test prices, issue digital receipts, and track paid entries.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Price calculator */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-medical p-5">
                  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Diagnostic Test Price Estimator</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="mb-4">
                      <label htmlFor="billingName" className="label-medical">Patient Name for Receipt</label>
                      <input 
                        type="text" 
                        id="billingName" 
                        placeholder="Enter patient name..." 
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        className="input-medical"
                      />
                    </div>

                    <span className="label-medical">Select Diagnostic Panels</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {testPrices.map((test, index) => {
                        const isSelected = selectedTests.some(t => t.name === test.name);
                        return (
                          <button
                            key={index}
                            onClick={() => handleTestToggle(test)}
                            className={`p-3.5 text-left border rounded-xl transition-all duration-200 ${
                              isSelected 
                                ? 'bg-medical-50/70 border-medical-300 ring-1 ring-medical-200' 
                                : 'bg-slate-50/20 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-700">{test.name}</span>
                              <span className="text-xs font-black text-medical-600 font-mono">₹{test.price}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="billingPaid"
                        checked={billingPaid}
                        onChange={(e) => setBillingPaid(e.target.checked)}
                        className="w-4 h-4 text-medical-600 focus:ring-medical-400"
                      />
                      <label htmlFor="billingPaid" className="text-xs font-semibold text-slate-600 cursor-pointer">Mark Invoice as PAID on checkout</label>
                    </div>
                    <button
                      onClick={() => {
                        if (!billingName) {
                          alert("Please fill in the Patient Name first.");
                          return;
                        }
                        if (selectedTests.length === 0) {
                          alert("Please select at least one diagnostic panel.");
                          return;
                        }
                        alert(`Invoice created successfully!\n\nPatient: ${billingName}\nTotal Panels: ${selectedTests.length}\nTotal Bill: ₹${calculateTotal()}\nStatus: ${billingPaid ? 'PAID (Cash/UPI Received)' : 'UNPAID'}\n\nDigital invoice slip has been saved.`);
                        setBillingName('');
                        setSelectedTests([]);
                        setBillingPaid(false);
                      }}
                      className="btn-primary w-full sm:w-auto"
                    >
                      <Coins className="w-4 h-4" />
                      <span>Generate Bill (Total: ₹{calculateTotal()})</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats summaries */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-medical p-5 space-y-5">
                  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Today's Revenue Estimates</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-center">
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Total Cash/UPI Realised</p>
                      <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">₹14,250</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-center">
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Outstanding Invoices</p>
                      <p className="text-2xl font-extrabold text-amber-700 mt-1 font-mono">₹1,850</p>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                      All diagnostic billing logs are audited by central accountants. For cash drawer reconciliations, contact admin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Portal Configuration</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Control SMS notifications templates, laboratory device credentials, and staff shifts.</p>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl shadow-medical p-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">Automated Communications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-700">SMS / WhatsApp Intake Confirmation</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Send a booking link and assigned token when a patient is saved.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" id="sms-toggle" />
                        <label htmlFor="sms-toggle" className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:height-4 after:width-4 after:h-4 after:w-4 after:transition-all peer-checked:bg-medical-600 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-700">Send PDF Report Automatically</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Directly message PDF once pathologists sign off.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" id="pdf-toggle" />
                        <label htmlFor="pdf-toggle" className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-medical-600 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 pt-2">Pathologist Signatures</h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Dr. Anita Mehta (MD, Pathology)</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Digital signature active • NABL Signee ID #10425</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded">Verified Credentials</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert("Configurations updated successfully on the cloud server.")}
                    className="btn-primary"
                  >
                    <span>Save Configurations</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile & Tablet Bottom Navigation Bar (Responsive Touch) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-150 h-16 px-4 py-2 flex items-center justify-around z-40 shadow-lg">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'dashboard' ? 'text-medical-600' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('add-patient')} 
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'add-patient' ? 'text-medical-600' : 'text-slate-400'}`}
        >
          <UserPlus className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Add Patient</span>
        </button>

        <button 
          onClick={() => setActiveTab('records')} 
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'records' ? 'text-medical-600' : 'text-slate-400'}`}
        >
          <FileSpreadsheet className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Records</span>
        </button>

        <button 
          onClick={() => setActiveTab('reports')} 
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'reports' ? 'text-medical-600' : 'text-slate-400'}`}
        >
          <ClipboardList className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Reports</span>
        </button>

        <button 
          onClick={() => setActiveTab('billing')} 
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'billing' ? 'text-medical-600' : 'text-slate-400'}`}
        >
          <CreditCard className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Billing</span>
        </button>
      </nav>
    </div>
  );
}
