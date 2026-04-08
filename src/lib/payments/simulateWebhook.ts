/**
 * Webhook Simulation Utility
 * Mimics payment gateway callbacks for local testing.
 */
import { logActivity } from '../firebaseUtils';

export interface WebhookPayload {
  transactionId: string;
  orderId?: string;
  amount: number;
  status: string;
  provider?: string;
  paymentMethod?: string;
  donorEmail?: string;
  timestamp?: string;
}

export const simulateWebhookCallback = async (payload: WebhookPayload) => {
  const provider = payload.provider || payload.paymentMethod || 'unknown';
  const status = payload.status.toUpperCase();
  console.log(`[SIMULATION] Webhook callback received from ${provider}:`, payload);
  
  // Log to activity_logs with specific simulation type
  await logActivity({
    type: 'PAYMENT_SIMULATION',
    message: `Simulated ${provider} webhook: ${status} for TransID ${payload.transactionId}`,
    userId: 'SYSTEM_SIMULATOR',
    metadata: {
       ...payload,
       environment: 'local_testing'
    }
  });

  return {
    success: true,
    processedAt: new Date().toISOString()
  };
};

export const simulateRefundFlow = async (transactionId: string, amount: number) => {
   console.log(`[SIMULATION] Initiating refund for ${transactionId} (Rs. ${amount})...`);
   
   await logActivity({
      type: 'PAYMENT_SIMULATION',
      message: `Simulated refund processed for ${transactionId}`,
      userId: 'SYSTEM_SIMULATOR',
      metadata: { transactionId, amount, type: 'refund' }
   });

   return {
      success: true,
      refundId: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
   };
};
