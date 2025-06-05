import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import { Calendar, Globe, Users, MessageSquare, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

type Step = 'event' | 'audience' | 'content' | 'schedule';

export default function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('event');
  const { t } = useTranslation();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  const steps: { id: Step; icon: React.ReactNode; title: string }[] = [
    { id: 'event', icon: <Calendar size={20} color={primary} />, title: t('contentAI.campaign.selectEvent') },
    { id: 'audience', icon: <Users size={20} color={primary} />, title: t('contentAI.campaign.defineAudience') },
    { id: 'content', icon: <MessageSquare size={20} color={primary} />, title: t('contentAI.campaign.createContent') },
    { id: 'schedule', icon: <Calendar size={20} color={primary} />, title: t('contentAI.campaign.schedule') },
  ];

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          {t('contentAI.campaign.title')}
        </Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {t('contentAI.campaign.subtitle')}
        </Text>
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <TouchableOpacity
              style={[
                styles.stepButton,
                { 
                  backgroundColor: currentStep === step.id ? `${primary}20` : backgroundColor,
                  borderColor: currentStep === step.id ? primary : borderColor,
                }
              ]}
              onPress={() => setCurrentStep(step.id)}
            >
              {step.icon}
              <Text 
                style={[
                  styles.stepText,
                  { color: currentStep === step.id ? primary : textColor }
                ]}
              >
                {step.title}
              </Text>
            </TouchableOpacity>
            {index < steps.length - 1 && (
              <ChevronRight size={16} color={subtitleColor} style={styles.stepArrow} />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={[styles.contentContainer, { borderColor }]}>
        {currentStep === 'event' && (
          <View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('contentAI.campaign.eventDetails')}
            </Text>
            <Input
              label={t('contentAI.campaign.eventName')}
              placeholder={t('contentAI.campaign.eventNamePlaceholder')}
            />
            <View style={styles.row}>
              <Input
                label={t('contentAI.campaign.startDate')}
                placeholder="YYYY-MM-DD"
                containerStyle={styles.dateInput}
              />
              <Input
                label={t('contentAI.campaign.endDate')}
                placeholder="YYYY-MM-DD"
                containerStyle={styles.dateInput}
              />
            </View>
          </View>
        )}

        {currentStep === 'audience' && (
          <View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('contentAI.campaign.targetAudience')}
            </Text>
            <View style={styles.regionSelector}>
              <Globe size={20} color={primary} />
              <Text style={[styles.regionText, { color: textColor }]}>
                {t('contentAI.campaign.selectRegions')}
              </Text>
            </View>
          </View>
        )}

        {/* Add content for other steps */}
      </View>

      <View style={styles.actions}>
        <Button
          title={t('common.back')}
          variant="outline"
          style={styles.actionButton}
        />
        <Button
          title={t('common.continue')}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 8,
  },
  stepArrow: {
    marginHorizontal: 8,
  },
  contentContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  regionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 12,
    minWidth: 120,
  },
});