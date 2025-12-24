import { Pressable, StyleSheet, Text, View } from "react-native";

type ReferralCardProps = {
  friendsReferred: number;
  totalFriends: number;
  onPress: () => void;
};

export default function ReferralCard({
  friendsReferred,
  totalFriends,
  onPress,
}: ReferralCardProps) {
  const progress = (friendsReferred / totalFriends) * 100;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>🎯 REFER FRIENDS, EARN REWARDS</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[styles.progressBar, { width: `${progress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      <Text style={styles.referralText}>
        {friendsReferred}/{totalFriends} friends referred
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#101534",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#1A1F3A",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2962FF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#B0B3C7",
    textAlign: "right",
  },
  referralText: {
    fontSize: 12,
    color: "#8A8FB3",
  },
});
