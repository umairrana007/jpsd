'use client';

import { jsPDF } from 'jspdf';

// ─── Helper: draw a simple table using native jsPDF ─────────────────────────
function drawTable(
  doc: jsPDF,
  headers: string[],
  rows: string[][],
  startY: number,
  colWidths: number[],
  marginLeft = 14,
  rowHeight = 9
): number {
  let y = startY;

  // Header row
  (doc as any).setFillColor(30, 160, 95);
  let xOff = marginLeft;
  colWidths.forEach((w) => { (doc as any).rect(xOff, y, w, rowHeight, 'F'); xOff += w; });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  xOff = marginLeft;
  headers.forEach((h, i) => { doc.text(h, xOff + 2, y + 6); xOff += colWidths[i]; });
  y += rowHeight;

  // Data rows
  rows.forEach((row, rowIdx) => {
    if (rowIdx % 2 === 1) {
      (doc as any).setFillColor(240, 250, 245);
      xOff = marginLeft;
      colWidths.forEach((w) => { (doc as any).rect(xOff, y, w, rowHeight, 'F'); xOff += w; });
    }
    (doc as any).setDrawColor(200, 220, 210);
    (doc as any).setLineWidth(0.1);
    xOff = marginLeft;
    colWidths.forEach((w) => { (doc as any).rect(xOff, y, w, rowHeight, 'S'); xOff += w; });

    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    xOff = marginLeft;
    row.forEach((cell, i) => {
      doc.text(String(cell ?? ''), xOff + 2, y + 6);
      xOff += colWidths[i];
    });
    y += rowHeight;
  });
  return y;
}

