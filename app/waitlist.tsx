import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../src/contexts/AuthContext";

export default function WaitlistScreen() {
  const { userEmail, checkAccess, approveAccess } = useAuth();
  const [queuePosition, setQueuePosition] = useState(124);
  const [estimatedTime, setEstimatedTime] = useState("Tomorrow 2 PM");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAccess = async () => {
    setIsChecking(true);
    const hasAccess = await checkAccess();
    setIsChecking(false);

    if (hasAccess) {
      approveAccess();
    } else {
      alert("Still processing your verification. Check back soon!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>🎉</Text>
        <Text style={styles.headerText}>You're on the waitlist!</Text>
      </View>

      {/* Email */}
      <View style={styles.emailSection}>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>

      {/* Verification Message */}
      <View style={styles.verificationSection}>
        <Text style={styles.verificationTitle}>
          We're verifying your student status.
        </Text>
        <Text style={styles.verificationSubtitle}>
          This usually takes 24-48 hours.
        </Text>
      </View>

      {/* What Happens Next */}
      <View style={styles.stepsCard}>
        <Text style={styles.stepsTitle}>📋 What happens next:</Text>
        <View style={styles.stepItem}>
          <Text style={styles.stepBullet}>•</Text>
          <Text style={styles.stepText}>Email verification</Text>
        </View>
        <View style={styles.stepItem}>
          <Text style={styles.stepBullet}>•</Text>
          <Text style={styles.stepText}>University confirmation</Text>
        </View>
        <View style={styles.stepItem}>
          <Text style={styles.stepBullet}>•</Text>
          <Text style={styles.stepText}>Access activation</Text>
        </View>
      </View>

      {/* Queue Position & Estimate */}
      <View style={styles.queueCard}>
        <View style={styles.queueItem}>
          <Text style={styles.queueLabel}>🎓 Students ahead of you</Text>
          <Text style={styles.queueValue}>{queuePosition}</Text>
        </View>
        <View style={styles.dividerLine} />
        <View style={styles.queueItem}>
          <Text style={styles.queueLabel}>🕐 Estimated access time</Text>
          <Text style={styles.queueValue}>{estimatedTime}</Text>
        </View>
      </View>

      {/* Check Status Button */}
      <Pressable
        style={[styles.checkButton, isChecking && styles.checkButtonLoading]}
        onPress={handleCheckAccess}
        disabled={isChecking}
      >
        <Text style={styles.checkButtonText}>
          {isChecking ? "Checking..." : "Check access status"}
        </Text>
      </Pressable>

      {/* Notification Toggle */}
      <View style={styles.notificationSection}>
        <View style={styles.notificationLabel}>
          <Text style={styles.notificationIcon}>📧</Text>
          <Text style={styles.notificationText}>Notify me when ready</Text>
        </View>
        <Pressable
          style={[
            styles.toggle,
            notificationEnabled && styles.toggleEnabled,
          ]}
          onPress={() => setNotificationEnabled(!notificationEnabled)}
        >
          <View
            style={[
              styles.toggleThumb,
              notificationEnabled && styles.toggleThumbEnabled,
            ]}
          />
        </Pressable>
      </View>

      {/* Info Footer */}
      <View style={styles.infoFooter}>
        <Text style={styles.infoText}>
          💡 Pro tip: Check your email regularly. We'll send you updates!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C1F",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emailSection: {
    backgroundColor: "#101534",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    alignItems: "center",
  },
  emailText: {
    fontSize: 14,
    color: "#B0B3C7",
  },
  verificationSection: {
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  verificationSubtitle: {
    fontSize: 13,
    color: "#B0B3C7",
    lineHeight: 19,
  },
  stepsCard: {
    backgroundColor: "#101534",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  stepBullet: {
    fontSize: 14,
    color: "#B0B3C7",
    marginRight: 10,
    marginTop: -2,
  },
  stepText: {
    fontSize: 12,
    color: "#B0B3C7",
    flex: 1,
  },
  queueCard: {
    backgroundColor: "#101534",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  queueItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  queueLabel: {
    fontSize: 12,
    color: "#B0B3C7",
  },
  queueValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2962FF",
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#2C3158",
    marginVertical: 8,
  },
  checkButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  checkButtonLoading: {
    opacity: 0.6,
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  notificationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#101534",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  notificationLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  notificationText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2C3158",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleEnabled: {
    backgroundColor: "#2962FF",
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  toggleThumbEnabled: {
    alignSelf: "flex-end",
  },
  infoFooter: {
    backgroundColor: "#2C315850",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFB800",
  },
  infoText: {
    fontSize: 12,
    color: "#B0B3C7",
    lineHeight: 16,
  },
});
