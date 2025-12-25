import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";

export default function OTPScreen() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === "123456") {
        login("student@university.ac.ae");
      } else {
        setError("Invalid OTP. Try '123456' for demo.");
      }
    } catch (err) {
      setError("Verification failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>Sent to your university email</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={(text) => {
          setOtp(text);
          setError("");
        }}
        placeholder="000000"
        placeholderTextColor="#6B6F8A"
        editable={!isLoading}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </Pressable>

      <Pressable style={styles.resendButton}>
        <Text style={styles.resendText}>Resend code</Text>
      </Pressable>

      <Pressable
        style={styles.skipButton}
        onPress={() => login("student@university.ac.ae")}
      >
        <Text style={styles.skipText}>⏭️ Skip for testing</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C1F",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#B0B3C7",
    marginBottom: 30,
  },
  input: {
    fontSize: 24,
    letterSpacing: 10,
    borderBottomWidth: 1,
    borderColor: "#2962FF",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#2962FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resendButton: {
    marginTop: 20,
    alignItems: "center",
  },
  resendText: {
    color: "#2962FF",
    fontSize: 14,
  },
  error: {
    color: "#FF6B6B",
    marginBottom: 10,
    textAlign: "center",
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2C3158",
    alignItems: "center",
  },
  skipText: {
    color: "#B0B3C7",
    fontSize: 14,
    fontWeight: "500",
  },
});
