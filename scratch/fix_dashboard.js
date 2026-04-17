const fs = require('fs');
const path = 'src/app/donor/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replacement for Project Updates
content = content.replace(
  /\{ title: 'Project Updates', desc: 'Secure cause milestones.', icon: <FiTrendingUp \/> \}/g,
  `{ 
    title: 'Project Updates', 
    desc: 'Secure cause milestones.', 
    icon: <FiTrendingUp />,
    details: 'Three tactical deployments completed in the last 24 hours. Your contributed assets have been utilized in "Global Food Crisis" response in Karachi.',
    type: 'success'
  }`
);

// Replacement for Security Alerts
content = content.replace(
  /\{ title: 'Security Alerts', desc: 'Auth & billing protocols.', icon: <FiShield \/> \}/g,
  `{ 
    title: 'Security Alerts', 
    desc: 'Auth & billing protocols.', 
    icon: <FiShield />,
    details: 'Security audit complete. Your account is secured with end-to-end encryption. Last successful login verified from your current region.',
    type: 'info'
  }`
);

// Replacement for Official feed
content = content.replace(
  /\{ title: 'Official feed', desc: 'HQ correspondence.', icon: <FiArrowDown \/> \}/g,
  `{ 
    title: 'Official feed', 
    desc: 'HQ correspondence.', 
    icon: <FiArrowDown />,
    details: 'Official JPSD Tax Certificate for the current quarter is now available for batch processing. Annual impact report draft finalized.',
    type: 'warning'
  }`
);

// Transform div to button and add onClick
content = content.replace(
  /<div key=\{i\} className="flex items-center gap-5 p-6 bg-slate-50\/50 rounded-\[2rem\] border border-slate-100 group cursor-pointer hover:bg-white transition-all">/g,
  `<button key={i} onClick={() => setInsightDetails({ title: item.title, content: item.details, icon: item.icon, type: item.type })} className="w-full flex items-center gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group cursor-pointer hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 transition-all text-left">`
);

// This regex finds the last </div> before })) and changes it to </button>
content = content.replace(
  /<\/div>(\s*\}\)\))/g,
  `</button>$1`
);

// Fix the icon container group-hover
content = content.replace(
  /<div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-\[#1ea05f\] shadow-sm">/g,
  `<div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1ea05f] shadow-sm group-hover:bg-[#1ea05f] group-hover:text-white transition-all">`
);

// Fix the pulse indicator
content = content.replace(
  /<div className="w-8 h-4 rounded-full bg-\[#1ea05f\] relative">/g,
  `<div className="w-10 h-6 rounded-full bg-slate-100 relative border border-slate-200 group-hover:bg-[#1ea05f]/10 transition-colors">`
);

content = content.replace(
  /<div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" \/>/g,
  `<div className="absolute right-1 top-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm shadow-red-500/40" />`
);

fs.writeFileSync(path, content);
console.log('Successfully updated dashboard cards');
