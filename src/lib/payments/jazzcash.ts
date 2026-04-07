/**
 * JazzCash Payment Provider Stubs
 * Phase 4: Structural Prep
 * Actual API integration will be implemented when real credentials are provided.
 */
import { PaymentRequest, PaymentResponse, PaymentProcessStatus, PaymentProvider } from '@/types';

export class JazzCashProvider implements PaymentProvider {
  /**
   * Initiates a payment request with JazzCash merchant endpoint.
   * Required Credentials: Merchant ID, Password, Hash Key.
   */
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('[DEBUG] JazzCash: Merchant ID needed from env. Placeholder initiate.', request);
    return {
      success: false,
      message: 'JazzCash Integration: Structure only - Actual API not live yet.',
      errorCode: 'INTEGRATION_STUB'
    };
  }

  /**
   * Verifies the transaction after redirect/callback.
   */
  async verifyTransaction(transactionId: string): Promise<PaymentResponse> {
    return {
      success: false,
      transactionId,
      message: 'Verification Stub: Integration Pending.'
    };
  }

  /**
   * Gets the current status of a transaction.
   */
  async getPaymentStatus(transactionId: string): Promise<PaymentProcessStatus> {
    return 'pending';
  }
}
