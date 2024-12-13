import { Image, View, Text, ScrollView } from "react-native";
import { useEffect } from "react";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import { useQrHistoryStore } from "@/context/QrHistoryStore";
import useTimeStore from "@/context/TimeStore";

export default function HomeScreen() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();
  const { preData } = useQrHistoryStore();
  const { now, updateNow } = useTimeStore();

  useEffect(() => {
    const interval = setInterval(updateNow, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <View className="rounded-full bg-slate-100 border-2 w-52 h-52 justify-center items-center">
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
              <View className="h-full w-full bg-white shadow-md z-0 p-4 md:p-8">
                <ThemedText type="defaultSemiBold">
                  This is a simple mobile payment app using React Native and
                  Expo.
                </ThemedText>
                <View className="flex-row w-full justify-center items-center p-5">
                  <View className="w-1/3 justify-center items-center">
                    <ThemedText type="defaultSemiBold">
                      {preData.length}
                    </ThemedText>
                    <ThemedText>Builds</ThemedText>
                  </View>
                  <View className="w-1/3 justify-center items-center">
                    <ThemedText type="defaultSemiBold">
                      {preData.filter(item => item.status === 'Paid').length}
                    </ThemedText>
                    <ThemedText>Paid</ThemedText>
                  </View>
                  <View className="w-1/3 justify-center items-center">
                    <ThemedText type="defaultSemiBold">
                      {preData.filter(item => item.status === 'Canceled').length}
                    </ThemedText>
                    <ThemedText>Canceled</ThemedText>
                  </View>
                </View>
                <ThemedText>Current Time : {now.toLocaleTimeString()}</ThemedText>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </ThemedView>
  );
}
