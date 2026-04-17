const fs = require('fs');
const path = 'src/app/donor/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The corrupted line 40 usually looks like this:
content = content.replace(
  /const \[insightDetails, setInsightDetails\] = useState<\{title: string, content: string, icon: React\.ReactNode, type: 'success' \| 'warning' \| 'info'\} \| null>\(null\);\| 'quarterly' \| 'yearly'>\('monthly'\);/,
  "const [insightDetails, setInsightDetails] = useState<{title: string, content: string, icon: React.ReactNode, type: 'success' | 'warning' | 'info'} | null>(null);"
);

fs.writeFileSync(path, content);
console.log('Fixed syntax error in state declaration');
