'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiTrash2, FiShield, FiLock, FiCheckCircle, 
  FiCreditCard, FiSmartphone, FiPlusCircle, FiX, FiInfo, FiSettings, FiCheck, FiChevronRight, FiAlertTriangle, FiArrowLeft, FiEye, FiEyeOff, FiEdit3
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: string;
  type: 'Visa' | 'Mastercard';
  fullNumber: string;
  last4: string;
  expiry: string;
  cvv: string;
  bank: string;
  bg: string;
  isDefault: boolean;
  holder: string;
}

interface Wallet {
  id: string;
  type: 'JazzCash' | 'EasyPaisa' | 'NayaPay';
  number: string;
  title: string;
  logo: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState<Card[]>([
    { id: '1', type: 'Visa', fullNumber: '4242424242424242', last4: '4242', expiry: '12/28', cvv: '123', bank: 'Meezan Bank', bg: '/assets/cards/meezan.png', isDefault: true, holder: 'MUHAMMAD UMAIR' },
    { id: '2', type: 'Mastercard', fullNumber: '8812345678908812', last4: '8812', expiry: '05/27', cvv: '991', bank: 'Standard Chartered', bg: '/assets/cards/sc.png', isDefault: false, holder: 'MUHAMMAD UMAIR' },
  ]);

