'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/firebaseUtils';
import { BlogPost } from '@/types';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Image from 'next/image';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setFilteredPosts(data);
      
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#1ea05f] font-black tracking-[0.4em] uppercase text-xs"
          >
            Insights & Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-[#0f172a] leading-[1.1] tracking-tight"
          >
            Latest <span className="text-[#1ea05f]">Journal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 font-medium max-w-2xl mx-auto opacity-70"
          >
            Stay updated with our latest impact stories, community news, and announcements from around the world.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20'
                : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
            }`}
          >
            All Updates
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20'
                  : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPosts.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-slate-50">
                  <p className="text-2xl font-black text-[#0f172a] opacity-40 uppercase tracking-tighter">
                    No articles found
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                    >
                      <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/95 backdrop-blur-sm text-[#1ea05f] px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-10 flex flex-col flex-grow">
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <FiClock className="mr-1.5 text-[#1ea05f]" />
                              {post.readTimeMinutes} min read
                            </div>
                            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <FiUser className="mr-1.5 text-[#1ea05f]" />
                              By Admin
                            </div>
                          </div>

                          <h3 className="text-2xl font-black text-[#0f172a] mb-4 leading-tight group-hover:text-[#1ea05f] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-3 opacity-80 leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#1ea05f] group-hover:bg-[#1ea05f] group-hover:text-white transition-all duration-300">
                              <FiArrowRight />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
