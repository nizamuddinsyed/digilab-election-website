import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { 
  ArrowLeftIcon, 
  EnvelopeIcon, 
  ShareIcon, 
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';

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
    // Cloudinary returns full URLs, just return as-is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Fallback for old local uploads
    return `${window.location.origin}${photoUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-beige">
        <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-beige">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-black text-charcoal mb-4">
            Candidate not found
          </h2>
          <Link to="/candidates" className="text-charcoal-light hover:text-charcoal underline">
            {t.candidates.backToCandidates}
          </Link>
        </div>
      </div>
    );
  }

  const bio = language === 'de' ? candidate.bio_de : candidate.bio_en;
  
  // Process biography content to separate paragraphs from bullet points
  const processBioContent = (content: string) => {
    const lines = content.split('\n');
    const elements: { type: 'paragraph' | 'bullet'; content: string }[] = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        // Check if this is a bullet point
        if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•') || /^\d+\.\s/.test(trimmedLine)) {
          // Extract content after bullet marker
          const bulletContent = trimmedLine
            .replace(/^[-•]\s*/, '')
            .replace(/^\d+\.\s*/, '');
          elements.push({ type: 'bullet', content: bulletContent });
        } else {
          // This is a paragraph
          elements.push({ type: 'paragraph', content: line });
        }
      }
    }
    
    return elements;
  };
  
  const bioElements = processBioContent(bio);
  
  // Determine color based on database field or ID
  const colorClasses = {
    'purple': { bg: 'bg-purple', text: 'text-purple' },
    'silver': { bg: 'bg-silver', text: 'text-silver' },
    'teal': { bg: 'bg-teal', text: 'text-teal' }
  };
  const candidateColor = candidate.color && candidate.color in colorClasses
    ? colorClasses[candidate.color as keyof typeof colorClasses]
    : colorClasses[['purple', 'silver', 'teal'][(candidate.id - 1) % 3] as keyof typeof colorClasses];
  
  // Determine complementary starburst color
  const starburstColorMap = {
    'purple': 'teal' as const,    // Purple header → Teal starburst
    'silver': 'purple' as const,  // Silver header → Purple starburst
    'teal': 'silver' as const     // Teal header → Silver starburst
  } as const;
  const actualColor = candidate.color && candidate.color in colorClasses
    ? candidate.color
    : ['purple', 'silver', 'teal'][(candidate.id - 1) % 3];
  const starburstColor = starburstColorMap[actualColor as keyof typeof starburstColorMap] as 'purple' | 'teal' | 'silver';

  return (
    <div className="min-h-screen bg-beige relative overflow-hidden">
      {/* Decorative Starburst - Complementary Color */}
      <div className="absolute top-10 right-5 sm:top-20 sm:right-10 opacity-60 animate-spin-slow z-20">
        <Starburst color={starburstColor} size="md" />
      </div>
      
      {/* Hero Banner with colored theme */}
      <div className={`relative ${candidateColor.bg} text-white`}>
        <div className="container mx-auto px-6 sm:px-8 lg:px-20 py-12 sm:py-16">
          <Link
            to="/candidates"
            className="inline-flex items-center text-white/80 hover:text-white font-heading font-medium mb-6 sm:mb-8 transition-colors group text-sm sm:text-base"
          >
            <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.candidates.backToCandidates}
          </Link>
          
          <div className="flex flex-col gap-8">
            {/* Photo and Info Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Photo with white background */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-2xl bg-white overflow-hidden shadow-2xl">
                  <img
                    src={getPhotoUrl(candidate.photo_url)}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {candidate.is_active && (
                  <div className="absolute -bottom-3 -right-3 bg-white text-charcoal rounded-full p-2 sm:p-3 shadow-xl">
                    <CheckBadgeIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                )}
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 leading-tight">
                  {candidate.name}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 font-heading font-medium mb-3 sm:mb-4">
                  {candidate.position}
                </p>
                <div className="flex justify-center sm:justify-start items-center">
                  {candidate.is_active ? (
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold bg-teal text-white uppercase tracking-wider">
                      {t.candidates.active}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold bg-silver text-charcoal uppercase tracking-wider">
                      {t.candidates.inactive}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-20 py-12 sm:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Biography Section */}
          <div className="mb-12 sm:mb-20">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-charcoal mb-6 sm:mb-8">
              {language === 'de' ? 'Über mich' : 'About Me'}
            </h2>
            
            {/* Display biography with proper formatting for paragraphs and bullet points */}
            <div className="space-y-4 sm:space-y-6">
              {bioElements.map((element, index) => {
                if (element.type === 'paragraph') {
                  return (
                    <p key={index} className="text-charcoal-light leading-relaxed text-base sm:text-lg font-heading">
                      {element.content}
                    </p>
                  );
                } else {
                  // Bullet point
                  return (
                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-2 h-2 bg-charcoal rounded-full mt-3"></div>
                      <p className="text-charcoal-light text-base sm:text-lg font-heading leading-relaxed">
                        {element.content}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;