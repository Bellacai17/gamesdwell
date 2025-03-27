import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-title text-gradient mb-4">GamesDwell</h3>
            <p className="text-text-tertiary">
              Your ultimate destination for online gaming entertainment.
            </p>
          </div>
          
          <div>
            <h4 className="font-tech text-accent mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/action" className="text-text-secondary hover:text-accent transition-colors">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/category/puzzle" className="text-text-secondary hover:text-accent transition-colors">
                  Puzzle Games
                </Link>
              </li>
              <li>
                <Link href="/category/strategy" className="text-text-secondary hover:text-accent transition-colors">
                  Strategy Games
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-tech text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-tech text-accent mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-text-tertiary">
          <p>&copy; {new Date().getFullYear()} GamesDwell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}