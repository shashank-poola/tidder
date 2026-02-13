import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/notification.style";
import NotificationRow, {
  NotificationItem,
  NotificationType,
} from "@/components/notification";

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState<NotificationType>("all");

  // Backend notifications are not implemented yet.
  // Start with an empty list so new users don't see fake data.
  const notifications: NotificationItem[] = [];
  const filtered = notifications.filter(
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

      {filtered.length === 0 ? (
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
            You’re all caught up
          </Text>
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              color: "#6B7280",
            }}
          >
            You don’t have any notifications yet. Activity from your posts and
            comments will show up here.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {filtered.map((item) => (
            <NotificationRow key={item.id} item={item} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
