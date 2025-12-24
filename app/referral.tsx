import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ReferralScreen() {
  const handleBack = () => {
    router.back();
  };

  const copyReferralCode = () => {
    // Future: Implement copy to clipboard
    alert("Referral code copied: STUDENT123");
  };

  const shareReferral = () => {
    // Future: Implement share functionality
    alert("Share your referral link with friends!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Refer Friends</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Your Referral Progress</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Friends Referred</Text>
          <Text style={styles.progressNumber}>2 / 5</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: "40%" }]} />
          </View>
          <Text style={styles.progressText}>3 more friends to unlock rewards</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Referral Code</Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Share this code with friends</Text>
          <Text style={styles.code}>STUDENT123</Text>
          <Pressable
            style={styles.copyButton}
            onPress={copyReferralCode}
          >
            <Text style={styles.copyButtonText}>📋 Copy Code</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Rewards</Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardItem}>✓ 1st Friend: 5% Bonus Discount</Text>
          <Text style={styles.rewardItem}>✓ 3rd Friend: AED 50 Credit</Text>
          <Text style={styles.rewardItem}>✓ 5th Friend: Premium Status</Text>
        </View>

        <Pressable
          style={styles.shareButton}
          onPress={shareReferral}
        >
          <Text style={styles.shareButtonText}>🔗 Share with Friends</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  progressCard: {
    backgroundColor: "#101534",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 12,
    color: "#B0B3C7",
    marginBottom: 8,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#1A1F3A",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2962FF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#8A8FB3",
  },
  codeCard: {
    backgroundColor: "#101534",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  codeLabel: {
    fontSize: 12,
    color: "#B0B3C7",
    marginBottom: 12,
  },
  code: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2962FF",
    letterSpacing: 2,
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  rewardCard: {
    backgroundColor: "#101534",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  rewardItem: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 10,
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
