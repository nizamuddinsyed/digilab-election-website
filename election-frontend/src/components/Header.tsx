import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Starburst from './Starburst';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/candidates', label: t.nav.candidates },
    { to: '/main-goals', label: t.nav.mainGoals },
    { to: '/basic-topics', label: t.nav.basicTopics },
    { to: '/faq', label: t.nav.faq },
    { to: '/events', label: t.nav.events },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-beige-dark sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo with Starburst */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
              <Starburst color="teal" size="sm" className="group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="text-xl sm:text-2xl font-heading font-black text-charcoal whitespace-nowrap">
              {language === 'de' ? 'NEUE LISTE' : 'NEW LIST'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl font-heading font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                  isActive(link.to)
                    ? 'bg-charcoal text-white'
                    : 'text-charcoal-light hover:text-charcoal hover:bg-beige-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side controls - Mobile menu button and Language Switcher */}
          <div className="flex items-center">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 border-charcoal-light hover:border-charcoal transition-all mr-2"
              aria-label="Toggle language"
            >
              <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
              <span className="text-xs sm:text-sm font-bold text-charcoal uppercase tracking-wider">
                {language}
              </span>
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-charcoal hover:bg-beige-light"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
              
              {/* Language Switcher for mobile */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-2 py-2 rounded-lg border border-charcoal-light hover:border-charcoal transition-all ml-2"
                aria-label="Toggle language"
              >
                <GlobeAltIcon className="w-4 h-4 text-charcoal" />
                <span className="text-xs font-bold text-charcoal uppercase">
                  {language}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-beige-dark absolute top-full left-0 right-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-heading font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-charcoal text-white'
                      : 'text-charcoal-light hover:text-charcoal hover:bg-beige-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;