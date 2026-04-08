/**
 * Unified Payment Service
 * Phase 4: Structural Prep
 */
import { JazzCashProvider } from './jazzcash';
import { EasyPaisaProvider } from './easypaisa';
import { PaymentProvider, PaymentRequest, PaymentResponse, PaymentProcessStatus } from '@/types';

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
    return this.initiatePayment(providerName, request);
  }

  /**
   * Alias for processPayment to match naming conventions.
   */
  async initiatePayment(providerName: string, request: PaymentRequest): Promise<PaymentResponse> {
    const provider = this.getProvider(providerName);
    if (!provider) {
      return this.providerNotFound(providerName);
    }
    return provider.initiatePayment(request);
  }

  /**
   * Verify a transaction with a given provider.
   */
  async verifyTransaction(providerName: string, transactionId: string): Promise<PaymentResponse> {
    const provider = this.getProvider(providerName);
    if (!provider) {
      return this.providerNotFound(providerName);
    }
    return provider.verifyTransaction(transactionId);
  }

  /**
   * Poll for the status of a transaction.
   */
  async pollTransactionStatus(providerName: string, transactionId: string): Promise<PaymentProcessStatus> {
    const provider = this.getProvider(providerName);
    if (!provider) return 'failed';
    return provider.getPaymentStatus(transactionId);
  }

  /**
   * Process a refund for a given transaction.
   */
  async processRefund(providerName: string, transactionId: string, amount: number): Promise<PaymentResponse> {
    const provider = this.getProvider(providerName);
    if (!provider) {
      return this.providerNotFound(providerName);
    }

    if (!provider.processRefund) {
      return {
        success: false,
        message: `Refund not supported by provider: ${providerName}`,
        errorCode: 'REFUND_NOT_SUPPORTED'
      };
    }

    return provider.processRefund(transactionId, amount);
  }

  private getProvider(name: string): PaymentProvider | undefined {
    return this.providers[name.toLowerCase()];
  }

  private providerNotFound(name: string): PaymentResponse {
    return {
      success: false,
      message: `Unknown payment provider: ${name}`,
      errorCode: 'PROVIDER_NOT_FOUND'
    };
  }
}

export const paymentService = new PaymentService();
