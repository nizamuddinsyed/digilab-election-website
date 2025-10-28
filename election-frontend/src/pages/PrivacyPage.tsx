import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();

  const contentDE = {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
    sections: [
      {
        title: '1. Datenschutz auf einen Blick',
        subsections: [
          {
            subtitle: 'Allgemeine Hinweise',
            content: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.'
          },
          {
            subtitle: 'Datenerfassung auf dieser Website',
            content: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.'
          },
          {
            subtitle: 'Wie erfassen wir Ihre Daten?',
            content: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).'
          }
        ]
      },
      {
        title: '2. Hosting',
        subsections: [
          {
            subtitle: 'Externes Hosting',
            content: 'Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.'
          }
        ]
      },
      {
        title: '3. Allgemeine Hinweise und Pflichtinformationen',
        subsections: [
          {
            subtitle: 'Datenschutz',
            content: 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.'
          },
          {
            subtitle: 'Hinweis zur verantwortlichen Stelle',
            content: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nElection Candidates 2025\nMusterstraße 123\n10115 Berlin, Deutschland\n\nTelefon: +49 123 456 7890\nE-Mail: info@election2025.com\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o.Ä.) entscheidet.'
          },
          {
            subtitle: 'Speicherdauer',
            content: 'Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.'
          }
        ]
      },
      {
        title: '4. Datenerfassung auf dieser Website',
        subsections: [
          {
            subtitle: 'Server-Log-Dateien',
            content: 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n\n• Browsertyp und Browserversion\n• verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.'
          },
          {
            subtitle: 'Kontaktformular',
            content: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'
          },
          {
            subtitle: 'Anfrage per E-Mail, Telefon oder Telefax',
            content: 'Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'
          }
        ]
      },
      {
        title: '5. Kandidaten-Fotos und persönliche Informationen',
        subsections: [
          {
            subtitle: 'Veröffentlichung von Kandidatendaten',
            content: 'Auf dieser Website werden Fotos, Namen, biografische Informationen und politische Positionen von Wahlkandidaten veröffentlicht. Diese Daten werden ausschließlich zum Zweck der öffentlichen Information im Rahmen des demokratischen Wahlprozesses verwendet.'
          },
          {
            subtitle: 'Rechtsgrundlage',
            content: 'Die Veröffentlichung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. e DSGVO (öffentliches Interesse) in Verbindung mit den entsprechenden Wahlgesetzen. Kandidaten haben der Veröffentlichung ihrer Daten ausdrücklich zugestimmt.'
          },
          {
            subtitle: 'Bildrechte',
            content: 'Alle auf dieser Website verwendeten Kandidatenfotos werden mit ausdrücklicher Genehmigung der abgebildeten Personen verwendet. Die Rechte an den Bildern verbleiben bei den jeweiligen Kandidaten oder deren Fotografen.'
          }
        ]
      },
      {
        title: '6. Ihre Rechte',
        subsections: [
          {
            subtitle: 'Auskunftsrecht',
            content: 'Sie haben das Recht, jederzeit unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.'
          },
          {
            subtitle: 'Weitere Rechte',
            content: 'Sie haben zudem das Recht auf:\n\n• Berichtigung unrichtiger Daten (Art. 16 DSGVO)\n• Löschung Ihrer Daten (Art. 17 DSGVO)\n• Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Datenübertragbarkeit (Art. 20 DSGVO)\n• Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n• Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)'
          }
        ]
      },
      {
        title: '7. Widerspruchs- und Widerrufsrecht',
        subsections: [
          {
            subtitle: 'Widerrufsrecht',
            content: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.'
          },
          {
            subtitle: 'Widerspruchsrecht',
            content: 'Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen verarbeitet werden, haben Sie das Recht, Widerspruch gegen die Verarbeitung einzulegen. Nutzen Sie hierfür bitte die im Impressum angegebenen Kontaktdaten.'
          }
        ]
      },
      {
        title: '8. SSL- bzw. TLS-Verschlüsselung',
        subsections: [
          {
            subtitle: 'Sichere Datenübertragung',
            content: 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.'
          }
        ]
      }
    ],
    contact: {
      title: 'Kontakt bei Datenschutzfragen',
      content: 'Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:\n\nE-Mail: datenschutz@election2025.com\nTelefon: +49 123 456 7890'
    }
  };

  const contentEN = {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2025',
    sections: [
      {
        title: '1. Privacy at a Glance',
        subsections: [
          {
            subtitle: 'General Information',
            content: 'The following notices provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can personally identify you.'
          },
          {
            subtitle: 'Data Collection on This Website',
            content: 'Data processing on this website is carried out by the website operator. You can find their contact details in the "Notice on the Responsible Party" section of this privacy policy.'
          },
          {
            subtitle: 'How Do We Collect Your Data?',
            content: 'Your data is collected when you provide it to us, for example by entering it into a contact form. Other data is collected automatically or with your consent when you visit the website through our IT systems. This primarily includes technical data (e.g., internet browser, operating system, or time of page access).'
          }
        ]
      },
      {
        title: '2. Hosting',
        subsections: [
          {
            subtitle: 'External Hosting',
            content: 'This website is hosted by an external service provider (host). The personal data collected on this website is stored on the host\'s servers. This may include IP addresses, contact requests, metadata and communication data, contract data, contact details, names, website access, and other data generated through a website.'
          }
        ]
      },
      {
        title: '3. General Information and Mandatory Information',
        subsections: [
          {
            subtitle: 'Data Protection',
            content: 'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with legal data protection regulations and this privacy policy. When you use this website, various personal data is collected.'
          },
          {
            subtitle: 'Notice on the Responsible Party',
            content: 'The responsible party for data processing on this website is:\n\nElection Candidates 2025\nMusterstraße 123\n10115 Berlin, Germany\n\nPhone: +49 123 456 7890\nEmail: info@election2025.com\n\nThe responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data (e.g., names, email addresses, etc.).'
          },
          {
            subtitle: 'Storage Duration',
            content: 'Unless a more specific storage period is mentioned within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent for data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data.'
          }
        ]
      },
      {
        title: '4. Data Collection on This Website',
        subsections: [
          {
            subtitle: 'Server Log Files',
            content: 'The page provider automatically collects and stores information in server log files that your browser automatically transmits to us. These include:\n\n• Browser type and version\n• Operating system used\n• Referrer URL\n• Hostname of the accessing computer\n• Time of server request\n• IP address\n\nThis data is not combined with other data sources. Data collection is based on Art. 6 para. 1 lit. f GDPR.'
          },
          {
            subtitle: 'Contact Form',
            content: 'If you send us inquiries via the contact form, your information from the inquiry form, including the contact details you provided, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent.'
          },
          {
            subtitle: 'Inquiry via Email, Phone, or Fax',
            content: 'If you contact us by email, phone, or fax, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of handling your request. We do not share this data without your consent.'
          }
        ]
      },
      {
        title: '5. Candidate Photos and Personal Information',
        subsections: [
          {
            subtitle: 'Publication of Candidate Data',
            content: 'This website publishes photos, names, biographical information, and political positions of election candidates. This data is used exclusively for the purpose of public information as part of the democratic election process.'
          },
          {
            subtitle: 'Legal Basis',
            content: 'Publication is based on Art. 6 para. 1 lit. e GDPR (public interest) in conjunction with the relevant election laws. Candidates have expressly consented to the publication of their data.'
          },
          {
            subtitle: 'Image Rights',
            content: 'All candidate photos used on this website are used with the express permission of the depicted persons. The rights to the images remain with the respective candidates or their photographers.'
          }
        ]
      },
      {
        title: '6. Your Rights',
        subsections: [
          {
            subtitle: 'Right to Information',
            content: 'You have the right to receive free information at any time about the origin, recipient, and purpose of your stored personal data.'
          },
          {
            subtitle: 'Additional Rights',
            content: 'You also have the right to:\n\n• Rectification of incorrect data (Art. 16 GDPR)\n• Deletion of your data (Art. 17 GDPR)\n• Restriction of processing (Art. 18 GDPR)\n• Data portability (Art. 20 GDPR)\n• Object to processing (Art. 21 GDPR)\n• Lodge a complaint with a supervisory authority (Art. 77 GDPR)'
          }
        ]
      },
      {
        title: '7. Right to Object and Revoke',
        subsections: [
          {
            subtitle: 'Right to Revoke',
            content: 'Many data processing operations are only possible with your express consent. You can revoke consent already given at any time. The legality of data processing carried out until revocation remains unaffected by the revocation.'
          },
          {
            subtitle: 'Right to Object',
            content: 'If your personal data is processed on the basis of legitimate interests, you have the right to object to the processing. Please use the contact details provided in the legal notice for this purpose.'
          }
        ]
      },
      {
        title: '8. SSL/TLS Encryption',
        subsections: [
          {
            subtitle: 'Secure Data Transmission',
            content: 'For security reasons and to protect the transmission of confidential content, this site uses SSL or TLS encryption. You can recognize an encrypted connection by the address bar changing from "http://" to "https://" and by the lock symbol in your browser line.'
          }
        ]
      }
    ],
    contact: {
      title: 'Contact for Privacy Questions',
      content: 'If you have any questions about data protection, you can contact us at any time:\n\nEmail: datenschutz@election2025.com\nPhone: +49 123 456 7890'
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
