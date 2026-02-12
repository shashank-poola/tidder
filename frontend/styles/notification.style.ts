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

  tabsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  tabChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },

  tabChipActive: {
    backgroundColor: COLORS.primary,
  },

  tabChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  tabChipTextActive: {
    color: COLORS.surface,
    fontWeight: "600",
  },

  list: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    marginBottom: 6,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  primaryText: {
    fontSize: 14,
    color: COLORS.text,
  },

  bold: {
    fontWeight: "600",
  },

  secondaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  secondaryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  timeText: {
    fontSize: 11,
    color: COLORS.greyLight,
    marginLeft: "auto",
  },
});
