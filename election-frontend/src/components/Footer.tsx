import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { EnvelopeIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-charcoal text-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Branding with Starburst */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                <Starburst color="purple" size="sm" className="text-purple-light" />
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl">
                {language === 'de' ? 'NEUE LISTE' : 'NEW LIST'}
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {language === 'de' 
                ? 'Miteinander - Füreinander. Unabhängig. Modern. Mutig.'
                : 'Together - For Each Other. Independent. Modern. Courageous.'}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium">
                  {language === 'de' ? 'Datum der Wahl: 26. November 2025' : 'Election Date: November 26, 2025'}
                </span>
              </div>
            </div>
          </div>

          {/* Compact Links */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-sm mb-3 uppercase tracking-wider text-gray-300">
              {t.footer.quickLinks}
            </h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t.nav.home}
              </Link>
              <Link to="/candidates" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t.nav.candidates}
              </Link>
              <Link to="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t.nav.admin}
              </Link>
            </div>
          </div>

          {/* Compact Contact */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-sm mb-3 uppercase tracking-wider text-gray-300">
              {t.footer.contact}
            </h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:neueliste@lsbg.hamburg.de" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <EnvelopeIcon className="w-4 h-4" />
                <span>neueliste@lsbg.hamburg.de</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>{language === 'de' ? 'Hamburg, Deutschland' : 'Hamburg, Germany'}</span>
              </div>
            </div>
          </div>

          {/* Removed Social Section */}
        </div>

        {/* Minimal Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 Neue Liste. {t.footer.copyright}</p>
          <div className="flex gap-6 text-xs">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link to="/legal" className="text-gray-500 hover:text-white transition-colors">{t.footer.legalNotice}</Link>
          </div>
        </div>

        {/* Dev Credits */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="bg-charcoal-light p-3 rounded-lg">
            <p className="text-gray-400 text-sm flex flex-col sm:flex-row items-center justify-center text-center">
              <span className="flex items-center">
                Crafted with 
                <span className="text-red-500 mx-2">♥</span> 
                in Digilab | LSBG by
              </span>
              <a href="https://www.linkedin.com/in/syed-nizam-uddin/" target="_blank" rel="noopener noreferrer" className="ml-0 sm:ml-1 mt-1 sm:mt-0 text-gray-400 hover:text-white transition-colors">
                Nizam Syed
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;