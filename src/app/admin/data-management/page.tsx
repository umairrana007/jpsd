'use client';

import React, { useState } from 'react';
import { 
  FiDownload, FiUpload, FiRefreshCw, FiDatabase, 
  FiAlertTriangle, FiCheckCircle, FiFileText, FiTrash2,
  FiTerminal, FiActivity, FiShield, FiCpu
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { exportFullSystem, importSystemData, purgeDemoData } from '@/lib/dataExchange';

function DataManagementPage() {
  const { setGlobalAlert } = useAuth();
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [purging, setPurging] = useState(false);
  const [clearFirst, setClearFirst] = useState(false);
  const [tagAsDemo, setTagAsDemo] = useState(true);
  const [importResults, setImportResults] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const backup = await exportFullSystem();
      const dataStr = JSON.stringify(backup, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `jpsd-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setGlobalAlert('Tactical backup generated and dispatched successfully.', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      setGlobalAlert('Backup retrieval failed. Intelligence breach detected.', 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setGlobalAlert('No payload selected. Please upload a JSON backup.', 'warning');
      return;
    }

    const confirm = window.confirm(
      clearFirst 
        ? 'CRITICAL WARNING: This will DELETE all existing data and overwrite it. Proceed?' 
        : 'This will merge records from the backup into the current system. Proceed?'
    );

    if (!confirm) return;

    setImporting(true);
    setImportResults(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          const results = await importSystemData(jsonData, clearFirst, tagAsDemo);
          setImportResults(results);
          setGlobalAlert('Data injection complete. System state updated.', 'success');
        } catch (error) {
          console.error('Parse failed:', error);
          setGlobalAlert('Invalid payload structure. Data corruption detected.', 'error');
        } finally {
          setImporting(false);
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error('Import failed:', error);
      setGlobalAlert('Import synchronization failed. Protocol aborted.', 'error');
      setImporting(false);
    }
  };

  const handlePurge = async () => {
    const confirmed = window.confirm(
      'DANGER: This will PERMANENTLY DELETE all records tagged as "Demo Data". This action cannot be undone. Are you absolutely sure?'
    );

    if (!confirmed) return;

    setPurging(true);
    try {
      const count = await purgeDemoData();
      setGlobalAlert(`Purge successful. Deleted ${count} demo records.`, 'success');
      setImportResults(null); 
    } catch (error) {
      console.error('Purge failed:', error);
      setGlobalAlert('Purge operation failed. Secure deletion error.', 'error');
    } finally {
      setPurging(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Command & Control: Data Logistics</h2>
          <p className="text-slate-500 font-medium font-mono text-sm">Backup, Restore and Demo Data Injection Engine.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="px-8 py-3 bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-800/20 hover:bg-slate-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? <FiRefreshCw className="animate-spin" /> : <FiDownload />} 
            {exporting ? 'Exporting HQ...' : 'Export Tactical Backup'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* Export Utility */}
        <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <FiDatabase size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Backup Generator</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Full System Snapshot</p>
            </div>
          </div>
          
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Generates a complete JSON snapshot of all mission-critical collections including causes, users, and global configuration. 
              Use this for periodic backups or local testing.
            </p>
            
            <ul className="space-y-3">
              {[
                { label: 'Cloud Firestore Collections', count: 15 },
                { label: 'Encryption Protocol', status: 'AES READY' },
                { label: 'Attachment Indexing', status: 'REF ONLY' }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{item.label}</span>
                  <span className="text-primary italic">{item.count || item.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100/50">
            <FiActivity className="text-blue-500 shrink-0" />
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">Note: Media files in Storage are linked but not physically downloaded.</p>
          </div>
        </section>

        {/* Import Utility */}
        <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
              <FiUpload size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Data Injector</h3>
              <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Restore & Demo Deployment</p>
            </div>
          </div>

          <div className="space-y-6">
            <div 
              className={`border-3 border-dashed rounded-[2.5rem] p-12 text-center transition-all ${
                selectedFile ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:border-slate-200'
              }`}
            >
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileChange}
                className="hidden" 
                id="file-upload" 
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <FiFileText size={48} className={selectedFile ? 'text-primary' : 'text-slate-300'} />
                {selectedFile ? (
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 tracking-tight italic">{selectedFile.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-black text-slate-400 uppercase tracking-widest">Drag & Drop Tactical Payload</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase italic">Support: JSON Backups only</p>
                  </div>
                )}
              </label>
            </div>

            <div className="flex items-start gap-4 p-6 bg-red-50 rounded-3xl border border-red-100">
              <FiAlertTriangle className="text-red-500 shrink-0 mt-1" />
              <div className="space-y-3 flex-1">
                <p className="text-xs font-black text-red-600 uppercase tracking-widest leading-none">High Collision Protocol</p>
                
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setClearFirst(!clearFirst)}
                >
                  <div className={`w-12 h-6 rounded-full relative transition-all ${clearFirst ? 'bg-red-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${clearFirst ? 'right-1' : 'left-1'}`}></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Wipe current system before injection (Factory Reset)
                  </span>
                </div>

                <div 
                  className="flex items-center gap-3 cursor-pointer group pt-1 border-t border-red-200/30"
                  onClick={() => setTagAsDemo(!tagAsDemo)}
                >
                  <div className={`w-12 h-6 rounded-full relative transition-all ${tagAsDemo ? 'bg-blue-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${tagAsDemo ? 'right-1' : 'left-1'}`}></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Tag records as "Demo Content" (Allows one-click removal)
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleImport}
              disabled={importing || !selectedFile}
              className="w-full py-5 bg-red-500 text-white font-black rounded-3xl shadow-2xl shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {importing ? <FiRefreshCw className="animate-spin" /> : <FiTerminal />} 
              {importing ? 'Injecting Data...' : 'Execute Data Injection'}
            </button>
          </div>
        </section>

        {/* Results / Status Console */}
        {importResults && (
          <section className="xl:col-span-2 bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center text-primary">
                    <FiCheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">Injection Report</h3>
                    <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Protocol Success: Mission Accomplished</p>
                  </div>
                </div>
                <button 
                  onClick={() => setImportResults(null)}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all"
                >
                  <FiTrash2 />
                </button>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {Object.entries(importResults).map(([key, res]: [any, any]) => (
                  <div key={key} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 truncate">{key}</p>
                    <p className="text-2xl font-black text-primary tracking-tighter">{res.success}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Synced</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        {/* Security & Purge Zone */}
        <section className="xl:col-span-2 bg-white/40 p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                <FiShield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Security & Cleanup</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Post-Deployment Hygiene</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button 
                onClick={handlePurge}
                disabled={purging}
                className="px-10 py-4 bg-slate-100 text-red-600 font-black rounded-[1.5rem] border-2 border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all flex items-center gap-3 disabled:opacity-50 group shadow-xl shadow-transparent hover:shadow-red-500/5"
              >
                {purging ? <FiRefreshCw className="animate-spin" /> : <FiTrash2 className="group-hover:scale-110 transition-transform" />} 
                {purging ? 'Purging Intelligence...' : 'Purge All Demo Assets'}
              </button>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mr-2">
                * Only removes records tagged with <span className="text-blue-500">__isDemo: true</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/50 rounded-[2.5rem] border border-white/80 flex gap-5">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                <FiCpu />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2">Selective Cleanup</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  The purge engine identifies records with the <span className="text-blue-600 font-bold">__isDemo</span> signature. 
                  Your mission-critical real data remains untouched during this operation.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white/50 rounded-[2.5rem] border border-white/80 flex gap-5">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                <FiAlertTriangle />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2">Final Protocol</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Once clicked, the deletion process starts across all 15+ collections. 
                  This is intended for after a demo session or developer testing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default withAuth(DataManagementPage, { 
  allowedRoles: [UserRole.ADMIN] 
});
