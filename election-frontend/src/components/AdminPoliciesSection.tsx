import React, { useState } from 'react';
import { Policy, policiesAPI } from '../services/api';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdminPoliciesSectionProps {
  policies: Policy[];
  onRefresh: () => void;
}

const AdminPoliciesSection: React.FC<AdminPoliciesSectionProps> = ({ policies, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title_de: string;
    title_en: string;
    description_de: string;
    description_en: string;
    color: 'purple' | 'silver' | 'teal';
    is_active: boolean;
  }>({
    title_de: '',
    title_en: '',
    description_de: '',
    description_en: '',
    color: 'purple',
    is_active: true,
  });

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormData({
      title_de: policy.title_de,
      title_en: policy.title_en,
      description_de: policy.description_de,
      description_en: policy.description_en,
      color: policy.color as 'purple' | 'silver' | 'teal',
      is_active: policy.is_active,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPolicy(null);
    setFormData({
      title_de: '',
      title_en: '',
      description_de: '',
      description_en: '',
      color: 'purple',
      is_active: true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPolicy) {
        await policiesAPI.update(editingPolicy.id, formData);
      } else {
        await policiesAPI.create(formData);
      }
      setShowModal(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving policy:', error);
      alert('Failed to save policy');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (policy: Policy) => {
    if (window.confirm('Delete this policy?')) {
      try {
        await policiesAPI.delete(policy.id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting policy:', error);
        alert('Failed to delete policy');
      }
    }
  };

  return (
    <>
      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-heading font-black text-3xl text-charcoal">Manage Policies</h2>
          <p className="text-charcoal-light mt-1">Add, edit, or remove policies</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Policy
        </button>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => {
          const colorMap: { [key: string]: string } = {
            'purple': 'bg-purple',
            'silver': 'bg-silver',
            'teal': 'bg-teal',
          };

          return (
            <div key={policy.id} className={`${colorMap[policy.color]} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}>
              <h3 className="font-heading font-bold text-xl mb-3">{policy.title_en}</h3>
              <p className="text-white/90 text-sm mb-6 line-clamp-3">{policy.description_en}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(policy)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-white font-medium"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(policy)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all text-white font-medium"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-900 text-gray-900 hover:text-white flex items-center justify-center transition-all z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="p-8">
              <h2 className="font-heading font-black text-3xl text-gray-900 mb-6">
                {editingPolicy ? 'Edit Policy' : 'Add New Policy'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Title (German)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_de}
                    onChange={(e) => setFormData({ ...formData, title_de: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Bildung"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Education"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Description (German)
                  </label>
                  <textarea
                    required
                    value={formData.description_de}
                    onChange={(e) => setFormData({ ...formData, description_de: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Description in German..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Description (English)
                  </label>
                  <textarea
                    required
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Description in English..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value as any })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                  >
                    <option value="purple">Purple</option>
                    <option value="teal">Teal</option>
                    <option value="silver">Silver</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <label htmlFor="is_active" className="ml-3 text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Active
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-10 py-4 border-2 border-gray-200 rounded-full text-gray-900 font-bold hover:border-gray-900 transition-all uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 uppercase tracking-wider"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPoliciesSection;
