import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/profile.style";

type ProfileTab = "posts" | "about";

type UserPost = {
  id: string;
  community: string;
  title: string;
  meta: string;
  stats: string;
};

const POSTS: UserPost[] = [
  {
    id: "1",
    community: "r/DeveloperJobs",
    title: "How I built a Reddit‑style app in Expo in a weekend",
    meta: "Posted 1d ago",
    stats: "1.4k upvotes • 210 comments",
  },
  {
    id: "2",
    community: "r/TwenteisIndia",
    title: "Managing side projects while working full‑time",
    meta: "Posted 3d ago",
    stats: "620 upvotes • 87 comments",
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>Y</Text>
          </View>
          <View>
            <Text style={styles.nameText}>Your Name</Text>
            <Text style={styles.usernameText}>u/you</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12.3k</Text>
            <Text style={styles.statLabel}>karma</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2y</Text>
            <Text style={styles.statLabel}>redditor</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
            <Text style={styles.actionText}>Customize profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            activeOpacity={0.9}
          >
            <Text style={[styles.actionText, styles.actionTextPrimary]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.tabsRow}>
          {(["posts", "about"] as ProfileTab[]).map((tab) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}
                >
                  {tab === "posts" ? "Posts" : "About"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === "posts" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            {POSTS.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postMetaRow}>
                  <Text style={styles.postCommunity}>{post.community}</Text>
                  <Text style={styles.postMetaText}> • {post.meta}</Text>
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.postFooterRow}>
                  <Text style={styles.postFooterText}>{post.stats}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>About u/you</Text>
              <Text style={styles.postFooterText}>
                This is your space to tell communities who you are. Add a short
                bio, your interests, or what you're building.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
