import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export type NotificationType = "all" | "mentions";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  primary: string;
  boldPart?: string;
  secondary: string;
  time: string;
};

type Props = {
  item: NotificationItem;
};

export default function NotificationRow({ item }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLetter}>
          {item.primary[0]?.toUpperCase() ?? "T"}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.primaryText}>
          <Text style={styles.bold}>{item.primary}</Text>
          {item.boldPart && <Text>{item.boldPart}</Text>}
        </Text>
        <Text style={styles.secondaryText}>{item.secondary}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  avatarLetter: {
    fontWeight: "700",
    color: COLORS.primary,
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
  secondaryText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.greyLight,
    marginLeft: "auto",
  },
});