  const [wallets, setWallets] = useState<Wallet[]>([
    { id: '3', type: 'JazzCash', number: '03001234567', title: 'MUHAMMAD UMAIR', logo: '/assets/wallets/jazzcash.png', isDefault: false },
    { id: '4', type: 'EasyPaisa', number: '03459876543', title: 'MUHAMMAD UMAIR', logo: '/assets/wallets/easypaisa.png', isDefault: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addStep, setAddStep] = useState<'select' | 'card' | 'wallet'>('select');
  const [managingItem, setManagingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Reveal Logic
  const [showVerifyModal, setShowVerifyModal] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // Form States
  const [formData, setFormData] = useState({
    id: '', bank: 'Meezan Bank', cardNumber: '', holder: 'MUHAMMAD UMAIR', expiry: '', cvv: '',
    wType: 'JazzCash' as Wallet['type'], wNumber: '', wTitle: 'MUHAMMAD UMAIR'
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else { setRevealedCardId(null); }
  }, [timeLeft]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setRevealedCardId(showVerifyModal);
      setShowVerifyModal(null);
      setPassword('');
      setTimeLeft(60);
    }
  };

  const getBankBg = (bank: string) => {
    const map: any = { 'Meezan Bank': 'meezan', 'HBL Bank': 'hbl', 'Bank Alfalah': 'alfalah', 'Standard Chartered': 'sc' };
    return `/assets/cards/${map[bank] || 'meezan'}.png`;
  };

  const getWalletLogo = (type: Wallet['type']) => {
    const map: any = { 'JazzCash': 'jazzcash', 'EasyPaisa': 'easypaisa', 'NayaPay': 'nayapay' };
    return `/assets/wallets/${map[type] || 'jazzcash'}.png`;
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = formData.cardNumber.slice(-4) || '0000';
    const cardData: Card = {
      id: isEditing ? formData.id : Math.random().toString(),
      type: formData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      fullNumber: formData.cardNumber,
      last4: last4,
      expiry: formData.expiry || '01/30',
      cvv: formData.cvv,
      bank: formData.bank,
      bg: getBankBg(formData.bank),
      isDefault: (isEditing ? cards.find(c => c.id === formData.id)?.isDefault : false) ?? false,
      holder: formData.holder
    };
    if (isEditing) setCards(cards.map(c => c.id === cardData.id ? cardData : c));
    else setCards([...cards, cardData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleSaveWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const walletData: Wallet = {
      id: isEditing ? formData.id : Math.random().toString(),
      type: formData.wType,
      number: formData.wNumber,
      title: formData.wTitle,
      logo: getWalletLogo(formData.wType),
      isDefault: (isEditing ? wallets.find(w => w.id === formData.id)?.isDefault : false) ?? false
    };
    if (isEditing) setWallets(wallets.map(w => w.id === walletData.id ? walletData : w));
    else setWallets([...wallets, walletData]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setAddStep('select');
    setIsEditing(false);
    setFormData({ id: '', bank: 'Meezan Bank', cardNumber: '', holder: 'MUHAMMAD UMAIR', expiry: '', cvv: '', wType: 'JazzCash', wNumber: '', wTitle: 'MUHAMMAD UMAIR' });
  };

  const initiateEdit = (item: any) => {
    if (item.bank) {
      setFormData({ ...formData, id: item.id, bank: item.bank, cardNumber: item.fullNumber, holder: item.holder, expiry: item.expiry, cvv: item.cvv });
      setAddStep('card');
    } else {
      setFormData({ ...formData, id: item.id, wType: item.type, wNumber: item.number, wTitle: item.title });
      setAddStep('wallet');
    }
    setIsEditing(true);
    setShowAddModal(true);
    setManagingItem(null);
  };

  const removeMethod = (id: string, type: 'card' | 'wallet') => {
    if (type === 'card') setCards(cards.filter(c => c.id !== id));
    else setWallets(wallets.filter(w => w.id !== id));
    setManagingItem(null);
  };

  const embossedStyle = { textShadow: '1px 1px 0px rgba(255,255,255,0.1), -1px -1px 0px rgba(0,0,0,0.5)', fontFamily: 'monospace' };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Modals same as before, simplified for brevity in thought but kept full for functionality */}
      <AnimatePresence>
        {showVerifyModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-xl flex items-center justify-center p-6">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-white max-w-sm w-full rounded-[2.5rem] p-10 shadow-2xl text-center">
                <button onClick={() => setShowVerifyModal(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"><FiX size={20}/></button>
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"><FiShield size={30}/></div>
                <h4 className="text-xl font-black italic uppercase text-slate-900 tracking-tighter tracking-tight">Security Gateway</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 mb-8 italic">Authorize password validation to access plaintext data.</p>
                <form onSubmit={handleVerify} className="space-y-4">
                   <input type="password" placeholder="••••••••" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-center focus:ring-2 focus:ring-[#1ea05f] outline-none font-black" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
                   <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#1ea05f] transition-all uppercase tracking-widest text-[10px]">Verify and Reveal</button>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {managingItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-6">
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl relative border border-slate-100">
                <button onClick={() => setManagingItem(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"><FiX size={24}/></button>
                <div className="flex items-center gap-4 mb-8 text-left">
                   <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                      {managingItem.bank ? <FiCreditCard size={24}/> : <FiSmartphone size={24}/>}
                   </div>
                   <div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Manage Token</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{managingItem.bank || managingItem.type} • {managingItem.last4 ? `**** ${managingItem.last4}` : managingItem.number}</p>
                   </div>
                </div>
                <div className="space-y-3 px-1 font-black">
                   <button onClick={() => initiateEdit(managingItem)} className="w-full p-6 bg-blue-50/50 hover:bg-blue-600 border border-blue-100 hover:border-blue-700 rounded-2xl transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4 text-left">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white border border-blue-100 transition-colors"><FiEdit3 size={20}/></div>
                         <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 group-hover:text-white">Modify Infrastructure</span>
                      </div>
                      <FiChevronRight className="text-blue-300 group-hover:text-white" />
                   </button>
                   <button onClick={() => removeMethod(managingItem.id, managingItem.bank ? 'card' : 'wallet')} className="w-full p-6 bg-rose-50/50 hover:bg-rose-500 border border-rose-100 hover:border-rose-600 rounded-2xl transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4 text-left">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-300 group-hover:text-rose-600 border border-rose-100 transition-colors"><FiTrash2 size={20}/></div>
                         <span className="text-[11px] font-black uppercase tracking-widest text-rose-400 group-hover:text-white">Terminate Access</span>
                      </div>
                      <FiAlertTriangle className="text-rose-200 group-hover:text-white" />
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
             <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }} className="bg-white max-w-4xl w-full rounded-[4rem] p-16 shadow-2xl relative grid grid-cols-1 lg:grid-cols-2 gap-16">
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-all"><FiX size={28}/></button>
                
                {addStep === 'select' ? (
                   <div className="lg:col-span-2 text-center py-10">
                      <div className="text-center mb-12">
                         <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 mx-auto mb-6 shadow-xl"><FiPlus size={40} /></div>
                         <h4 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Initialize Token</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                         <button onClick={() => setAddStep('card')} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:border-blue-500 hover:bg-white transition-all group flex flex-col items-center gap-6 shadow-sm font-black italic uppercase text-sm text-slate-800"> <FiCreditCard size={40} className="text-slate-300 group-hover:text-blue-500 transition-all group-hover:-translate-y-2"/> Banking Token </button>
                         <button onClick={() => setAddStep('wallet')} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:border-orange-500 hover:bg-white transition-all group flex flex-col items-center gap-6 shadow-sm font-black italic uppercase text-sm text-slate-800"> <FiSmartphone size={40} className="text-slate-300 group-hover:text-orange-500 transition-all group-hover:-translate-y-2"/> Digital Ecosystem </button>
                      </div>
                   </div>
                ) : addStep === 'card' ? (
                   <>
                      <div className="space-y-8">
                         <div className="flex items-center gap-4">
                            <button type="button" onClick={() => (isEditing ? setShowAddModal(false) : setAddStep('select'))} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><FiArrowLeft size={20}/></button>
                            <h4 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{isEditing ? 'Modify Protocol' : 'New Instrument'}</h4>
                         </div>
                         <div className="relative aspect-[1.58/1] w-full rounded-[2.5rem] overflow-hidden shadow-2xl text-white">
                            <img src={getBankBg(formData.bank)} alt="Card background" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                               <div className="flex justify-between items-start"> <h5 className="text-sm font-black italic tracking-widest opacity-80">{formData.bank.toUpperCase()}</h5> <div className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-[10px] font-black italic">VISA</div> </div>
                               <div className="w-16 h-12 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-200 rounded-lg shadow-inner opacity-90 border border-amber-500/30 overflow-hidden" />
                               <div className="space-y-6">
                                  <p className="text-2xl lg:text-3xl font-black tracking-[0.25em] leading-none" style={embossedStyle}> {formData.cardNumber ? formData.cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• ••00'} </p>
                                  <div className="flex justify-between items-end">
                                     <div className="space-y-1"> <p className="text-[7px] font-black uppercase opacity-60">Holder</p> <p className="text-sm font-black italic uppercase" style={embossedStyle}>{formData.holder}</p> </div>
                                     <div className="space-y-1 text-right"> <p className="text-[7px] font-black uppercase opacity-60">Expires</p> <p className="text-sm font-black italic" style={embossedStyle}>{formData.expiry || '00/00'}</p> </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      <form onSubmit={handleSaveCard} className="space-y-5 pt-10">
                         <div className="space-y-4">
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Issuer Bank</label> <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase outline-none" value={formData.bank} onChange={(e) => setFormData({...formData, bank: e.target.value})}> <option>Meezan Bank</option> <option>HBL Bank</option> <option>Bank Alfalah</option> <option>Standard Chartered</option> </select> </div>
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Authorized Name</label> <input type="text" placeholder="JOHAN DOE" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black uppercase outline-none" value={formData.holder} onChange={(e) => setFormData({...formData, holder: e.target.value.toUpperCase()})} required /> </div>
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Instrumentation Number</label> <input type="text" placeholder="#### #### #### ####" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-mono outline-none" maxLength={16} value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} required /> </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Expiry</label> <input type="text" placeholder="MM/YY" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none font-black" maxLength={5} value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} required /> </div>
                               <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">CVV Secret</label> <input type="password" placeholder="•••" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none font-black" maxLength={3} value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} required /> </div>
                            </div>
                         </div>
                         <button type="submit" className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-[#1ea05f] transition-all uppercase tracking-[0.3em] text-[10px]"> {isEditing ? 'Commit Changes' : 'Link Infrastructure'} </button>
                      </form>
                   </>
                ) : (
                   <>
                      <div className="space-y-8">
                         <div className="flex items-center gap-4">
                            <button type="button" onClick={() => (isEditing ? setShowAddModal(false) : setAddStep('select'))} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 transition-all"><FiArrowLeft size={20}/></button>
                            <h4 className="text-2xl font-black text-slate-900 italic uppercase">Digital Pulse</h4>
                         </div>
                         <div className="bg-slate-50 border border-slate-100 p-12 rounded-[3.5rem] flex flex-col items-center justify-center gap-8 shadow-inner">
                            <motion.img 
                               key={formData.wType} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                               src={getWalletLogo(formData.wType)} className="w-40 h-40 rounded-[3rem] shadow-2xl" 
                            />
                            <div className="text-center space-y-2">
                               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Linked Identity</p>
                               <h5 className="text-3xl font-black italic uppercase text-slate-900">{formData.wTitle || 'Account Title'}</h5>
                               <p className="text-lg font-mono font-black text-[#1ea05f] tracking-widest">{formData.wNumber || '+92 000 0000 000'}</p>
                            </div>
                         </div>
                      </div>
                      <form onSubmit={handleSaveWallet} className="space-y-6 pt-10">
                         <div className="space-y-4">
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Service API</label> <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase outline-none" value={formData.wType} onChange={(e) => setFormData({...formData, wType: e.target.value as any})}> <option>JazzCash</option> <option>EasyPaisa</option> <option>NayaPay</option> </select> </div>
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Account Title Name</label> <input type="text" placeholder="MUHAMMAD UMAIR" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black uppercase outline-none" value={formData.wTitle} onChange={(e) => setFormData({...formData, wTitle: e.target.value.toUpperCase()})} required /> </div>
                            <div> <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block italic">Mobile Endpoint (Number)</label> <input type="text" placeholder="03XXXXXXXXX" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-mono outline-none" maxLength={11} value={formData.wNumber} onChange={(e) => setFormData({...formData, wNumber: e.target.value})} required /> </div>
                         </div>
                         <button type="submit" className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-[#1ea05f] transition-all uppercase tracking-[0.3em] text-[10px]"> {isEditing ? 'Commit Pulse' : 'Initialize Wallet'} </button>
                      </form>
                   </>
                )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-10">
        <div> <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic uppercase"> <FiShield className="text-[#1ea05f]" /> The Vault </h2> <p className="text-slate-400 font-medium text-xs mt-2 uppercase tracking-widest italic tracking-tight">Fintech Instrumentation & Security Matrix</p> </div>
        <button onClick={() => setShowAddModal(true)} className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-[#1ea05f] transition-all flex items-center gap-3 uppercase tracking-widest text-[10px] italic"><FiPlus size={16} /> Deploy New Token</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <section className="space-y-8">
           <div className="flex items-center justify-between"> <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic font-black">Financial Matrix</h3> <div className="h-[1px] flex-1 mx-6 bg-slate-100" /> </div>
           <div className="space-y-10">
              <AnimatePresence mode="popLayout">
                 {cards.map((card) => {
                    const isRevealed = revealedCardId === card.id;
                    return (
                       <motion.div layout key={card.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full aspect-[1.58/1] rounded-[2.5rem] text-white shadow-2xl group overflow-hidden border border-white/10 hover:-translate-y-2 transition-all">
                          <img src={card.bg} alt="Bankcard" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                          {isRevealed && ( <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20 z-20"> <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 60, ease: "linear" }} className="h-full bg-[#1ea05f] shadow-[0_0_10px_#1ea05f]" /> </div> )}
                          <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1 text-left"> <p className="text-[9px] font-black uppercase tracking-widest opacity-60 italic">Authorized Bank</p> <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none">{card.bank}</h4> </div>
                                <div className="flex items-center gap-3">
                                   <button onClick={() => isRevealed ? setRevealedCardId(null) : setShowVerifyModal(card.id)} className={`w-10 h-10 rounded-xl border border-white/20 backdrop-blur-md flex items-center justify-center transition-all ${isRevealed ? 'bg-[#1ea05f] text-white grow px-4' : 'bg-white/10 text-white hover:bg-white hover:text-slate-900'}`}>{isRevealed ? <div className="flex items-center gap-2"><FiEyeOff size={16}/> <span className="text-[10px] font-black uppercase">{timeLeft}s</span></div> : <FiEye size={16}/>}</button>
                                   <button onClick={() => setManagingItem(card)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center"><FiSettings size={16} /></button>
                                   <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl flex items-center gap-3"> <span className="text-[10px] font-black italic uppercase">{card.type}</span> <div className={`w-2 h-2 rounded-full ${card.type === 'Visa' ? 'bg-blue-400' : 'bg-orange-400'}`} /> </div>
                                </div>
                             </div>
                             {isRevealed && <div className="self-end bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 animate-in zoom-in-95 duration-300"> <p className="text-[7px] font-black uppercase opacity-40 mb-1">Secret CVV</p> <p className="text-sm font-black tracking-widest text-[#1ea05f]">{card.cvv}</p> </div>}
                             <div className="space-y-8">
                                <p className="text-3xl font-black tracking-[0.25em] leading-none text-left shadow-2xl" style={embossedStyle}> {isRevealed ? card.fullNumber.replace(/(.{4})/g, '$1 ').trim() : `•••• •••• •••• ${card.last4}`} </p>
                                <div className="flex justify-between items-end border-t border-white/20 pt-8">
                                   <div className="flex gap-12 text-left">
                                      <div className="space-y-1"> <p className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">Holder</p> <p className="text-[11px] font-black uppercase tracking-tight italic" style={embossedStyle}>{card.holder}</p> </div>
                                      <div className="space-y-1"> <p className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">Expiry</p> <p className="text-[11px] font-black uppercase tracking-tight italic" style={embossedStyle}>{card.expiry}</p> </div>
                                   </div>
                                   {card.isDefault && <div className="w-12 h-12 rounded-2xl bg-[#1ea05f] shadow-lg shadow-green-500/20 text-white flex items-center justify-center border border-green-400"><FiCheck size={22} /></div>}
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    );
                 })}
              </AnimatePresence>
           </div>
        </section>

        <section className="space-y-8">
           <div className="flex items-center justify-between"> <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic font-black">Digital Ecosystem</h3> <div className="h-[1px] flex-1 mx-6 bg-slate-100" /> </div>
           <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                 {wallets.map((wallet) => (
                    <motion.div layout key={wallet.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-10 rounded-[2.8rem] border border-slate-100 flex items-center justify-between group hover:shadow-2xl hover:border-[#1ea05f]/20 transition-all relative overflow-hidden">
                       <div className="flex items-center gap-10 text-left relative z-10">
                          <img src={wallet.logo} className="w-20 h-20 rounded-[2rem] shadow-xl transition-transform group-hover:scale-110 duration-500" alt={wallet.type} />
                          <div className="space-y-2">
                             <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{wallet.type} Pulse</h4>
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2"> <FiCheckCircle className="text-emerald-500"/> Verified: {wallet.number}</p>
                             <p className="text-[9px] font-black text-slate-300 uppercase italic">Linked to {wallet.title}</p>
                          </div>
                       </div>
                       <button onClick={() => setManagingItem(wallet)} className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center border border-slate-100"><FiSettings size={22}/></button>
                    </motion.div>
                 ))}
                 <button onClick={() => { setShowAddModal(true); setAddStep('wallet'); }} className="w-full py-10 border-2 border-dashed border-slate-100 rounded-[2.8rem] flex items-center justify-center gap-4 text-slate-300 hover:text-orange-500 hover:border-orange-500 transition-all italic font-black uppercase tracking-[0.3em] text-[10px]"> <FiPlusCircle size={24} /> Initialize New Pulse </button>
              </AnimatePresence>
           </div>
        </section>
      </div>
    </div>
  );
}
