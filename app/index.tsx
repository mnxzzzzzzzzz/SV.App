import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudentVerse</Text>
      <Text style={styles.tagline}>
        Verified student discounts. Instantly.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/auth/email")}
      >
        <Text style={styles.buttonText}>Continue with university email</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C1F",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#B0B3C7",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2962FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
