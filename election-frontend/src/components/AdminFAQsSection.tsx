import React, { useState } from 'react';
import { FAQ, faqsAPI } from '../services/api';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdminFAQsSectionProps {
  faqs: FAQ[];
  onRefresh: () => void;
}

const AdminFAQsSection: React.FC<AdminFAQsSectionProps> = ({ faqs, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    question_de: string;
    question_en: string;
    answer_de: string;
    answer_en: string;
    is_active: boolean;
  }>({
    question_de: '',
    question_en: '',
    answer_de: '',
    answer_en: '',
    is_active: true,
  });

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question_de: faq.question_de,
      question_en: faq.question_en,
      answer_de: faq.answer_de,
      answer_en: faq.answer_en,
      is_active: faq.is_active,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormData({
      question_de: '',
      question_en: '',
      answer_de: '',
      answer_en: '',
      is_active: true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingFAQ) {
        await faqsAPI.update(editingFAQ.id, formData);
      } else {
        await faqsAPI.create(formData);
      }
      setShowModal(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to save FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (faq: FAQ) => {
    if (window.confirm('Delete this FAQ?')) {
      try {
        await faqsAPI.delete(faq.id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert('Failed to delete FAQ');
      }
    }
  };

  return (
    <>
      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-heading font-black text-3xl text-charcoal">Manage FAQs</h2>
          <p className="text-charcoal-light mt-1">Add, edit, or remove frequently asked questions</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add FAQ
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-4 max-w-4xl">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-2xl p-6 border-2 border-beige-dark hover:border-charcoal transition-all">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">{faq.question_en}</h3>
                <p className="text-sm text-charcoal-light line-clamp-2">{faq.answer_en}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(faq)}
                  className="w-10 h-10 flex items-center justify-center bg-beige-light hover:bg-charcoal text-charcoal hover:text-white rounded-lg transition-all"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(faq)}
                  className="w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-all"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
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
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Question (German)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question_de}
                    onChange={(e) => setFormData({ ...formData, question_de: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Frage auf Deutsch..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Question (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question_en}
                    onChange={(e) => setFormData({ ...formData, question_en: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Question in English..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Answer (German)
                  </label>
                  <textarea
                    required
                    value={formData.answer_de}
                    onChange={(e) => setFormData({ ...formData, answer_de: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Antwort auf Deutsch..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Answer (English)
                  </label>
                  <textarea
                    required
                    value={formData.answer_en}
                    onChange={(e) => setFormData({ ...formData, answer_en: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Answer in English..."
                  />
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

export default AdminFAQsSection;
