import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Card from './Card';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Star, Users, ChartBar as BarChart3 } from 'lucide-react-native';

type PerformanceMetrics = {
  usageCount: number;
  averageRating: number;
  engagement: number;
  conversionRate: number;
};

type TemplatePerformanceProps = {
  metrics: PerformanceMetrics;
  historicalData: {
    dates: string[];
    usage: number[];
    engagement: number[];
  };
};

export default function TemplatePerformance({ metrics, historicalData }: TemplatePerformanceProps) {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const primary = useThemeColor({}, 'primary');

  const chartConfig = {
    backgroundColor: backgroundColor,
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(163, 123, 237, ${opacity})`,
    labelColor: () => subtitleColor,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: primary,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metricsGrid}>
        <Card style={styles.metricCard}>
          <View style={[styles.iconContainer, { backgroundColor: `${primary}20` }]}>
            <TrendingUp size={20} color={primary} />
          </View>
          <Text style={[styles.metricValue, { color: textColor }]}>
            {metrics.usageCount}
          </Text>
          <Text style={[styles.metricLabel, { color: subtitleColor }]}>
            {t('contentAI.metrics.usageCount')}
          </Text>
        </Card>

        <Card style={styles.metricCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#F9731620' }]}>
            <Star size={20} color="#F97316" />
          </View>
          <Text style={[styles.metricValue, { color: textColor }]}>
            {metrics.averageRating.toFixed(1)}
          </Text>
          <Text style={[styles.metricLabel, { color: subtitleColor }]}>
            {t('contentAI.metrics.rating')}
          </Text>
        </Card>

        <Card style={styles.metricCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#3B82F620' }]}>
            <Users size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricValue, { color: textColor }]}>
            {metrics.engagement}
          </Text>
          <Text style={[styles.metricLabel, { color: subtitleColor }]}>
            {t('contentAI.metrics.engagement')}
          </Text>
        </Card>

        <Card style={styles.metricCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#4CAF5020' }]}>
            <BarChart3 size={20} color="#4CAF50" />
          </View>
          <Text style={[styles.metricValue, { color: textColor }]}>
            {metrics.conversionRate}%
          </Text>
          <Text style={[styles.metricLabel, { color: subtitleColor }]}>
            {t('contentAI.metrics.conversion')}
          </Text>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Text style={[styles.chartTitle, { color: textColor }]}>
          {t('contentAI.charts.usage')}
        </Text>
        <LineChart
          data={{
            labels: historicalData.dates,
            datasets: [{
              data: historicalData.usage
            }]
          }}
          width={350}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </Card>

      <Card style={styles.chartCard}>
        <Text style={[styles.chartTitle, { color: textColor }]}>
          {t('contentAI.charts.engagement')}
        </Text>
        <BarChart
          data={{
            labels: historicalData.dates,
            datasets: [{
              data: historicalData.engagement
            }]
          }}
          width={350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    margin: 8,
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  chartCard: {
    marginTop: 16,
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});