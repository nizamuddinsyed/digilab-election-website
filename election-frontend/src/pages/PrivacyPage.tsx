import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();

  const contentDE = {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Stand: November 2025',
    sections: [
      {
        title: '1. Verantwortlicher',
        subsections: [
          {
            subtitle: 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)',
            content: 'Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:\n\nNeue Liste\nVertreten durch: Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg\nE-Mail: neueliste@lsbg.hamburg.de\nTelefon: 040 42826 2624'
          }
        ]
      },
      {
        title: '2. Erhebung und Speicherung personenbezogener Daten',
        subsections: [
          {
            subtitle: 'Technische Daten',
            content: 'Beim Besuch dieser Website werden keine personenbezogenen Daten gespeichert, außer technisch notwendigen Informationen, die Ihr Browser automatisch übermittelt (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, verwendeter Browser).\n\nDiese Daten werden ausschließlich zur Sicherstellung des Betriebs der Website verwendet und nicht an Dritte weitergegeben.'
          }
        ]
      },
      {
        title: '3. Kontaktaufnahme',
        subsections: [
          {
            subtitle: 'E-Mail-Kontakt',
            content: 'Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben aus der E-Mail zum Zwecke der Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert.\n\nDiese Daten werden ohne Ihre Einwilligung nicht weitergegeben.'
          }
        ]
      },
      {
        title: '4. Cookies / Analysetools / Social Media',
        subsections: [
          {
            subtitle: 'Keine Tracking-Tools',
            content: 'Auf dieser Website werden keine Cookies, keine Tracking- oder Analysetools (wie Google Analytics) und keine Social-Media-Plugins eingesetzt.'
          }
        ]
      },
      {
        title: '5. Ihre Rechte',
        subsections: [
          {
            subtitle: 'Betroffenenrechte gemäß DSGVO',
            content: 'Sie haben das Recht auf:\n• Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)\n• Berichtigung unrichtiger Daten (Art. 16 DSGVO)\n• Löschung Ihrer Daten (Art. 17 DSGVO)\n• Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n• Datenübertragbarkeit (Art. 20 DSGVO)\n\nZudem haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren.\nIn Hamburg ist dies der:\n\nHamburgische Beauftragte für Datenschutz und Informationsfreiheit\nLudwig-Erhard-Str. 22, 20459 Hamburg\nwww.datenschutz-hamburg.de'
          }
        ]
      },
      {
        title: '6. SSL-Verschlüsselung',
        subsections: [
          {
            subtitle: 'Sichere Datenübertragung',
            content: 'Diese Website verwendet zum Schutz der Übertragung vertraulicher Inhalte (z. B. bei Kontaktaufnahme per Formular oder E-Mail) eine SSL-Verschlüsselung.'
          }
        ]
      },
      {
        title: '7. Aktualität und Änderung dieser Datenschutzerklärung',
        subsections: [
          {
            subtitle: 'Gültigkeit',
            content: 'Diese Datenschutzerklärung ist aktuell gültig (Stand: November 2025).\nSie kann an technische oder rechtliche Änderungen angepasst werden.'
          }
        ]
      }
    ],
    contact: {
      title: 'Kontakt bei Datenschutzfragen',
      content: 'Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:\n\nE-Mail: neueliste@lsbg.hamburg.de\nTelefon: 040 42826 2624'
    }
  };

  const contentEN = {
    title: 'Privacy Policy',
    lastUpdated: 'As of: November 2025',
    sections: [
      {
        title: '1. Controller',
        subsections: [
          {
            subtitle: 'Controller in accordance with the General Data Protection Regulation (GDPR)',
            content: 'The controller in accordance with the General Data Protection Regulation (GDPR) is:\n\nNeue Liste\nRepresented by: Shafi Sediqi\nSachsenfeld 3–5\n20097 Hamburg\nEmail: neueliste@lsbg.hamburg.de\nPhone: 040 42826 2624'
          }
        ]
      },
      {
        title: '2. Collection and Storage of Personal Data',
        subsections: [
          {
            subtitle: 'Technical Data',
            content: 'When visiting this website, no personal data is stored, except for technically necessary information that your browser automatically transmits (e.g., IP address, date and time of access, browser used).\n\nThis data is used exclusively to ensure the operation of the website and is not passed on to third parties.'
          }
        ]
      },
      {
        title: '3. Contact',
        subsections: [
          {
            subtitle: 'Email Contact',
            content: 'If you contact us by email, your information from the email will be stored for the purpose of processing the inquiry and in case of follow-up questions.\n\nThis data will not be passed on without your consent.'
          }
        ]
      },
      {
        title: '4. Cookies / Analytics Tools / Social Media',
        subsections: [
          {
            subtitle: 'No Tracking Tools',
            content: 'This website does not use cookies, tracking or analytics tools (such as Google Analytics) or social media plugins.'
          }
        ]
      },
      {
        title: '5. Your Rights',
        subsections: [
          {
            subtitle: 'Data Subject Rights under GDPR',
            content: 'You have the right to:\n• Information about your stored personal data (Art. 15 GDPR)\n• Rectification of incorrect data (Art. 16 GDPR)\n• Deletion of your data (Art. 17 GDPR)\n• Restriction of processing (Art. 18 GDPR)\n• Objection to processing (Art. 21 GDPR)\n• Data portability (Art. 20 GDPR)\n\nFurthermore, you have the right to lodge a complaint with a supervisory authority.\nIn Hamburg, this is:\n\nHamburgische Beauftragte für Datenschutz und Informationsfreiheit\nLudwig-Erhard-Str. 22, 20459 Hamburg\nwww.datenschutz-hamburg.de'
          }
        ]
      },
      {
        title: '6. SSL Encryption',
        subsections: [
          {
            subtitle: 'Secure Data Transmission',
            content: 'This website uses SSL encryption to protect the transmission of confidential content (e.g., when contacting via form or email).'
          }
        ]
      },
      {
        title: '7. Currency and Amendment of this Privacy Policy',
        subsections: [
          {
            subtitle: 'Validity',
            content: 'This privacy policy is currently valid (as of: November 2025).\nIt may be adapted to technical or legal changes.'
          }
        ]
      }
    ],
    contact: {
      title: 'Contact for Privacy Questions',
      content: 'If you have any questions about data protection, you can contact us at any time:\n\nEmail: neueliste@lsbg.hamburg.de\nPhone: 040 42826 2624'
    }
  };

  const content = language === 'de' ? contentDE : contentEN;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6 text-white" />
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
        <div className="max-w-4xl mx-auto">
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="font-heading font-black text-3xl text-gray-900 mb-8">
                {section.title}
              </h2>
              {section.subsections.map((subsection, subIdx) => (
                <div key={subIdx} className="mb-8">
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                    {subsection.subtitle}
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {subsection.content}
                  </p>
                </div>
              ))}
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-3xl p-10 border-2 border-gray-100 mt-16">
            <div className="flex items-center gap-3 mb-6">
              <EnvelopeIcon className="w-8 h-8 text-gray-900" />
              <h2 className="font-heading font-black text-2xl text-gray-900">
                {content.contact.title}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content.contact.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;