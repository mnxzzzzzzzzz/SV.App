import { Pressable, StyleSheet, Text, View } from "react-native"
import { router } from "expo-router"

type NavItem = {
  label: string
  icon: string
  route: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: "🏠", route: "/home" },
  { label: "Use", icon: "📍", route: "/home" },
  { label: "Orbit", icon: "🛰️", route: "/orbit" },
  { label: "Rewards", icon: "🎁", route: "/dashboard" },
  { label: "Profile", icon: "👤", route: "/home" },
]

type BottomNavProps = {
  currentRoute?: string
}

export default function BottomNav({ currentRoute = "/home" }: BottomNavProps) {
  const handleNavPress = (route: string) => {
    if (route !== currentRoute) {
      router.push(route)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentRoute === item.route
          return (
            <Pressable key={item.route} style={styles.navItem} onPress={() => handleNavPress(item.route)}>
              <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#080C1F",
    borderTopWidth: 1,
    borderTopColor: "#1E2A4A",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  iconContainerActive: {
    backgroundColor: "#2962FF",
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "500",
  },
  labelActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
})
