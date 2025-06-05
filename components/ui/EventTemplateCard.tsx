import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import { Calendar, TrendingUp, Star, Copy } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

type EventTemplateCardProps = {
  template: {
    id: string;
    template_name: string;
    content: string;
    event_performance: {
      impressions: number;
      engagement: number;
      conversions: number;
      revenue: number;
    };
    suggestion_score: number;
  };
  event: {
    name: string;
    start_date: string;
    end_date: string;
    type: string;
  };
  onUse: () => void;
  onClone: () => void;
};

export default function EventTemplateCard({
  template,
  event,
  onUse,
  onClone,
}: EventTemplateCardProps) {
  const { t } = useTranslation();
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.eventInfo}>
          <Text style={[styles.eventType, { color: primary }]}>
            {event.type}
          </Text>
          <Text style={[styles.eventName, { color: textColor }]}>
            {event.name}
          </Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={subtitleColor} />
            <Text style={[styles.dateText, { color: subtitleColor }]}>
              {formatDate(event.start_date)} - {formatDate(event.end_date)}
            </Text>
          </View>
        </View>

        <View style={[styles.scoreBadge, { backgroundColor: `${primary}20` }]}>
          <Star size={12} color={primary} />
          <Text style={[styles.scoreText, { color: primary }]}>
            {template.suggestion_score.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={[styles.contentPreview, { borderColor }]}>
        <Text 
          style={[styles.contentText, { color: textColor }]}
          numberOfLines={3}
        >
          {template.content}
        </Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metricItem}>
          <TrendingUp size={14} color={subtitleColor} />
          <Text style={[styles.metricText, { color: subtitleColor }]}>
            {template.event_performance.engagement} {t('contentAI.metrics.engagements')}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Star size={14} color={subtitleColor} />
          <Text style={[styles.metricText, { color: subtitleColor }]}>
            {template.event_performance.conversions} {t('contentAI.metrics.conversions')}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { borderColor }]}
          onPress={onClone}
        >
          <Copy size={16} color={textColor} />
          <Text style={[styles.actionText, { color: textColor }]}>
            {t('contentAI.actions.clone')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: primary }]}
          onPress={onUse}
        >
          <Text style={[styles.actionText, { color: 'white' }]}>
            {t('contentAI.actions.use')}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
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
  contentPreview: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  metrics: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metricText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 6,
  },
});