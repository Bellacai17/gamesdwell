import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full p-6 bg-primary/10 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-light mb-4">Page Not Found</h2>
        <p className="text-light/80 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
} 