import { useEffect } from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { MonitoringProvider } from '@/contexts/MonitoringContext';
import { View } from 'react-native';
import { FloatingChatButton } from '@/components/FloatingChatButton';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <MonitoringProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chatbot" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <GlobalChatButtonOverlay />
        <StatusBar style="light" />
      </MonitoringProvider>
    </AuthProvider>
  );
}

function GlobalChatButtonOverlay() {
  const pathname = usePathname();
  const router = useRouter();
  const hidden = pathname?.includes('/chatbot');
  if (hidden) return null;
  return (
    <View pointerEvents="box-none" style={{ flex: 1 }}>
      <FloatingChatButton onPress={() => router.push('/chatbot' as any)} />
    </View>
  );
}
