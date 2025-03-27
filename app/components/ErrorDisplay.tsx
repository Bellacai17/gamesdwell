'use client';

import { useEffect } from 'react';

interface ErrorDisplayProps {
  error: Error;
  reset: () => void;
}

export default function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full p-6 bg-primary/10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-light mb-4">Something went wrong!</h2>
        <p className="text-light/80 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 