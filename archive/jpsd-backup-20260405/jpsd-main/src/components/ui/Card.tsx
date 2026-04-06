import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CardProps {
  image?: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  children?: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  titleUrdu,
  description,
  descriptionUrdu,
  children,
  className = '',
  featured = false,
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group glass rounded-[2.5rem] overflow-hidden border border-white/40 hover-lift bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}
    >
      {image && (
        <div className="relative w-full h-64 overflow-hidden mask-curved">
          <Image
            src={imgError ? '/images/fallback.jpg' : image}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
            priority={featured}
            quality={75}
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-8 space-y-4">
        <div className="space-y-4">
          {titleUrdu ? (
            <h3 className="text-2xl md:text-3xl font-bold text-[#1e293b] urdu-text text-center leading-snug min-h-[4rem] flex items-center justify-center">
              {titleUrdu}
            </h3>
          ) : (
            <h3 className="text-2xl font-black text-[#1e293b] leading-tight group-hover:text-primary-green transition-colors min-h-[3.5rem] flex items-center">
              {title}
            </h3>
          )}
          
          {descriptionUrdu ? (
            <p className="text-gray-500 urdu-text text-center text-base leading-relaxed line-clamp-3 min-h-[6rem]">
              {descriptionUrdu}
            </p>
          ) : (
            <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed font-medium min-h-[4.5rem]">
              {description}
            </p>
          )}
        </div>
        
        <div className="pt-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
