import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { i18n } from '@/lib/i18n';

export function useTemplateSuggestions() {
  const { session } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    if (!session?.user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select(`
          id,
          template_name,
          content,
          template_category,
          suggestion_score,
          usage_count,
          average_rating,
          language,
          region
        `)
        .eq('is_template', true)
        .eq('language', i18n.language)
        .order('suggestion_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (err) {
      console.error('Error fetching template suggestions:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [session, i18n.language]);

  return {
    suggestions,
    isLoading,
    error,
    refetch: fetchSuggestions,
  };
};