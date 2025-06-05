import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { Package } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import ProfileDropdown from './ui/ProfileDropdown';
import LanguageSelector from './ui/LanguageSelector';
import { useTranslation } from 'react-i18next';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
};

export default function AppHeader({ title, subtitle, rightComponent }: AppHeaderProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  
  const { session } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.logoAndTitle}>
        <View style={[styles.logoContainer, { backgroundColor: primary }]}>
          <Package size={24} color="white" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <LanguageSelector />
        {rightComponent}
        <ProfileDropdown />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});