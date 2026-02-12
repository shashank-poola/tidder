import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    backgroundColor: COLORS.background,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surfaceBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarLetter: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.primary,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  usernameText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 18,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  actionButtonPrimary: {
    backgroundColor: COLORS.button,
    borderColor: COLORS.button,
  },

  actionText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },

  actionTextPrimary: {
    color: COLORS.surface,
  },

  content: {
    flex: 1,
    paddingTop: 10,
  },

  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    backgroundColor: COLORS.background,
    gap: 14,
  },

  tabLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    paddingVertical: 6,
  },

  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: "600",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },

  list: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 16,
  },

  postCard: {
    width: width - 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  postMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  postCommunity: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  postMetaText: {
    fontSize: 12,
    color: COLORS.greyLight,
  },

  postTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },

  postFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 14,
  },

  postFooterText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
