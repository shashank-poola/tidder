import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// This screen exists so that Expo Router has a matching route for the
// "sso-callback" deep link used during the Clerk OAuth / SSO flow.
// The actual session handling is done inside Clerk's hooks; here we just
// show a lightweight loading state while the redirect completes.

export default function SsoCallbackScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Finishing sign-in…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },
});

