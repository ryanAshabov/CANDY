import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ShoppingBag, Search, Eye, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

// Order status options with their associated colors
const ORDER_STATUS = {
  pending: { label: 'Pending', color: '#F97316', icon: Clock },
  processing: { label: 'Processing', color: '#3B82F6', icon: Clock },
  shipped: { label: 'Shipped', color: '#A37BED', icon: ShoppingBag },
  delivered: { label: 'Delivered', color: '#4CAF50', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: '#EF4444', icon: XCircle },
};

// Sample data for demonstration
const sampleOrders = [
  { id: '1', customer_name: 'John Doe', total: 24.99, status: 'pending', date: '2025-06-02', items: 3 },
  { id: '2', customer_name: 'Jane Smith', total: 47.50, status: 'shipped', date: '2025-06-01', items: 5 },
  { id: '3', customer_name: 'Mike Johnson', total: 12.75, status: 'delivered', date: '2025-05-30', items: 2 },
  { id: '4', customer_name: 'Sarah Williams', total: 38.20, status: 'processing', date: '2025-06-02', items: 4 },
  { id: '5', customer_name: 'Alex Brown', total: 19.99, status: 'cancelled', date: '2025-05-29', items: 1 },
];

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [isLoading, setIsLoading] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const borderColor = useThemeColor({}, 'border');
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual Supabase query
      // const { data, error } = await supabase
      //   .from('orders')
      //   .select('*, user_profiles(full_name)')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // if (data) setFilteredOrders(data);
      
      // Using sample data for now
      setFilteredOrders(sampleOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredOrders(sampleOrders);
    } else {
      const filtered = sampleOrders.filter(
        order => 
          order.customer_name.toLowerCase().includes(text.toLowerCase()) ||
          order.id.includes(text)
      );
      setFilteredOrders(filtered);
    }
  };
  
  const getStatusStyles = (status: string) => {
    const statusConfig = ORDER_STATUS[status as keyof typeof ORDER_STATUS] || ORDER_STATUS.pending;
    
    return {
      color: statusConfig.color,
      StatusIcon: statusConfig.icon,
      label: statusConfig.label,
    };
  };
  
  const renderOrderItem = ({ item }: { item: typeof sampleOrders[0] }) => {
    const { color, StatusIcon, label } = getStatusStyles(item.status);
    
    return (
      <Card style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={[styles.orderNumber, { color: textColor }]}>Order #{item.id}</Text>
            <Text style={[styles.customerName, { color: subtitleColor }]}>{item.customer_name}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
            <StatusIcon size={14} color={color} />
            <Text style={[styles.statusText, { color }]}>{label}</Text>
          </View>
        </View>
        
        <View style={[styles.orderDivider, { backgroundColor: borderColor }]} />
        
        <View style={styles.orderDetails}>
          <View style={styles.orderInfo}>
            <Text style={[styles.orderInfoLabel, { color: subtitleColor }]}>Date</Text>
            <Text style={[styles.orderInfoValue, { color: textColor }]}>{item.date}</Text>
          </View>
          
          <View style={styles.orderInfo}>
            <Text style={[styles.orderInfoLabel, { color: subtitleColor }]}>Items</Text>
            <Text style={[styles.orderInfoValue, { color: textColor }]}>{item.items}</Text>
          </View>
          
          <View style={styles.orderInfo}>
            <Text style={[styles.orderInfoLabel, { color: subtitleColor }]}>Total</Text>
            <Text style={[styles.orderInfoValue, { color: textColor }]}>${item.total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.viewButton, { borderColor }]}
            onPress={() => console.log('View order details', item.id)}
          >
            <Eye size={16} color={textColor} />
            <Text style={[styles.viewButtonText, { color: textColor }]}>View</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader
        title="Orders Management"
        subtitle="View and manage all incoming orders from customers."
      />
      
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search by customer or order #..."
          value={searchQuery}
          onChangeText={handleSearch}
          containerStyle={styles.searchInput}
          leftIcon={<Search size={18} color={subtitleColor} />}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A37BED" />
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: textColor }]}>
                No orders found.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchInput: {
    marginBottom: 0,
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  orderDivider: {
    height: 1,
    marginBottom: 12,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderInfoLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});