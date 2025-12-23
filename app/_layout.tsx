import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";

function RootNavigator() {
  const { isAuthenticated, userStatus } = useAuth();

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/email" />
        <Stack.Screen name="auth/otp" />
        
        {isAuthenticated && (
          <>
            {userStatus === "waitlisted" ? (
              <Stack.Screen name="waitlist" />
            ) : (
              <Stack.Screen name="home" />
            )}
            <Stack.Screen name="qr" />
          </>
        )}
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