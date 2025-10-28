import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DocumentTextIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const LegalNoticePage: React.FC = () => {
  const { language } = useLanguage();

  const contentDE = {
    title: 'Impressum',
    lastUpdated: 'Stand: Januar 2025',
    sections: [
      {
        title: 'Angaben gemäß § 5 TMG',
        content: 'Election Candidates 2025\nMusterstraße 123\n10115 Berlin\nDeutschland'
      },
      {
        title: 'Kontakt',
        content: 'Telefon: +49 123 456 7890\nE-Mail: info@election2025.com'
      },
      {
        title: 'Vertreten durch',
        content: 'Max Mustermann\nWahlleiter Election 2025'
      },
      {
        title: 'Urheberrecht - Kandidatenfotos',
        content: 'Alle auf dieser Website verwendeten Fotografien von Kandidaten sind urheberrechtlich geschützt. Die Rechte an den Bildern liegen bei den jeweiligen Kandidaten oder deren Fotografen. Die Verwendung der Bilder erfolgt mit ausdrücklicher Genehmigung der abgebildeten Personen ausschließlich zum Zweck der Wahlkampfinformation.\n\nEine Weiterverwendung der Kandidatenfotos ohne Genehmigung ist nicht gestattet.'
      },
      {
        title: 'Haftung für Inhalte',
        content: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.'
      },
      {
        title: 'Haftung für Links',
        content: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
      },
      {
        title: 'Urheberrecht',
        content: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
      }
    ]
  };

  const contentEN = {
    title: 'Legal Notice',
    lastUpdated: 'As of: January 2025',
    sections: [
      {
        title: 'Information according to § 5 TMG',
        content: 'Election Candidates 2025\nMusterstraße 123\n10115 Berlin\nGermany'
      },
      {
        title: 'Contact',
        content: 'Phone: +49 123 456 7890\nEmail: info@election2025.com'
      },
      {
        title: 'Represented by',
        content: 'Max Mustermann\nElection Director 2025'
      },
      {
        title: 'Copyright - Candidate Photos',
        content: 'All photographs of candidates used on this website are protected by copyright. The rights to the images belong to the respective candidates or their photographers. The use of the images is done with the express permission of the depicted persons exclusively for the purpose of election campaign information.\n\nFurther use of candidate photos without permission is not permitted.'
      },
      {
        title: 'Liability for Content',
        content: 'As a service provider, we are responsible for our own content on these pages in accordance with general laws under § 7 para.1 TMG. However, according to §§ 8 to 10 TMG, we as a service provider are not obligated to monitor transmitted or stored third-party information.'
      },
      {
        title: 'Liability for Links',
        content: 'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.'
      },
      {
        title: 'Copyright',
        content: 'The content and works created by the site operators on these pages are subject to German copyright law. The duplication, processing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.'
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
                <a href="mailto:info@election2025.com" className="hover:text-gray-900 transition-colors">
                  info@election2025.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <PhoneIcon className="w-5 h-5 text-gray-900" />
                <a href="tel:+491234567890" className="hover:text-gray-900 transition-colors">
                  +49 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPinIcon className="w-5 h-5 text-gray-900" />
                <span>Musterstraße 123, 10115 Berlin, {language === 'de' ? 'Deutschland' : 'Germany'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
