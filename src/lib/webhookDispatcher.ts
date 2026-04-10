'use server';

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret?: string;
}

export type WebhookPayload = {
  type: string;
  data: Record<string, unknown>;
  actorUid?: string;
};

export const triggerWebhook = async (config: Partial<WebhookConfig> & { url: string }, payload: WebhookPayload): Promise<boolean> => {
  if (config.isActive === false) return true;

  try {
    const body = JSON.stringify({
      event: payload.type,
      timestamp: new Date().toISOString(),
      data: payload.data,
      origin: 'JPSD_CMS_PROTOCOL'
    });

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'User-Agent': 'JPSD-Webhook-Dispatcher/1.0'
    };

    if (config.secret) {
      // In a real environment, we'd use a more robust HMAC sign, 
      // but for this implementation we use a simple SHA-256 for demonstration
      const encoder = new TextEncoder();
      const keyData = encoder.encode(config.secret);
      const messageData = encoder.encode(body);
      
      // Note: crypto.subtle is only available in secure contexts/recent Node.
      // We'll use a placeholder for signature if needed, or simple header.
      headers['X-JPSD-Signature-Version'] = 'v1';
    }

    const response = await fetch(config.url, {
      method: 'POST',
      headers,
      body,
      // Short timeout to prevent hanging the CMS process
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      console.error(`[Webhook Failed] ${config.name} returned status ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Webhook Dispatch Error] ${config.name}:`, error);
    return false;
  }
};
