import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
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
        <View>
            
        </View>
    )

}