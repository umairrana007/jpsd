import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const getPdfMake = () => {
  console.log('Resolving pdfMake...');
  let p: any = pdfMake;
  if (!p.createPdf && (p as any).default) p = (p as any).default;
  if (!p.createPdf && (p as any).default) p = (p as any).default;
  
  // Exhaustive VFS search
  console.log('Looking for VFS in pdfFonts...');
  const f: any = pdfFonts;
  const vfs = f.pdfMake?.vfs || 
              f.default?.pdfMake?.vfs || 
              f.vfs || 
              f.default?.vfs || 
              (typeof window !== 'undefined' && (window as any).pdfMake?.vfs);
  
  console.log('vfs found:', !!vfs);
  
  if (p && vfs) {
    p.vfs = vfs;
  } else if (p && (window as any).pdfMake?.vfs) {
    p.vfs = (window as any).pdfMake.vfs;
    console.log('vfs found on window.pdfMake');
  }
  
  return p;
};

export const downloadFallback = (title: string, data: any) => {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_data.txt`;
  a.click();
};

export const generateTaxReceipt = (donation: any) => {
  const docDefinition: any = {
    content: [
      { text: 'JAMIYAT PUNJABI SAUDAGRAN-E-DELHI (JPSD)', style: 'header', alignment: 'center' },
      { text: 'Official Donation Receipt', style: 'subheader', alignment: 'center', margin: [0, 0, 0, 20] },
      
      {
        columns: [
          {
            width: '*',
            text: [
              { text: 'Donor Name: ', bold: true }, `${donation.donorName || 'N/A'}\n`,
              { text: 'Email: ', bold: true }, `${donation.email || 'N/A'}\n`,
              { text: 'Phone: ', bold: true }, `${donation.phone || 'N/A'}\n`,
            ]
          },
          {
            width: '*',
            alignment: 'right',
            text: [
              { text: 'Receipt #: ', bold: true }, `${donation.id}\n`,
              { text: 'Date: ', bold: true }, `${new Date().toLocaleDateString()}\n`,
              { text: 'Status: ', bold: true }, 'VERIFIED\n',
            ]
          }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }], margin: [0, 20] },
      
      {
        table: {
          widths: ['*', 'auto'],
          body: [
            [{ text: 'Description', bold: true, fillColor: '#f8f9fa' }, { text: 'Amount', bold: true, fillColor: '#f8f9fa' }],
            [`Donation for: ${donation.causeName || 'General Welfare'}`, { text: `$${donation.amount.toLocaleString()}`, bold: true }],
            [{ text: 'Total Impact Magnitude', bold: true }, { text: `$${donation.amount.toLocaleString()}`, bold: true, color: '#1ea05f' }]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      { text: '\nNotes:', bold: true, margin: [0, 20, 0, 5] },
      { text: 'This represents a verified deployment of humanitarian assets via JPSD Central Command. All contributions are tax-deductible under Section 61 of the Welfare Act.', fontSize: 10, italic: true, color: '#666' },
      
      { text: '\n\n\n__________________________', alignment: 'right' },
      { text: 'Authorized Signature', alignment: 'right', fontSize: 10, bold: true },
      
      {
        qr: `https://jpsd.org.pk/verify/${donation.id}`,
        fit: 70,
        alignment: 'center',
        margin: [0, 40]
      },
      { text: 'Scan to Verify Authenticity', alignment: 'center', fontSize: 8, color: '#999' }
    ],
    styles: {
      header: { fontSize: 22, bold: true, color: '#1ea05f', margin: [0, 0, 0, 5] },
      subheader: { fontSize: 14, bold: true, color: '#333' }
    },
    defaultStyle: { font: 'Roboto' }
  };

  getPdfMake().createPdf(docDefinition).download(`JPSD_Receipt_${donation.id}.pdf`);
};

