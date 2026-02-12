import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { styles } from "@/styles/auth.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Signin() {
    const { startSSOFlow } = useSSO();

    const router = useRouter();

    const handleGoogleSignin = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })

            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (error) {
            console.log("OAuth error:", error)
        }
        return;
    };

    return (
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <Text style={styles.appName}>
                    Tidder
                </Text>

                <Text style={styles.tagline}>
                    "Dive into communities,
                     discover the universe"
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
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignin}
                    activeOpacity={0.9}
                    >
                    <View style={styles.googleIcon}>
                        <Ionicons name="logo-google" size={20} color={COLORS.surface} />
                    </View>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms and Privacy Policy
                </Text>
            </View>
        </View>
    )

}