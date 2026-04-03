import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseStyles = 'bg-gray-200 animate-pulse';
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width,
    height,
    minWidth: width,
    minHeight: height,
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
      <Skeleton variant="rounded" className="w-full h-48 mb-4" />
      <Skeleton variant="text" className="w-3/4 h-6 mb-2" />
      <Skeleton variant="text" className="w-full h-4 mb-2" />
      <Skeleton variant="text" className="w-5/6 h-4 mb-4" />
      <div className="mt-4 space-y-2">
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-2/3 h-4" />
      </div>
      <Skeleton variant="rounded" className="w-full h-12 mt-6" />
    </div>
  );
};
