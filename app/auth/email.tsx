import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EmailScreen() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email.includes(".ac.ae") && !email.includes(".edu")) {
      alert("Please use a valid university email");
      return;
    }
    router.push("/auth/otp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your student email</Text>

      <TextInput
        placeholder="you@university.ac.ae"
        placeholderTextColor="#6B6F8A"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2C3158",
    borderRadius: 10,
    padding: 14,
    color: "#FFFFFF",
    marginBottom: 20,
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
});
