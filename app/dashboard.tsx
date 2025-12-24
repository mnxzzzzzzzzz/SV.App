import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Referral {
  name: string;
  status: "verified" | "pending" | "failed";
}

export default function DashboardScreen() {
  const [copied, setCopied] = useState(false);
  const referralLink = "studentverse.ae/ref/moiz123";
  
  const [referrals] = useState<Referral[]>([
    { name: "Ali", status: "verified" },
    { name: "Sara", status: "pending" },
    { name: "Ahmed", status: "failed" },
  ]);

  const friendsReferred = referrals.filter((r) => r.status === "verified").length;
  const totalNeeded = 5;
  const progressPercentage = (friendsReferred / totalNeeded) * 100;

  const handleCopyLink = () => {
    // In real app: use Clipboard API
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    router.back();
  };

  const getStatusIcon = (status: Referral["status"]) => {
    switch (status) {
      case "verified":
        return "✅";
      case "pending":
        return "🕐";
      case "failed":
        return "❌";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>🎯 {friendsReferred}/{totalNeeded} Friends Referred</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
          </View>

          <Text style={styles.rewardText}>
            🏆 Reward: 1 Month Pro (Value: AED 25)
          </Text>
        </View>

        {/* Share Link Section */}
        <View style={styles.shareLinkCard}>
          <Text style={styles.shareLinkLabel}>📱 Share your link:</Text>
          
          <View style={styles.linkBox}>
            <Text style={styles.linkText}>{referralLink}</Text>
          </View>

          <Pressable style={styles.copyButton} onPress={handleCopyLink}>
            <Text style={styles.copyButtonText}>
              {copied ? "✓ Copied!" : "Copy Link"}
            </Text>
          </Pressable>
        </View>

        {/* Referrals List */}
        <View style={styles.referralsSection}>
          <Text style={styles.referralsTitle}>👥 Your referrals:</Text>
          
          {referrals.length > 0 ? (
            referrals.map((referral, index) => (
              <View key={index} style={styles.referralItem}>
                <Text style={styles.referralName}>{referral.name}</Text>
                <Text style={styles.referralStatus}>
                  {getStatusIcon(referral.status)} {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReferralsText}>
              You haven't referred anyone yet. Share your link to get started!
            </Text>
          )}
        </View>

        {/* Share Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>📈 Friends join faster with:</Text>
          
          <Pressable style={styles.tipItem}>
            <Text style={styles.tipEmoji}>💬</Text>
            <Text style={styles.tipText}>Share on WhatsApp</Text>
          </Pressable>

          <Pressable style={styles.tipItem}>
            <Text style={styles.tipEmoji}>📸</Text>
            <Text style={styles.tipText}>Post Instagram story</Text>
          </Pressable>

          <Pressable style={styles.tipItem}>
            <Text style={styles.tipEmoji}>👥</Text>
            <Text style={styles.tipText}>Campus group chats</Text>
          </Pressable>
        </View>

        {/* Bonus Info */}
        <View style={styles.bonusSection}>
          <Text style={styles.bonusTitle}>🎁 Extra benefits:</Text>
          <Text style={styles.bonusText}>
            • Every 5 successful referrals = 1 Month Free Pro
          </Text>
          <Text style={styles.bonusText}>
            • Share your SV Clips for bonus Verse Points
          </Text>
          <Text style={styles.bonusText}>
            • Top referrer each month wins exclusive rewards!
          </Text>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 12,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#2C3158",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2962FF",
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
    color: "#B0B3C7",
    textAlign: "right",
  },
  rewardText: {
    fontSize: 12,
    color: "#B0B3C7",
  },
  shareLinkCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  shareLinkLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  linkBox: {
    backgroundColor: "#2C3158",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 11,
    color: "#2962FF",
    fontFamily: "monospace",
  },
  copyButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  referralsSection: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  referralsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  referralItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#2C3158",
    borderRadius: 6,
    marginBottom: 6,
  },
  referralName: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  referralStatus: {
    fontSize: 11,
    color: "#B0B3C7",
  },
  noReferralsText: {
    fontSize: 12,
    color: "#8A8FB3",
    textAlign: "center",
    paddingVertical: 16,
  },
  tipsSection: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  tipEmoji: {
    fontSize: 16,
    marginRight: 10,
  },
  tipText: {
    fontSize: 12,
    color: "#B0B3C7",
  },
  bonusSection: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
  },
  bonusTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  bonusText: {
    fontSize: 11,
    color: "#B0B3C7",
    lineHeight: 16,
    marginBottom: 6,
  },
});
