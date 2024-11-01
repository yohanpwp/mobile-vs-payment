import { Image, Platform, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView className= "h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <HelloWave />
            <Text className="text-white text-3xl font-bold">Welcome Back, username!</Text>
            <Text className="text-white text-lg">
              This is a simple mobile payment app using React Native and Expo.
            </Text>
            <CustomButton
              onPress={() => router.push("/(auth)/sign-in")}
              title="Start your Payment"
              containerStyles="bg-blue-600 px-24 py-2 rounded-xl"
            />
        </View>
      </ScrollView>
    </ThemedView>
  );
    
}

