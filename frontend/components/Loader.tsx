import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

type LoaderProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loader({ message, fullScreen = true }: LoaderProps) {
  return (
    <View style={[styles.container, fullScreen && styles.containerFull]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerFull: {
    flex: 1,
  },
  message: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});

