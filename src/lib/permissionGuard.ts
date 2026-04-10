import { ContentRole } from '@/types';

export const canEditCollection = (user: { contentRole?: ContentRole; allowedCollections?: string[] } | null | undefined, collection: string, requirePublisher: boolean = false): boolean => {
  if (!user) return false;
  // Super admin can edit everything
  if (user.contentRole === 'super_admin') return true;
  
  const hasAccess = user.allowedCollections?.includes(collection) || false;
  if (requirePublisher) {
    return hasAccess && user.contentRole === 'publisher';
  }
  return hasAccess;
};

export const canPublishContent = (user: { contentRole?: ContentRole } | null | undefined): boolean => {
  return user?.contentRole === 'publisher' || user?.contentRole === 'super_admin';
};

export const canReviewContent = (user: { contentRole?: ContentRole } | null | undefined): boolean => {
  return user?.contentRole === 'publisher' || user?.contentRole === 'super_admin';
};
