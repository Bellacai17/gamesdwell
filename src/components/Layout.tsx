import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              GamesDwell
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600">
                Categories
              </Link>
              <Link href="/popular" className="text-gray-600 hover:text-blue-600">
                Popular
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About GamesDwell</h3>
              <p className="text-gray-600">
                Your one-stop destination for online gaming entertainment. Play a variety of games across different categories.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-blue-600">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/popular" className="text-gray-600 hover:text-blue-600">
                    Popular Games
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-600">
                Have questions or suggestions?<br />
                Email us at support@gamesdwell.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} GamesDwell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 