import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ChartBar as BarChart3, ChartPie as PieChart, TrendingUp, Download, Calendar, ChevronDown, Package2, DollarSign, Users, ShoppingCart } from 'lucide-react-native';
import { LineChart, BarChart, PieChart as RNPieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState('This Month');
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const cardColor = useThemeColor({}, 'card');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  
  // Sample data for charts
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [450, 500, 800, 650, 700, 950, 1000],
        color: () => primary,
        strokeWidth: 2
      }
    ],
    legend: ["Sales ($)"]
  };
  
  const categoryData = {
    labels: ["Chocolate", "Gummies", "Hard Candy", "Lollipops"],
    datasets: [
      {
        data: [35, 28, 20, 17]
      }
    ]
  };
  
  const pieChartData = [
    {
      name: "Chocolate",
      population: 35,
      color: "#A37BED",
      legendFontColor: textColor,
      legendFontSize: 12
    },
    {
      name: "Gummies",
      population: 28,
      color: "#F97316",
      legendFontColor: textColor,
      legendFontSize: 12
    },
    {
      name: "Hard Candy",
      population: 20,
      color: "#3B82F6",
      legendFontColor: textColor,
      legendFontSize: 12
    },
    {
      name: "Lollipops",
      population: 17,
      color: "#4CAF50",
      legendFontColor: textColor,
      legendFontSize: 12
    }
  ];
  
  const chartConfig = {
    backgroundGradientFrom: cardColor,
    backgroundGradientTo: cardColor,
    decimalPlaces: 0,
    color: () => primary,
    labelColor: () => subtitleColor,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: primary
    }
  };
  
  const pieChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(163, 123, 237, ${opacity})`,
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader
        title="Sales Analytics"
        subtitle="Track sales performance and visualize data trends."
        rightComponent={
          <Button
            title="Export"
            variant="outline"
            size="small"
            leftIcon={<Download size={16} color={textColor} />}
          />
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.timeRangeContainer}>
          <View style={[styles.timeRangeSelector, { borderColor }]}>
            <Calendar size={16} color={subtitleColor} />
            <Text style={[styles.timeRangeText, { color: textColor }]}>
              {timeRange}
            </Text>
            <ChevronDown size={16} color={subtitleColor} />
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: `${primary}20` }]}>
              <DollarSign size={20} color={primary} />
            </View>
            <Text style={[styles.statsValue, { color: textColor }]}>$12,458</Text>
            <Text style={[styles.statsLabel, { color: subtitleColor }]}>Total Revenue</Text>
            <View style={[styles.statsTrend, { backgroundColor: '#4CAF5020' }]}>
              <TrendingUp size={12} color="#4CAF50" />
              <Text style={[styles.statsTrendText, { color: '#4CAF50' }]}>+12.5%</Text>
            </View>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: `${secondary}20` }]}>
              <ShoppingCart size={20} color={secondary} />
            </View>
            <Text style={[styles.statsValue, { color: textColor }]}>345</Text>
            <Text style={[styles.statsLabel, { color: subtitleColor }]}>Total Orders</Text>
            <View style={[styles.statsTrend, { backgroundColor: '#4CAF5020' }]}>
              <TrendingUp size={12} color="#4CAF50" />
              <Text style={[styles.statsTrendText, { color: '#4CAF50' }]}>+8.3%</Text>
            </View>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: '#F9731620' }]}>
              <Package2 size={20} color="#F97316" />
            </View>
            <Text style={[styles.statsValue, { color: textColor }]}>1,248</Text>
            <Text style={[styles.statsLabel, { color: subtitleColor }]}>Items Sold</Text>
            <View style={[styles.statsTrend, { backgroundColor: '#4CAF5020' }]}>
              <TrendingUp size={12} color="#4CAF50" />
              <Text style={[styles.statsTrendText, { color: '#4CAF50' }]}>+15.2%</Text>
            </View>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, { backgroundColor: '#3B82F620' }]}>
              <Users size={20} color="#3B82F6" />
            </View>
            <Text style={[styles.statsValue, { color: textColor }]}>84</Text>
            <Text style={[styles.statsLabel, { color: subtitleColor }]}>New Customers</Text>
            <View style={[styles.statsTrend, { backgroundColor: '#4CAF5020' }]}>
              <TrendingUp size={12} color="#4CAF50" />
              <Text style={[styles.statsTrendText, { color: '#4CAF50' }]}>+5.7%</Text>
            </View>
          </Card>
        </View>
        
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: textColor }]}>
                Sales Overview
              </Text>
              <Text style={[styles.chartSubtitle, { color: subtitleColor }]}>
                Daily revenue for the current week
              </Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: primary }]} />
                <Text style={[styles.legendText, { color: subtitleColor }]}>Revenue</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={salesData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </Card>
        
        <View style={styles.chartRow}>
          <Card style={[styles.chartCard, styles.halfChart]}>
            <Text style={[styles.chartTitle, { color: textColor }]}>
              Sales by Category
            </Text>
            <Text style={[styles.chartSubtitle, { color: subtitleColor }]}>
              Product distribution
            </Text>
            
            <View style={styles.pieChartContainer}>
              <RNPieChart
                data={pieChartData}
                width={screenWidth * 0.4}
                height={180}
                chartConfig={pieChartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
              />
            </View>
          </Card>
          
          <Card style={[styles.chartCard, styles.halfChart]}>
            <Text style={[styles.chartTitle, { color: textColor }]}>
              Top Products
            </Text>
            <Text style={[styles.chartSubtitle, { color: subtitleColor }]}>
              Best selling items
            </Text>
            
            <View style={styles.topProductsContainer}>
              {[
                { name: 'Chocolate Bar', sales: 324, percent: 15 },
                { name: 'Gummy Bears', sales: 256, percent: 12 },
                { name: 'Sour Strips', sales: 198, percent: 9 },
                { name: 'Lollipops', sales: 154, percent: 7 },
              ].map((product, index) => (
                <View key={index} style={styles.topProduct}>
                  <Text style={[styles.topProductName, { color: textColor }]}>
                    {product.name}
                  </Text>
                  <Text style={[styles.topProductSales, { color: subtitleColor }]}>
                    {product.sales} sold
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { 
                          width: `${product.percent * 5}%`, 
                          backgroundColor: index === 0 ? primary : 
                                          index === 1 ? secondary : 
                                          index === 2 ? '#F97316' : '#3B82F6'
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginHorizontal: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 8,
  },
  statsCard: {
    width: '50%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  statsTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statsTrendText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  chartLegend: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  halfChart: {
    flex: 1,
    marginHorizontal: 8,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  topProductsContainer: {
    marginTop: 16,
  },
  topProduct: {
    marginBottom: 12,
  },
  topProductName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  topProductSales: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginBottom: 6,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});