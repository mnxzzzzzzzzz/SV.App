import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

type NavItem = {
  label: string;
  icon: string;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: "🏠", route: "/home" },
  { label: "Use", icon: "📍", route: "/home" },
  { label: "Orbit", icon: "🛰️", route: "/orbit" },
  { label: "Rewards", icon: "🎁", route: "/dashboard" },
  { label: "Profile", icon: "👤", route: "/home" },
];

type BottomNavProps = {
  currentRoute?: string;
};

export default function BottomNav({ currentRoute = "/home" }: BottomNavProps) {
  const handleNavPress = (route: string) => {
    if (route !== currentRoute) {
      router.push(route);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <Pressable
              key={item.route}
              style={styles.navItem}
              onPress={() => handleNavPress(item.route)}
            >
              <Text style={[styles.icon, isActive && styles.iconActive]}>
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#080C1F",
    borderTopWidth: 1,
    borderTopColor: "#1A1F3A",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: 10,
    color: "#B0B3C7",
    fontWeight: "500",
  },
  labelActive: {
    color: "#2962FF",
    fontWeight: "600",
  },
});
