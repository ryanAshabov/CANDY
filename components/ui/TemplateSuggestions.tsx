import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import { useTranslation } from 'react-i18next';
import { Sparkles, TrendingUp, Star } from 'lucide-react-native';

type Template = {
  id: string;
  name: string;
  content: string;
  category: string;
  score: number;
  usageCount: number;
  averageRating: number;
};

type TemplateSuggestionsProps = {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
};

export default function TemplateSuggestions({ templates, onSelectTemplate }: TemplateSuggestionsProps) {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Sparkles size={20} color={primary} />
          <Text style={[styles.title, { color: textColor }]}>
            {t('contentAI.suggestions.title')}
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {t('contentAI.suggestions.subtitle')}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={[styles.templateCard, { borderColor }]}
            onPress={() => onSelectTemplate(template)}
          >
            <View style={styles.templateHeader}>
              <Text style={[styles.templateCategory, { color: primary }]}>
                {template.category}
              </Text>
              <View style={[styles.scoreBadge, { backgroundColor: `${primary}20` }]}>
                <Star size={12} color={primary} />
                <Text style={[styles.scoreText, { color: primary }]}>
                  {template.score.toFixed(1)}
                </Text>
              </View>
            </View>

            <Text 
              style={[styles.templateName, { color: textColor }]}
              numberOfLines={2}
            >
              {template.name}
            </Text>

            <View style={styles.templateStats}>
              <View style={styles.statItem}>
                <TrendingUp size={14} color={subtitleColor} />
                <Text style={[styles.statText, { color: subtitleColor }]}>
                  {template.usageCount} {t('contentAI.metrics.uses')}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Star size={14} color={subtitleColor} />
                <Text style={[styles.statText, { color: subtitleColor }]}>
                  {template.averageRating.toFixed(1)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  scrollView: {
    marginHorizontal: -8,
  },
  templateCard: {
    width: 240,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateCategory: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
    height: 44,
  },
  templateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
});