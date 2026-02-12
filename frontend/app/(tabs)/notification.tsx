import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/notification.style";

type NotificationType = "all" | "mentions";

type Notification = {
  id: string;
  type: NotificationType;
  primary: string;
  boldPart?: string;
  secondary: string;
  time: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "all",
    primary: "u/hiring_now",
    boldPart: " replied to your comment",
    secondary: "“We’re reviewing your portfolio, looks great so far!”",
    time: "3m",
  },
  {
    id: "2",
    type: "mentions",
    primary: "u/dev_friend",
    boldPart: " mentioned you in r/DeveloperJobs",
    secondary: "“Check out what u/you built in Tidder, super clean UI.”",
    time: "25m",
  },
  {
    id: "3",
    type: "all",
    primary: "Your post in r/TwenteisIndia",
    boldPart: " is getting traction",
    secondary: "120 new upvotes in the last hour.",
    time: "1h",
  },
  {
    id: "4",
    type: "all",
    primary: "New follower",
    boldPart: " u/new_redditor",
    secondary: "started following you.",
    time: "4h",
  },
];

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState<NotificationType>("all");

  const filtered = NOTIFICATIONS.filter(
    (item) => activeTab === "all" || item.type === activeTab
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={styles.tabsRow}>
          {(["all", "mentions"] as NotificationType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabChip,
                  isActive && styles.tabChipActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    isActive && styles.tabChipTextActive,
                  ]}
                >
                  {tab === "all" ? "All" : "Mentions"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filtered.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.avatar}>
              <Text style={{ fontWeight: "700" }}>
                {item.primary[0]?.toUpperCase() ?? "T"}
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.primaryText}>
                <Text style={styles.bold}>{item.primary}</Text>
                {item.boldPart && <Text style={styles.primaryText}>{item.boldPart}</Text>}
              </Text>
              <View style={styles.secondaryRow}>
                <Text style={styles.secondaryText}>{item.secondary}</Text>
              </View>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