// ─── Branded header ───────────────────────────────────────────────────────────
function addHeader(doc: jsPDF, subtitle: string) {
  (doc as any).setFillColor(30, 160, 95);
  (doc as any).rect(0, 0, 210, 28, 'F');
  doc.setFontSize(11.5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('JAMIYAT PUNJABI SAUDAGRAN-E-DELHI (JPSD)', 105, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, 105, 21, { align: 'center' });
}

// ─── Branded footer ───────────────────────────────────────────────────────────
function addFooter(doc: jsPDF, text: string) {
  (doc as any).setFillColor(30, 160, 95);
  (doc as any).rect(0, 282, 210, 15, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(text, 105, 291, { align: 'center' });
}

// ─── Shared Trigger: Trigger Download ────────────────────────────────────────
function triggerDownload(doc: jsPDF, filename: string) {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  
  try {
    const pdfOutput = doc.output('blob');
    // Using a File object with a predefined name - Chrome respects this much better than a generic Blob
    const file = new File([pdfOutput], safeFilename, { type: 'application/pdf' });
    const url = URL.createObjectURL(file);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = safeFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Safety delay before cleanup ensures Chrome has initiated the IO task
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 5000);
  } catch (err) {
    console.warn('PDF trigger error, falling back to basic save:', err);
    doc.save(safeFilename);
  }
}

// ─── generateTaxReceipt (synchronous) ────────────────────────────────────────
export const generateTaxReceipt = (donation: any) => {
  try {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    addHeader(doc, 'Official Donation Receipt');
    const receiptId = String(donation.id || 'RCP-001').substring(0, 12).toUpperCase();
    const L = 14;
    const R = 115;
    let y = 36;
    const info: [string, string, string, string][] = [
      ['Donor Name:', donation.donorName || 'N/A', 'Receipt #:', receiptId],
      ['Email:', donation.email || 'N/A', 'Date:', new Date().toLocaleDateString('en-PK')],
      ['Phone:', donation.phone || 'N/A', 'Status:', 'VERIFIED'],
    ];
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    info.forEach(([lbl1, val1, lbl2, val2]) => {
      doc.setFont('helvetica', 'bold');  doc.text(lbl1, L, y);
      doc.setFont('helvetica', 'normal'); doc.text(val1, L + 28, y);
      doc.setFont('helvetica', 'bold');  doc.text(lbl2, R, y);
      doc.setFont('helvetica', 'normal'); doc.text(val2, R + 22, y);
      y += 7;
    });
    y += 2;
    (doc as any).setDrawColor(30, 160, 95); (doc as any).setLineWidth(0.5); (doc as any).line(L, y, 196, y); y += 8;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(30, 160, 95); doc.text('Donation Details', L, y); y += 5;
    const amt = `PKR ${(donation.amount || 0).toLocaleString('en-PK')}`;
    const afterTable = drawTable(doc, ['Description', 'Amount (PKR)'], [[`Donation for: ${donation.causeName || 'General Welfare'}`, amt], ['Total Impact Magnitude', amt]], y, [136, 50], L);
    const noteY = afterTable + 10;
    doc.setFont('helvetica', 'italic'); doc.setFontSize(8.5); doc.setTextColor(120, 120, 120);
    doc.text('This receipt certifies a verified humanitarian asset deployment by JPSD Central Command.', L, noteY);
    doc.text('All contributions are tax-deductible under Section 61 of the Income Tax Ordinance, 2001.', L, noteY + 5);
    (doc as any).setDrawColor(100, 100, 100); (doc as any).setLineWidth(0.3); (doc as any).line(130, noteY + 30, 196, noteY + 30);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(50, 50, 50); doc.text('Authorized Signatory — JPSD', 163, noteY + 36, { align: 'center' });
    addFooter(doc, `Verify: https://jpsd.org.pk/verify/${receiptId}`);
    
    triggerDownload(doc, `JPSD_Receipt_${receiptId}_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (err) {
    console.error('Tax receipt error:', err);
    alert(`PDF Error: ${String(err)}`);
  }
};

// ─── generateBulkReceipts (synchronous) ──────────────────────────────────────
export const generateBulkReceipts = (donations: any[], donorInfo: any) => {
  try {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    addHeader(doc, 'Consolidated Humanitarian Impact Report');
    let y = 35;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 60, 60);
    doc.text(`Donor: ${donorInfo.name || 'N/A'}`, 14, y);
    doc.text(`ID: ${String(donorInfo.uid || 'N/A').substring(0, 12)}`, 14, y + 5);
    doc.text(`Generated: ${new Date().toLocaleString('en-PK')}`, 14, y + 10);
    const total = donations.reduce((acc, d) => acc + (d.amount || 0), 0);
    (doc as any).setFillColor(240, 250, 245); (doc as any).setDrawColor(30, 160, 95); (doc as any).setLineWidth(0.4); (doc as any).roundedRect(130, y - 3, 66, 18, 2, 2, 'FD');
    doc.setFontSize(7.5); doc.setTextColor(30, 160, 95); doc.setFont('helvetica', 'bold'); doc.text('TOTAL AGGREGATE IMPACT', 163, y + 3, { align: 'center' });
    doc.setFontSize(11); doc.text(`PKR ${total.toLocaleString('en-PK')}`, 163, y + 11, { align: 'center' });
    y += 20;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(30, 160, 95); doc.text('Transaction Ledger', 14, y); y += 4;
    const rows = donations.map((d) => [String(d.id || 'N/A').substring(0, 8).toUpperCase(), d.causeTitle || 'General Welfare', `PKR ${(d.amount || 0).toLocaleString('en-PK')}`, String(d.status || 'PENDING').toUpperCase(), d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-PK') : 'N/A']);
    drawTable(doc, ['TXN ID', 'CAUSE', 'AMOUNT', 'STATUS', 'DATE'], rows, y, [25, 65, 32, 25, 29], 14);
    addFooter(doc, 'JPSD Central Command | Verification Code: JPSD-GENESIS-2.4 | All transactions audited');
    
    triggerDownload(doc, `JPSD_Bulk_Report_${Date.now()}.pdf`);
  } catch (err) {
    console.error('Bulk receipt error:', err);
    alert(`PDF Error: ${String(err)}`);
  }
};

// ─── generateTreasuryReport (synchronous) ────────────────────────────────────
export const generateTreasuryReport = (title: string, data: any) => {
  try {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    addHeader(doc, title.toUpperCase());
    let y = 35;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 60, 60);
    doc.text(`Report Type: ${title}`, 14, y);
    doc.text(`Generated By: Central Treasury Command`, 14, y + 5);
    doc.text(`Date: ${new Date().toLocaleString('en-PK')}`, 14, y + 10);
    doc.setFont('helvetica', 'bold'); doc.text('Status: AUDITED & VERIFIED', 130, y);
    doc.setFont('helvetica', 'normal'); doc.text('Confidentiality: INTERNAL USE ONLY', 130, y + 5);
    y += 18;
    (doc as any).setDrawColor(30, 160, 95); (doc as any).setLineWidth(0.5); (doc as any).line(14, y, 196, y); y += 7;
    const overview = data?.financialOverview || { totalInflow: 0, totalOutflow: 0, netReserve: 0 };
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(30, 160, 95); doc.text('Financial Overview Snapshot', 14, y); y += 4;
    y = drawTable(doc, ['Metric', 'Amount (PKR)'], [['Total Inflow (Received)', `RS ${overview.totalInflow.toLocaleString('en-PK')}`], ['Total Outflow (Deployed)', `RS ${overview.totalOutflow.toLocaleString('en-PK')}`], ['Net Reserve', `RS ${overview.netReserve.toLocaleString('en-PK')}`]], y, [120, 66], 14);
    y += 8;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(30, 160, 95); doc.text('Income Source Breakdown', 14, y); y += 4;
    const incomeSources = data?.incomeSources || [];
    y = drawTable(doc, ['Source', 'Amount (PKR)', 'Percentage'], incomeSources.map((s: any) => [s.source || 'N/A', `RS ${(s.amount || 0).toLocaleString('en-PK')}`, `${s.percentage || 0}%`]), y, [90, 66, 30], 14);
    y += 8;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(30, 160, 95); doc.text('Top Expenditure Items', 14, y); y += 4;
    const expenditures = data?.expenditures || [];
    drawTable(doc, ['Project', 'Category', 'Amount (PKR)', 'Audit'], expenditures.map((e: any) => [e.project || 'N/A', e.category || 'N/A', `RS ${(e.amount || 0).toLocaleString('en-PK')}`, e.status || 'N/A']), y, [70, 40, 50, 26], 14);
    addFooter(doc, 'JPSD Central Command | Shariah Audited | All field missions verified');
    
    triggerDownload(doc, `JPSD_${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (err) {
    console.error('Treasury report error:', err);
    alert(`PDF Error: ${String(err)}`);
  }
};

// ─── generateVolunteerCertificate (returns Blob) ─────────────────────────────
export interface VolunteerCertificateData {
  name: string; volunteerId: string; skills: string[]; region: string; joinedAt: string; hours?: number;
}
export const generateVolunteerCertificate = (volunteer: VolunteerCertificateData): Blob => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  (doc as any).setDrawColor(30, 160, 95); (doc as any).setLineWidth(1.5); (doc as any).rect(10, 10, 190, 277);
  doc.setFontSize(10); doc.setTextColor(150, 150, 150); doc.text('TACTICAL MERIT DEPLOYMENT // JPSD CENTRAL COMMAND', 105, 30, { align: 'center' });
  doc.setFontSize(28); doc.setTextColor(30, 160, 95); doc.setFont('helvetica', 'bold'); doc.text('CERTIFICATE OF EXCELLENCE', 105, 50, { align: 'center' });
  doc.setFontSize(13); doc.setTextColor(100, 100, 100); doc.setFont('helvetica', 'normal'); doc.text('This is to verify the humanitarian accreditation of', 105, 68, { align: 'center' });
  doc.setFontSize(22); doc.setTextColor(33, 33, 33); doc.setFont('helvetica', 'bold'); doc.text(volunteer.name.toUpperCase(), 105, 82, { align: 'center' });
  doc.setFontSize(11); doc.setTextColor(100, 100, 100); doc.setFont('helvetica', 'normal'); doc.text('Skills & Expertise Alignment:', 20, 105);
  doc.setFontSize(10); volunteer.skills.forEach((skill, idx) => { doc.text(`• ${skill.toUpperCase()}`, 25, 115 + idx * 7); });
  doc.setFontSize(11); doc.text(`Regional Deployment Hub: ${volunteer.region.toUpperCase()}`, 20, 155);
  doc.text(`Verification ID: ${volunteer.volunteerId}`, 20, 163);
  doc.text(`Commencement Date: ${new Date(volunteer.joinedAt).toLocaleDateString('en-PK')}`, 20, 171);
  if (volunteer.hours) {
    doc.setFontSize(13); doc.setTextColor(30, 160, 95); doc.setFont('helvetica', 'bold'); doc.text(`OPERATIONAL HOURS LOGGED: ${volunteer.hours}`, 105, 200, { align: 'center' });
  }
  doc.setFontSize(9); doc.setTextColor(150, 150, 150); doc.setFont('helvetica', 'normal'); doc.text('CERTIFIED FOR FIELD OPERATIONS // DIRECTIVE 09-X', 105, 248, { align: 'center' });
  (doc as any).line(130, 258, 180, 258); doc.text('DIRECTOR OF OPERATIONS', 155, 264, { align: 'center' });
  return doc.output('blob');
};

// ─── downloadFallback ─────────────────────────────────────────────────────────
export const downloadFallback = (title: string, data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
