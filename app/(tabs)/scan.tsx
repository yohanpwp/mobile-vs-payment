import { View, Text } from "react-native";
import React, { useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { QrGeneratorProps } from "@/constants/propQR";
import CustomButton from "@/components/CustomButton";

const ScanPage = () => {
  const initialQrValue = {
    customerName: "",
    amounts: "",
    remark: "",
  };
  const [qrValue, setQrValue] = useState<QrGeneratorProps>(initialQrValue);
  return (
    <SafeAreaView>
      <ThemedView className="h-full">
        <View className="flex p-8">
          <ThemedText className="text-2xl font-pextrabold">
            SCB Payment
          </ThemedText>
        </View>
        <View className="mx-4 md:mx-12 mb-12 bg-gray-200 rounded-md drop-shadow-lg p-6 md:p-12">
          <FormField
            title="Customer Name:"
            value={qrValue.customerName}
            placeholder="Customer*"
            handleChangeText={(e) =>
              setQrValue({ ...qrValue, customerName: e })
            }
          />
          <FormField
            title="Amounts:"
            value={qrValue.amounts}
            placeholder="Fill your amount here*"
            keyboardType="number-pad"
            handleChangeText={(e) => setQrValue({ ...qrValue, amounts: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Remark:"
            value={qrValue.remark}
            placeholder="Remark"
            handleChangeText={(e) => setQrValue({ ...qrValue, remark: e })}
            otherStyles="my-7"
          />
          <View className="flex-row">
            <CustomButton
              title="Create QR Code"
              onPress={() => console.log(qrValue)}
              containerStyles="flex-1"
            />
            <CustomButton
              title="Clear"
              onPress={() => setQrValue(initialQrValue)}
              containerStyles="ml-4 flex-1 bg-primary"
            />
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default ScanPage;
