'use client';

import { useState, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { RichTextEditor } from './RichTextEditor';
import { sanitizeHTML } from '@/lib/sanitize';

interface Props {
  templateId: string;
  initialHtml: string;
  initialSubject: string;
  onSave: (data: { subject: string; html: string; text: string }) => void;
}

export const EmailTemplateEditor = ({ templateId, initialHtml, initialSubject, onSave }: Props) => {
  const emailEditorRef = useRef<any>(null);
  const [subject, setSubject] = useState(initialSubject);
  const [previewMode, setPreviewMode] = useState<'html' | 'text' | 'preview'>('preview');

  const exportHtml = () => {
    if (!emailEditorRef.current) return;
    emailEditorRef.current.exportHtml((data: any) => {
      const { html, text } = data;
      onSave({ 
        subject, 
        html: sanitizeHTML(html), 
        text 
      });
    });
  };

  const insertVariable = (variable: string) => {
    setSubject(prev => prev + `{{${variable}}}`);
  };

  const variables = ['donor_name', 'amount', 'cause_name', 'transaction_id', 'date', 'receipt_url'];

  return (
    <div className="space-y-6">
      {/* Subject Line & Variable Inserter */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm space-y-4">
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Subject Protocol</label>
        <div className="flex gap-4">
          <input 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            placeholder="Thank you for your donation, {{donor_name}}!" 
          />
          <select 
            onChange={(e) => {
              if (e.target.value) {
                insertVariable(e.target.value);
                e.target.value = '';
              }
            }} 
            className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none"
          >
            <option value="">+ Insert Protocol Variable</option>
            {variables.map(v => <option key={v} value={v}>{`{{${v}}}`}</option>)}
          </select>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'preview', label: 'Visual Builder' },
          { id: 'html', label: 'Raw HTML' },
          { id: 'text', label: 'Legacy Text' }
        ].map(mode => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setPreviewMode(mode.id as any)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              previewMode === mode.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Editor Surface */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 min-h-[600px]">
        {previewMode === 'preview' ? (
          <EmailEditor 
            ref={emailEditorRef} 
            minHeight="600px" 
            options={{ 
              locale: 'en', 
              appearance: { 
                theme: 'light',
                panels: {
                  tools: { dock: 'left' }
                }
              } 
            }} 
            onLoad={() => {
              if (initialHtml) {
                try {
                  const design = JSON.parse(initialHtml);
                  emailEditorRef.current?.loadDesign(design);
                } catch (e) {
                  console.warn('Failed to load JSON design, falling back to static HTML');
                }
              }
            }} 
          />
        ) : previewMode === 'html' ? (
          <div className="p-8">
            <RichTextEditor 
              value={initialHtml} 
              onChange={() => {}} 
              placeholder="Edit HTML directly if needed..." 
            />
          </div>
        ) : (
          <textarea 
            className="w-full p-8 min-h-[600px] font-mono text-sm bg-slate-50 border-none outline-none resize-none" 
            placeholder="Plain text version for simplified delivery..." 
          />
        )}
      </div>

      {/* Global Actions */}
      <div className="flex items-center justify-between pt-6">
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={exportHtml} 
            className="px-10 py-5 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all uppercase text-[10px] tracking-widest"
          >
            Deploy Template
          </button>
          <button 
            type="button" 
            onClick={() => {/* Send test email logic */}} 
            className="px-10 py-5 bg-slate-100 text-slate-600 font-black rounded-3xl hover:bg-slate-200 transition-all uppercase text-[10px] tracking-widest"
          >
            Transmission Test
          </button>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
          Drafting protocol active for: <span className="text-slate-900">{templateId}</span>
        </p>
      </div>
    </div>
  );
};
