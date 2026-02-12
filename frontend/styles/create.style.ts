import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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

  username: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  communityPill: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  communityText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  inputTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    paddingVertical: 8,
  },

  inputBody: {
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 8,
    minHeight: 120,
    textAlignVertical: "top",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },

  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },

  toolbarButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },

  toolbarText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  submitBar: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
    backgroundColor: COLORS.background,
  },

  postButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  postButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.surface,
  },
});
