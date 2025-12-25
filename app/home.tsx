"use client"

import { router, useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import BottomNav from "../src/components/BottomNav"
import { useAuth } from "../src/contexts/AuthContext"

function StudentVerseLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={require("../assets/images/studentverse-logo.svg")} style={styles.logoImage} resizeMode="contain" />
    </View>
  )
}

const SMART_SAVE_DEALS = [
  {
    id: "1",
    merchant: "Starbucks",
    logo: "☕",
    discount: "25% OFF",
    distance: "150m",
    badge: "Morning Deals",
  },
  {
    id: "2",
    merchant: "McDonald's",
    logo: "🍔",
    discount: "20% OFF",
    distance: "250m",
    badge: "Lunch Only",
  },
  {
    id: "3",
    merchant: "VOX Cinemas",
    logo: "🎬",
    discount: "50% OFF",
    distance: "300m",
    badge: "Movie Night",
  },
  {
    id: "4",
    merchant: "KFC",
    logo: "🍗",
    discount: "Buy 1 Get 1 Free",
    distance: "",
    badge: "Popular Now",
  },
]

const NEARBY_OFFERS = [
  {
    id: "1",
    name: "Shake Shack",
    logo: "🍔",
    discount: "15% OFF",
    category: "Burgers",
    validity: "1/day",
    expiry: "23:59",
    distance: "200m",
  },
  {
    id: "2",
    name: "FunZone Arcade",
    logo: "🎮",
    discount: "50% OFF",
    category: "Games",
    validity: "1/day",
    expiry: "23:59",
    distance: "350m",
  },
  {
    id: "3",
    name: "Nando's",
    logo: "🍗",
    discount: "AED 20 OFF",
    category: "",
    validity: "1/day",
    expiry: "23:59",
    distance: "480m",
  },
]

