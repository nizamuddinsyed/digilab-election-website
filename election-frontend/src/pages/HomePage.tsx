import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { ArrowRightIcon, UserIcon, ChartBarIcon, LightBulbIcon, ChatBubbleLeftRightIcon, CalendarIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await candidatesAPI.getAll(true);
      setCandidates(data);
      setStats({
        total: data.length,
        active: data.filter((c: Candidate) => c.is_active).length
      });
    } catch (error) {
      console.error('Failed to load candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (photoUrl: string) => {
    // Cloudinary returns full URLs, just return as-is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Fallback for old local uploads
    return `${window.location.origin}${photoUrl}`;
  };

  // Features data
  const features = [
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: t.features.feature1Title,
      description: t.features.feature1Description
    },
    {
      icon: <LightBulbIcon className="w-8 h-8" />,
      title: t.features.feature2Title,
      description: t.features.feature2Description
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: t.features.feature3Title,
      description: t.features.feature3Description
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Ultra-Clean Hero Section - Inspired by Premium Sites */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-gray-200 to-gray-100 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10 py-32">
          {/* Main Content - Centered */}
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="tracking-wide">
                {language === 'de' ? 'WAHL 2025' : 'ELECTION 2025'}
              </span>
            </div>

            {/* Massive Bold Heading */}
            <div className="space-y-8">
              <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tighter">
                <span className="block text-gray-900">
                  {language === 'de' ? 'Treffen Sie' : 'Meet the'}
                </span>
                <span className="block mt-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {language === 'de' ? 'die Kandidaten' : 'Candidates'}
                </span>
              </h1>
            </div>

            {/* Clean Description */}
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {language === 'de'
                ? 'Entdecken Sie visionäre Führungspersönlichkeiten, die sich für eine bessere Zukunft einsetzen.'
                : 'Discover visionary leaders committed to building a better future for all.'}
            </p>

            {/* Minimalist CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-12">
              <Link
                to="/candidates"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">{t.hero.viewCandidates}</span>
                <ArrowRightIcon className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <a
                href="#features"
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
              >
                <span>{t.hero.learnMore}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Minimal Design */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="font-heading font-black text-5xl sm:text-6xl text-gray-900 mb-6 tracking-tight">
                {t.features.whyParticipate}
              </h2>
              <p className="font-body text-xl text-gray-500 max-w-3xl mx-auto font-light">
                {t.features.whyParticipateSubtitle}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group text-center space-y-6 transition-all duration-500 hover:scale-105"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gray-900 text-white flex items-center justify-center mb-6 mx-auto group-hover:bg-gray-800 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="font-body text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Preview Section - Premium Design */}
      <section id="candidates" className="py-32 bg-gray-50">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="font-heading font-black text-5xl sm:text-6xl text-gray-900 mb-6 tracking-tight">
                {t.candidates.title}
              </h2>
              <p className="font-body text-xl text-gray-500 max-w-3xl mx-auto font-light">
                {t.candidates.subtitle}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : candidates.length === 0 ? (
              <div className="text-center py-32">
                <UserIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-500 font-body text-lg">{t.candidates.noCandidates}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {candidates.slice(0, 4).map((candidate) => (
                  <Link
                    key={candidate.id}
                    to={`/candidates/${candidate.id}`}
                    className="group bg-white rounded-3xl overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={getPhotoUrl(candidate.photo_url)}
                        alt={candidate.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="font-heading font-bold text-xl text-gray-900">
                        {candidate.name}
                      </h3>
                      <p className="font-body text-gray-600 font-medium">
                        {candidate.position}
                      </p>
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white uppercase tracking-wide">
                          {t.candidates.active}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {candidates.length > 4 && (
              <div className="text-center mt-16">
                <Link
                  to="/candidates"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span>{t.hero.viewCandidates}</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;