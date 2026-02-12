import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
  },

  brandSection: {
    marginTop: height * 0.14,
    paddingHorizontal: 32,
  },

  appName: {
    fontSize: 44,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.5,
  },

  tagline: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.grey,
    lineHeight: 22,
    maxWidth: 260,
  },

  illustrationContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  illustration: {
    width: width * 0.8,
    height: width * 0.8,
    maxHeight: 320,
  },

  loginSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  loginCard: {
    backgroundColor: COLORS.surfaceBlue,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },

  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  termsText: {
    marginTop: 16,
    fontSize: 12,
    color: COLORS.grey,
    textAlign: "center",
    lineHeight: 16,
  },
});
