import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react-native';

type ProfileDropdownProps = {
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
};

export default function ProfileDropdown({ 
  onNavigateToProfile,
  onNavigateToSettings
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const borderColor = useThemeColor({}, 'border');
  
  const { session, signOut } = useAuth();
  const router = useRouter();
  
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleProfilePress = () => {
    setIsOpen(false);
    if (onNavigateToProfile) {
      onNavigateToProfile();
    } else {
      router.push('/(app)/(tabs)/users');
    }
  };
  
  const handleSettingsPress = () => {
    setIsOpen(false);
    if (onNavigateToSettings) {
      onNavigateToSettings();
    }
  };
  
  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.replace('/(auth)/login');
  };
  
  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={handleToggleDropdown}
      >
        <View style={styles.profileImageContainer}>
          <Text style={styles.profileInitial}>
            {session?.user?.email?.[0].toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: textColor }]}>
            Admin User
          </Text>
          <Text style={[styles.profileEmail, { color: subtitleColor }]} numberOfLines={1}>
            {session?.user?.email || 'admin@example.com'}
          </Text>
        </View>
        <ChevronDown size={16} color={subtitleColor} />
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
          <View 
            style={[
              styles.dropdown, 
              { 
                backgroundColor: cardColor,
                borderColor,
                top: 70,
                right: 16,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleProfilePress}
            >
              <User size={16} color={textColor} />
              <Text style={[styles.dropdownText, { color: textColor }]}>
                My Profile
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleSettingsPress}
            >
              <Settings size={16} color={textColor} />
              <Text style={[styles.dropdownText, { color: textColor }]}>
                Settings
              </Text>
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: borderColor }]} />
            
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleSignOut}
            >
              <LogOut size={16} color="#EF4444" />
              <Text style={[styles.dropdownText, { color: '#EF4444' }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  profileImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  profileInfo: {
    marginRight: 4,
    maxWidth: 120,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  profileEmail: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    width: 200,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
});