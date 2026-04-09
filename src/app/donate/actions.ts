'use server';

import { PaymentPayload } from '@/types';
import { 
  generateJazzCashHash as generateJazzCashHashServer, 
  generateEasyPaisaSignature as generateEasyPaisaSignatureServer,
  verifyEasyPaisaPayload 
} from '@/lib/paymentUtils';

/**
 * Server-side payment processing orchestrator.
 * Securely handles cryptographic operations away from the client boundary.
 */
export async function processPayment(payload: PaymentPayload) {
  try {
    if (payload.method === 'jazzcash') {
      if (!payload.params) throw new Error('[Payment Action] JazzCash: Missing parameters.');
      return {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        message: 'JazzCash payload generated successfully',
        hash: generateJazzCashHashServer(payload.params as Record<string, string | number>, payload.salt)
      };
    }
    
    if (payload.method === 'easypaisa') {
      if (payload.data) {
        return {
          success: verifyEasyPaisaPayload(payload.data),
          transactionId: `EP-${Date.now()}`,
          message: 'EasyPaisa payload verified server-side'
        };
      }
      return {
        success: true,
        transactionId: `EP-SIM-${Date.now()}`,
        message: 'EasyPaisa simulation active'
      };
    }
    
    throw new Error(`[Payment Action] Unsupported method: ${payload.method}`);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Payment processing failed';
    console.error('[Payment Action] Execution failure:', msg);
    return {
      success: false,
      message: msg
    };
  }
}

/**
 * Securely generates a security hash for payment transactions.
 */
export async function generatePaymentSecurityHash(method: string, data: Record<string, string | number> | string, saltOrKey: string | undefined): Promise<string> {
  try {
    if (method === 'jazzcash') {
      return generateJazzCashHashServer(data as Record<string, string | number>, saltOrKey);
    } else if (method === 'easypaisa') {
      return generateEasyPaisaSignatureServer(typeof data === 'string' ? data : JSON.stringify(data), saltOrKey);
    }
    return '';
  } catch (error) {
    console.error('[Payment Hash Action] Failure:', error);
    return '';
  }
}
