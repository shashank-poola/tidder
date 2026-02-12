import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const POLLS: Poll[] = [
  {
    id: "1",
    community: "r/DeveloperJobs",
    question: "What stack are you using for your next side project?",
    time: "8h",
    totalVotes: "3.2k",
    comments: "210",
    options: [
      { id: "1", label: "React + Node", percent: 46 },
      { id: "2", label: "React Native + Expo", percent: 32 },
      { id: "3", label: "Next.js full‑stack", percent: 18 },
      { id: "4", label: "Something else", percent: 4 },
    ],
  },
  {
    id: "2",
    community: "r/TwenteisIndia",
    question: "Best time to code after a full‑time job?",
    time: "1d",
    totalVotes: "1.1k",
    comments: "98",
    options: [
      { id: "1", label: "Early morning", percent: 21 },
      { id: "2", label: "Evening", percent: 43 },
      { id: "3", label: "Late night", percent: 31 },
      { id: "4", label: "Weekends only", percent: 5 },
    ],
  },
];

export default function PollScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top polls</Text>
        <Text style={styles.description}>
          See what communities on Tidder are voting on right now.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {POLLS.map((poll) => (
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
    </SafeAreaView>
  );
}
