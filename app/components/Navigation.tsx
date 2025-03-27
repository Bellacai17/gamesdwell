'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '../lib/categories';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-primary/10 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-accent">GamesDwell</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-dark/50 border border-accent/20 rounded-lg focus:outline-none focus:border-accent text-light"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent hover:text-accent/80">
                🔍
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/categories" className="text-light hover:text-accent transition-colors">
              Categories
            </Link>
            <Link href="/latest" className="text-light hover:text-accent transition-colors">
              Latest
            </Link>
            <Link href="/popular" className="text-light hover:text-accent transition-colors">
              Popular
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-light hover:text-accent"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/categories"
              className="block px-3 py-2 text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/latest"
              className="block px-3 py-2 text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Latest
            </Link>
            <Link
              href="/popular"
              className="block px-3 py-2 text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Popular
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 