import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';
import { faqsAPI, FAQ } from '../services/api';

const FAQPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await faqsAPI.getAll();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to load FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-32 bg-beige relative overflow-visible">
      {/* Decorative Starbursts */}
      <div className="absolute top-0 right-0 sm:top-20 sm:right-10 md:top-20 md:right-10 opacity-15 sm:opacity-20 animate-spin-slow pointer-events-none z-0">
        <Starburst color="teal" size="sm" className="sm:hidden" />
        <Starburst color="teal" size="md" className="hidden sm:block md:hidden" />
        <Starburst color="teal" size="lg" className="hidden md:block" />
      </div>
      <div className="absolute bottom-0 left-0 sm:bottom-20 sm:left-10 opacity-10 sm:opacity-15 animate-spin-slow pointer-events-none z-0">
        <Starburst color="purple" size="sm" className="sm:hidden" />
        <Starburst color="purple" size="md" className="hidden sm:block md:hidden" />
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="font-heading font-black text-6xl sm:text-7xl text-charcoal mb-6 tracking-tight">
            {language === 'de' ? 'FAQ' : 'FAQ'}
          </h1>
          <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
            {language === 'de'
              ? 'Häufig gestellte Fragen'
              : 'Frequently Asked Questions'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border-2 border-beige-dark hover:border-charcoal transition-all shadow-lg hover:shadow-xl"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="font-heading font-bold text-lg text-charcoal flex-1">
                    {language === 'de' ? faq.question_de : faq.question_en}
                  </h3>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-charcoal transition-transform duration-300 flex-shrink-0 ml-4 ${
                      expandedId === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <div className="px-6 pb-6 border-t-2 border-beige-light">
                    <p className="font-heading text-charcoal-light leading-relaxed">
                      {language === 'de' ? faq.answer_de : faq.answer_en}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
