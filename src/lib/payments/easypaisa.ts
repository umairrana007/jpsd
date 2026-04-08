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
    const isSimulation = (window as any).PAYMENT_SIMULATION === true;

    if (isSimulation) {
      console.log('[SIMULATION] EasyPaisa: Deployment mode active. Returning mock success.');
      return {
        success: true,
        transactionId: `EP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: 'SIMULATED SUCCESS: EasyPaisa OTC code generated in test environment.',
        redirectUrl: '/donation/success'
      };
    }

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
