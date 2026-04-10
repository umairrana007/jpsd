import useSWR from 'swr';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp, limit } from 'firebase/firestore';

const getTimeRangeStart = (timeRange: '7d' | '30d' | '90d') => {
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const date = new Date();
  date.setDate(date.getDate() - days);
  return Timestamp.fromDate(date);
};

export const useCMSAnalytics = (collectionName?: string, docId?: string, timeRange: '7d' | '30d' | '90d' = '30d') => {
  const key = collectionName && docId ? `analytics/${collectionName}/${docId}/${timeRange}` : `analytics/global/${timeRange}`;

  const { data, error, isLoading } = useSWR(key, async () => {
    // Basic query construction
    let constraints = [
      where('timestamp', '>=', getTimeRangeStart(timeRange)),
      orderBy('timestamp', 'desc')
    ];

    if (collectionName && docId) {
      constraints.unshift(where('collection', '==', collectionName), where('docId', '==', docId));
    }

    if (!db) return [];

    const q = query(
      collection(db, 'cms_analytics'),
      ...constraints,
      limit(1000)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, { 
    revalidateOnFocus: false, 
    dedupingInterval: 300000 // 5 minutes cache
  });

  const analytics = data as any[];

  return {
    analytics,
    loading: isLoading,
    error,
    totalViews: analytics?.filter(d => d.action === 'view').length || 0,
    totalEdits: analytics?.filter(d => d.action === 'edit').length || 0,
    lastActivity: analytics?.[0]?.timestamp
  };
};
