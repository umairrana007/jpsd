'use server';

import { TranslationServiceClient } from '@google-cloud/translate';

// We initialize the client only if the required env vars are present
let client: any = null;
const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID;

if (process.env.GOOGLE_TRANSLATE_KEY_PATH && projectId) {
  try {
    client = new TranslationServiceClient({
      keyFilename: process.env.GOOGLE_TRANSLATE_KEY_PATH
    });
  } catch (err) {
    console.error('Failed to initialize TranslationServiceClient:', err);
  }
}

export const suggestTranslation = async (text: string, targetLanguage: 'ur' | 'en'): Promise<string> => {
  if (!client || !projectId) {
    console.warn('Translation service not configured. Falling back to original text.');
    return text;
  }

  try {
    const [response] = await client.translateText({
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/html', // Preserve HTML tags for rich text
      sourceLanguageCode: targetLanguage === 'ur' ? 'en' : 'ur',
      targetLanguageCode: targetLanguage,
    });

    return response.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error('[Translation Error]', error);
    return text; // Fallback to original
  }
};

export const batchSuggestTranslations = async (
  items: Array<{ id: string; text: string }>, 
  targetLanguage: 'ur' | 'en'
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  for (const item of items) {
    results[item.id] = await suggestTranslation(item.text, targetLanguage);
  }
  return results;
};
