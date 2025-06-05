import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserPlus, Search, CreditCard as Edit, Trash2, Shield, User, Mail } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

// Sample data for demonstration
const sampleUsers = [
  { id: '1', email: 'admin@example.com', full_name: 'Admin User', role: 'admin', last_login: '2025-06-02' },
  { id: '2', email: 'manager@example.com', full_name: 'Store Manager', role: 'manager', last_login: '2025-06-01' },
  { id: '3', email: 'employee1@example.com', full_name: 'John Employee', role: 'staff', last_login: '2025-05-30' },
  { id: '4', email: 'employee2@example.com', full_name: 'Jane Employee', role: 'staff', last_login: '2025-05-28' },
];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
  const [isLoading, setIsLoading] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const borderColor = useThemeColor({}, 'border');
  const primary = useThemeColor({}, 'primary');
  const error = useThemeColor({}, 'error');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual Supabase query
      // const { data, error } = await supabase
      //   .from('user_profiles')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // if (data) setFilteredUsers(data);
      
      // Using sample data for now
      setFilteredUsers(sampleUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredUsers(sampleUsers);
    } else {
      const filtered = sampleUsers.filter(
        user => 
          user.full_name.toLowerCase().includes(text.toLowerCase()) ||
          user.email.toLowerCase().includes(text.toLowerCase()) ||
          user.role.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          color: '#A37BED',
          backgroundColor: '#A37BED20',
          icon: Shield,
        };
      case 'manager':
        return {
          color: '#3B82F6',
          backgroundColor: '#3B82F620',
          icon: User,
        };
      default:
        return {
          color: '#4CAF50',
          backgroundColor: '#4CAF5020',
          icon: User,
        };
    }
  };
  
  const renderUserItem = ({ item }: { item: typeof sampleUsers[0] }) => {
    const { color, backgroundColor: roleBgColor, icon: RoleIcon } = getRoleStyles(item.role);
    
    return (
      <Card style={styles.userCard}>
        <View style={styles.userContent}>
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <View style={[styles.avatarContainer, { backgroundColor: `${color}40` }]}>
                <Text style={[styles.avatarText, { color }]}>
                  {item.full_name.charAt(0).toUpperCase()}
                </Text>
              </View>
              
              <View style={styles.userDetails}>
                <Text style={[styles.userName, { color: textColor }]}>{item.full_name}</Text>
                <View style={styles.emailContainer}>
                  <Mail size={12} color={subtitleColor} />
                  <Text style={[styles.userEmail, { color: subtitleColor }]}>{item.email}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.userMeta}>
              <View style={[styles.roleBadge, { backgroundColor: roleBgColor }]}>
                <RoleIcon size={12} color={color} />
                <Text style={[styles.roleText, { color }]}>
                  {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                </Text>
              </View>
              
              <Text style={[styles.lastLogin, { color: subtitleColor }]}>
                Last login: {item.last_login}
              </Text>
            </View>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity style={[styles.actionButton, { borderColor }]}>
              <Edit size={16} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { borderColor }]}>
              <Trash2 size={16} color={error} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader
        title="Users Management"
        subtitle="View and manage registered store owners and administrators."
        rightComponent={
          <Button
            title="Add User"
            size="small"
            leftIcon={<UserPlus size={16} color="white" />}
          />
        }
      />
      
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
          containerStyle={styles.searchInput}
          leftIcon={<Search size={18} color={subtitleColor} />}
        />
      </View>
      
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: textColor }]}>
              No users found.
            </Text>
          </View>
        }
      />
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
  userCard: {
    marginBottom: 12,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  lastLogin: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  userActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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