export const generateVolunteerCertificate = (volunteer: any) => {
  const docDefinition: any = {
    background: [
      {
        canvas: [
          {
            type: 'rect',
            x: 10, y: 10,
            w: 575, h: 822,
            lineWidth: 2,
            lineColor: '#1ea05f'
          }
        ]
      }
    ],
    content: [
      { text: '\nTactical Merit Deployment', alignment: 'center', fontSize: 10, characterSpacing: 5, color: '#999', margin: [0, 50, 0, 0] },
      { text: 'CERTIFICATE OF EXCELLENCE', alignment: 'center', fontSize: 34, bold: true, color: '#1ea05f', margin: [0, 20, 0, 40] },
      
      { text: 'This is to verify that', alignment: 'center', fontSize: 16, italic: true },
      { text: volunteer.name.toUpperCase(), alignment: 'center', fontSize: 28, bold: true, margin: [0, 20] },
      
      { 
        text: [
          'has successfully completed ', { text: `${volunteer.hoursLogged} Operational Hours`, bold: true },
          ' of humanitarian service with the Jamiyat Punjabi Saudagran-e-Delhi (JPSD). Their commitment to field logistics and rapid asset deployment has been exceptional.'
        ],
        alignment: 'center',
        fontSize: 14,
        margin: [40, 20, 40, 40],
        lineHeight: 1.5
      },
      
      {
        columns: [
          {
            width: '*',
            text: [
              { text: 'Rank: ', bold: true }, 'Specialist IV\n',
              { text: 'Department: ', bold: true }, 'Field Logistics\n',
            ],
            margin: [40, 0]
          },
          {
            width: '*',
            alignment: 'right',
            text: [
              { text: 'Issued on: ', bold: true }, `${new Date().toLocaleDateString()}\n`,
              { text: 'ID: ', bold: true }, `${volunteer.id}\n`,
            ],
            margin: [0, 0, 40, 0]
          }
        ]
      },
      
      { text: '\n\n\n\n\n\n(Director, Tactical Operations)', alignment: 'center', fontSize: 12, bold: true }
    ],
    defaultStyle: { font: 'Roboto' }
  };

  getPdfMake().createPdf(docDefinition).download(`JPSD_Certificate_${volunteer.id}.pdf`);
};

