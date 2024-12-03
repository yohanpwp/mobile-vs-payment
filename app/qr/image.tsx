import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { qrBase } from "@/lib/qrdatabase";
const QrImageGallery = () => {
  const { propsValue } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const base64url = "data:image/jpeg;base64," + propsValue.image;

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const value = {
      body: data,
      amounts: data.qrBody.amounts,
      token: data.qrBody.token,
      customerName: data.customerName,
      remark: data.remark,
    };
    try {
      const result = await qrBase.postSaveHistoryQrCode(value);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ThemedView className="h-full">
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
          <View className="flex-auto">
            <View className="ml-7 md:ml-12">
              <Text className="text-xl">
                Customer : {propsValue?.customerName}
              </Text>
              <Text className="text-xl first-letter:capitalize">
                Amounts : {propsValue?.qrBody.amounts} บาท
              </Text>
              <Text className="text-xl first-letter:capitalize">
                Expired Scan : {propsValue?.qrBody.expiryDate}
              </Text>
              <Text className="text-xl first-letter:uppercase">
                Ref1 : {propsValue?.qrBody.ref1}
              </Text>
              <Text className="text-xl first-letter:uppercase">
                Ref2 : {propsValue?.qrBody.ref2}
              </Text>
              <Text className="text-xl first-letter:capitalize">
                Remark : {propsValue?.remark ? propsValue?.remark : "-"}
              </Text>
            </View>
            <CustomButton
              disabled={isSubmitting}
              title="Save to database"
              onPress={() => handleSubmit(propsValue)}
              icon="save"
              containerStyles="mt-7 bg-blue-500 mx-7 md:mx-12 font-psemibold text-white"
            />
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default QrImageGallery;
