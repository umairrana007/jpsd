/**
 * JPSD Payment Configuration Hub
 * 
 * Manages environment-specific payment settings and validation.
 */

export interface PaymentConfig {
    mode: 'production' | 'sandbox' | 'simulation';
    isProduction: boolean;
    jazzcash: {
        merchantId: string;
        password?: string;
        salt: string;
        baseUrl: string;
        returnUrl: string;
    };
    easypaisa: {
        merchantId?: string;
        storeId: string;
        hashKey: string;
        baseUrl: string;
        postBackUrl: string;
    };
}

/**
 * Retrieves the current payment configuration from environment variables.
 * Includes validation and logging warnings for missing production credentials.
 */
export function getPaymentConfig(): PaymentConfig {
    const mode = (process.env.NEXT_PUBLIC_PAYMENT_MODE || 'sandbox') as PaymentConfig['mode'];
    const isProduction = mode === 'production';
    
    const config: PaymentConfig = {
        mode,
        isProduction,
        jazzcash: {
            merchantId: process.env.JAZZCASH_MERCHANT_ID || 'MOCK_JC_ID',
            password: process.env.JAZZCASH_PASSWORD,
            salt: process.env.JAZZCASH_SALT || 'MOCK_JC_SALT',
            baseUrl: process.env.JAZZCASH_API_URL || 'https://sandbox.jazzcash.com.pk/api',
            returnUrl: process.env.NEXT_PUBLIC_JAZZCASH_RETURN_URL || '/api/webhooks/payments/jazzcash',
        },
        easypaisa: {
            merchantId: process.env.EASYPAISA_MERCHANT_ID,
            storeId: process.env.EASYPAISA_STORE_ID || 'MOCK_EP_ID',
            hashKey: process.env.EASYPAISA_HASH_KEY || 'MOCK_EP_KEY',
            baseUrl: process.env.EASYPAISA_API_URL || 'https://poland.easypaisa.com.pk/easypay',
            postBackUrl: process.env.NEXT_PUBLIC_EASYPAISA_POSTBACK_URL || '/api/webhooks/payments/easypaisa',
        }
    };

    // Validation: Log warning if production and credentials missing
    if (isProduction) {
        const missing: string[] = [];
        if (!process.env.JAZZCASH_SALT) missing.push('JAZZCASH_SALT');
        if (!process.env.EASYPAISA_HASH_KEY) missing.push('EASYPAISA_HASH_KEY');
        
        if (missing.length > 0) {
            console.warn(`[Payment Config] CRITICAL WARNING: Missing production credentials for: ${missing.join(', ')}`);
        }
    }

    return config;
}

/**
 * Checks if the current payment mode is simulation (for testing purposes).
 */
export function isSimulationMode(): boolean {
    return getPaymentConfig().mode === 'simulation';
}
