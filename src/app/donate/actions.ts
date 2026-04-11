'use server';

import { PaymentPayload } from '@/types';
import { 
  generateJazzCashHash as generateJazzCashHashServer, 
  generateEasyPaisaSignature as generateEasyPaisaSignatureServer,
  verifyEasyPaisaPayload 
} from '@/lib/paymentUtils';
import { getPaymentConfig } from '@/lib/config/paymentConfig';

/**
 * Server-side payment processing orchestrator.
 * Securely handles cryptographic operations and external API calls.
 */
export async function processPayment(payload: any) {
  const config = getPaymentConfig();
  
  // SANDBOX / SIMULATION MODE
  if (!config.isProduction) {
    console.log(`[Payment Mode] ${config.mode.toUpperCase()} – using tactical mock response`);
    return { 
      success: true, 
      transactionId: `mock_${Date.now()}`, 
      production: false,
      message: `${config.mode} mode active – no real charge applied.`
    };
  }
  
  // PRODUCTION MODE: Real API Orchestration
  try {
    if (payload.method === 'jazzcash') {
      const hash = generateJazzCashHashServer(payload.params, config.jazzcash.salt);
      
      const response = await fetch(`${config.jazzcash.baseUrl}/2.0/txn/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...payload.params, 
          pp_IntegritySignature: hash 
        }),
      });
      
      const result = await response.json();
      
      if (result.pp_ResponseCode === '000') {
        return { 
          success: true, 
          transactionId: result.pp_RetreivalReferenceNo, 
          production: true, 
          redirectUrl: result.pp_RedirectUrl 
        };
      } else {
        return { 
          success: false, 
          error: result.pp_ResponseMessage || 'JazzCash transaction rejected', 
          production: true 
        };
      }
    }
    
    if (payload.method === 'easypaisa') {
      // Logic for production EasyPaisa integration
      // Implementation similar to JazzCash with specific EP protocol
      return { 
        success: false, 
        error: 'EasyPaisa production gateway integration pending final validation', 
        production: true 
      };
    }
    
    throw new Error(`Unsupported method in production: ${payload.method}`);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Critical payment gateway failure';
    console.error('[Payment Error] Production execution failed:', msg);
    return { 
      success: false, 
      error: 'Payment processing failed. Please try again or contact support.', 
      production: true 
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
