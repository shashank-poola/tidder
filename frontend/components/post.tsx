import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/styles/feed.style";

export type PostProps = {
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
  mediaUrl?: string | null;
  mediaType?: "image" | "video" | null;
};

type Props = {
  item: PostProps;
  onPressComments?: () => void;
};

export default function PostCard({ item, onPressComments }: Props) {
  const showImage = item.mediaType === "image" && item.mediaUrl;
  const showVideo = item.mediaType === "video" && item.mediaUrl;

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

      {showImage ? (
        <Image
          source={{ uri: item.mediaUrl! }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      {showVideo ? (
        <View
          style={[
            styles.image,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Ionicons name="play-circle" size={42} color="#FFFFFF" />
          <Text
            style={{
              marginTop: 4,
              color: "#FFFFFF",
              fontSize: 12,
            }}
          >
            Video
          </Text>
        </View>
      ) : null}

      <View style={styles.actionsRow}>
        <View style={styles.votesRow}>
          <TouchableOpacity style={styles.pillButton} activeOpacity={0.8}>
            <Ionicons name="arrow-up" size={16} color="#4B5563" />
            <Text style={styles.countText}>{item.votes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pillButton}
            activeOpacity={0.8}
            onPress={onPressComments}
          >
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

