import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import { ThumbsUp, ThumbsDown, Save } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

type ContentRatingProps = {
  contentId: string;
  onRate: (rating: 'useful' | 'not_relevant') => void;
  onSaveTemplate: () => void;
  isRated?: boolean;
  currentRating?: 'useful' | 'not_relevant';
};

export default function ContentRating({
  contentId,
  onRate,
  onSaveTemplate,
  isRated,
  currentRating,
}: ContentRatingProps) {
  const { t } = useTranslation();
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  
  return (
    <View style={styles.container}>
      <View style={styles.ratingButtons}>
        <TouchableOpacity
          style={[
            styles.ratingButton,
            { borderColor },
            currentRating === 'useful' && styles.ratingButtonActive
          ]}
          onPress={() => onRate('useful')}
        >
          <ThumbsUp
            size={16}
            color={currentRating === 'useful' ? '#4CAF50' : textColor}
          />
          <Text
            style={[
              styles.ratingText,
              { color: currentRating === 'useful' ? '#4CAF50' : textColor }
            ]}
          >
            {t('contentAI.rating.useful')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ratingButton,
            { borderColor },
            currentRating === 'not_relevant' && styles.ratingButtonActive
          ]}
          onPress={() => onRate('not_relevant')}
        >
          <ThumbsDown
            size={16}
            color={currentRating === 'not_relevant' ? '#EF4444' : textColor}
          />
          <Text
            style={[
              styles.ratingText,
              { color: currentRating === 'not_relevant' ? '#EF4444' : textColor }
            ]}
          >
            {t('contentAI.rating.notRelevant')}
          </Text>
        </TouchableOpacity>

        {currentRating === 'useful' && (
          <TouchableOpacity
            style={[styles.saveButton, { borderColor }]}
            onPress={onSaveTemplate}
          >
            <Save size={16} color="#A37BED" />
            <Text style={[styles.saveButtonText, { color: '#A37BED' }]}>
              {t('contentAI.rating.saveTemplate')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  ratingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  ratingButtonActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  saveButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});