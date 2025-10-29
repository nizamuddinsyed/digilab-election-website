import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI, authAPI, Candidate, Stats } from '../services/api';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 9; // 3x3 grid

  useEffect(() => {
    verifyAuth();
    loadData();
  }, []);

  const verifyAuth = async () => {
    try {
      await authAPI.verify();
    } catch (error) {
      navigate('/admin');
    }
  };

  const loadData = async () => {
    try {
      const [candidatesData, statsData] = await Promise.all([
        candidatesAPI.getAll(),
        candidatesAPI.getStats(),
      ]);
      setCandidates(candidatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/admin');
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCandidate(null);
    setShowModal(true);
  };

  const handleDelete = async (candidate: Candidate) => {
    if (window.confirm(t.admin.confirmDelete)) {
      try {
        await candidatesAPI.delete(candidate.id);
        setCurrentPage(1);
        loadData();
      } catch (error) {
        console.error('Failed to delete candidate:', error);
        alert('Failed to delete candidate');
      }
    }
  };

  const getPhotoUrl = (photoUrl: string) => {
    // Cloudinary returns full URLs, just return as-is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Fallback for old local uploads
    return `${window.location.origin}${photoUrl}`;
  };

  // Pagination calculations
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const paginatedCandidates = candidates.slice(startIndex, startIndex + candidatesPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-beige">
        <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="bg-white border-b-2 border-beige-dark">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-black text-4xl text-charcoal">
                {t.admin.dashboard}
              </h1>
              <p className="text-charcoal-light mt-2">Manage election candidates</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
              {t.admin.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-8 border-2 border-beige-dark hover:border-charcoal transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-charcoal-light uppercase tracking-wider mb-2">{t.admin.totalCandidates}</p>
                <p className="text-5xl font-black text-charcoal">{stats.total}</p>
              </div>
              <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center">
                <UserGroupIcon className="w-9 h-9 text-white" />
              </div>
            </div>
            <p className="text-sm text-charcoal-light font-medium">All candidates</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border-2 border-beige-dark hover:border-charcoal transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-charcoal-light uppercase tracking-wider mb-2">{t.admin.activeCandidates}</p>
                <p className="text-5xl font-black text-charcoal">{stats.active}</p>
              </div>
              <div className="w-16 h-16 bg-teal rounded-2xl flex items-center justify-center">
                <CheckCircleIcon className="w-9 h-9 text-white" />
              </div>
            </div>
            <p className="text-sm text-charcoal-light font-medium">Currently active</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border-2 border-beige-dark hover:border-charcoal transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-charcoal-light uppercase tracking-wider mb-2">{t.admin.inactiveCandidates}</p>
                <p className="text-5xl font-black text-charcoal">{stats.inactive}</p>
              </div>
              <div className="w-16 h-16 bg-silver rounded-2xl flex items-center justify-center">
                <XCircleIcon className="w-9 h-9 text-white" />
              </div>
            </div>
            <p className="text-sm text-charcoal-light font-medium">Currently inactive</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-heading font-black text-3xl text-charcoal">
              {t.admin.manageCandidates}
            </h2>
            <p className="text-charcoal-light mt-1">View and manage all candidates</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {t.admin.addCandidate}
          </button>
        </div>

        {/* Candidates Cards - All Devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {paginatedCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-beige-dark hover:border-charcoal hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-5">
                <img
                  src={getPhotoUrl(candidate.photo_url)}
                  alt={candidate.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-beige-dark flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-charcoal truncate">{candidate.name}</h3>
                  <p className="text-sm text-charcoal-light truncate">{candidate.position}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-beige-light">
                <span className="text-xs font-bold text-charcoal-light uppercase tracking-wider">Status</span>
                {candidate.is_active ? (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-teal text-white uppercase tracking-wider">
                    {t.candidates.active}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-silver text-charcoal uppercase tracking-wider">
                    {t.candidates.inactive}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2 flex-col sm:flex-row">
                <button
                  onClick={() => handleEdit(candidate)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 bg-charcoal text-white font-bold rounded-xl hover:bg-charcoal-light transition-all text-xs sm:text-sm whitespace-nowrap"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(candidate)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all text-xs sm:text-sm whitespace-nowrap"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-charcoal text-white font-bold rounded-xl hover:bg-charcoal-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${
                    currentPage === index + 1
                      ? 'bg-charcoal text-white'
                      : 'bg-white text-charcoal border-2 border-beige-dark hover:border-charcoal'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-charcoal text-white font-bold rounded-xl hover:bg-charcoal-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CandidateModal
          candidate={editingCandidate}
          onClose={() => {
            setShowModal(false);
            setEditingCandidate(null);
          }}
          onSuccess={loadData}
        />
      )}
    </div>
  );
};

// Candidate Modal Component
interface CandidateModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: candidate?.name || '',
    position: candidate?.position || '',
    bio_de: candidate?.bio_de || '',
    bio_en: candidate?.bio_en || '',
    goals_de: candidate?.goals_de || '',
    goals_en: candidate?.goals_en || '',
    email: candidate?.email || '',
    is_active: candidate?.is_active !== false,
    color: candidate?.color || 'purple',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('position', formData.position);
      data.append('bio_de', formData.bio_de);
      data.append('bio_en', formData.bio_en);
      data.append('goals_de', formData.goals_de);
      data.append('goals_en', formData.goals_en);
      data.append('email', formData.email);
      data.append('is_active', String(formData.is_active));
      data.append('color', formData.color);
      
      if (photoFile) {
        data.append('photo', photoFile);
      }

      if (candidate) {
        await candidatesAPI.update(candidate.id, data);
      } else {
        await candidatesAPI.create(data);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save candidate:', error);
      alert('Failed to save candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-beige-dark relative">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-beige-light hover:bg-charcoal hover:text-white text-charcoal transition-all shadow-lg hover:shadow-xl"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-10 border-b-2 border-beige-dark">
          <h3 className="text-4xl font-heading font-black text-charcoal pr-12">
            {candidate ? t.admin.editCandidate : t.admin.addCandidate}
          </h3>
          <p className="text-charcoal-light mt-2">
            {candidate ? 'Update candidate information' : 'Add a new candidate'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                {t.admin.name} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 border-2 border-beige-dark rounded-2xl focus:outline-none focus:border-charcoal transition-all font-heading"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                {t.admin.position} *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-4 border-2 border-beige-dark rounded-2xl focus:outline-none focus:border-charcoal transition-all font-heading"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                {t.admin.email} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 border-2 border-beige-dark rounded-2xl focus:outline-none focus:border-charcoal transition-all font-heading"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                {t.admin.photo}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                Card Color
              </label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value as 'purple' | 'silver' | 'teal' })}
                className="w-full px-4 py-4 border-2 border-beige-dark rounded-2xl focus:outline-none focus:border-charcoal transition-all font-heading bg-white"
              >
                <option value="purple">Purple</option>
                <option value="silver">Silver</option>
                <option value="teal">Teal</option>
              </select>
              <p className="text-xs text-charcoal-light mt-2">Choose the color that appears on the candidate card</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
              {t.admin.bioDE} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.bio_de}
              onChange={(e) => setFormData({ ...formData, bio_de: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
              {t.admin.bioEN} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.bio_en}
              onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
              {t.admin.goalsDE} * (one per line)
            </label>
            <textarea
              required
              rows={4}
              value={formData.goals_de}
              onChange={(e) => setFormData({ ...formData, goals_de: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
              {t.admin.goalsEN} * (one per line)
            </label>
            <textarea
              required
              rows={4}
              value={formData.goals_en}
              onChange={(e) => setFormData({ ...formData, goals_en: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all"
            />
          </div>
          
          <div className="flex items-center bg-gray-50 rounded-2xl p-4">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-gray-900"
            />
            <label htmlFor="is_active" className="ml-3 text-sm font-bold text-gray-900 uppercase tracking-wider">
              {t.admin.isActive}
            </label>
          </div>
          
          <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-4 border-2 border-gray-200 rounded-full text-gray-900 font-bold hover:border-gray-900 transition-all uppercase tracking-wider"
            >
              {t.admin.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl uppercase tracking-wider"
            >
              {loading ? t.common.loading : t.admin.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
