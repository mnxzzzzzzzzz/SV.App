import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useCountdown } from "../src/hooks/useCountdown";
import { useMockProof } from "../src/hooks/useMockProof";

export default function QRScreen() {
  const { width } = useWindowDimensions();
  const timeLeft = useCountdown(30);
  const refreshKey = Math.floor(timeLeft / 30);
  const { otp, qrValue } = useMockProof(refreshKey);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const ringOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 30000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotateAnim]);

  useEffect(() => {
    if (timeLeft <= 5) {
      Animated.sequence([
        Animated.timing(ringOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [timeLeft, ringOpacity]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const formatOTP = (otp: string) => {
    return otp.split("").join(" ");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Show to cashier</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Merchant Info */}
      <View style={styles.merchantInfo}>
        <Text style={styles.merchantName}>🏪 Costa Coffee</Text>
        <Text style={styles.merchantOffer}>20% off all drinks</Text>
      </View>

      {/* QR Code with Animated Ring */}
      <View style={styles.qrContainer}>
        <Animated.View
          style={[
            styles.timerRing,
            {
              transform: [{ rotate: rotation }],
              opacity: ringOpacity,
            },
          ]}
        />
        <View style={styles.qrBox}>
          <QRCode value={qrValue} size={220} />
        </View>
      </View>

      {/* Backup Code */}
      <View style={styles.backupSection}>
        <Text style={styles.backupLabel}>Backup Code</Text>
        <Text style={styles.backupCode}>{formatOTP(otp)}</Text>
        <View style={styles.divider} />
        <Text style={styles.timerText}>Refreshes in {timeLeft}s</Text>
      </View>

      {/* Rules Reminder */}
      <View style={styles.rulesSection}>
        <Text style={styles.rulesIcon}>📋</Text>
        <Text style={styles.rulesText}>
          1 use/day • Expires 23:59
        </Text>
      </View>

      {/* Fallback Instructions */}
      <View style={styles.instructionsSection}>
        <Text style={styles.instructionsText}>
          ⚠️ If QR fails, show backup code to cashier
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080C1F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1F3A",
  },
  backButton: {
    fontSize: 14,
    color: "#2962FF",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  merchantInfo: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 12,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  merchantOffer: {
    fontSize: 13,
    color: "#B0B3C7",
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    position: "relative",
  },
  timerRing: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 3,
    borderColor: "#2962FF",
    opacity: 0.8,
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    zIndex: 10,
  },
  backupSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  backupLabel: {
    fontSize: 12,
    color: "#B0B3C7",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  backupCode: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2962FF",
    letterSpacing: 4,
    marginBottom: 10,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#2C3158",
    marginVertical: 10,
  },
  timerText: {
    fontSize: 12,
    color: "#8A8FB3",
    fontWeight: "500",
  },
  rulesSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rulesIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  rulesText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  instructionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#2C315820",
    marginHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFB800",
  },
  instructionsText: {
    fontSize: 12,
    color: "#B0B3C7",
    lineHeight: 18,
  },
});
