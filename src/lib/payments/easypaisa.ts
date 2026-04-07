/**
 * EasyPaisa Payment Provider Stubs
 * Phase 4: Structural Prep
 */
import { PaymentRequest, PaymentResponse, PaymentProcessStatus, PaymentProvider } from '@/types';

export class EasyPaisaProvider implements PaymentProvider {
  /**
   * Initiates a payment request with EasyPaisa merchant endpoint.
   */
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('[DEBUG] EasyPaisa Initiate: Request received.', request);
    return {
      success: false,
      message: 'EasyPaisa Integration: Structure only - Actual API not live yet.',
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
