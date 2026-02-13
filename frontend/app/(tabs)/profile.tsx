import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useApi } from "@/lib/api";
import { styles } from "@/styles/profile.style";

type ProfileTab = "posts" | "about";

type User = {
  id: string;
  username: string;
  imageUrl?: string | null;
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    let isMounted = true;
    api
      .syncUser()
      .then((u) => {
        if (isMounted) setUser(u);
      })
      .catch((e) => {
        console.error(e);
      });
    return () => {
      isMounted = false;
    };
  }, [api]);

  const displayName = user?.username ?? "New redditor";
  const handleLetter = displayName[0]?.toUpperCase() ?? "U";

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{handleLetter}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{displayName}</Text>
            <Text style={styles.usernameText}>u/{displayName}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>karma</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0d</Text>
            <Text style={styles.statLabel}>redditor</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
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
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>You haven’t posted yet</Text>
              <Text style={styles.postFooterText}>
                Create your first post from the Create tab. Once you start
                posting, your content will appear here.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>About u/{displayName}</Text>
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
