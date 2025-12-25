"use client"

import { router } from "expo-router"
import { useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { merchants } from "../src/data/merchants/mock"
import BottomNav from "../src/components/BottomNav"

type PlanOption = "budget" | "balanced" | "premium"

interface ItineraryItem {
  time: string
  merchant: (typeof merchants)[0]
  etd: string
}

interface Plan {
  id: PlanOption
  title: string
  subtitle: string
  budgetPerHead: number
  items: ItineraryItem[]
}

export default function OrbitScreen() {
  const [step, setStep] = useState<"questionnaire" | "results">("questionnaire")
  const [partySize, setPartySize] = useState("2")
  const [time, setTime] = useState("Tonight")
  const [area, setArea] = useState("Campus")
  const [budget, setBudget] = useState("💰💰")
  const [vibe, setVibe] = useState("Chill")
  const [customPrompt, setCustomPrompt] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>("budget")

  const plans: Plan[] = [
    {
      id: "budget",
      title: "🥇 Budget Chill Plan",
      subtitle: "AED 45/head",
      budgetPerHead: 45,
      items: [
        {
          time: "6:30 PM",
          merchant: merchants[0],
          etd: "10 mins",
        },
        {
          time: "8:00 PM",
          merchant: merchants[1],
          etd: "15 mins",
        },
      ],
    },
    {
      id: "balanced",
      title: "⚖️ Balanced Fun Plan",
      subtitle: "AED 75/head",
      budgetPerHead: 75,
      items: [
        {
          time: "6:30 PM",
          merchant: merchants[0],
          etd: "10 mins",
        },
        {
          time: "8:00 PM",
          merchant: merchants[1],
          etd: "15 mins",
        },
        {
          time: "9:30 PM",
          merchant: merchants[2],
          etd: "20 mins",
        },
      ],
    },
    {
      id: "premium",
      title: "👑 Premium Night Plan",
      subtitle: "AED 120/head",
      budgetPerHead: 120,
      items: [
        {
          time: "6:30 PM",
          merchant: merchants[0],
          etd: "10 mins",
        },
        {
          time: "8:00 PM",
          merchant: merchants[1],
          etd: "15 mins",
        },
        {
          time: "9:30 PM",
          merchant: merchants[2],
          etd: "20 mins",
        },
      ],
    },
  ]

  const handleBuildPlan = () => {
    setStep("results")
  }

  const handleAskOrbit = () => {
    if (customPrompt.trim()) {
      setStep("results")
    }
  }

  const handleBack = () => {
    if (step === "results") {
      setStep("questionnaire")
    } else {
      router.back()
    }
  }

  const handleRedeem = (merchantId: string) => {
    router.push({
      pathname: "/qr",
      params: { merchantId },
    })
  }

  if (step === "questionnaire") {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>🛰️ SV Orbit</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Tagline */}
          <View style={styles.taglineSection}>
            <Text style={styles.taglineMain}>Tell me your vibe,</Text>
            <Text style={styles.taglineSub}>I'll plan the night — with discounts</Text>
          </View>

          {/* Questionnaire */}
          <View style={styles.questionnaireCard}>
            {/* Party Size */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Party size:</Text>
              <TextInput
                style={styles.fieldInput}
                value={partySize}
                onChangeText={setPartySize}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>

            {/* Time */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Time:</Text>
              <Pressable
                style={styles.selectField}
                onPress={() => {
                  const times = ["Today", "Tonight", "Tomorrow"]
                  const currentIndex = times.indexOf(time)
                  setTime(times[(currentIndex + 1) % times.length])
                }}
              >
                <Text style={styles.selectFieldText}>{time}</Text>
                <Text style={styles.selectIcon}>▼</Text>
              </Pressable>
            </View>

            {/* Area */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Area:</Text>
              <Pressable
                style={styles.selectField}
                onPress={() => {
                  const areas = ["Campus", "Downtown", "Mall"]
                  const currentIndex = areas.indexOf(area)
                  setArea(areas[(currentIndex + 1) % areas.length])
                }}
              >
                <Text style={styles.selectFieldText}>{area}</Text>
                <Text style={styles.selectIcon}>▼</Text>
              </Pressable>
            </View>

            {/* Budget */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Budget:</Text>
              <Pressable
                style={styles.selectField}
                onPress={() => {
                  const budgets = ["💰", "💰💰", "💰💰💰"]
                  const currentIndex = budgets.indexOf(budget)
                  setBudget(budgets[(currentIndex + 1) % budgets.length])
                }}
              >
                <Text style={styles.selectFieldText}>{budget}</Text>
                <Text style={styles.selectIcon}>▼</Text>
              </Pressable>
            </View>

            {/* Vibe */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Vibe:</Text>
              <Pressable
                style={styles.selectField}
                onPress={() => {
                  const vibes = ["Chill", "Fun", "Active"]
                  const currentIndex = vibes.indexOf(vibe)
                  setVibe(vibes[(currentIndex + 1) % vibes.length])
                }}
              >
                <Text style={styles.selectFieldText}>{vibe}</Text>
                <Text style={styles.selectIcon}>▼</Text>
              </Pressable>
            </View>
          </View>

          {/* Build Plan Button */}
          <Pressable style={styles.buildButton} onPress={handleBuildPlan}>
            <Text style={styles.buildButtonText}>Build my plan</Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Free-form Input */}
          <View style={styles.customPromptSection}>
            <Text style={styles.customLabel}>Type your request:</Text>
            <TextInput
              style={styles.customInput}
              placeholder='e.g., "affordable dinner for 4"'
              placeholderTextColor="#6B6F8A"
              value={customPrompt}
              onChangeText={setCustomPrompt}
              multiline
            />
            <Pressable style={styles.askButton} onPress={handleAskOrbit}>
              <Text style={styles.askButtonText}>Ask Orbit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // Results View
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Your Plan</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Plan Tabs */}
        <View style={styles.planTabs}>
          {plans.map((plan) => (
            <Pressable
              key={plan.id}
              style={[styles.planTab, selectedPlan === plan.id && styles.planTabActive]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              <Text style={[styles.planTabText, selectedPlan === plan.id && styles.planTabTextActive]}>
                {plan.title}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Selected Plan Details */}
        {plans
          .filter((p) => p.id === selectedPlan)
          .map((plan) => (
            <View key={plan.id} style={styles.planContent}>
              <Text style={styles.budgetText}>{plan.subtitle}</Text>

              {/* Itinerary */}
              <View style={styles.itineraryContainer}>
                {plan.items.map((item, index) => (
                  <View key={index} style={styles.itineraryItem}>
                    <View style={styles.timelineLeft}>
                      <Text style={styles.timeText}>🕕 {item.time}</Text>
                      <View style={styles.timelineDot} />
                      {index < plan.items.length - 1 && <View style={styles.timelineLine} />}
                    </View>

                    <View style={styles.itineraryRight}>
                      <Text style={styles.itinerantMerchantName}>{item.merchant.name}</Text>
                      <Text style={styles.itinerantOffer}>{item.merchant.offer}</Text>

                      <Pressable style={styles.redeemButton} onPress={() => handleRedeem(item.merchant.id)}>
                        <Text style={styles.redeemButtonText}>REDEEM</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>

              {/* Plan Actions */}
              <View style={styles.planActions}>
                <Pressable style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>📍 Map view</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={() => setStep("questionnaire")}>
                  <Text style={styles.actionButtonText}>✏️ Edit plan</Text>
                </Pressable>
              </View>
            </View>
          ))}
      </ScrollView>
      {/* Bottom Nav */}
      <BottomNav currentRoute="/orbit" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080C1F",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  taglineSection: {
    marginBottom: 24,
  },
  taglineMain: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  taglineSub: {
    fontSize: 16,
    color: "#B0B3C7",
  },
  questionnaireCard: {
    backgroundColor: "#101534",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: "#2C3158",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
  },
  selectField: {
    backgroundColor: "#2C3158",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectFieldText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  selectIcon: {
    color: "#B0B3C7",
    fontSize: 12,
  },
  buildButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buildButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2C3158",
  },
  dividerText: {
    fontSize: 12,
    color: "#8A8FB3",
    marginHorizontal: 12,
  },
  customPromptSection: {
    marginBottom: 24,
  },
  customLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  customInput: {
    backgroundColor: "#101534",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 13,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  askButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  askButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  planTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1F3A",
  },
  planTab: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  planTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#2962FF",
  },
  planTabText: {
    fontSize: 11,
    color: "#8A8FB3",
    textAlign: "center",
  },
  planTabTextActive: {
    color: "#2962FF",
    fontWeight: "600",
  },
  planContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  budgetText: {
    fontSize: 14,
    color: "#B0B3C7",
    marginBottom: 16,
  },
  itineraryContainer: {
    marginBottom: 20,
  },
  itineraryItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 12,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2962FF",
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: "#2C3158",
    marginVertical: 4,
  },
  itineraryRight: {
    flex: 1,
  },
  itinerantMerchantName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  itinerantOffer: {
    fontSize: 12,
    color: "#B0B3C7",
    marginBottom: 8,
  },
  redeemButton: {
    backgroundColor: "#2962FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  redeemButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  planActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#101534",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3158",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B0B3C7",
  },
})
