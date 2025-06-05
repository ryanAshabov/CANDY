import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

type OrderWithItems = Order & {
  items: OrderItem[];
};

export function useOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;
      
      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }
      
      // Get all order items for these orders
      const orderIds = ordersData.map(order => order.id);
      
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);
      
      if (itemsError) throw itemsError;
      
      // Combine orders with their items
      const ordersWithItems = ordersData.map(order => {
        const items = (itemsData || []).filter(item => item.order_id === order.id);
        return { ...order, items };
      });
      
      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (
    userId: string, 
    items: Array<{ product_id: string; quantity: number; price: number }>,
    total: number
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ user_id: userId, total, status: 'pending' }])
        .select()
        .single();
      
      if (orderError) throw orderError;
      if (!orderData) throw new Error('Failed to create order');
      
      // Then create the order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Refresh the orders list
      await fetchOrders();
      
      return { data: orderData, error: null };
    } catch (err) {
      console.error('Error adding order:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    addOrder,
    updateOrderStatus
  };
}