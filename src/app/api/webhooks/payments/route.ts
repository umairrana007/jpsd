import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payments/hashUtils';
import { logActivity } from '@/lib/firebaseUtils';
import { getPaymentConfig } from '@/lib/config/paymentConfig';
import { sendDonationReceipt } from '@/lib/emailService';

/**
 * JPSD Payment Webhook Endpoint Stub
 * 
 * Handles incoming notifications from JazzCash, EasyPaisa, and Stripe.
 * Phase 8 Tactical Implementation: Verification is bypassed in simulation mode.
 */
export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const signature = req.headers.get('x-jpsd-signature') || '';
        const config = getPaymentConfig();

        // 1. Verify Signature (Stub logic: returns true in simulation)
        const isValid = verifyWebhookSignature(
            JSON.stringify(payload),
            signature,
            config.easypaisa.hashKey // Using EP key as example secret
        );

        if (!isValid) {
            console.error('[Webhook Error] Invalid tactical signature detected.');
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Log Event to Activity Logs
        await logActivity({
            type: 'PAYMENT_WEBHOOK_RECEIVED',
            message: `Payment webhook processed for transaction: ${payload.transactionId || 'UNKNOWN'}`,
            provider: payload.provider || 'generic',
            amount: payload.amount || 0,
            status: payload.status || 'received',
            icon: '🔔'
        });

        // 2.5 Trigger Email Stub (Phase 8 Task 3)
        // In real life, we extract donor info from database using transactionId
        await sendDonationReceipt({
            id: payload.transactionId || 'UNKNOWN',
            donorName: payload.donorName || 'Humanitarian',
            donorEmail: payload.donorEmail || 'donor@example.com',
            amount: payload.amount || 0,
            currency: 'PKR',
            causeName: payload.causeName || 'General Donation',
            paymentMethod: payload.provider || 'generic',
            timestamp: new Date().toISOString()
        }, payload.donorEmail || 'donor@example.com');

        console.log(`[Payment Stub] Webhook received, verified, and email stub triggered: ${JSON.stringify(payload)}`);

        // 3. Return Success Status
        return NextResponse.json({ 
            success: true, 
            message: 'Webhook processed (simulation)' 
        }, { status: 200 });

    } catch (error) {
        console.error('[Webhook System Error]:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Internal Tactical Failure' 
        }, { status: 500 });
    }
}
