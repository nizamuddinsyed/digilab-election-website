import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Starburst from '../components/Starburst';
import { eventsAPI } from '../services/api';

interface Event {
  id: number;
  title_de: string;
  title_en: string;
  date: string;
  time: string;
  location_de: string;
  location_en: string;
  description_de: string;
  description_en: string;
}

// Utility function to format date from ISO string to DD.MM.YYYY
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Utility function to format time from HH:MM:SS to HH:MM
const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  // If it's already in HH:MM format, return as is
  if (timeString.length <= 5) return timeString;
  // If it's in HH:MM:SS format, extract HH:MM
  return timeString.substring(0, 5);
};

const EventsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-32 bg-beige relative overflow-visible">
      {/* Decorative Starbursts */}
      <div className="absolute top-0 right-0 sm:top-20 sm:right-10 md:top-20 md:right-10 opacity-15 sm:opacity-20 animate-spin-slow pointer-events-none z-0">
        <Starburst color="purple" size="sm" className="sm:hidden" />
        <Starburst color="purple" size="md" className="hidden sm:block md:hidden" />
        <Starburst color="purple" size="lg" className="hidden md:block" />
      </div>
      <div className="absolute bottom-0 left-0 sm:bottom-20 sm:left-10 opacity-10 sm:opacity-15 animate-spin-slow pointer-events-none z-0">
        <Starburst color="silver" size="sm" className="sm:hidden" />
        <Starburst color="silver" size="md" className="hidden sm:block md:hidden" />
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-20 xl:px-32 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="font-heading font-black text-6xl sm:text-7xl text-charcoal mb-6 tracking-tight">
            {language === 'de' ? 'Lust auf echten Austausch statt PR-Buzzwords?' : 'Want real exchange instead of PR buzzwords?'}
          </h1>
          <p className="font-heading text-xl text-charcoal-light max-w-3xl mx-auto">
            {language === 'de'
              ? 'Wir lernen Dich am liebsten persönlich kennen - kurz, unkompliziert und auf Augenhöhe.\nDafür haben wir zwei Formate entwickelt, die in jeden Alltag passen.'
              : 'We prefer to get to know you personally - brief, uncomplicated, and on equal terms.\nThat\'s why we\'ve developed two formats that fit into any everyday routine.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-8 border-2 border-beige-dark hover:border-charcoal transition-all shadow-lg hover:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="font-heading font-bold text-2xl text-charcoal">
                    {language === 'de' ? event.title_de : event.title_en}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-purple text-white font-bold rounded-full">
                      {formatDate(event.event_date)}
                    </span>
                    <span className="px-4 py-2 bg-teal text-white font-bold rounded-full">
                      {formatTime(event.event_time)}
                    </span>
                  </div>
                </div>
                
                <p className="text-charcoal-light font-bold mb-3">
                  {language === 'de' ? event.location_de : event.location_en}
                </p>
                
                <p className="font-heading text-charcoal leading-relaxed">
                  {language === 'de' ? event.description_de : event.description_en}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;