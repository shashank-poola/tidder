import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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

import { useApi } from "@/lib/api";
import { styles } from "@/styles/create.style";

type Community = {
  id: string;
  name: string;
  slug: string;
};

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [username, setUsername] = useState<string>("you");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const api = useApi();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const u = await api.syncUser();
        if (isMounted && u?.username) setUsername(u.username);

        const comms = await api.getCommunities();
        if (isMounted && Array.isArray(comms) && comms.length > 0) {
          setCommunities(comms);
          setSelectedCommunity(comms[0]);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [api]);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!selectedCommunity) {
      setError("Please select a community.");
      return;
    }

    try {
      setSubmitting(true);
      await api.createPost({
        title: title.trim(),
        body: body.trim() || undefined,
        communityId: selectedCommunity.id,
        mediaUrl: mediaUrl.trim() || undefined,
        mediaType: mediaUrl.trim() ? mediaType : undefined,
      });

      setTitle("");
      setBody("");
      setMediaUrl("");
      setMediaType("image");
      setSuccess("Your post has been published.");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Failed to create post. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
              <Text style={{ fontWeight: "700" }}>
                {username[0]?.toUpperCase() ?? "U"}
              </Text>
            </View>
            <Text style={styles.username}>u/{username}</Text>

            <TouchableOpacity style={styles.communityPill} activeOpacity={0.8}>
              <Ionicons
                name="albums-outline"
                size={16}
                color="#6B7280"
              />
              <Text style={styles.communityText}>
                {selectedCommunity ? `r/${selectedCommunity.name}` : "No communities"}
              </Text>
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

          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginBottom: 6,
            }}
          >
            Optional media
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={[
                styles.toolbarButton,
                mediaType === "image" && { backgroundColor: "#E5E7EB" },
              ]}
              activeOpacity={0.8}
              onPress={() => setMediaType("image")}
            >
              <Ionicons name="image-outline" size={18} color="#4B5563" />
              <Text style={styles.toolbarText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toolbarButton,
                mediaType === "video" && { backgroundColor: "#E5E7EB" },
              ]}
              activeOpacity={0.8}
              onPress={() => setMediaType("video")}
            >
              <Ionicons name="videocam-outline" size={18} color="#4B5563" />
              <Text style={styles.toolbarText}>Video</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputBody}
            placeholder={
              mediaType === "image"
                ? "Paste an image URL (optional)"
                : "Paste a video URL (optional)"
            }
            placeholderTextColor="#9CA3AF"
            value={mediaUrl}
            onChangeText={setMediaUrl}
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
          {error ? (
            <Text
              style={{
                color: "#EF4444",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              {error}
            </Text>
          ) : null}
          {success ? (
            <Text
              style={{
                color: "#10B981",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              {success}
            </Text>
          ) : null}
          <TouchableOpacity
            style={[
              styles.postButton,
              submitting && { opacity: 0.7 },
            ]}
            activeOpacity={0.9}
            disabled={submitting}
            onPress={handleSubmit}
          >
            <Text style={styles.postButtonText}>
              {submitting ? "Posting..." : "Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
