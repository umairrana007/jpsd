/**
 * JPSD Payment Configuration Hub
 * 
 * Manages environment-specific payment settings and validation.
 */

export interface PaymentConfig {
    mode: 'production' | 'test' | 'simulation';
    jazzcash: {
        merchantId: string;
        salt: string;
        returnUrl: string;
    };
    easypaisa: {
        storeId: string;
        apiKey: string;
        postBackUrl: string;
    };
    stripe: {
        publicKey: string;
    };
}

/**
 * Retrieves the current payment configuration from environment variables.
 * Includes validation and logging warnings for missing production credentials.
 */
export function getPaymentConfig(): PaymentConfig {
    const mode = (process.env.NEXT_PUBLIC_PAYMENT_MODE || 'simulation') as PaymentConfig['mode'];
    
    const config: PaymentConfig = {
        mode,
        jazzcash: {
            merchantId: process.env.JAZZCASH_MERCHANT_ID || 'MOCK_JC_ID',
            salt: process.env.JAZZCASH_SALT || 'MOCK_JC_SALT',
            returnUrl: process.env.NEXT_PUBLIC_JAZZCASH_RETURN_URL || '/donation/callback',
        },
        easypaisa: {
            storeId: process.env.EASYPAISA_STORE_ID || 'MOCK_EP_ID',
            apiKey: process.env.EASYPAISA_API_KEY || 'MOCK_EP_KEY',
            postBackUrl: process.env.NEXT_PUBLIC_EASYPAISA_POSTBACK_URL || '/api/webhooks/payments',
        },
        stripe: {
            publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'MOCK_STRIPE_KEY',
        }
    };

    // Validation: Log warning if production and credentials missing
    if (mode === 'production') {
        const missing: string[] = [];
        if (!process.env.JAZZCASH_SALT) missing.push('JAZZCASH_SALT');
        if (!process.env.EASYPAISA_API_KEY) missing.push('EASYPAISA_API_KEY');
        
        if (missing.length > 0) {
            console.warn(`[Payment Config] CRITICAL WARNING: Missing production credentials for: ${missing.join(', ')}`);
        }
    }

    return config;
}

/**
 * Returns true if the system is running in simulation/test mode.
 */
export function isSimulationMode(): boolean {
    return process.env.NEXT_PUBLIC_PAYMENT_MODE !== 'production';
}
