import { Image, Platform, View, Text, ScrollView, FlatList } from "react-native";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";

export default function HomeScreen() {
  const router = useRouter();
  const { isLoading, isLoggedIn, user, setUser, setIsLoggedIn  } = useGlobalContext();

  if (!isLoading && !isLoggedIn) { return <Redirect href={'/(auth)/sign-in'} />; }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@token');
    setUser(null);
    setIsLoggedIn(false);
    router.push("/(auth)/sign-in");
  }
  return (
    <ThemedView className= "h-full">
      <Loader isLoading={isLoading} />
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <HelloWave />
            <ThemedText className="text-3xl font-bold">Welcome Back! {user?.firstName}</ThemedText>
            <ThemedText className="text-lg">
              This is a simple mobile payment app using React Native and Expo.
            </ThemedText>
            <CustomButton
              onPress={() => router.push("/(tabs)/scan")}
              title="Start your Payment"
              containerStyles="bg-blue-600 w-full py-2 rounded-xl m-5"
            />
            <CustomButton
              onPress={handleLogout}
              title="Logout"
              containerStyles="bg-red-600 w-full py-2 rounded-xl m-5"
            />
        </View>
      </ScrollView>
    </ThemedView>
  );
    
}

