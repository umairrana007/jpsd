/**
 * Email Templates for JPSD Ecosystem
 * Phase 8: Post-Payment Experience
 * 
 * Note: These are templates for the email stub. In real implementation, 
 * these would be converted to MJML or React Email components.
 */

export interface ReceiptTemplateData {
  donorName: string;
  amount: number;
  currency: string;
  causeName: string;
  transactionId: string;
  timestamp: string;
}

export const getReceiptHtml = (data: ReceiptTemplateData): string => {
  return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #059669;">Baitussalam Welfare Trust</h1>
        <p style="color: #666;">Official Donation Receipt</p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
        <h2 style="margin-top: 0;">Assalam-o-Alaikum, ${data.donorName}!</h2>
        <p>Thank you for your generous contribution towards <strong>${data.causeName}</strong>.</p>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Amount:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${data.currency} ${data.amount.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Transaction ID:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${data.transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${data.timestamp}</td>
          </tr>
        </table>
      </div>
      
      <p style="margin-top: 20px; font-size: 14px; color: #666; line-height: 1.6;">
        Your support enables us to continue our vital welfare work locally and internationally. 
        A formal PDF receipt for tax purposes will be attached in our real deployment.
      </p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
        <p>Jamiyat Punjabi Saudagran-e-Delhi (JPSD)</p>
        <p>128 - O, Block 2 PECHS, Karachi, Pakistan</p>
        <p>This is a system-generated message from our Phase 8 stub integration.</p>
      </div>
    </div>
  `;
};

export const getImpactSummaryHtml = (userName: string, stats: any): string => {
  return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #059669;">Your Monthly Impact Summary</h2>
      <p>Assalam-o-Alaikum ${userName},</p>
      <p>Here is how your contributions have helped this month:</p>
      <ul>
        <li>Total Lives Impacted: ${stats.lives || 0}</li>
        <li>Active Missions Supported: ${stats.missions || 0}</li>
        <li>Total Contribution: ${stats.amount || 0}</li>
      </ul>
      <p>Keep up the great work!</p>
    </div>
  `;
};
