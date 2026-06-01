import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  FileSpreadsheet, 
  ClipboardList, 
  CreditCard, 
  Settings as SettingsIcon,
  HelpCircle,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-patient', label: 'Add Patient', icon: UserPlus },
    { id: 'records', label: 'Patient Records', icon: FileSpreadsheet },
    { id: 'reports', label: 'Reports', icon: ClipboardList },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between h-[calc(100vh-69px)] sticky top-[69px] z-30 shadow-medical-sm hidden md:flex">
      {/* Upper Navigation Links */}
      <div className="px-4 py-6 flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Navigation</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-medical-50 text-medical-700 border-l-4 border-medical-600 pl-2' 
                  : 'text-slate-500 hover:text-medical-600 hover:bg-slate-50/80'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 stroke-[2] ${isActive ? 'text-medical-600' : 'text-slate-400 group-hover:text-medical-600'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer / Support Help Card */}
      <div className="p-4 border-t border-slate-50">
        <div className="bg-medical-50/50 border border-medical-100/60 rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-medical-700">
            <HelpCircle className="w-4 h-4 stroke-[2.5]" />
            <h4 className="text-xs font-bold">Support Desk</h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Facing errors with sample tracking? Tap below to raise a ticket.
          </p>
          <button 
            onClick={() => alert("Connecting to NIDAN Support Hotline...")}
            className="w-full mt-1.5 text-center text-xs font-bold text-medical-600 bg-white hover:bg-medical-100/30 border border-medical-200 py-1.5 rounded-lg transition-all"
          >
            Contact Admin
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-400 font-semibold tracking-wide">NIDAN V1.2.0-PROD</p>
        </div>
      </div>
    </aside>
  );
}
