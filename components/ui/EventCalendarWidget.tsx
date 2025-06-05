import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import { Calendar, Clock, TrendingUp, CalendarX } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useEventTemplates } from '@/hooks/useEventTemplates';

export default function EventCalendarWidget() {
  const { t } = useTranslation();
  const { upcomingEvents } = useEventTemplates();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  
  const getEventColor = (type: string) => {
    switch (type) {
      case 'cultural':
        return '#A37BED';
      case 'seasonal':
        return '#F97316';
      case 'holiday':
        return '#3B82F6';
      default:
        return primary;
    }
  };

  const getDaysUntil = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!upcomingEvents.length) {
    return (
      <Card style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Calendar size={20} color={primary} />
            <Text style={[styles.title, { color: textColor }]}>
              {t('contentAI.upcomingEvents')}
            </Text>
          </View>
          <Text style={[styles.subtitle, { color: subtitleColor }]}>
            {t('contentAI.eventCalendarSubtitle')}
          </Text>
        </View>

        <View style={styles.emptyState}>
          <CalendarX size={40} color={subtitleColor} />
          <Text style={[styles.emptyText, { color: subtitleColor }]}>
            {t('contentAI.noUpcomingEvents')}
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Calendar size={20} color={primary} />
          <Text style={[styles.title, { color: textColor }]}>
            {t('contentAI.upcomingEvents')}
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {t('contentAI.eventCalendarSubtitle')}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {upcomingEvents.map((event) => {
          const daysUntil = getDaysUntil(event.start_date);
          const eventColor = getEventColor(event.type);
          
          return (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { borderColor: eventColor }]}
            >
              <View style={[styles.eventType, { backgroundColor: `${eventColor}20` }]}>
                <Text style={[styles.eventTypeText, { color: eventColor }]}>
                  {t(`contentAI.eventTypes.${event.type}`)}
                </Text>
              </View>

              <Text style={[styles.eventName, { color: textColor }]}>
                {event.name}
              </Text>

              <View style={styles.eventMeta}>
                <View style={styles.metaItem}>
                  <Clock size={14} color={subtitleColor} />
                  <Text style={[styles.metaText, { color: subtitleColor }]}>
                    {daysUntil} {t('contentAI.daysUntil')}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <TrendingUp size={14} color={subtitleColor} />
                  <Text style={[styles.metaText, { color: subtitleColor }]}>
                    {event.regions.length} {t('contentAI.regions')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
  eventCard: {
    width: 240,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
  },
  eventType: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    textAlign: 'center',
  },
});