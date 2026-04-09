/**
 * JPSD Payment Gateway Error Mapping
 * Phase 9: Task #1 Activation Readiness
 * 
 * Maps provider-specific error codes to localized bilingual messages.
 */

export interface PaymentError {
    en: string;
    ur: string;
}

export const paymentErrorMap: Record<string, Record<string, PaymentError>> = {
    jazzcash: {
        '101': { 
            en: 'Invalid merchant credentials. Contact support.', 
            ur: 'تجارتی اسناد غلط ہیں۔ براہ کرم سپورٹ سے رابطہ کریں۔' 
        },
        '205': { 
            en: 'Transaction timeout. Please try again.', 
            ur: 'ادائیگی کا وقت ختم ہو گیا ہے۔ براہ کرم دوبارہ کوشش کریں۔' 
        },
        '999': { 
            en: 'Internal system error at provider.', 
            ur: 'سسٹم میں خرابی آگئی ہے۔' 
        },
        '000': { 
            en: 'Transaction cancelled by user.', 
            ur: 'صارف کی طرف سے ادائیگی منسوخ کر دی گئی ہے۔' 
        },
        'CREDENTIALS_MISSING': {
            en: 'Critical: Production credentials missing.',
            ur: 'انتظامیہ الرٹ: تجارتی اسناد غائب ہیں۔'
        }
    },
    easypaisa: {
        'EP_AUTH_001': { 
            en: 'Authentication failed. Invalid API key.', 
            ur: 'تصدیق ناکام ہوئی۔ اے پی آئی کی غلط ہے۔' 
        },
        'EP_PROC_002': { 
            en: 'Processing error. Insufficient funds or card issue.', 
            ur: 'ادائیگی میں خرابی۔ بیلنس کم ہے یا کارڈ کا مسئلہ ہے۔' 
        },
        'EP_USER_003': { 
            en: 'User cancelled the transaction.', 
            ur: 'ادائیگی منسوخ کر دی گئی ہے۔' 
        }
    }
};

/**
 * Retrieves a localized error message for a specific provider and code.
 * Falls back to a generic message if the code is unknown.
 */
export function getLocalizedPaymentError(
    provider: string, 
    code: string, 
    isUrdu: boolean = false
): string {
    const providerMap = paymentErrorMap[provider.toLowerCase()];
    if (!providerMap) return isUrdu ? 'ادائیگی میں خرابی' : 'Payment Error';

    const error = providerMap[code] || {
        en: `An unexpected error occurred (${code}).`,
        ur: `ایک غیر متوقع خرابی پیش آگئی (${code})۔`
    };

    return isUrdu ? error.ur : error.en;
}