export default function HomeScreen() {
  const { userEmail } = useAuth()
  const [activeTab, setActiveTab] = useState<"Nearby" | "Trending" | "All">("Nearby")

  useFocusEffect(
    useCallback(() => {
      // Reset any navigation state
    }, []),
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profilePic}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
            <View style={styles.universityBadge}>
              <Text style={styles.universityText}>UOWD</Text>
            </View>
          </View>

          <View style={styles.logoContainer}>
            <StudentVerseLogo />
          </View>

          <View style={styles.headerRight}>
            <Pressable style={styles.langButton}>
              <Text style={styles.langText}>AR</Text>
            </Pressable>
            <Pressable style={[styles.langButton, styles.langButtonActive]}>
              <Text style={[styles.langText, styles.langTextActive]}>EN</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.smartSaveSection}>
          <Text style={styles.smartSaveTitle}>Smart Save — Use now</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dealsScroll}
            contentContainerStyle={styles.dealsContainer}
          >
            {SMART_SAVE_DEALS.map((deal) => (
              <Pressable key={deal.id} style={styles.dealCard}>
                <View style={styles.dealLogo}>
                  <Text style={styles.dealLogoText}>{deal.logo}</Text>
                </View>
                <Text style={styles.dealDiscount}>{deal.discount}</Text>
                <Text style={styles.dealDistance}>{deal.distance}</Text>
                <Text style={styles.dealBadge}>{deal.badge}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={styles.useNowButton}>
            <Text style={styles.useNowButtonText}>Use Now</Text>
          </Pressable>
        </View>

        <View style={styles.tabs}>
          {(["Nearby", "Trending", "All"] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </Pressable>
          ))}
        </View>

        <View style={styles.offersList}>
          {NEARBY_OFFERS.map((offer) => (
            <View key={offer.id} style={styles.offerCard}>
              <View style={styles.offerLeft}>
                <View style={styles.offerLogo}>
                  <Text style={styles.offerLogoText}>{offer.logo}</Text>
                </View>
                <View style={styles.offerInfo}>
                  <Text style={styles.offerName}>{offer.name}</Text>
                  <Text style={styles.offerDetails}>
                    <Text style={styles.offerDiscount}>{offer.discount}</Text>
                    {offer.category && (
                      <>
                        {" "}
                        <Text style={styles.offerCategory}>{offer.category}</Text>
                      </>
                    )}
                    {" · "}
                    <Text style={styles.offerValidity}>{offer.validity}</Text>
                    {" · "}
                    <Text style={styles.offerExpiry}>Expires {offer.expiry}</Text>
                    {" · "}
                    <Text style={styles.offerDistance}>{offer.distance}</Text>
                  </Text>
                </View>
              </View>
              <Pressable style={styles.useButton} onPress={() => router.push("/qr")}>
                <Text style={styles.useButtonText}>Use</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.passportCard}>
            <View style={styles.passportLeft}>
              <View style={styles.passportIcon}>
                <Text style={styles.passportIconText}>🎫</Text>
              </View>
              <Text style={styles.passportText}>
                Freshers Passport <Text style={styles.passportStamps}>3 / 5 Stamps</Text>{" "}
                <Text style={styles.passportUnlock}>- Unlock 1 Month Pro</Text>
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <Pressable style={styles.orbitCard} onPress={() => router.push("/orbit")}>
            <View style={styles.orbitIcon}>
              <Text style={styles.orbitIconText}>🛰️</Text>
            </View>
            <Text style={styles.orbitText}>Tell me your vibe — I'll plan the night ✨</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav currentRoute="/home" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080C1F",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E2A4A",
    alignItems: "center",
    justifyContent: "center",
  },
  profileEmoji: {
    fontSize: 20,
  },
  universityBadge: {
    backgroundColor: "#1E2A4A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2962FF",
  },
  universityText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: "Inter_600SemiBold",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 140,
    height: 24,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2E3A5A",
    backgroundColor: "transparent",
  },
  langButtonActive: {
    backgroundColor: "#1E2A4A",
    borderColor: "#2962FF",
  },
  langText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  langTextActive: {
    color: "#FFFFFF",
  },
  smartSaveSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  smartSaveTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Inter_600SemiBold",
  },
  dealsScroll: {
    marginBottom: 16,
  },
  dealsContainer: {
    gap: 12,
    paddingRight: 20,
  },
  dealCard: {
    width: 120,
    backgroundColor: "#1E2A4A",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2E3A5A",
  },
  dealLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2E3A5A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  dealLogoText: {
    fontSize: 28,
  },
  dealDiscount: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
    fontFamily: "Inter_700Bold",
  },
  dealDistance: {
    color: "#94A3B8",
    fontSize: 11,
    marginBottom: 6,
    fontFamily: "Inter_400Regular",
  },
  dealBadge: {
    color: "#FFB800",
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  useNowButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
  },
  useNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 24,
    marginBottom: 20,
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#2962FF",
    borderRadius: 1,
  },
  offersList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E2A4A",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2E3A5A",
  },
  offerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  offerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E3A5A",
    alignItems: "center",
    justifyContent: "center",
  },
  offerLogoText: {
    fontSize: 24,
  },
  offerInfo: {
    flex: 1,
  },
  offerName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Inter_600SemiBold",
  },
  offerDetails: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
  },
  offerDiscount: {
    color: "#2962FF",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  offerCategory: {
    color: "#94A3B8",
  },
  offerValidity: {
    color: "#94A3B8",
  },
  offerExpiry: {
    color: "#94A3B8",
  },
  offerDistance: {
    color: "#94A3B8",
  },
  useButton: {
    backgroundColor: "#2962FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  useButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  passportCard: {
    backgroundColor: "#1E2A4A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFB800",
    marginTop: 8,
  },
  passportLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  passportIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#FFB800",
    alignItems: "center",
    justifyContent: "center",
  },
  passportIconText: {
    fontSize: 20,
  },
  passportText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Inter_500Medium",
  },
  passportStamps: {
    color: "#FFB800",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  passportUnlock: {
    color: "#94A3B8",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#2E3A5A",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#FFB800",
    borderRadius: 3,
  },
  orbitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A4A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2E3A5A",
    marginTop: 12,
  },
  orbitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2962FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  orbitIconText: {
    fontSize: 24,
  },
  orbitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Inter_500Medium",
  },
})
