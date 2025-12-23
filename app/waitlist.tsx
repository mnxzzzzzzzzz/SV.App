import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useAuth } from "../src/contexts/AuthContext";

export default function WaitlistScreen() {
  const { checkAccess, approveAccess, userEmail } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAccess = async () => {
    setIsChecking(true);
    const hasAccess = await checkAccess();
    setIsChecking(false);
    
    if (hasAccess) {
      Alert.alert(
        "Access Granted! 🎉",
        "You now have full access to StudentVerse.",
        [{ text: "Go to Home", onPress: () => router.replace("/home") }]
      );
    } else {
      Alert.alert(
        "Still on Waitlist",
        "We'll notify you when access is enabled.",
        [{ text: "OK" }]
      );
    }
  };

  const handleDemoApprove = () => {
    Alert.alert(
      "Demo: Approve Access",
      "This simulates backend approving your access.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Approve", 
          onPress: () => {
            approveAccess();
            setTimeout(() => router.replace("/home"), 500);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're on the waitlist 🎉</Text>
      
      <Text style={styles.email}>{userEmail}</Text>
      
      <Text style={styles.text}>
        We're verifying your student status. This usually takes 24-48 hours.
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What happens next?</Text>
        <Text style={styles.cardText}>• Email verification</Text>
        <Text style={styles.cardText}>• University confirmation</Text>
        <Text style={styles.cardText}>• Access activation</Text>
      </View>

      <Pressable 
        style={[styles.button, isChecking && styles.buttonDisabled]} 
        onPress={handleCheckAccess}
        disabled={isChecking}
      >
        {isChecking ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Check access status</Text>
        )}
      </Pressable>
      
      <Pressable 
        style={styles.demoButton}
        onPress={handleDemoApprove}
      >
        <Text style={styles.demoButtonText}>[Demo: Approve Access]</Text>
      </Pressable>
      
      <Text style={styles.note}>
        Once approved, you'll see nearby student offers instantly.
      </Text>
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
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  email: {
    fontSize: 14,
    color: "#B0B3C7",
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    color: "#B0B3C7",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#101534",
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: "#B0B3C7",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#2962FF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  demoButton: {
    borderWidth: 1,
    borderColor: "#FFB800",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  demoButtonText: {
    color: "#FFB800",
    fontSize: 14,
    fontWeight: "500",
  },
  note: {
    fontSize: 12,
    color: "#8A8FB3",
    textAlign: "center",
    fontStyle: "italic",
  },
});