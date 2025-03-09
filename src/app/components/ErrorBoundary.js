'use client';

import { useEffect, useState } from 'react';

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Application error:', error);
      setError(error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-center">
          <div className="w-16 h-16 mx-auto text-red-500">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return children;
}