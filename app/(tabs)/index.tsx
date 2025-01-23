import { View, Text, ScrollView, Dimensions } from "react-native";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import { useQrHistoryStore } from "@/context/QrHistoryStore";
import Avatar from "@/components/Avatar";
import { PieChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();
  const { preData } = useQrHistoryStore();
  const { t } = useTranslation();

  if (isLoading && !isLoggedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const windowHeight = Dimensions.get('window').height;

  const pieData = [
    {
      value: preData.filter((item) => item.status === "Paid").length,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
    },
    {
      value: preData.filter((item) => item.status === "Canceled").length,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
    {
      value: preData.filter((item) => item.status === "Created").length,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <Loader isLoading={isLoading} />
      <LinearGradient
          // Background Linear Gradient
          colors={["#1E90FF", "transparent"]}
        >
      <ScrollView contentContainerStyle={{ height: "100%", paddingVertical: 2 }}>
        
          <View className="w-full justify-center items-center h-full px-4">
            <Avatar src={{uri: user?.image}} textWithoutPic={user?.firstName[0]} width={300} height={300}/>
            <View className="my-5 md:my-10 items-center">
              <ThemedText type="title">{`${user?.firstName} ${user?.lastName}`}</ThemedText>
              <ThemedText type="subtitle">{user?.username}</ThemedText>
            </View>
            <View className="h-1/2 w-11/12 items-center mt-10">
              <View className="absolute w-10/12 h-1/2 -top-5 bg-[rgb(180,180,180,0.7)] shadow-sm -z-10"></View>
              <View className="absolute w-9/12 h-1/2 -top-8 bg-[rgb(180,180,180,0.5)] shadow-sm -z-20"></View>
              <View className="flex h-full w-full bg-white shadow-md p-4 md:p-8 rounded-lg">
                <View className="flex-row w-full justify-center items-center p-5 gap-2">
                  <View className="w-1/3 justify-center items-center border-4 border-[#93FCF8] rounded-lg p-2">
                    <Text className="font-bold text-2xl" >
                      {pieData[2].value}
                    </Text>
                    <Text className="text-gray-600">{t('Opened')}</Text>
                  </View>
                  <View className="w-1/3 justify-center items-center border-4 border-[#009FFF] rounded-lg p-2">
                    <Text className="font-bold text-2xl" >
                      {pieData[0].value}
                    </Text>
                    <Text className="text-gray-600">{t('Paid')}</Text>
                  </View>

                  <View className="w-1/3 justify-center items-center border-4 border-[#FFA5BA] rounded-lg p-2">
                    <Text className="font-bold text-2xl" >
                      {pieData[1].value}
                    </Text>
                    <Text className="text-gray-600">{t('Canceled')}</Text>
                  </View>
                </View>
                <View className="flex-1 justify-center items-center">
                  <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    radius={windowHeight > 1000 ? 160 : 110}
                    innerRadius={windowHeight > 1000 ? 120 : 70}
                    innerCircleColor={"#232B5D"}
                    centerLabelComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 30,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {preData.length}
                          </Text>
                          <Text style={{ fontSize: 16, color: "white" }}>
                            {t('Total Builds')}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
