import React, { useState } from 'react';
import { RefreshCw, Play, ShieldAlert, Cpu } from 'lucide-react';

export default function LoadingSkeleton() {
  const [loading, setLoading] = useState(false);

  const simulateReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-medical p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Laboratory Analyser Systems</h3>
          <p className="text-[11px] text-slate-400 font-medium">Real-time status of connected diagnostic equipment</p>
        </div>
        <button 
          onClick={simulateReload}
          disabled={loading}
          className="p-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg hover:text-medical-600 hover:bg-medical-50 transition-all flex items-center gap-1.5 text-xs font-semibold disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Analysers</span>
        </button>
      </div>

      {loading ? (
        /* Skeletons */
        <div className="space-y-4 py-2 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-lg"></div>
              <div>
                <div className="h-3 w-32 bg-slate-200 rounded"></div>
                <div className="h-2 w-16 bg-slate-100 rounded mt-1.5"></div>
              </div>
            </div>
            <div className="h-5 w-14 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-lg"></div>
              <div>
                <div className="h-3 w-28 bg-slate-200 rounded"></div>
                <div className="h-2 w-20 bg-slate-100 rounded mt-1.5"></div>
              </div>
            </div>
            <div className="h-5 w-14 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-lg"></div>
              <div>
                <div className="h-3 w-36 bg-slate-200 rounded"></div>
                <div className="h-2 w-12 bg-slate-100 rounded mt-1.5"></div>
              </div>
            </div>
            <div className="h-5 w-14 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      ) : (
        /* Real layout */
        <div className="space-y-3.5 py-1">
          {/* Equipment 1 */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center text-rose-500">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700 leading-tight">Beckman Coulter Hematology</h4>
                <p className="text-[10px] text-slate-400">Model LH-750 • Blood Profiling</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Online</span>
            </span>
          </div>

          {/* Equipment 2 */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center text-amber-500">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700 leading-tight">Roche Cobas Urine Analyser</h4>
                <p className="text-[10px] text-slate-400">Model U-601 • Urine Chemistry</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Online</span>
            </span>
          </div>

          {/* Equipment 3 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700 leading-tight">Abbott Architect Biochemistry</h4>
                <p className="text-[10px] text-slate-400">Model ci8200 • Immunoassay</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Standby</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
