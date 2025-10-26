import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Baby, Video, Bell, Settings as SettingsIcon, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useMonitoring } from '@/contexts/MonitoringContext';
import { GlassCard } from '@/components/GlassCard';
import { theme } from '@/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const { devices, isMonitoring, unreadCount } = useMonitoring();

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Baby size={32} color={theme.colors.primary} />
            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isMonitoring ? theme.colors.success : theme.colors.textSecondary },
                ]}
              />
              <Text style={styles.statusText}>
                {isMonitoring ? 'Monitoring Active' : 'No Active Device'}
              </Text>
            </View>
          </View>
          <Text style={styles.statusDescription}>
            {devices.length > 0
              ? `${devices.length} device${devices.length > 1 ? 's' : ''} connected`
              : 'No devices connected'}
          </Text>
        </GlassCard>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/monitoring')}
            style={styles.actionCardWrapper}
          >
            <GlassCard style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Video size={32} color={theme.colors.primary} />
              </View>
              <Text style={styles.actionTitle}>Monitoring</Text>
              <Text style={styles.actionSubtitle}>View live feed</Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            style={styles.actionCardWrapper}
          >
            <GlassCard style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Bell size={32} color={theme.colors.primary} />
                {unreadCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.actionTitle}>Notifications</Text>
              <Text style={styles.actionSubtitle}>
                {unreadCount > 0 ? `${unreadCount} new` : 'View history'}
              </Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.actionCardWrapper}
          >
            <GlassCard style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <SettingsIcon size={32} color={theme.colors.primary} />
              </View>
              <Text style={styles.actionTitle}>Settings</Text>
              <Text style={styles.actionSubtitle}>Manage account</Text>
            </GlassCard>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  name: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  statusCard: {
    marginBottom: theme.spacing.xl,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  statusDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCardWrapper: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  actionCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(1, 204, 102, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    position: 'relative',
  },
  actionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  actionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  notificationBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
  },
});
