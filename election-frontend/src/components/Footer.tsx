import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-charcoal text-white mt-32">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Branding with Starburst */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <Starburst color="purple" size="sm" className="text-purple-light" />
              </div>
              <h3 className="font-heading font-black text-xl">
                {language === 'de' ? 'NEUE LISTE' : 'NEW LIST'}
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {language === 'de' 
                ? 'Miteinander - Füreinander. Unabhängig. Modern. Mutig.'
                : 'Together - For Each Other. Independent. Modern. Courageous.'}
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
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
                <span>info@election2025.com</span>
              </a>
              <a href="tel:+491234567890" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <PhoneIcon className="w-4 h-4" />
                <span>+49 123 456 7890</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>Berlin, Germany</span>
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
      </div>
    </footer>
  );
};

export default Footer;