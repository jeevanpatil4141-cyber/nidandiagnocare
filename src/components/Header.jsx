import React, { useState, useEffect } from 'react';
import { Activity, Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Update time every second for a live clock feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time professionally
  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-medical-sm">
      {/* Left side: Logo & Branding */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-medical-50 border border-medical-200 text-medical-600 shadow-sm animate-pulse-slow">
          {/* 
            ========================================================================
            CRITICAL LOGO INSTRUCTION:
            Replace this placeholder icon below with your uploaded pathology lab logo.
            Example: <img src="/logo.png" alt="NIDAN Diagnocare Logo" className="w-8 h-8 object-contain" />
            ========================================================================
          */}
          <Activity className="w-6 h-6 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            NIDAN <span className="text-medical-600 font-semibold">Diagnocare</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Pathology Laboratory System</p>
        </div>
      </div>

      {/* Right side: DateTime, Notifications & User Info */}
      <div className="flex items-center gap-6">
        {/* Live Clock Display */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3.5 py-1.5">
          <div className="w-2 h-2 rounded-full bg-medical-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-600 tracking-wide tabular-nums">
            {formatDateTime(currentTime)}
          </span>
        </div>

        {/* Action icons (Notifications) */}
        <button className="relative p-2 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-all" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* Receptionist Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 hover:bg-slate-50 p-1.5 rounded-lg transition-all text-left"
            aria-haspopup="true"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-9 h-9 rounded-full bg-medical-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-medical-600/10 border border-medical-500">
              JP
            </div>
            <div className="hidden sm:block">
              <h2 className="text-xs font-bold text-slate-700 leading-none">Jeev Patil</h2>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">Front Desk Staff</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Content */}
          {profileDropdownOpen && (
            <>
              {/* Overlay to close on click outside */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-150 rounded-xl shadow-medical-xl py-1.5 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">jeev.patil@nidan.com</p>
                </div>
                
                <a href="#settings" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-medical-600 transition-all">
                  <Settings className="w-4 h-4" />
                  <span>Lab Settings</span>
                </a>
                
                <div className="h-px bg-slate-100 my-1"></div>
                
                <button 
                  onClick={() => alert("Logging out of NIDAN Diagnocare Staff Portal...")}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-all text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
