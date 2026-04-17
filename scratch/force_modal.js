const fs = require('fs');
const path = 'src/app/donor/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const modalCode = `
      {/* 🔮 Insight Intelligence Modal */}
      <AnimatePresence>
        {insightDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-white space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 -z-10" />
              
              <div className="flex justify-between items-start">
                <div className={\`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg \${
                  insightDetails.type === 'success' ? 'bg-green-500 text-white' : 
                  insightDetails.type === 'warning' ? 'bg-yellow-400 text-slate-900' : 'bg-blue-600 text-white'
                }\`}>
                  {insightDetails.icon}
                </div>
                <button 
                  onClick={() => setInsightDetails(null)}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
                >
                  <FiPlus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{insightDetails.title}</h3>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 italic font-medium text-slate-600 leading-relaxed">
                  {insightDetails.content}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setInsightDetails(null)}
                  className="flex-1 py-5 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest italic hover:bg-slate-800 transition-all shadow-xl"
                >
                  Acknowledge Signal
                </button>
                {insightDetails.type === 'warning' && (
                   <button className="flex-1 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-2xl text-[10px] uppercase tracking-widest italic hover:bg-slate-50 transition-all">
                      Download Report
                   </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;

if (!content.includes('Insight Intelligence Modal')) {
  // Find the LAST closing brace of the export function
  const lastBraceIndex = content.lastIndexOf('}');
  // Find the second to last brace (to insert before it)
  // Actually, let's just find the last return block's end.
  // Component ends with:
  //      </div>
  //    </div>
  //  );
  // }
  
  const insertIndex = content.lastIndexOf(');');
  if (insertIndex !== -1) {
    const part1 = content.substring(0, insertIndex);
    const part2 = content.substring(insertIndex);
    content = part1 + modalCode + '    ' + part2;
  }
}

fs.writeFileSync(path, content);
console.log('Force-added modal to dashboard');
