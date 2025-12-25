import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";

function RootNavigator() {
  const { isAuthenticated } = useAuth();

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
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
