import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Starburst from './Starburst';

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
    <header className="bg-white/95 backdrop-blur-md border-b border-beige-dark sticky top-0 z-50">
      <nav className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
        <div className="flex justify-between items-center h-24">
          {/* Logo with Starburst */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 flex items-center justify-center">
              <Starburst color="teal" size="sm" className="group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="text-2xl font-heading font-black text-charcoal">
              {language === 'de' ? 'NEUE LISTE' : 'NEW LIST'}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-6 py-2.5 rounded-2xl font-heading font-medium transition-all ${
                isActive('/')
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-light hover:text-charcoal hover:bg-beige-light'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/candidates"
              className={`px-6 py-2.5 rounded-2xl font-heading font-medium transition-all ${
                isActive('/candidates')
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-light hover:text-charcoal hover:bg-beige-light'
              }`}
            >
              {t.nav.candidates}
            </Link>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl border-2 border-charcoal-light hover:border-charcoal transition-all"
            aria-label="Toggle language"
          >
            <GlobeAltIcon className="w-5 h-5 text-charcoal" />
            <span className="text-sm font-bold text-charcoal uppercase tracking-wider">
              {language}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;