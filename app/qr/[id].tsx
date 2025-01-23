import { View, Image, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQrHistoryStore } from "@/context/QrHistoryStore";
import { displayNumber, displayText } from "@/components/display/displayText";
import getNameFromBankCode from "@/lib/bankcode";
import { useTranslation } from "react-i18next";

const Page = () => {
  // Use variable from global state
  const { preData } = useQrHistoryStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const result = preData.find((item) => item.ref2 === id);
  React.useEffect(() => {
    navigation.setOptions({ title: result?.customer });
  }, []);

  if (!result) {
    return (
      <SafeAreaView className="flex-1">
        <ThemedView className="flex-1 justify-center items-center">
          <ThemedText type="subtitle">No data found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="h-full w-full justify-center">
        {result?.status == "Created" && (
          <View className="flex h-1/3 justify-center items-center my-5 sm:my-10">
            <Image
              source={{
                uri: "data:image/jpeg;base64," + result.qrCode,
              }}
              resizeMode="contain"
              alt="Generated Image"
              className="w-full h-full"
            ></Image>
          </View>
        )}
        <View className="flex mx-5 sm:mx-10 p-4 bg-slate-100 dark:bg-gray-500 my-3 rounded-2xl shadow-lg min-h-[1/3] shadow-slate-600 gap-3">
          <View className="w-1/2 justify-center">
            <ThemedText type="defaultSemiBold">
              ฿ {displayNumber.displayNumberWithComma(result.amounts)}
            </ThemedText>
            <ThemedText type="default2">{t("Amount")}</ThemedText>
          </View>
          <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
          <View>
            <ThemedText type="defaultSemiBold">{result.ref1}</ThemedText>
            <ThemedText type="default2">{t("ref1")}</ThemedText>
          </View>
          <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
          <View>
            <ThemedText type="defaultSemiBold">{result.ref2}</ThemedText>
            <ThemedText type="default2">{t("ref2")}</ThemedText>
          </View>
          <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
          <View>
            <ThemedText type="defaultSemiBold">
              {displayText.showOnlyAvailableText(result.remark)}
            </ThemedText>
            <ThemedText type="default2">{t("Remark")}</ThemedText>
          </View>
          <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
          <View>
            <ThemedText type="defaultSemiBold">{result.customer}</ThemedText>
            <ThemedText type="default2">{t("Customer")}</ThemedText>
          </View>
          {result?.scbResponse && (
            <View className="gap-2">
              <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
              <View>
                <ThemedText type="defaultSemiBold">
                  {result.scbResponse?.transactionId}
                </ThemedText>
                <ThemedText type="default2">{t("TransactionID")}</ThemedText>
              </View>
              <View className="border-t-2 border-gray-300 dark:border-gray-600 w-full self-center"></View>
              <View>
                <ThemedText type="defaultSemiBold">
                  {result.scbResponse?.payerAccountNumber}
                </ThemedText>
                <ThemedText type="defaultSemiBold">
                  {result.scbResponse?.payerName}
                </ThemedText>
                <ThemedText type="defaultSemiBold">
                  {getNameFromBankCode(result.scbResponse?.sendingBankCode)}
                </ThemedText>
                <ThemedText type="default2">
                  {t("Payer Information")}
                </ThemedText>
              </View>
            </View>
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Page;
