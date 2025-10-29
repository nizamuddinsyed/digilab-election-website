import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, Candidate } from '../services/api';
import { UserIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

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
    if (!searchTerm) {
      setFilteredCandidates(candidates);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(term) ||
      candidate.position.toLowerCase().includes(term) ||
      candidate.bio_de.toLowerCase().includes(term) ||
      candidate.bio_en.toLowerCase().includes(term)
    );
    
    setFilteredCandidates(filtered);
  };

  const getPhotoUrl = (photoUrl: string) => {
    // Cloudinary returns full URLs, just return as-is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Fallback for old local uploads
    return `${window.location.origin}${photoUrl}`;
  };

  return (
    <div className="min-h-screen py-32 bg-white">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32">
        {/* Page Header - Minimal */}
        <div className="text-center mb-20">
          <h1 className="font-heading font-black text-6xl sm:text-7xl text-gray-900 mb-6 tracking-tight">
            {t.candidates.title}
          </h1>
          <p className="font-body text-xl text-gray-500 max-w-3xl mx-auto font-light">
            {t.candidates.subtitle}
          </p>
        </div>

        {/* Search - Clean Design */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-full bg-white focus:outline-none focus:border-gray-900 font-body text-lg transition-all"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-32">
            <UserIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">
              {searchTerm ? 'No matching candidates found' : t.candidates.noCandidates}
            </h3>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-gray-600 hover:text-gray-900 font-medium underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <p className="font-body text-gray-500 text-lg">
                <span className="font-bold text-gray-900">{filteredCandidates.length}</span> of {candidates.length} candidates
              </p>
              <div className="flex items-center space-x-2 text-gray-500">
                <FunnelIcon className="w-5 h-5" />
                <span className="font-body text-sm uppercase tracking-wider">Newest First</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCandidates.map((candidate) => (
                <Link
                  key={candidate.id}
                  to={`/candidates/${candidate.id}`}
                  className="group bg-white rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
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
          </>
        )}
      </div>
    </div>
  );
};

export default CandidatesPage;