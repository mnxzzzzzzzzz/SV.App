import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { merchants } from "../src/data/merchants/mock";
import { useAuth } from "../src/contexts/AuthContext";

type MerchantWithStatus = (typeof merchants)[0] & {
  eligible: boolean;
  alreadyUsed: boolean;
};

export default function SVPayScreen() {
  const { userEmail } = useAuth();
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);

  const merchantsWithStatus: MerchantWithStatus[] = merchants.map((m) => ({
    ...m,
    eligible: true, // In real app, check user's Pro status
    alreadyUsed: Math.random() > 0.7, // Mock: some merchants already used today
  }));

  const handleBack = () => {
    router.back();
  };

  const handleTapToPay = (merchantId: string, merchantName: string) => {
    const merchant = merchantsWithStatus.find((m) => m.id === merchantId);
    
    if (merchant?.alreadyUsed) {
      alert(
        "Already used today\n\nTry QR redemption or visit another merchant"
      );
      return;
    }

    if (!merchant?.eligible) {
      alert("Not eligible\n\nUpgrade to Pro for tap-to-pay access");
      return;
    }

    alert(`Processing tap-to-pay at ${merchantName}...\n\nDiscount applied!`);
    // In real app: initiate NFC/payment processor
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>💳 SV Pay</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Intro */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Tap to activate discount</Text>
        <Text style={styles.introSubtitle}>Select a partner below:</Text>
      </View>

      {/* Merchants List */}
      <FlatList
        data={merchantsWithStatus}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.merchantCard,
              selectedMerchant === item.id && styles.merchantCardSelected,
            ]}
            onPress={() =>
              setSelectedMerchant(
                selectedMerchant === item.id ? null : item.id
              )
            }
          >
            <View style={styles.merchantHeader}>
              <View style={styles.merchantNameSection}>
                <Text style={styles.merchantName}>{item.name}</Text>
                <Text style={styles.merchantDistance}>[{item.distance}]</Text>
              </View>
              {item.alreadyUsed && (
                <Text style={styles.usedBadge}>✓ Used today</Text>
              )}
            </View>

            <Text style={styles.eligibilityText}>
              {item.alreadyUsed ? "❌ Already used" : `✅ Eligible: ${item.offer}`}
            </Text>

            {!item.alreadyUsed && (
              <Pressable
                style={styles.tapButton}
                onPress={() => handleTapToPay(item.id, item.name)}
              >
                <Text style={styles.tapButtonText}>📱 Tap phone to pay</Text>
              </Pressable>
            )}

            {item.alreadyUsed && (
              <Pressable
                style={styles.fallbackButton}
                onPress={() => router.push("/qr")}
              >
                <Text style={styles.fallbackButtonText}>Try QR instead</Text>
              </Pressable>
            )}
          </Pressable>
        )}
      />

      {/* How It Works */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ How SV Pay works:</Text>
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Select partner</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Check eligibility</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Tap phone at payment</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>4</Text>
            <Text style={styles.stepText}>Discount applies automatically</Text>
          </View>
        </View>

        <View style={styles.fallbackWarning}>
          <Text style={styles.warningText}>
            ⚠️ Already used today? Try QR redemption for other merchants
          </Text>
        </View>
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
  introSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  introSubtitle: {
    fontSize: 13,
    color: "#B0B3C7",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  merchantCard: {
    backgroundColor: "#101534",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  merchantCardSelected: {
    borderColor: "#2962FF",
  },
  merchantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  merchantNameSection: {
    flex: 1,
  },
  merchantName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  merchantDistance: {
    fontSize: 12,
    color: "#8A8FB3",
  },
  usedBadge: {
    fontSize: 12,
    color: "#B0B3C7",
    backgroundColor: "#2C3158",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  eligibilityText: {
    fontSize: 13,
    color: "#B0B3C7",
    marginBottom: 10,
  },
  tapButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tapButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  fallbackButton: {
    backgroundColor: "#2C315850",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3158",
  },
  fallbackButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#B0B3C7",
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#101534",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  stepContainer: {
    marginBottom: 12,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2962FF",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 24,
    marginRight: 10,
  },
  stepText: {
    fontSize: 12,
    color: "#B0B3C7",
    flex: 1,
  },
  fallbackWarning: {
    backgroundColor: "#2C315850",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FFB800",
  },
  warningText: {
    fontSize: 12,
    color: "#B0B3C7",
    lineHeight: 16,
  },
});
