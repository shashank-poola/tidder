import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/feed.style";

type Post = {
  id: string;
  community: string;
  author: string;
  time: string;
  title: string;
  body?: string;
  votes: string;
  comments: string;
  shares: string;
  isPromoted?: boolean;
  hasImage?: boolean;
};

const FEED: Post[] = [
  {
    id: "1",
    community: "r/DeveloperJobs",
    author: "u/frontend_guy",
    time: "11h",
    title: "Hi, I'm a software developer",
    body: "Ask me anything about getting started with React Native and Expo.",
    votes: "435",
    comments: "93",
    shares: "12",
  },
  {
    id: "2",
    community: "u/SpaXialAI • Promoted",
    author: "u/SpaXialAI",
    time: "Sponsored",
    title: "Stop grinding. Create more. AI that gets gameplay.",
    body: "",
    votes: "1.2k",
    comments: "210",
    shares: "58",
    isPromoted: true,
    hasImage: true,
  },
  {
    id: "3",
    community: "r/DeveloperJobs",
    author: "u/hiring_now",
    time: "10h",
    title: "[HIRING] Junior Developer – (Remote) – English Required",
    body: "1–2 years of experience • React / Node • Good communication • Available full‑time.",
    votes: "4.0k",
    comments: "320",
    shares: "94",
  },
  {
    id: "4",
    community: "r/TwenteisIndia",
    author: "u/daemon5921",
    time: "20h",
    title: "Girls' Ovulation is Crazyyy",
    body: "So so so yesterday night randomly I met a girl on Discord...",
    votes: "1.0k",
    comments: "290",
    shares: "73",
  },
];

function PostCard({ item }: { item: Post }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.communityAvatar}>
          <Text style={styles.communityLetter}>
            {item.community.charAt(2)?.toUpperCase() ?? "t"}
          </Text>
        </View>
        <View style={styles.communityRow}>
          <Text style={styles.communityName}>{item.community}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{item.author}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      {item.body ? <Text style={styles.bodyText}>{item.body}</Text> : null}
      {item.hasImage ? <View style={styles.image} /> : null}

      <View style={styles.actionsRow}>
        <View style={styles.votesRow}>
          <TouchableOpacity style={styles.pillButton} activeOpacity={0.8}>
            <Ionicons name="arrow-up" size={16} color="#4B5563" />
            <Text style={styles.countText}>{item.votes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pillButton} activeOpacity={0.8}>
            <Ionicons name="chatbubble-outline" size={16} color="#4B5563" />
            <Text style={styles.pillText}>{item.comments} comments</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.pillButton} activeOpacity={0.8}>
          <Ionicons name="arrow-redo-outline" size={16} color="#4B5563" />
          <Text style={styles.pillText}>{item.shares} shares</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
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

      <FlatList
        data={FEED}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
      />
    </SafeAreaView>
  );
}
