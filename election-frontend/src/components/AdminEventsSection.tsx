import React, { useState } from 'react';
import { Event, eventsAPI } from '../services/api';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdminEventsSectionProps {
  events: Event[];
  onRefresh: () => void;
}

const AdminEventsSection: React.FC<AdminEventsSectionProps> = ({ events, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title_de: string;
    title_en: string;
    event_date: string;
    event_time: string;
    location_de: string;
    location_en: string;
    description_de: string;
    description_en: string;
    is_active: boolean;
  }>({
    title_de: '',
    title_en: '',
    event_date: '',
    event_time: '',
    location_de: '',
    location_en: '',
    description_de: '',
    description_en: '',
    is_active: true,
  });

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title_de: event.title_de,
      title_en: event.title_en,
      event_date: event.event_date,
      event_time: event.event_time,
      location_de: event.location_de,
      location_en: event.location_en,
      description_de: event.description_de,
      description_en: event.description_en,
      is_active: event.is_active,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      title_de: '',
      title_en: '',
      event_date: today,
      event_time: '12:00',
      location_de: '',
      location_en: '',
      description_de: '',
      description_en: '',
      is_active: true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, formData);
      } else {
        await eventsAPI.create(formData);
      }
      setShowModal(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (event: Event) => {
    if (window.confirm('Delete this event?')) {
      try {
        await eventsAPI.delete(event.id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  return (
    <>
      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-heading font-black text-3xl text-charcoal">Manage Events</h2>
          <p className="text-charcoal-light mt-1">Add, edit, or remove events</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4 max-w-4xl">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-6 border-2 border-beige-dark hover:border-charcoal transition-all">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-heading font-bold text-lg text-charcoal">{event.title_en}</h3>
                  <span className="px-3 py-1 bg-purple text-white text-xs font-bold rounded-full">
                    {new Date(event.event_date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="px-3 py-1 bg-teal text-white text-xs font-bold rounded-full">
                    {event.event_time.length > 5 ? event.event_time.substring(0, 5) : event.event_time}
                  </span>
                </div>
                <p className="text-sm text-charcoal-light mb-2">{event.location_en}</p>
                <p className="text-sm text-charcoal line-clamp-2">{event.description_en}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(event)}
                  className="w-10 h-10 flex items-center justify-center bg-beige-light hover:bg-charcoal text-charcoal hover:text-white rounded-lg transition-all"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(event)}
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
                {editingEvent ? 'Edit Event' : 'Add New Event'}
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
                    placeholder="Öffentliche Debatte"
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
                    placeholder="Public Debate"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.event_time}
                      onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                      className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Location (German)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location_de}
                    onChange={(e) => setFormData({ ...formData, location_de: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Rathaus, Hauptstraße 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Location (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location_en}
                    onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Town Hall, Main Street 1"
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
                    rows={3}
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
                    rows={3}
                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0"
                    placeholder="Description in English..."
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

export default AdminEventsSection;
