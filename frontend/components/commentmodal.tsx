import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "@/constants/theme";

type CommentModalProps = {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function CommentModal({
  visible,
  value,
  onChangeText,
  onClose,
  onSubmit,
}: CommentModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>Add a comment</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Share your thoughts..."
            placeholderTextColor={COLORS.greyLight}
            value={value}
            onChangeText={onChangeText}
          />
          <View style={styles.actionsRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={onSubmit}>
              <Text style={styles.submitText}>Post</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  backdropPress: {
    flex: 1,
  },
  sheet: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10,
  },
  input: {
    minHeight: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.text,
    textAlignVertical: "top",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  cancelText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  submitButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.button,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.surface,
  },
});