export const generateTreasuryReport = (title: string, data: any) => {
  console.log('PDF generation starts for:', title);
  try {
    const docDefinition: any = {
      content: [
        { text: 'JAMIYAT PUNJABI SAUDAGRAN-E-DELHI (JPSD)', style: 'header', alignment: 'center' },
        { text: title.toUpperCase(), style: 'subheader', alignment: 'center', margin: [0, 0, 0, 20] },
        
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Report Type: ', bold: true }, `${title}\n`,
                { text: 'Generated By: ', bold: true }, 'Central Treasury Command\n',
                { text: 'Date: ', bold: true }, `${new Date().toLocaleString()}\n`,
              ]
            },
            {
              width: '*',
              alignment: 'right',
              text: [
                { text: 'Status: ', bold: true }, 'AUDITED & VERIFIED\n',
                { text: 'Confidentiality: ', bold: true }, 'INTERNAL USE ONLY\n',
              ]
            }
          ]
        },
        
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#1ea05f' }], margin: [0, 20] },
        
        { text: 'Financial Overview Snapshot', bold: true, fontSize: 13, margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [{ text: 'Metric', bold: true, fillColor: '#f8f9fa' }, { text: 'Amount (PKR)', bold: true, fillColor: '#f8f9fa' }],
              ['Total Inflow (Received)', `RS ${data.financialOverview.totalInflow.toLocaleString()}`],
              ['Total Outflow (Deployed)', `RS ${data.financialOverview.totalOutflow.toLocaleString()}`],
              [{ text: 'Net Reserve', bold: true }, { text: `RS ${data.financialOverview.netReserve.toLocaleString()}`, bold: true, color: '#1ea05f' }]
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20]
        },

        { text: 'Income Source Breakdown', bold: true, fontSize: 13, margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              [{ text: 'Source', bold: true, fillColor: '#f8f9fa' }, { text: 'Amount', bold: true, fillColor: '#f8f9fa' }, { text: 'Percentage', bold: true, fillColor: '#f8f9fa' }],
              ...data.incomeSources.map((s: any) => [s.source, `RS ${s.amount.toLocaleString()}`, `${s.percentage}%`])
            ]
          },
          layout: 'grid',
          margin: [0, 0, 0, 20]
        },

        { text: 'Top 5 Expenditure Items (Recent)', bold: true, fontSize: 13, margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Project', bold: true, fillColor: '#f8f9fa' }, { text: 'Category', bold: true, fillColor: '#f8f9fa' }, { text: 'Amount', bold: true, fillColor: '#f8f9fa' }, { text: 'Audit', bold: true, fillColor: '#f8f9fa' }],
              ...data.expenditures.map((e: any) => [e.project, e.category, `RS ${e.amount.toLocaleString()}`, e.status])
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20]
        },
        
        { text: '\nNotes:', bold: true, margin: [0, 10, 0, 5] },
        { text: 'This report represents a real-time calibration of JPSD treasury assets. All field missions are audited by independent Shariah boards to ensure 100% compliance with humanitarian mandates.', fontSize: 9, italic: true, color: '#666' },
        
        {
          margin: [0, 50, 0, 0],
          columns: [
            { text: '__________________________\nCentral Financial Officer', alignment: 'center', fontSize: 10 },
            { text: '__________________________\nShariah Audit Lead', alignment: 'center', fontSize: 10 }
          ]
        }
      ],
      styles: {
        header: { fontSize: 20, bold: true, color: '#1ea05f', margin: [0, 0, 0, 5] },
        subheader: { fontSize: 14, bold: true, color: '#333' }
      },
      defaultStyle: { font: 'Roboto' }
    };

    const fileName = `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    const p = getPdfMake();
    console.log('Final check before PDF:', { hasP: !!p, hasCreatePdf: !!p?.createPdf, hasVfs: !!p?.vfs });
    
    if (p && p.createPdf && p.vfs) {
      p.createPdf(docDefinition).download(fileName);
    } else {
      console.warn('pdfMake or VFS not ready, using fallback.');
      downloadFallback(title, data);
    }
  } catch (err) {
    console.error('PDF Generation Error:', err);
    import('./pdfUtils').then(mod => mod.downloadFallback(title, data));
  }
};

export const generateBulkReceipts = (donations: any[], donorInfo: any) => {
  const doc = new jsPDF() as any;
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 160, 95); // #1ea05f
  doc.text("JPSD CENTRAL COMMAND", 105, 20, { align: "center" });
  
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("Consolidated Humanitarian Impact Report", 105, 30, { align: "center" });
  
  // Donor Info
  doc.setFontSize(10);
  doc.text(`Donor: ${donorInfo.name || 'N/A'}`, 14, 45);
  doc.text(`ID: ${donorInfo.uid?.substring(0, 10) || 'N/A'}`, 14, 50);
  doc.text(`Date Generated: ${new Date().toLocaleString()}`, 14, 55);
  
  // Summary Stats
  const total = donations.reduce((acc, d) => acc + (d.amount || 0), 0);
  doc.setDrawColor(30, 160, 95);
  doc.setFillColor(245, 252, 248);
  doc.roundedRect(140, 40, 56, 20, 3, 3, "FD");
  doc.setTextColor(30, 160, 95);
  doc.setFontSize(8);
  doc.text("TOTAL AGGREGATE IMPACT", 145, 47);
  doc.setFontSize(12);
  doc.text(`PKR ${total.toLocaleString()}`, 145, 55);

  // Table
  const tableData = donations.map(d => [
    d.id?.substring(0, 8).toUpperCase() || 'N/A',
    d.causeTitle || "General Welfare",
    `PKR ${d.amount?.toLocaleString()}`,
    d.status?.toUpperCase() || "PENDING",
    d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'N/A'
  ]);

  doc.autoTable({
    startY: 70,
    head: [['TXN ID', 'HUMANITARIAN CAUSE', 'AMOUNT', 'STATUS', 'TIMESTAMP']],
    body: tableData,
    headStyles: { fillColor: [30, 160, 95], textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 70 },
  });

  const finalY = doc.lastAutoTable.finalY || 150;
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text("This report is a calibrated summary of humanitarian asset deployment cycles.", 105, finalY + 20, { align: "center" });
  doc.text("Verification Code: JPSD-GENESIS-2.4-ALPHA", 105, finalY + 25, { align: "center" });

  doc.save(`JPSD_Bulk_Report_${new Date().getTime()}.pdf`);
};
