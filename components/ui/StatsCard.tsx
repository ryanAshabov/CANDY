import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import { ReactNode } from 'react';

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  iconColor?: string;
};

export default function StatsCard({ 
  title, 
  value, 
  subtitle,
  icon,
  iconColor 
}: StatsCardProps) {
  const textColor = useThemeColor({}, 'text');
  const gray = useThemeColor({}, 'gray');
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: gray }]}>{title}</Text>
        {icon && <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>{icon}</View>}
      </View>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      {subtitle && <Text style={[styles.subtitle, { color: gray }]}>{subtitle}</Text>}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    opacity: 0.2,
  },
});