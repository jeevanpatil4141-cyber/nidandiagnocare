import React, { useState } from 'react';
import { Search, Filter, Trash2, Printer, FileText, Check, Clock, Play, HelpCircle } from 'lucide-react';

export default function PatientList({ patients, onUpdateStatus, onDeletePatient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sampleFilter, setSampleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter patients based on keyword, sample type and status filters
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobileNumber.includes(searchTerm) ||
      patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.testType.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSample = sampleFilter === 'All' || patient.sampleType === sampleFilter;
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    
    return matchesSearch && matchesSample && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <Play className="w-3 h-3 fill-current" />
            <span>In Lab</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  const getSampleBadge = (sample) => {
    switch (sample) {
      case 'Blood':
        return (
          <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
            🩸 Blood
          </span>
        );
      case 'Urine':
        return (
          <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50/70 border border-amber-100/60 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
            🧪 Urine
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
            🧫 Other
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-medical overflow-hidden">
      
      {/* Table Header Filter panel */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-slate-800">Active Patient Database</h2>
          <p className="text-xs text-slate-400 font-medium">Search, filter, and track statuses of reports</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Keyword Search */}
          <div className="relative flex-1 sm:flex-initial min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Name, ID, Phone, Test..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-400 focus:border-medical-500 transition-all text-xs w-full"
            />
          </div>

          {/* Sample Filter */}
          <div className="relative">
            <Filter className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <select
              value={sampleFilter}
              onChange={(e) => setSampleFilter(e.target.value)}
              className="pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-1 focus:ring-medical-400 text-xs font-semibold cursor-pointer appearance-none"
            >
              <option value="All">All Samples</option>
              <option value="Blood">Blood</option>
              <option value="Urine">Urine</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-1 focus:ring-medical-400 text-xs font-semibold cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Lab</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table Container */}
      <div className="overflow-x-auto">
        {filteredPatients.length > 0 ? (
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Token</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Details</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor & Visit</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Sample & Test</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/40 transition-colors group">
                  {/* Token */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="font-extrabold text-slate-800 bg-slate-100 border border-slate-150 px-2.5 py-1 rounded text-xs tracking-tight shadow-medical-sm">
                        {patient.token}
                      </span>
                      {patient.patientId && (
                        <span className="text-[10px] font-bold text-medical-600 px-1.5 py-0.5 bg-medical-50 border border-medical-100 rounded leading-none">
                          {patient.patientId}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Name and Demographics */}
                  <td className="px-5 py-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-medical-600 transition-colors">
                        {patient.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {patient.gender}, {patient.age} Yrs {patient.weight && patient.weight !== 'N/A' && `• ${patient.weight} kg`}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold font-mono tracking-wide mt-1">
                        Mob: {patient.mobileNumber} • Bill: ₹{patient.totalBill || 0}
                      </p>
                    </div>
                  </td>

                  {/* Doctor & Date */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-xs font-bold text-slate-700 leading-tight">
                        {patient.doctorName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">
                        Visit: {patient.dateOfVisit}
                      </p>
                    </div>
                  </td>

                  {/* Sample Type & Test */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      {getSampleBadge(patient.sampleType)}
                      <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-1 max-w-[200px]" title={patient.testType}>
                        {patient.testType}
                      </p>
                    </div>
                  </td>

                  {/* Status Badges */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(patient.status)}
                      
                      {/* Interactive toggle for staff */}
                      {patient.status !== 'Completed' && (
                        <button
                          onClick={() => onUpdateStatus(patient.id, patient.status === 'Pending' ? 'In Progress' : 'Completed')}
                          className="text-[10px] text-medical-600 hover:text-medical-700 font-bold hover:underline text-left mt-0.5 leading-none"
                        >
                          {patient.status === 'Pending' ? 'Start processing' : 'Mark completed'}
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Action items */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => alert(`Reviewing lab notes for ${patient.fullName}:\n\n"${patient.notes || 'No notes added.'}"`)}
                        className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-md transition-all"
                        title="View Lab Notes"
                      >
                        <FileText className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Preparing print stream for Token ${patient.token}...\nReceipt slip dispatching to laboratory printers.`)}
                        className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-md transition-all"
                        title="Print Records Label"
                      >
                        <Printer className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to permanently delete patient ${patient.fullName} (${patient.token}) from the system?`)) {
                            onDeletePatient(patient.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* Empty Search results state */
          <div className="px-5 py-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-3.5">
              <Search className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No Patient Records Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
              Try adjusting your search terms, changing the sample type filter, or add a new patient record.
            </p>
          </div>
        )}
      </div>

      {/* Table Footer info */}
      <div className="bg-slate-50/50 p-4 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="font-semibold">Showing {filteredPatients.length} of {patients.length} total registrations</span>
        <span className="font-medium">Confidential Medical Data. Authorized Access Only.</span>
      </div>
    </div>
  );
}
