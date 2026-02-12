import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    backgroundColor: COLORS.background,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  description: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  list: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
    gap: 10,
  },

  pollCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  pollHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  communityName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  pollMetaText: {
    fontSize: 12,
    color: COLORS.greyLight,
    marginLeft: 6,
  },

  pollQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  optionRow: {
    marginBottom: 6,
  },

  optionBarBackground: {
    height: 28,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    justifyContent: "center",
  },

  optionFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  optionContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  optionText: {
    fontSize: 13,
    color: COLORS.text,
  },

  optionPercent: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  pollFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },

  pollFooterText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
