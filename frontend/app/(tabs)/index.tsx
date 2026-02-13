import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard, { PostProps } from "@/components/post";
import Loader from "@/components/Loader";
import { useApi } from "@/lib/api";
import { styles } from "@/styles/feed.style";

function formatTime(createdAt: string) {
  const d = new Date(createdAt);
  const h = Math.floor((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return "now";
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function HomeScreen() {
  const api = useApi();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      await api.syncUser();
      const data = await api.getPosts();
      setPosts(
        data.map((p: any) => ({
          id: p.id,
          community: `r/${p.community}`,
          author: p.author,
          time: formatTime(p.createdAt),
          title: p.title,
          body: p.body,
          votes: p.votes,
          comments: p.comments,
          shares: "0",
          mediaUrl: p.mediaUrl,
          mediaType: p.mediaType,
        }))
      );
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Something went wrong loading your feed"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [api]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appName}>tidder</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Ionicons name="add-circle-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.searchBar} activeOpacity={0.9}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <Text style={styles.searchPlaceholder}>Search Tidder</Text>
      </TouchableOpacity>

      {loading ? (
        <Loader message="Loading your feed..." />
      ) : posts.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            No posts yet
          </Text>
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              color: "#6B7280",
            }}
          >
            Start by creating your first post or joining a community. New posts
            will show up here.
          </Text>
          {error ? (
            <Text
              style={{
                fontSize: 12,
                color: "#EF4444",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}
