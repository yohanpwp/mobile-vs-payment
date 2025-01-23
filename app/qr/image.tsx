import { View, Text, Image, ScrollView } from "react-native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalContext } from "@/context/GlobalProvider";
import { displayText } from "@/components/display/displayText";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";
const QrImageGallery = () => {
  const { propsValue } = useGlobalContext();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const base64url = "data:image/jpeg;base64," + propsValue.image;
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ThemedView className="h-full">
        <ScrollView contentContainerStyle={{ height: "100%", paddingVertical: 2 }}>
          <View className="flex-1 mt-5">
            {/* Implement a QR code reader or library to display the QR image */}
            <View className="h-1/2 flex justify-center items-center">
              <Image
                source={{ uri: base64url }}
                resizeMode="contain"
                alt="Generated Image"
                className="w-3/4 h-3/4"
              />
            </View>
            <View className="flex-auto w-11/12 sm:w-10/12 self-center">
              <View className="p-3 sm:p-6 bg-slate-300 dark:bg-slate-700 rounded-xl mb-6">
                <Text className="text-xl sm:text-2xl dark:text-white">
                  {`${t("Customer")} : ${propsValue?.customerName}`}
                </Text>
                <Text className="text-xl sm:text-2xl dark:text-white first-letter:capitalize">
                  {`${t("Amount")}  : ${propsValue?.qrBody.amounts} บาท`}
                </Text>
                <Text className="text-xl sm:text-2xl dark:text-white first-letter:capitalize">
                  {`${t("Expired Scan")} : ${propsValue?.qrBody.expiryDate}`}
                </Text>
                <Text className="text-xl sm:text-2xl dark:text-white first-letter:uppercase">
                  {`${t("ref1")} : ${propsValue?.qrBody.ref1}`}
                </Text>
                <Text className="text-xl sm:text-2xl dark:text-white first-letter:uppercase">
                  {`${t("ref2")} : ${propsValue?.qrBody.ref2}`}
                </Text>
                <Text className="text-xl sm:text-2xl dark:text-white first-letter:capitalize">
                  {`${t("Remark")} : ${displayText.showOnlyAvailableText(
                    propsValue?.qrBody.remark
                  )}`}
                </Text>
              </View>
              <CustomButton
                title={t("Back to QR Code Page")}
                onPress={async () => router.replace("/(tabs)/history")}
              />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default QrImageGallery;
