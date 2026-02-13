import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  logoText: {
    color: COLORS.surface,
    fontWeight: "800",
    fontSize: 18,
  },

  appName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: 10,
  },

  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },

  searchBar: {
    marginHorizontal: 14,
    marginBottom: 8,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
  },

  searchPlaceholder: {
    marginLeft: 6,
    color: COLORS.greyLight,
    fontSize: 14,
  },

  feedList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  communityAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.surfaceBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  communityLetter: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },

  communityRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  communityName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  metaDot: {
    marginHorizontal: 4,
    color: COLORS.greyLight,
  },

  metaText: {
    fontSize: 12,
    color: COLORS.greyLight,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },

  bodyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  image: {
    width: width - 36,
    height: (width - 36) * 0.56,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginBottom: 8,
    alignSelf: "center",
  },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  votesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },

  pillText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  countText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
