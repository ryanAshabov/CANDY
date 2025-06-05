import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import StatsCard from '@/components/ui/StatsCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Package2, 
  Tag, 
  Users, 
  Settings, 
  Sparkles, 
  BarChart 
} from 'lucide-react-native';

export default function DashboardScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader 
        title="Welcome, Admin!" 
        subtitle="Here's a quick overview of your CANDY store."
        rightComponent={
          <Button
            title="Generate Content"
            variant="secondary"
            size="small"
            style={styles.headerButton}
            leftIcon={<Sparkles size={16} color="white" />}
          />
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <StatsCard 
            title="Total Candies" 
            value="128" 
            subtitle="Different types available"
            icon={<Package2 size={20} color="#A37BED" />}
            iconColor="rgba(163, 123, 237, 0.2)"
          />
          <StatsCard 
            title="Active Promotions" 
            value="5" 
            subtitle="Currently running"
            icon={<Tag size={20} color="#F97316" />}
            iconColor="rgba(249, 115, 22, 0.2)"
          />
          <StatsCard 
            title="Users Online" 
            value="17" 
            subtitle="Right now"
            icon={<Users size={20} color="#4CAF50" />}
            iconColor="rgba(76, 175, 80, 0.2)"
          />
          <StatsCard 
            title="Site Settings" 
            value="Manage" 
            subtitle="Configure your store"
            icon={<Settings size={20} color="#3B82F6" />}
            iconColor="rgba(59, 130, 246, 0.2)"
          />
        </View>
        
        <View style={styles.sectionsContainer}>
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                Content Management
              </Text>
              <Text style={[styles.sectionSubtitle, { color: subtitleColor }]}>
                Create and schedule promotional content using AI.
              </Text>
            </View>
            
            <View style={[styles.placeholderImage, { backgroundColor: '#F3F4F6' }]} />
          </Card>
          
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                Sales Analytics
              </Text>
              <Text style={[styles.sectionSubtitle, { color: subtitleColor }]}>
                Track sales performance and visualize data trends.
              </Text>
            </View>
            
            <View style={[styles.placeholderImage, { backgroundColor: '#F3F4F6' }]} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  sectionsContainer: {
    marginTop: 8,
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  placeholderImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
});