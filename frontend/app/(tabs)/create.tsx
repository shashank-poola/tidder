import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/create.style";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={{ fontWeight: "700" }}>u</Text>
            </View>
            <Text style={styles.username}>u/you</Text>

            <TouchableOpacity style={styles.communityPill} activeOpacity={0.8}>
              <Ionicons
                name="albums-outline"
                size={16}
                color="#6B7280"
              />
              <Text style={styles.communityText}>Choose community</Text>
              <Ionicons
                name="chevron-down-outline"
                size={14}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.divider} />

          <TextInput
            style={styles.inputBody}
            placeholder="Share your thoughts..."
            placeholderTextColor="#9CA3AF"
            value={body}
            onChangeText={setBody}
            multiline
          />

          <View style={styles.divider} />

          <View style={styles.toolbarRow}>
            <TouchableOpacity style={styles.toolbarButton} activeOpacity={0.8}>
              <Ionicons name="image-outline" size={18} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} activeOpacity={0.8}>
              <Ionicons name="link-outline" size={18} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} activeOpacity={0.8}>
              <Ionicons name="stats-chart-outline" size={18} color="#4B5563" />
              <Text style={styles.toolbarText}>Poll</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.submitBar}>
          <TouchableOpacity style={styles.postButton} activeOpacity={0.9}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
