import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DocumentTextIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const LegalNoticePage: React.FC = () => {
  const { language } = useLanguage();

  const contentDE = {
    title: 'Impressum',
    lastUpdated: 'Stand: November 2025',
    sections: [
      {
        title: 'Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV',
        content: 'Neue Liste\nVertreten durch: Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg\nDeutschland'
      },
      {
        title: 'Kontakt',
        content: 'Telefon: 040 42826 2624\nE-Mail: neueliste@lsbg.hamburg.de'
      },
      {
        title: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
        content: 'Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg'
      },
      {
        title: 'Hinweis zur Verantwortlichkeit',
        content: 'Diese Website dient der Information über die Personalratswahl und die Ziele der Liste Neue Liste im Landesbetrieb Straßen, Brücken und Gewässer Hamburg (LSBG).\nSie verfolgt keine kommerziellen Zwecke.'
      }
    ]
  };

  const contentEN = {
    title: 'Legal Notice',
    lastUpdated: 'As of: November 2025',
    sections: [
      {
        title: 'Information according to § 5 TMG and § 18 Abs. 2 MStV',
        content: 'Neue Liste\nRepresented by: Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg\nGermany'
      },
      {
        title: 'Contact',
        content: 'Phone: 040 42826 2624\nEmail: neueliste@lsbg.hamburg.de'
      },
      {
        title: 'Responsible for Content according to § 18 Abs. 2 MStV',
        content: 'Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg'
      },
      {
        title: 'Note on Responsibility',
        content: 'This website serves to inform about the works council election and the goals of the Neue Liste in the Hamburg State Authority for Roads, Bridges and Waterways (LSBG).\nIt does not pursue commercial purposes.'
      }
    ]
  };

  const content = language === 'de' ? contentDE : contentEN;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <DocumentTextIcon className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="font-heading font-black text-5xl sm:text-6xl mb-4">
              {content.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {content.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {content.sections.map((section, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-12 last:border-0">
              <h2 className="font-heading font-black text-3xl text-gray-900 mb-6">
                {section.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}

          {/* Contact Card */}
          <div className="bg-gray-50 rounded-3xl p-10 border-2 border-gray-100 mt-16">
            <h2 className="font-heading font-black text-2xl text-gray-900 mb-6">
              {language === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <EnvelopeIcon className="w-5 h-5 text-gray-900" />
                <a href="mailto:neueliste@lsbg.hamburg.de" className="hover:text-gray-900 transition-colors">
                  neueliste@lsbg.hamburg.de
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <PhoneIcon className="w-5 h-5 text-gray-900" />
                <a href="tel:040428262624" className="hover:text-gray-900 transition-colors">
                  040 42826 2624
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPinIcon className="w-5 h-5 text-gray-900" />
                <span>Sachsenfeld 3–5, 20097 Hamburg, {language === 'de' ? 'Deutschland' : 'Germany'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;