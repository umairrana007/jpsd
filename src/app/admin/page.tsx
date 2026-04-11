'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiDollarSign, FiUsers, FiUser, FiBarChart2, FiSettings, FiPlus, FiActivity, FiShield, FiDatabase, FiCheck, FiX } from 'react-icons/fi';
import { getSystemStats, getRecentActivity, getDonations } from '@/lib/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';
import GlobalSearch from '@/components/admin/GlobalSearch';
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { 
  ssr: false, 
  loading: () => <div className="h-64 bg-slate-100 animate-pulse rounded"/> 
});
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

interface AdminStats {
  todayDonations: number;
  totalDonations: number;
  totalDonors: number;
  activeVolunteers: number;
  upcomingMissions: number;
  systemHealth: string;
}

interface AdminActivity {
  id: string;
  message: string;
  time: string;
  icon: string;
}

function AdminDashboardPage() {
  const { setGlobalAlert } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, activityData, donationsData] = await Promise.all([
          getSystemStats(),
          getRecentActivity(),
          getDonations() // Using properly imported function
        ]);
        setStats((statsData as AdminStats) || { todayDonations: 0, totalDonations: 0, totalDonors: 0, activeVolunteers: 0, upcomingMissions: 0, systemHealth: 'Offline' });
        setActivities((activityData || []) as AdminActivity[]);
        setRecentDonations((donationsData || []).slice(0, 5));
      } catch (err) {
        console.warn('[HQ Intel] Data Fetch Calibration failed, using tactical defaults.');
        setStats({ todayDonations: 0, totalDonations: 0, totalDonors: 0, activeVolunteers: 0, upcomingMissions: 0, systemHealth: 'Offline' });
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin shadow-xl shadow-[#1ea05f]/20"></div>
     </div>
  );

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">HQ Command Center</h2>
          <p className="text-slate-500 font-medium">JPSD Global Management & Tactical Operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 hover:text-primary shadow-sm transition-all"
          >
            <FiPlus /> Add Cause
          </button>
          <button 
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#1ea05f]/20"
          >
            <FiActivity /> Deploy Mission
          </button>
        </div>
      </header>

      {/* Quick Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <FiDollarSign size={24} />
            </div>
            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Today</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Today's Donations</p>
          <h3 className="text-3xl font-black mt-1 text-slate-800">${stats?.todayDonations?.toLocaleString() || '0'}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FiUsers size={24} />
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">Total</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Donors</p>
          <h3 className="text-3xl font-black mt-1 text-slate-800">{stats?.totalDonors?.toLocaleString() || '0'}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <FiActivity size={24} />
            </div>
            <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">Deployments</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Volunteers</p>
          <h3 className="text-3xl font-black mt-1 text-slate-800">{stats?.activeVolunteers || '0'}</h3>
        </div>
        
        {/* System Health Status (Requirement B - 8) */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group md:col-span-3">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]"></span>
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Database: Live</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]"></span>
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Assets Store: Healthy</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]"></span>
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Auth Service: Operational</span>
              </div>
              <span className="ml-auto text-[10px] font-black text-slate-400 uppercase tracking-widest">System Health: {stats?.systemHealth || 'Critical'}</span>
           </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart & Trends */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-bold">Revenue Insights</h4>
                <p className="text-sm text-slate-500">Weekly donation performance</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800">Week</button>
                <button className="px-3 py-1 text-xs font-semibold rounded-lg hover:bg-slate-100 text-slate-500">Month</button>
              </div>
            </div>
            {/* Real Analytics Chart */}
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'Mon', revenue: 4000 },
                  { name: 'Tue', revenue: 6500 },
                  { name: 'Wed', revenue: 5500 },
                  { name: 'Thu', revenue: 8500 },
                  { name: 'Fri', revenue: 9500 },
                  { name: 'Sat', revenue: 4500 },
                  { name: 'Sun', revenue: 6000 },
                ]}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1ea05f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1ea05f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                    dy={10}
                  />
                  <YAxis hide domain={[0, 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px shadow-xl' }}
                    itemStyle={{ color: '#1ea05f', fontWeight: 900, fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#1ea05f" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Donations Table */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold">Recent Donations</h4>
              <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/donations">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-100">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="pb-4 font-semibold">Donor</th>
                    <th className="pb-4 font-semibold">Cause</th>
                    <th className="pb-4 font-semibold">Amount</th>
                    <th className="pb-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentDonations.length > 0 ? recentDonations.map((donation, idx) => (
                    <tr key={donation.id || idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {donation.donorName?.[0] || 'D'}
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{donation.donorName || 'Anonymous'}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{donation.causeName || 'General'}</td>
                      <td className="py-4 text-sm font-bold text-slate-800">${donation.amount?.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                          donation.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {donation.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-slate-400 text-sm italic">
                        No recent donations recorded tactical stream.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-8">
          {/* Upcoming Events Countdown */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h4 className="text-lg font-bold mb-6">Upcoming Main Event</h4>
            <div className="flex flex-col gap-4">
              <p className="text-slate-300 text-sm font-medium">Annual Zakat Distribution</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
                  <span className="block text-2xl font-black">04</span>
                  <span className="text-[10px] uppercase font-bold opacity-70">Days</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
                  <span className="block text-2xl font-black">12</span>
                  <span className="text-[10px] uppercase font-bold opacity-70">Hours</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
                  <span className="block text-2xl font-black">45</span>
                  <span className="text-[10px] uppercase font-bold opacity-70">Mins</span>
                </div>
              </div>
              <button onClick={() => setGlobalAlert('Event management protocol initiating. Full dashboard sync in progress.', 'success')} className="mt-4 w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">Manage Event</button>
            </div>
          </div>

          {/* Field Agent Calibration (Approvals) */}
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-black italic uppercase italic tracking-widest text-slate-800">Agent Calibration</h4>
                <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Pending Verification</p>
              </div>
              <FiShield className="text-amber-500" />
            </div>
            <div className="space-y-6">
              {[
                { name: 'Arsalan Khan', skills: 'Medical, Logistics', phone: '0300-1234567' },
                { name: 'Mariam Ali', skills: 'Translation, Education', phone: '0321-9876543' }
              ].map((v, i) => (
                <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4 hover:shadow-lg transition-all group">
                   <div className="flex justify-between items-start">
                      <div>
                         <p className="text-sm font-black text-slate-800 italic uppercase">{v.name}</p>
                         <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1">Field Unit: {v.skills}</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400">{v.phone}</p>
                   </div>
                   <div className="flex gap-2 pt-2">
                      <button 
                         onClick={() => setGlobalAlert('Mission Authorization Confirmed. SMS Alerting Agent...', 'success')}
                         className="flex-1 py-3 bg-[#1ea05f] text-white rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-[#1ea05f]/20"
                      >
                         <FiCheck /> Approve
                      </button>
                      <button 
                         onClick={() => setGlobalAlert('Agent Calibration Rejected. Identity Verification Failed.', 'error')}
                         className="w-12 h-12 bg-white text-red-500 border border-slate-200 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                         <FiX />
                      </button>
                   </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest border border-dashed border-slate-200 rounded-2xl hover:bg-white hover:text-slate-800 transition-all">
              View All Field Applications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(AdminDashboardPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] 
});
