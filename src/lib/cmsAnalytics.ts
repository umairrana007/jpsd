import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface CMSAnalyticsLog {
  docId: string;
  collection: string;
  action: 'view' | 'edit' | 'publish' | 'delete';
  actorUid: string;
  metadata?: {
    duration?: number;
    fieldsChanged?: string[];
    device?: string;
  };
}

export const logCMSAnalytics = async (log: CMSAnalyticsLog) => {
  try {
    await addDoc(collection(db!, 'cms_analytics'), {
      ...log,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error('[CMS Analytics Error]', err);
  }
};
