import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';

export default function AppLayout() {
  const { session, isLoading } = useAuth();
  const primary = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');

  // Show a loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  // If not authenticated, redirect to the login page
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});