import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-charcoal text-white mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Branding with Starburst */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
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
            <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium">15. März 2025</span>
              </div>
            </div>
          </div>

          {/* Compact Links */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-gray-300">
              {t.footer.quickLinks}
            </h3>
            <div className="flex flex-col space-y-2.5">
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
            <h3 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-gray-300">
              {t.footer.contact}
            </h3>
            <div className="space-y-2.5 text-sm">
              <a href="mailto:info@election2025.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <EnvelopeIcon className="w-4 h-4" />
                <span>xxx@election2025.com</span>
              </a>
              <a href="tel:+491234567890" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <PhoneIcon className="w-4 h-4" />
                <span>+49 123 456 7890</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>Hamburg, Germany</span>
              </div>
            </div>
          </div>

          {/* Compact Social */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-gray-300">
              Social
            </h3>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center group">
                <div className="w-3 h-3 bg-gray-400 group-hover:bg-gray-900 rounded-full transition-colors"></div>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center group">
                <div className="w-3 h-3 bg-gray-400 group-hover:bg-gray-900 rounded-full transition-colors"></div>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center group">
                <div className="w-3 h-3 bg-gray-400 group-hover:bg-gray-900 rounded-full transition-colors"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 Election Candidates. {t.footer.copyright}</p>
          <div className="flex gap-6 text-xs">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link to="/legal" className="text-gray-500 hover:text-white transition-colors">{t.footer.legalNotice}</Link>
          </div>
        </div>

        {/* Dev Credits */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="bg-charcoal-light p-3 rounded-lg">
            <p className="text-yellow-400 text-sm sm:text-base flex items-center font-bold">
              Crafted with <span className="text-red-500 mx-2 text-lg">♥</span> in Digilab | LSBG by 
              <a href="http://nizamuddinsyed.github.io/" target="_blank" rel="noopener noreferrer" className="ml-1 text-yellow-400 hover:text-white transition-colors underline font-bold">
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