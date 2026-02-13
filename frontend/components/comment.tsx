import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export type CommentProps = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

export default function Comment({ author, content, createdAt }: CommentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>
            {author[0]?.toUpperCase() ?? "U"}
          </Text>
        </View>
        <View>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.timeText}>{createdAt}</Text>
        </View>
      </View>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarLetter: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  authorText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.greyLight,
  },
  contentText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.text,
  },
});

