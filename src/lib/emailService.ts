/**
 * JPSD Email Service Stub
 * Phase 8: Post-Payment Experience
 * 
 * This service handles structural email triggering for the ecosystem.
 * CRITICAL: Current implementation is a STUB. Real SMTP/SendGrid integration
 * will be activated when credentials are provided.
 */

import { logActivity } from './firebaseUtils';
import { getReceiptHtml, getImpactSummaryHtml } from './emailTemplates';

export interface DonationData {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  causeName: string;
  paymentMethod: string;
  timestamp: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a donation receipt to the recipient (STUB).
 * Real implementation would use SendGrid/Resend/Nodemailer with SMTP credentials.
 * 
 * @param donation - The donation data object
 * @param recipientEmail - Recipient's email address
 */
export async function sendDonationReceipt(
  donation: DonationData, 
  recipientEmail: string
): Promise<EmailSendResult> {
  try {
    // 1. Validate Email Format (Tactical Check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return { success: false, error: 'INVALID_EMAIL_FORMAT' };
    }

    // 2. Generate Template (Stub)
    // const html = getReceiptHtml({
    //   donorName: donation.donorName,
    //   amount: donation.amount,
    //   currency: donation.currency,
    //   causeName: donation.causeName,
    //   transactionId: donation.id,
    //   timestamp: donation.timestamp
    // });

    // 3. Log to Console (Developer Only - Selective Privacy)
    // NEVER log recipientEmail or donation details to console in production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Email Stub] Receipt queued for ${recipientEmail.split('@')[0]}***@***.***`);
    }

    // 4. Log to Firebase Activity Logs
    await logActivity({
      type: 'EMAIL_RECEIPT_STUB',
      message: `Impact receipt queued for transaction: ${donation.id}`,
      donorEmail: recipientEmail, // Persistent storage is okay, console is not
      donationId: donation.id,
      status: 'queued_stub',
      icon: '📧'
    });

    // 5. Simulate Async Delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return { 
      success: true, 
      messageId: `EMAIL-STUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` 
    };

  } catch (error) {
    console.error('[Email Service Error]:', error);
    return { success: false, error: 'STUB_PROCESSING_FAILURE' };
  }
}

/**
 * Sends a monthly/yearly impact summary (STUB).
 * Real implementation would aggregate donations and generate PDF attachment.
 */
export async function sendImpactSummary(
  userId: string, 
  period: 'monthly' | 'yearly'
): Promise<boolean> {
  // Simulate heavy processing for aggregation
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  await logActivity({
    type: 'IMPACT_SUMMARY_STUB',
    message: `${period.toUpperCase()} impact summary generated and queued for user: ${userId}`,
    userId,
    status: 'queued_stub',
    icon: '📊'
  });

  return true;
}
