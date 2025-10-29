import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { ArrowRightIcon, UserIcon, ChartBarIcon, LightBulbIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';

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
    <div className="min-h-screen bg-beige">
      {/* Hero Section - Poster Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible">
        {/* Decorative Starbursts - Responsive sizing and positioning */}
        <div className="absolute top-0 right-0 sm:top-10 sm:right-10 lg:top-20 lg:right-20 opacity-50 sm:opacity-60 animate-spin-slow pointer-events-none z-0">
          <Starburst color="purple" size="sm" className="sm:hidden" />
          <Starburst color="purple" size="md" className="hidden sm:block lg:hidden" />
          <Starburst color="purple" size="xl" className="hidden lg:block" />
        </div>
        <div className="absolute bottom-0 left-0 sm:bottom-10 sm:left-10 lg:bottom-32 lg:left-20 opacity-40 sm:opacity-50 animate-spin-slow animation-delay-2000 pointer-events-none z-0">
          <Starburst color="teal" size="sm" className="sm:hidden" />
          <Starburst color="teal" size="md" className="hidden sm:block lg:hidden" />
          <Starburst color="teal" size="lg" className="hidden lg:block" />
        </div>
        
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10 py-32">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* Animated ELECTION 2025 Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple via-teal to-silver text-white text-sm font-bold uppercase tracking-wider animate-pulse shadow-lg">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span>{language === 'de' ? 'WAHL 2025' : 'ELECTION 2025'}</span>
            </div>

            {/* Heading - Poster Style */}
            <div className="space-y-6">
              <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-charcoal">
                {language === 'de' ? 'NEUE LISTE' : 'NEW LIST'}
              </h1>
              <p className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal-light">
                {language === 'de' ? 'Deine Stimme im LSBG' : 'Your Voice in LSBG'}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-charcoal-light max-w-3xl mx-auto leading-relaxed font-medium">
              {language === 'de'
                ? 'Miteinander - Füreinander. Es ist Zeit für eine Veränderung.'
                : 'Together - For Each Other. It\'s Time for Change.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-12">
              <Link
                to="/candidates"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">{t.hero.viewCandidates}</span>
                <ArrowRightIcon className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <a
                href="#features"
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-charcoal font-bold rounded-2xl border-2 border-charcoal-light hover:border-charcoal transition-all"
              >
                <span>{t.hero.learnMore}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="font-heading font-black text-5xl sm:text-6xl text-charcoal mb-6 tracking-tight">
                {t.features.whyParticipate}
              </h2>
              <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
                {t.features.whyParticipateSubtitle}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {features.map((feature, index) => {
                // Alternate between purple, teal, and silver
                const colors = [
                  { bg: 'bg-purple', hover: 'group-hover:bg-purple/90' },
                  { bg: 'bg-teal', hover: 'group-hover:bg-teal/90' },
                  { bg: 'bg-silver', hover: 'group-hover:bg-silver/90' }
                ];
                const color = colors[index % 3];
                
                return (
                  <div 
                    key={index} 
                    className="group text-center space-y-6 transition-all duration-500 hover:scale-105"
                  >
                    <div className={`w-20 h-20 rounded-2xl ${color.bg} text-white flex items-center justify-center mb-6 mx-auto ${color.hover} transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-charcoal">
                      {feature.title}
                    </h3>
                    <p className="font-heading text-charcoal-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Preview Section - 3D Poster Style */}
      <section id="candidates" className="py-32 bg-beige relative overflow-visible">
        {/* Decorative Starburst - Responsive sizing */}
        <div className="absolute top-0 right-0 sm:top-20 sm:right-10 md:top-20 md:right-10 opacity-30 sm:opacity-40 pointer-events-none z-0">
          <Starburst color="teal" size="sm" className="sm:hidden" />
          <Starburst color="teal" size="md" className="hidden sm:block md:hidden" />
          <Starburst color="teal" size="lg" className="hidden md:block" />
        </div>
        
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="font-heading font-black text-5xl sm:text-6xl text-charcoal mb-6 tracking-tight">
                {t.candidates.title}
              </h2>
              <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
                {t.candidates.subtitle}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : candidates.length === 0 ? (
              <div className="text-center py-32">
                <UserIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-charcoal-light font-heading text-lg">{t.candidates.noCandidates}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {candidates.slice(0, 8).map((candidate) => {
                  // Use color from database, fallback to ID-based calculation
                  const defaultColors = ['bg-purple', 'bg-silver', 'bg-teal'];
                  const colorMap: { [key: string]: string } = {
                    'purple': 'bg-purple',
                    'silver': 'bg-silver',
                    'teal': 'bg-teal'
                  };
                  const bgColor = candidate.color ? colorMap[candidate.color] : defaultColors[(candidate.id - 1) % 3];
                  
                  return (
                    <Link
                      key={candidate.id}
                      to={`/candidates/${candidate.id}`}
                      className="card-3d group bg-white overflow-hidden"
                    >
                      {/* Photo */}
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <img
                          src={getPhotoUrl(candidate.photo_url)}
                          alt={candidate.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Name and Position - Colored Background */}
                      <div className={`p-6 text-center ${bgColor}`}>
                        <h3 className="font-heading font-bold text-lg text-white mb-1">
                          {candidate.name}
                        </h3>
                        <p className="font-heading text-sm text-white/90">
                          {candidate.position}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {candidates.length > 8 && (
              <div className="text-center mt-16">
                <Link
                  to="/candidates"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-white font-bold rounded-2xl hover:bg-charcoal-light transition-all hover:scale-105 hover:shadow-2xl"
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