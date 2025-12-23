import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useCountdown } from "../src/hooks/useCountdown";
import { useMockProof } from "../src/hooks/useMockProof";

export default function QRScreen() {
  const timeLeft = useCountdown(30);
  const refreshKey = Math.floor(timeLeft / 30);
  const { otp, qrValue } = useMockProof(refreshKey);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Show to cashier</Text>

      <View style={styles.qrBox}>
        <QRCode value={qrValue} size={220} />
      </View>

      <Text style={styles.otp}>{otp}</Text>
      <Text style={styles.timer}>Refreshes in {timeLeft}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C1F",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  otp: {
    fontSize: 32,
    letterSpacing: 6,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  timer: {
    fontSize: 14,
    color: "#B0B3C7",
  },
});
