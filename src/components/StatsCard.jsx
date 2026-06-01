import React from 'react';
import { Users, Clock, Pipette, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({ stats }) {
  const cardData = [
    {
      title: "Total Patients Today",
      value: stats.totalToday,
      subtext: "+12% from yesterday",
      trendUp: true,
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      accentLine: "bg-blue-500"
    },
    {
      title: "Pending Reports",
      value: stats.pending,
      subtext: "Action required soon",
      trendUp: false,
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      accentLine: "bg-amber-500"
    },
    {
      title: "Samples Collected",
      value: stats.samplesCollected,
      subtext: "84% daily target reached",
      trendUp: true,
      icon: Pipette,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      accentLine: "bg-sky-500"
    },
    {
      title: "Completed Reports",
      value: stats.completed,
      subtext: "Dispatched to patient portals",
      trendUp: true,
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      accentLine: "bg-emerald-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardData.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div 
            key={index} 
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-medical hover:shadow-medical-lg transition-all duration-350 relative overflow-hidden group hover:-translate-y-0.5"
          >
            {/* Top Indicator bar for premium touch */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${card.accentLine}`} />

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {card.title}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight font-sans">
                  {card.value}
                </h3>
              </div>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.color} group-hover:scale-105 transition-transform duration-300`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">{card.subtext}</span>
              <span className={`flex items-center gap-0.5 font-bold ${card.trendUp ? 'text-emerald-600' : 'text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded'}`}>
                {card.trendUp ? (
                  <>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </>
                ) : (
                  <span>Awaiting</span>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
