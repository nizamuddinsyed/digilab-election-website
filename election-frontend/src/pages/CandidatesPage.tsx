import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { UserIcon, MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Starburst from '../components/Starburst';

const CandidatesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCandidates();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [candidates, searchTerm]);

  const loadCandidates = async () => {
    try {
      const data = await candidatesAPI.getAll(true);
      setCandidates(data);
    } catch (error) {
      console.error('Failed to load candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCandidates = () => {
    let filtered = candidates;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(term) ||
        candidate.position.toLowerCase().includes(term) ||
        candidate.bio_de.toLowerCase().includes(term) ||
        candidate.bio_en.toLowerCase().includes(term)
      );
    }
    
    setFilteredCandidates(filtered);
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCandidates].sort(() => Math.random() - 0.5);
    setFilteredCandidates(shuffled);
  };

  const getPhotoUrl = (photoUrl: string) => {
    // Cloudinary returns full URLs, just return as-is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Fallback for old local uploads
    return `${window.location.origin}${photoUrl}`;
  };

  return (
    <div className="min-h-screen py-32 bg-beige relative overflow-visible">
      {/* Decorative Starbursts - Responsive sizing and positioning */}
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
        <div className="text-center mb-20">
          <h1 className="font-heading font-black text-6xl sm:text-7xl text-charcoal mb-6 tracking-tight">
            {t.candidates.title}
          </h1>
          <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
            {t.candidates.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-charcoal-light" />
            </div>
            <input
              type="text"
              className="block w-full pl-16 pr-6 py-5 border-2 border-beige-dark rounded-2xl bg-white focus:outline-none focus:border-charcoal font-heading text-lg transition-all"
              placeholder={t.candidates.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-32">
            <UserIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="font-heading font-bold text-2xl text-charcoal mb-3">
              {searchTerm ? t.candidates.noMatching : t.candidates.noCandidates}
            </h3>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-charcoal-light hover:text-charcoal font-medium underline"
              >
                {t.candidates.clearSearch}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <p className="font-heading text-charcoal-light text-lg">
                <span className="font-bold text-charcoal">{filteredCandidates.length}</span> of {candidates.length} candidates
              </p>
              <button
                onClick={handleShuffle}
                className="flex items-center space-x-2 text-charcoal-light hover:text-charcoal transition-colors px-4 py-2 rounded-lg hover:bg-beige-light"
              >
                <SparklesIcon className="w-5 h-5" />
                <span className="font-heading text-sm uppercase tracking-wider">
                  {t.candidates.shuffle}
                </span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCandidates.map((candidate) => {
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
          </>
        )}
      </div>
    </div>
  );
};

export default CandidatesPage;