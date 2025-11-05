import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';
import { policiesAPI, Policy } from '../services/api';

const MainGoalsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const data = await policiesAPI.getAll();
      setPolicies(data);
    } catch (error) {
      console.error('Failed to load policies:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePolicy = (id: number) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
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
        <Starburst color="purple" size="sm" className="sm:hidden" />
        <Starburst color="purple" size="md" className="hidden sm:block md:hidden" />
        <Starburst color="purple" size="lg" className="hidden md:block" />
      </div>
      <div className="absolute bottom-0 left-0 sm:bottom-20 sm:left-10 opacity-10 sm:opacity-15 animate-spin-slow pointer-events-none z-0">
        <Starburst color="teal" size="sm" className="sm:hidden" />
        <Starburst color="teal" size="md" className="hidden sm:block md:hidden" />
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-charcoal mb-6 tracking-tight">
            {language === 'de' ? 'Unsere 5 Hauptziele' : 'Our 5 Main Goals'}
          </h1>
          <p className="font-heading text-lg sm:text-xl text-charcoal-light max-w-4xl mx-auto whitespace-pre-line">
            {language === 'de'
              ? 'Unsere fünf Ziele zeigen, wohin wir wollen:\ntransparentere PR-Arbeit, faire Rahmenbedingungen und wirksamer Schutz vor Diskriminierung.\nSie sind klar formuliert, auf euren Arbeitsalltag bezogen – und an ihnen könnt ihr uns messen.\nSchaut rein und gebt uns gern Rückmeldung.'
              : 'Our five goals show where we want to go:\nmore transparent PR work, fair conditions, and effective protection against discrimination.\nThey are clearly formulated, related to your daily work - and you can measure us by them.\nTake a look and feel free to give us feedback.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className={`bg-white rounded-2xl border-2 ${borderColorMap[policy.color]} shadow-lg overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => togglePolicy(policy.id)}
                  className={`w-full flex items-center justify-between p-6 text-left ${colorMap[policy.color]} text-white`}
                >
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">
                    {language === 'de' ? policy.title_de : policy.title_en}
                  </h3>
                  {expandedPolicy === policy.id ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </button>
                
                {expandedPolicy === policy.id && (
                  <div className="p-6 bg-white">
                    <p className="font-heading text-charcoal-light leading-relaxed whitespace-pre-line">
                      {language === 'de' ? policy.description_de : policy.description_en}
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

export default MainGoalsPage;