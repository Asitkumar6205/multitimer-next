'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Timers
            </Link>
            <Link
              href="/history"
              className={`text-sm font-medium transition-colors ${
                pathname === '/history'
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 