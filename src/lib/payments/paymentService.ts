/**
 * Unified Payment Service
 * Phase 4: Structural Prep
 */
import { JazzCashProvider } from './jazzcash';
import { EasyPaisaProvider } from './easypaisa';
import { PaymentProvider, PaymentRequest, PaymentResponse } from '@/types';

export class PaymentService {
  private providers: Record<string, PaymentProvider>;

  constructor() {
    this.providers = {
      jazzcash: new JazzCashProvider(),
      easypaisa: new EasyPaisaProvider()
    };
  }

  /**
   * Process a payment with the specified provider.
   */
  async processPayment(providerName: string, request: PaymentRequest): Promise<PaymentResponse> {
    const provider = this.providers[providerName.toLowerCase()];
    if (!provider) {
      return {
        success: false,
        message: `Unknown payment provider: ${providerName}`,
        errorCode: 'PROVIDER_NOT_FOUND'
      };
    }

    return provider.initiatePayment(request);
  }

  /**
   * Verify a transaction with a given provider.
   */
  async verifyTransaction(providerName: string, transactionId: string): Promise<PaymentResponse> {
    const provider = this.providers[providerName.toLowerCase()];
    if (!provider) {
      return {
        success: false,
        message: `Unknown payment provider: ${providerName}`,
        errorCode: 'PROVIDER_NOT_FOUND'
      };
    }

    return provider.verifyTransaction(transactionId);
  }
}

export const paymentService = new PaymentService();
