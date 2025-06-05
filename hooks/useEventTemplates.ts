import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { i18n } from '@/lib/i18n';

export interface TemplateEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  regions: string[];
  type: 'cultural' | 'seasonal' | 'holiday';
  metadata: Record<string, any>;
}

export interface EventTemplate {
  id: string;
  template_name: string;
  content: string;
  event_id: string;
  event_performance: {
    impressions: number;
    engagement: number;
    conversions: number;
    revenue: number;
  };
  suggestion_score: number;
}

export function useEventTemplates() {
  const { session } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState<TemplateEvent[]>([]);
  const [eventTemplates, setEventTemplates] = useState<EventTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingEvents = async () => {
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from('template_events')
        .select('*')
        .gte('end_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      setUpcomingEvents(data || []);
    } catch (err) {
      console.error('Error fetching upcoming events:', err);
      setError(err.message);
    }
  };

  const fetchEventTemplates = async () => {
    if (!session?.user || upcomingEvents.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select(`
          id,
          template_name,
          content,
          event_id,
          event_performance,
          suggestion_score
        `)
        .in('event_id', upcomingEvents.map(event => event.id))
        .eq('language', i18n.language)
        .order('suggestion_score', { ascending: false });

      if (error) throw error;
      setEventTemplates(data || []);
    } catch (err) {
      console.error('Error fetching event templates:', err);
      setError(err.message);
    }
  };

  const cloneTemplateForEvent = async (templateId: string, eventId: string, context: Record<string, any>) => {
    try {
      const { data, error } = await supabase.rpc('clone_template_for_event', {
        template_id: templateId,
        event_id: eventId,
        new_context: context
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error cloning template:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, [session]);

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      fetchEventTemplates();
    }
  }, [upcomingEvents, i18n.language]);

  return {
    upcomingEvents,
    eventTemplates,
    isLoading,
    error,
    cloneTemplateForEvent,
    refetch: () => {
      fetchUpcomingEvents();
      fetchEventTemplates();
    }
  };
}