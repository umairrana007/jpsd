'use client';

import React, { useState } from 'react';
import { 
  FiHeart, FiArrowRight, FiCheckCircle, FiShield, 
  FiUser, FiMessageSquare, FiTrendingUp, FiCheck,
  FiCreditCard, FiSmartphone, FiHome, FiLock,
  FiZap, FiArrowLeft, FiTag
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import { createDonation } from '@/lib/firebaseUtils';
import { processPayment } from '@/lib/paymentUtils';
import { dispatchDonationNotification } from '@/lib/notificationUtils';
import { trackDonationCompletion } from '@/lib/analyticsUtils';

export default function DonationPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    frequency: 'one-time',
    cause: 'Palestine Relief',
    isZakat: true,
    isAnonymous: false,
    dedication: '',
    paymentMethod: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Operational Error: Invalid Donation Amount. Deployment requires positive impact values.');
      return;
    }

    setSubmitting(true);
    
    try {
      // 1. Initial Tactical Asset Verification (Firebase)
      const donationId = await createDonation({
        ...formData,
        amount: parseFloat(formData.amount),
        userId: 'MOCK-USER-123'
      });
      
      if (!donationId) throw new Error('Asset verification failed.');

      // 2. Tactical Payment Calibration (BHPGP)
      const paymentResult: any = await processPayment({
        amount: parseFloat(formData.amount),
        currency: 'PKR',
        method: formData.paymentMethod as any,
        donorName: 'Anonymous Humanitarian',
        causeId: formData.cause
      });

      if (paymentResult.success) {
        // 3. Tactical Comms Dispatch (BTCC)
        await dispatchDonationNotification({
          id: paymentResult.transactionId,
          amount: formData.amount,
          cause: formData.cause,
          email: 'donor@example.com' // Map properly from session
        });

        // 4. Tactical Analytics Protocol (BTAT)
        trackDonationCompletion(
          parseFloat(formData.amount),
          'PKR',
          formData.paymentMethod
        );

        if (paymentResult.redirectUrl) {
          window.location.href = paymentResult.redirectUrl;
        } else {
          // Success Path (e.g. for Direct Wallet)
          alert(`Humanitarian impact confirmed. ID: ${paymentResult.transactionId}`);
          window.location.href = '/donation/success';
        }
      }
    } catch (err) {
      console.error('[BHPGP] Operational Error:', err);
      alert('Mission-critical payment calibration failed. Please contact HQ.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-start pt-32 md:pt-40 p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#1ea05f]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[130px]" />
      </div>

      {/* Progress HUD */}
      <div className="w-full max-w-xl mb-12 flex justify-between items-center relative z-10">
         {[1, 2, 3].map((s) => (
           <div key={s} className="flex flex-col items-center gap-3">
             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${step >= s ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}>
                {step > s ? <FiCheck /> : s}
             </div>
             <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-800' : 'text-slate-300'}`}>
                {s === 1 ? 'Payload' : s === 2 ? 'Intent' : 'Verify'}
             </span>
           </div>
         ))}
         <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step - 1) * 50}%` }}
              className="h-full bg-[#1ea05f]" 
            />
         </div>
      </div>

      <motion.div 
        layout
        className="w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 p-10 md:p-16 relative z-10 border border-slate-100"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black italic uppercase italic tracking-tighter">Genesis Asset Allocation</h2>
                  <p className="text-sm font-medium text-slate-500">Select the magnitude and frequency of your humanitarian impact.</p>
               </div>

               <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
                  <button 
                    onClick={() => setFormData({...formData, frequency: 'one-time'})}
                    className={`flex-1 py-4 px-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.frequency === 'one-time' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    Flash One-Time
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, frequency: 'monthly'})}
                    className={`flex-1 py-4 px-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.frequency === 'monthly' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    Monthly Sustained
                  </button>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['5,000', '10,000', '25,000', '50,000'].map((amt) => (
                    <button 
                      key={amt}
                      onClick={() => setFormData({...formData, amount: amt})}
                      className={`py-4 rounded-2xl font-black text-xs transition-all border ${
                        formData.amount === amt ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      PKR {amt}
                    </button>
                  ))}
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Custom Magnitude (PKR)</label>
                  <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">Rs.</div>
                     <input 
                       type="number" 
                       placeholder="Enter magnitude..." 
                       value={formData.amount}
                       onChange={(e) => setFormData({...formData, amount: e.target.value})}
                       className="w-full pl-16 pr-8 py-6 bg-slate-50 border-none rounded-3xl font-black text-2xl text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                     />
                  </div>
               </div>

               <button 
                 onClick={nextStep}
                 disabled={!formData.amount}
                 className="w-full py-6 bg-[#1ea05f] text-white font-black rounded-3xl shadow-2xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 group disabled:opacity-30"
               >
                 <span>Verify Asset Allocation</span>
                 <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="flex items-center gap-4 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Intent & Alignment</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Shariah Toggle */}
                  <div className="space-y-6">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Shariah Protocol</label>
                     <div className="space-y-4">
                        <div 
                          onClick={() => setFormData({...formData, isZakat: true})}
                          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${formData.isZakat ? 'border-[#1ea05f] bg-[#1ea05f]/5 shadow-lg shadow-[#1ea05f]/5' : 'border-slate-100 bg-slate-50 opactiy-60'}`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${formData.isZakat ? 'bg-[#1ea05f] text-white' : 'bg-slate-200 text-slate-400'}`}>Z</div>
                              <span className="font-black text-xs uppercase tracking-widest">Al-Zakat</span>
                           </div>
                           {formData.isZakat && <FiCheckCircle className="text-[#1ea05f]" />}
                        </div>
                        <div 
                          onClick={() => setFormData({...formData, isZakat: false})}
                          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${!formData.isZakat ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/5' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${!formData.isZakat ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>S</div>
                              <span className="font-black text-xs uppercase tracking-widest">Al-Sadaqah</span>
                           </div>
                           {!formData.isZakat && <FiCheckCircle className="text-blue-500" />}
                        </div>
                     </div>
                  </div>

                  {/* Privacy & Dedication */}
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Privacy Directive</label>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl group cursor-pointer" onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}>
                           <div>
                              <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Anonymize Source</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Wipe identity from live feed.</p>
                           </div>
                           <div className={`w-10 h-6 rounded-full relative transition-colors ${formData.isAnonymous ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isAnonymous ? 'right-1' : 'left-1'}`} />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Legacy Dedication (In Memory Of)</label>
                        <div className="relative group">
                          <FiMessageSquare className="absolute left-5 top-5 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                          <textarea 
                            rows={3} 
                            placeholder="Name or message..."
                            className="w-full pl-14 pr-4 py-5 bg-slate-50 border-none rounded-3xl font-bold text-slate-800 text-sm focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none"
                            value={formData.dedication}
                            onChange={(e) => setFormData({...formData, dedication: e.target.value})}
                          />
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                 onClick={nextStep}
                 className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
               >
                 <span>Calibrate Payment Hub</span>
                 <FiZap className="text-[#1ea05f] group-hover:scale-125 transition-transform" />
               </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="flex items-center gap-4 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Final Verification</h3>
               </div>

               <div className="bg-slate-50 p-10 rounded-[3rem] space-y-6">
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Humanitarian Magnitude</span>
                     <span className="text-xl font-black text-slate-800 italic">PKR {formData.amount}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Type</span>
                     <span className="text-xs font-black text-[#1ea05f] uppercase tracking-widest">{formData.isZakat ? 'Zakat (Al-Kareem)' : 'Sadaqah (Voluntary)'}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency Scale</span>
                     <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{formData.frequency} Cycle</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Select Payment Protocol</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                       { id: 'card', label: 'Global Credit Card', icon: FiCreditCard, color: 'text-blue-500 bg-blue-50' },
                       { id: 'jazzcash', label: 'JazzCash Direct', icon: FiSmartphone, color: 'text-red-500 bg-red-50' },
                       { id: 'easypaisa', label: 'EasyPaisa Hub', icon: FiZap, color: 'text-green-500 bg-green-50' },
                       { id: 'bank', label: 'Bank Transfer', icon: FiHome, color: 'text-slate-500 bg-slate-100' },
                     ].map((method) => (
                        <div 
                          key={method.id}
                          onClick={() => setFormData({...formData, paymentMethod: method.id})}
                          className={`p-6 rounded-3xl border-2 flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' : 'border-slate-50 bg-white hover:bg-slate-50'}`}
                        >
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-white/10 text-white' : method.color}`}>
                              <method.icon />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <button 
                 onClick={handleSubmit}
                 disabled={submitting || !formData.paymentMethod}
                 className="w-full py-8 bg-[#1ea05f] text-white font-black rounded-3xl shadow-2xl shadow-[#1ea05f]/20 hover:scale(1.05) active:scale-[0.95] transition-all flex items-center justify-center gap-4 group italic uppercase tracking-widest disabled:opacity-50"
               >
                 {submitting ? <FiLock className="animate-spin" /> : <FiLock />} 
                 {submitting ? 'Calibrating Assets...' : 'Confirm & Deploy Charity Impact'}
               </button>

               <div className="flex items-center justify-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-50">
                  <FiShield /> Certified Secure Genesis Protocol v2.4
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-4 relative z-10">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Humanitarian Tech Stack by Baitussalam Global</p>
         <div className="w-16 h-1.5 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}
