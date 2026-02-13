import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page not found" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Unmatched Route</Text>
        <Text style={styles.message}>Page could not be found.</Text>
        <Link href="/(tabs)" style={styles.link}>
          Go back home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: "#60A5FA",
    fontWeight: "600",
  },
});
