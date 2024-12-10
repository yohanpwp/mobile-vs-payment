import { View, Image, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Page = () => {
  const { propsValue } = useGlobalContext();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const result = propsValue[id];
  React.useEffect(() => {
    navigation.setOptions({ title: result.customer });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="h-full w-full justify-center">
        <View className="flex h-1/3 justify-center items-center my-5 sm:my-10">
          <Image
            source={{
              uri: "data:image/jpeg;base64," + result?.qrCode,
            }}
            resizeMode="contain"
            alt="Generated Image"
            className="w-full h-full"
          ></Image>
        </View>
        <View className="flex mx-5 sm:mx-10">
          <MaterialCommunityIcons name="account-cash" size={30} color="black" />
          <ThemedText type="subtitle">{result?.amounts}</ThemedText>
          <MaterialCommunityIcons name="account" size={30} color="black" />
          <ThemedText type="subtitle">{result?.customer}</ThemedText>
          {!result?.scbResponse && (
            <View>
              <ThemedText type="subtitle">
                {result?.scbResponse?.billPaymentRef1}
              </ThemedText>
              <ThemedText type="subtitle">
                {result?.scbResponse?.billPaymentRef2}
              </ThemedText>
              <ThemedText type="subtitle">
                {result?.scbResponse?.payerAccountNumber}
              </ThemedText>
              <ThemedText type="subtitle">
                {result?.scbResponse?.payerName}
              </ThemedText>
              <ThemedText type="subtitle">
                {result?.scbResponse?.payeeAccountNumber}
              </ThemedText>
              <ThemedText type="subtitle">
                {result?.scbResponse?.payeeName}
              </ThemedText>
            </View>
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Page;
