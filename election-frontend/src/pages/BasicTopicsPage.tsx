import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';
import { basicTopicsAPI } from '../services/api';

interface BasicTopic {
  id: number;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  color: 'purple' | 'silver' | 'teal';
}

const BasicTopicsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [topics, setTopics] = useState<BasicTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await basicTopicsAPI.getAll();
      setTopics(data);
    } catch (error) {
      console.error('Failed to load basic topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (id: number) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  const colorMap: { [key: string]: string } = {
    'purple': 'bg-purple',
    'silver': 'bg-silver',
    'teal': 'bg-teal'
  };

  const borderColorMap: { [key: string]: string } = {
    'purple': 'border-purple',
    'silver': 'border-silver',
    'teal': 'border-teal'
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
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-charcoal mb-6 tracking-tight">
            {language === 'de' ? 'Unsere Themen-Schwerpunkte' : 'Our Key Topics'}
          </h1>
          <p className="font-heading text-lg sm:text-xl text-charcoal-light max-w-4xl mx-auto whitespace-pre-line">
            {language === 'de'
              ? 'Unsere Themenschwerpunkte zeigen, worauf wir den Fokus legen:\nmoderne Arbeitszeiten, faire Entwicklungsmöglichkeiten und wirksamer Schutz vor Diskriminierung\n– transparent, beteiligungsorientiert und nah an eurem Arbeitsalltag.'
              : 'Our key topics show where we focus our efforts:\nmodern working hours, fair development opportunities, and effective protection against discrimination\n– transparent, participatory, and close to your daily work life.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`bg-white rounded-2xl border-2 ${borderColorMap[topic.color]} shadow-lg overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full flex items-center justify-between p-6 text-left ${colorMap[topic.color]} text-white`}
                >
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">
                    {language === 'de' ? topic.title_de : topic.title_en}
                  </h3>
                  {expandedTopic === topic.id ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </button>
                
                {expandedTopic === topic.id && (
                  <div className="p-6 bg-white">
                    <p className="font-heading text-charcoal-light leading-relaxed whitespace-pre-line">
                      {language === 'de' ? topic.description_de : topic.description_en}
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

export default BasicTopicsPage;