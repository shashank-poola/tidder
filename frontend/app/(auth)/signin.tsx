import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.style";

export default function Signin() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignin = async () => {
    try {
      setError(null);
      setLoading(true);

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.log("OAuth error:", err);
      setError("We couldn't connect to Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <Text style={styles.appName}>Tidder</Text>

        <Text style={styles.tagline}>
          Dive into communities,
          {"\n"}
          discover the universe.
        </Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/people.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginSection}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Welcome to Tidder</Text>
          <Text style={styles.loginSubtitle}>
            Sign in with Google to dive into your communities.
          </Text>

          <TouchableOpacity
            style={[
              styles.googleButton,
              loading ? { opacity: 0.7 } : null,
            ]}
            onPress={handleGoogleSignin}
            activeOpacity={0.9}
            disabled={loading}
          >
            <View style={styles.googleIcon}>
              <Ionicons name="logo-google" size={20} color={COLORS.surface} />
            </View>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.text} />
            ) : (
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            )}
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.termsText}>
            By continuing, you agree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
}