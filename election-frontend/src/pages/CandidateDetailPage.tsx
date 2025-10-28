import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { 
  ArrowLeftIcon, 
  EnvelopeIcon, 
  ShareIcon, 
  CheckBadgeIcon,
  UserCircleIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HeartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCandidate(parseInt(id));
    }
  }, [id]);

  const loadCandidate = async (candidateId: number) => {
    try {
      const data = await candidatesAPI.getById(candidateId);
      setCandidate(data);
    } catch (error) {
      console.error('Failed to load candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (photoUrl: string) => {
    if (photoUrl.startsWith('http')) return photoUrl;
    return `http://localhost:5000${photoUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-black text-gray-900 mb-4">
            Candidate not found
          </h2>
          <Link to="/candidates" className="text-gray-600 hover:text-gray-900 underline">
            {t.candidates.backToCandidates}
          </Link>
        </div>
      </div>
    );
  }

  const bio = language === 'de' ? candidate.bio_de : candidate.bio_en;
  const goals = language === 'de' ? candidate.goals_de : candidate.goals_en;
  const goalsList = goals.split('\n').filter(g => g.trim());

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Banner */}
      <div className="relative bg-gray-900 text-white">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-16">
          <Link
            to="/candidates"
            className="inline-flex items-center text-gray-300 hover:text-white font-medium mb-8 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.candidates.backToCandidates}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex items-end space-x-8">
              <div className="relative">
                <img
                  src={getPhotoUrl(candidate.photo_url)}
                  alt={candidate.name}
                  className="w-48 h-48 md:w-56 md:h-56 rounded-3xl object-cover border-4 border-white shadow-2xl"
                />
                {candidate.is_active && (
                  <div className="absolute -bottom-3 -right-3 bg-white text-gray-900 rounded-full p-3 shadow-xl">
                    <CheckBadgeIcon className="w-7 h-7" />
                  </div>
                )}
              </div>
              <div className="pb-4">
                <h1 className="font-heading font-black text-5xl md:text-6xl mb-3">
                  {candidate.name}
                </h1>
                <p className="text-2xl text-gray-300 font-medium mb-4">
                  {candidate.position}
                </p>
                <div className="flex items-center space-x-3">
                  {candidate.is_active ? (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-gray-900 uppercase tracking-wider">
                      {t.candidates.active}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gray-700 text-white uppercase tracking-wider">
                      {t.candidates.inactive}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col gap-3 pb-4">
              <a
                href={`mailto:${candidate.email}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all"
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                {t.candidates.contact}
              </a>
              <button
                onClick={() => navigator.share?.({ title: candidate.name, url: window.location.href })}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all"
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Biography Section - Clean */}
          <div className="mb-20">
            <h2 className="font-heading font-black text-4xl text-gray-900 mb-8">
              {t.candidates.biography}
            </h2>
            <div className="prose prose-lg max-w-none">
              {bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-6 text-lg font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Goals Section - Minimal List */}
          <div className="mb-20">
            <h2 className="font-heading font-black text-4xl text-gray-900 mb-8">
              {t.candidates.goals}
            </h2>
            <div className="space-y-6">
              {goalsList.map((goal, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg font-light leading-relaxed pt-2">
                    {goal.replace(/^\d+\.\s*/, '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-3xl p-12 text-center">
            <h2 className="font-heading font-black text-3xl text-gray-900 mb-4">
              {language === 'de' ? 'Kontaktieren Sie mich' : 'Get in Touch'}
            </h2>
            <p className="text-gray-600 text-lg mb-8 font-light max-w-2xl mx-auto">
              {language === 'de'
                ? 'Haben Sie Fragen oder möchten Sie mehr erfahren? Ich freue mich von Ihnen zu hören.'
                : 'Have questions or want to learn more? I’d love to hear from you.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${candidate.email}`}
                className="inline-flex items-center px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                {candidate.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;