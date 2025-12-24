import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryFilter from "../src/components/CategoryFilter";
import MerchantCard from "../src/components/MerchantCard";
import ReferralCard from "../src/components/ReferralCard";
import TopPicksCarousel from "../src/components/TopPicksCarousel";
import { merchants } from "../src/data/merchants/mock";
import { useAuth } from "../src/contexts/AuthContext";

const CATEGORIES = [
  { id: "coffee", name: "Coffee", emoji: "☕" },
  { id: "food", name: "Food", emoji: "🍕" },
  { id: "entertainment", name: "Entertainment", emoji: "🎬" },
  { id: "shopping", name: "Shopping", emoji: "🛍️" },
  { id: "services", name: "Services", emoji: "🔧" },
];

const TOP_PICKS = [
  { id: "1", name: "Costa Coffee", offer: "20% off", icon: "☕" },
  { id: "2", name: "Papa Johns", offer: "BOGO", icon: "🍕" },
  { id: "3", name: "VOX Cinemas", offer: "Student AED25", icon: "🎬" },
];

export default function HomeScreen() {
  const { userEmail, logout } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      // Reset any navigation state
    }, [])
  );

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTopPickPress = () => {
    router.push("/qr");
  };

  const handleMerchantPress = () => {
    router.push("/qr");
  };

  const headerContent = (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <Text style={styles.welcomeText}>👤 Welcome back</Text>
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>↪️ Logout</Text>
        </Pressable>
      </View>
      <Text style={styles.userEmail}>{userEmail}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={merchants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {headerContent}
            <ReferralCard friendsReferred={2} totalFriends={5} />
            <TopPicksCarousel
              items={TOP_PICKS}
              onPress={handleTopPickPress}
            />
            <CategoryFilter
              categories={CATEGORIES}
              selected={selectedCategories}
              onSelect={handleSelectCategory}
            />
            <View style={styles.offersHeader}>
              <Text style={styles.offersTitle}>📍 NEARBY OFFERS</Text>
              <Pressable>
                <Text style={styles.mapViewText}>Map view</Text>
              </Pressable>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <MerchantCard
            merchant={item}
            onPress={handleMerchantPress}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080C1F",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutButtonText: {
    fontSize: 14,
    color: "#2962FF",
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 13,
    color: "#B0B3C7",
  },
  offersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  offersTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  mapViewText: {
    fontSize: 12,
    color: "#2962FF",
    fontWeight: "500",
  },
});
