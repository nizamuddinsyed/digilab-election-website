import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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

  const colorMap: { [key: string]: string } = {
    'purple': 'bg-purple',
    'silver': 'bg-silver',
    'teal': 'bg-teal'
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
            {language === 'de' ? 'Grundlegende Themen' : 'Basic Topics'}
          </h1>
          <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
            {language === 'de'
              ? 'Unsere grundlegenden Themen und Initiativen für eine bessere Zukunft'
              : 'Our basic topics and initiatives for a better future'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`${colorMap[topic.color]} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <h3 className="font-heading font-bold text-2xl mb-4">
                  {language === 'de' ? topic.title_de : topic.title_en}
                </h3>
                <p className="font-heading text-white/90 leading-relaxed">
                  {language === 'de' ? topic.description_de : topic.description_en}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicTopicsPage;
