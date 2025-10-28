import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Minimal */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <span className="text-white font-heading font-black text-xl">E</span>
            </div>
            <span className="text-2xl font-heading font-black text-gray-900">
              Election 2025
            </span>
          </Link>

          {/* Navigation Links - Clean */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-6 py-2.5 rounded-full font-body font-medium transition-all ${
                isActive('/')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/candidates"
              className={`px-6 py-2.5 rounded-full font-body font-medium transition-all ${
                isActive('/candidates')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {t.nav.candidates}
            </Link>
          </div>

          {/* Language Switcher - Minimal */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
            aria-label="Toggle language"
          >
            <GlobeAltIcon className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {language}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;