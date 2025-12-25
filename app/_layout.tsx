"use client"

import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import { AuthProvider, useAuth } from "../src/contexts/AuthContext"

SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  const { isAuthenticated } = useAuth()

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  useEffect(() => {
    const prepare = async () => {
      try {
        if (fontsLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          await SplashScreen.hideAsync()
        }
      } catch (e) {
        console.warn(e)
      }
    }

    prepare()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/email" />
        <Stack.Screen name="auth/otp" />
        <Stack.Screen name="waitlist" />
        <Stack.Screen name="home" />
        <Stack.Screen name="qr" />
        <Stack.Screen name="referral" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="svpay" />
        <Stack.Screen name="orbit" />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}
