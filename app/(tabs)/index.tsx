import { Image, View, Text, ScrollView } from "react-native";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";

export default function HomeScreen() {
  const { isLoading, isLoggedIn, user, logout } = useGlobalContext();

  if (isLoading && !isLoggedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <ThemedView className="h-full">
      <Loader isLoading={isLoading} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#1E90FF", "transparent"]}
        >
          <View className="w-full justify-center items-center h-full px-4">
            <View className="rounded-full bg-slate-400 w-52 h-52 justify-center items-center">
              <Text className="text-[4rem] font-bold ">
                {user?.firstName?.at(0)}
              </Text>
            </View>
            <View className="my-5 md:my-10 items-center">
              <ThemedText type="title">{`${user?.firstName} ${user?.lastName}`}</ThemedText>
              <ThemedText type="subtitle">{user?.username}</ThemedText>
            </View>
            <View className="h-1/2 w-10/12 items-center mt-10">
            <View className="absolute w-10/12 h-1/2 -top-5 bg-[rgb(180,180,180,0.7)] shadow-sm -z-10"></View>
            <View className="absolute w-9/12 h-1/2 -top-8 bg-[rgb(180,180,180,0.5)] shadow-sm -z-20"></View>
              <View className="h-full w-full bg-white shadow-md z-0">
                <ThemedText type="defaultSemiBold">
                  This is a simple mobile payment app using React Native and Expo.
                </ThemedText>
                <CustomButton
                  onPress={() => console.log(user)}
                  title="Check User"
                  containerStyles="bg-red-600 w-full py-2 rounded-xl"
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </ThemedView>
  );
}
