import React from 'react';
import Link from 'next/link';

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#2c3e50] mb-4">Coming Soon</h1>
        <p className="text-gray-600 mb-6">
          We are working hard to bring you this page. Please check back later.
        </p>
        <div className="inline-block px-6 py-2 bg-[#27ae60] text-white rounded-lg font-medium">
          Under Construction
        </div>
        <div className="mt-8">
          <Link href="/" className="text-[#2980b9] hover:underline">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
