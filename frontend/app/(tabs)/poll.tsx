import React, { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Loader from "@/components/Loader";
import { useApi } from "@/lib/api";
import { styles } from "@/styles/answer.style";

type PollOption = {
  id: string;
  label: string;
  percent: number;
};

type Poll = {
  id: string;
  community: string;
  question: string;
  time: string;
  totalVotes: string;
  comments: string;
  options: PollOption[];
};

function formatTime(createdAt: string) {
  const d = new Date(createdAt);
  const h = Math.floor((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return "now";
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function PollScreen() {
  const api = useApi();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getPolls();
      const mapped: Poll[] = data.map((p: any) => {
        const totalVotes = p.pollOptions.reduce(
          (sum: number, o: any) => sum + (o.voteCount || 0),
          0
        );
        return {
          id: p.id,
          community: `r/${p.community.name}`,
          question: p.title,
          time: formatTime(p.createdAt),
          totalVotes: String(totalVotes),
          comments: String(p._count.comments ?? 0),
          options: p.pollOptions.map((o: any) => ({
            id: o.id,
            label: o.label,
            percent: totalVotes
              ? Math.round(((o.voteCount || 0) / totalVotes) * 100)
              : 0,
          })),
        };
      });
      setPolls(mapped);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Failed to load polls"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top polls</Text>
        <Text style={styles.description}>
          See what communities on Tidder are voting on right now.
        </Text>
      </View>

      {loading ? (
        <Loader message="Loading polls..." />
      ) : polls.length === 0 ? (
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
            No polls yet
          </Text>
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              color: "#6B7280",
            }}
          >
            When communities start creating polls, they will appear here.
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {polls.map((poll) => (
            <View key={poll.id} style={styles.pollCard}>
              <View style={styles.pollHeaderRow}>
                <Text style={styles.communityName}>{poll.community}</Text>
                <Text style={styles.pollMetaText}>• {poll.time} ago</Text>
              </View>

              <Text style={styles.pollQuestion}>{poll.question}</Text>

              {poll.options.map((option) => (
                <View key={option.id} style={styles.optionRow}>
                  <View style={styles.optionBarBackground}>
                    <View
                      style={[
                        styles.optionFill,
                        { width: `${option.percent}%` },
                      ]}
                    />
                    <View style={styles.optionContentRow}>
                      <Text style={styles.optionText}>{option.label}</Text>
                      <Text style={styles.optionPercent}>
                        {option.percent}%
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.pollFooterRow}>
                <Text style={styles.pollFooterText}>
                  {poll.totalVotes} votes • {poll.comments} comments
                </Text>
                <Text style={styles.pollFooterText}>Poll closes in 2 days</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
