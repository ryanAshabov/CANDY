import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Sparkles, Calendar, Send, Copy, CircleCheck as CheckCircle, History, Trash2 } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import TemplateSuggestions from '@/components/ui/TemplateSuggestions';
import ContentRating from '@/components/ui/ContentRating';
import { useTemplateSuggestions } from '@/hooks/useTemplateSuggestions';
import EventCalendarWidget from '@/components/ui/EventCalendarWidget';
import CampaignBuilder from '@/components/ui/CampaignBuilder';
import * as Clipboard from 'expo-clipboard';

type ContentType = 'social' | 'whatsapp' | 'email';

interface GeneratedContent {
  id: string;
  prompt: string;
  content: string;
  type: ContentType;
  status: 'draft' | 'published';
  created_at: string;
  published_at: string | null;
  rating?: 'useful' | 'not_relevant';
}

export default function ContentAIScreen() {
  const { session } = useAuth();
  const { t, i18n } = useTranslation();
  const { suggestions, isLoading: isSuggestionsLoading } = useTemplateSuggestions();
  
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState<ContentType>('social');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [contentHistory, setContentHistory] = useState<GeneratedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentContentId, setCurrentContentId] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<'useful' | 'not_relevant' | null>(null);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const cardColor = useThemeColor({}, 'card');
  const primary = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  useEffect(() => {
    fetchContentHistory();
  }, []);

  const fetchContentHistory = async () => {
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContentHistory(data || []);
    } catch (error) {
      console.error('Error fetching content history:', error);
    }
  };

  const handleSelectTemplate = (template: any) => {
    setPrompt(template.content);
    setContentType(template.type || 'social');
  };
  
  const handleGenerateContent = async () => {
    if (!prompt.trim() || !session?.user) return;
    
    setIsGenerating(true);
    setCurrentRating(null);
    
    try {
      // Simulate AI generation with predefined responses
      const sampleResponses = {
        social: [
          "🍫 SUMMER SWEETNESS SPECIAL 🍫\n\nBeat the heat with our NEW chocolate collection! For a limited time, enjoy 20% OFF on all chocolate bars and assortments. Perfect for beach days, picnics, or just treating yourself at home.\n\n#SummerTreats #ChocolateLovers",
          "Introducing our NEW Wild Berry Gummy Bears! 🍓🫐\n\nMade with real fruit juice and zero artificial colors. These delicious treats pack a burst of summer flavor in every bite! Available now in-store and online.\n\nTag someone who needs these in their life!",
        ],
        whatsapp: [
          "🎉 Special Offer Alert! 🎉\n\nHi there! We've just launched our summer collection of handcrafted chocolates. Get 20% off on all orders above $30 this weekend only! Reply 'YES' to get your discount code.",
          "🍬 New Arrival: Wild Berry Gummy Bears! 🫐\n\nBe the first to try our latest creation. Limited stock available. Order now and get a free sample of our bestselling chocolate bar!",
        ],
        email: [
          "Subject: Sweeten Your Summer with Our New Collection! 🍫\n\nDear Candy Lover,\n\nWe're excited to introduce our Summer 2025 Collection, featuring handcrafted chocolates and artisanal candies perfect for the season.\n\nHighlights:\n- NEW: Wild Berry Chocolate Truffles\n- Limited Edition: Summer Fruit Gummy Bears\n- Classic Favorites: Now in Summer Packaging\n\nOrder now and enjoy 20% off your first purchase!\n\nSweet regards,\nYour Candy Team",
        ],
      };

      const randomResponse = sampleResponses[contentType][Math.floor(Math.random() * sampleResponses[contentType].length)];
      
      // Save to database
      const { data, error } = await supabase
        .from('generated_content')
        .insert({
          user_id: session.user.id,
          prompt,
          content: randomResponse,
          type: contentType,
          status: 'draft',
          language: i18n.language
        })
        .select()
        .single();

      if (error) throw error;
      
      setGeneratedContent(randomResponse);
      setCurrentContentId(data.id);
      await fetchContentHistory();
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRateContent = async (rating: 'useful' | 'not_relevant') => {
    if (!currentContentId) return;

    try {
      const { error } = await supabase
        .from('generated_content')
        .update({ rating })
        .eq('id', currentContentId);

      if (error) throw error;
      setCurrentRating(rating);
    } catch (error) {
      console.error('Error rating content:', error);
    }
  };

  const handleSaveTemplate = async () => {
    if (!currentContentId) return;

    try {
      const { error } = await supabase
        .from('generated_content')
        .update({
          is_template: true,
          template_name: prompt,
          language: i18n.language
        })
        .eq('id', currentContentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };
  
  const handlePublish = async () => {
    if (!generatedContent || !session?.user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('generated_content')
        .update({
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('content', generatedContent)
        .eq('user_id', session.user.id);

      if (error) throw error;
      await fetchContentHistory();
    } catch (error) {
      console.error('Error publishing content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyContent = async () => {
    if (!generatedContent) return;
    
    try {
      await Clipboard.setStringAsync(generatedContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying content:', error);
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchContentHistory();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader
        title={t('contentAI.title')}
        subtitle={t('contentAI.subtitle')}
        rightComponent={
          <Button
            title={t('contentAI.campaign.create')}
            variant="secondary"
            size="small"
            leftIcon={<Calendar size={16} color="white" />}
            onPress={() => setShowCampaignBuilder(true)}
          />
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EventCalendarWidget />

        {showCampaignBuilder && (
          <CampaignBuilder onClose={() => setShowCampaignBuilder(false)} />
        )}

        {!isSuggestionsLoading && suggestions.length > 0 && (
          <TemplateSuggestions
            templates={suggestions}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        <Card style={styles.inputCard}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {t('contentAI.generate')}
          </Text>
          <Text style={[styles.sectionSubtitle, { color: subtitleColor }]}>
            {t('contentAI.subtitle')}
          </Text>
          
          <View style={styles.contentTypeContainer}>
            {(['social', 'whatsapp', 'email'] as ContentType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.contentTypeButton,
                  { 
                    backgroundColor: contentType === type ? primary : `${primary}15`,
                    borderColor: contentType === type ? primary : `${primary}30`,
                  }
                ]}
                onPress={() => setContentType(type)}
              >
                <Text 
                  style={[
                    styles.contentTypeText, 
                    { color: contentType === type ? 'white' : primary }
                  ]}
                >
                  {t(`contentAI.types.${type}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.promptContainer}>
            <TextInput
              style={[
                styles.promptInput,
                { 
                  color: textColor,
                  backgroundColor,
                  borderColor: borderColor,
                }
              ]}
              placeholder={t('contentAI.promptPlaceholder')}
              placeholderTextColor={subtitleColor}
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={3}
            />
            
            <Button
              title={t('contentAI.generate')}
              leftIcon={<Sparkles size={16} color="white" />}
              isLoading={isGenerating}
              onPress={handleGenerateContent}
              style={styles.generateButton}
            />
          </View>
        </Card>
        
        {generatedContent ? (
          <Card style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={[styles.resultTitle, { color: textColor }]}>
                {t('contentAI.generatedContent')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.copyButton,
                  { borderColor: isCopied ? '#4CAF50' : borderColor }
                ]}
                onPress={handleCopyContent}
              >
                {isCopied ? (
                  <CheckCircle size={16} color="#4CAF50" />
                ) : (
                  <Copy size={16} color={textColor} />
                )}
                <Text
                  style={[
                    styles.copyButtonText,
                    { color: isCopied ? '#4CAF50' : textColor }
                  ]}
                >
                  {isCopied ? t('contentAI.copied') : t('contentAI.copy')}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View
              style={[
                styles.contentBox,
                { backgroundColor, borderColor: borderColor }
              ]}
            >
              <Text style={[styles.generatedText, { color: textColor }]}>
                {generatedContent}
              </Text>
            </View>

            <ContentRating
              contentId={currentContentId!}
              onRate={handleRateContent}
              onSaveTemplate={handleSaveTemplate}
              currentRating={currentRating}
            />
            
            <View style={styles.actionButtons}>
              <Button
                title={t('contentAI.schedule')}
                variant="outline"
                leftIcon={<Calendar size={16} color={textColor} />}
                style={styles.actionButton}
              />
              <Button
                title={t('contentAI.post')}
                leftIcon={<Send size={16} color="white" />}
                style={styles.actionButton}
                onPress={handlePublish}
                isLoading={isLoading}
              />
            </View>
          </Card>
        ) : null}

        {contentHistory.length > 0 && (
          <Card style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyTitleContainer}>
                <History size={20} color={textColor} />
                <Text style={[styles.historyTitle, { color: textColor }]}>
                  {t('contentAI.history')}
                </Text>
              </View>
            </View>

            {contentHistory.map((item) => (
              <View key={item.id} style={[styles.historyItem, { borderColor }]}>
                <View style={styles.historyItemHeader}>
                  <View>
                    <Text style={[styles.historyItemType, { color: textColor }]}>
                      {t(`contentAI.types.${item.type}`)}
                    </Text>
                    <Text style={[styles.historyItemDate, { color: subtitleColor }]}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.historyItemActions}>
                    <TouchableOpacity
                      style={[styles.historyActionButton, { borderColor }]}
                      onPress={() => handleDeleteContent(item.id)}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.historyItemPrompt, { color: subtitleColor }]}>
                  {item.prompt}
                </Text>
                <Text 
                  style={[styles.historyItemContent, { color: textColor }]}
                  numberOfLines={3}
                >
                  {item.content}
                </Text>
                {item.status === 'published' && (
                  <View style={[styles.publishedBadge, { backgroundColor: '#4CAF5020' }]}>
                    <Text style={[styles.publishedText, { color: '#4CAF50' }]}>
                      {t('contentAI.published')}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  inputCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  contentTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  contentTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  contentTypeText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  promptContainer: {
    marginBottom: 16,
  },
  promptInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  generateButton: {
    marginBottom: 8,
  },
  resultCard: {
    marginBottom: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 6,
  },
  contentBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  generatedText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  historyCard: {
    marginBottom: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  historyItem: {
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyItemType: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  historyItemDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  historyItemActions: {
    flexDirection: 'row',
  },
  historyActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  historyItemPrompt: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  historyItemContent: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  publishedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  publishedText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
});