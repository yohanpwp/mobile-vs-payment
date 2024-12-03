import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { QrGeneratorProps } from "@/constants/propQR";
import CustomButton from "@/components/CustomButton";
import { qrBase } from "@/lib/qrdatabase";
import { router } from "expo-router";
import { Validate } from "@/constants/Validates";
import { useGlobalContext } from "@/context/GlobalProvider";

const ScanPage = () => {
  const initialQrValue = {
    customerName: "",
    ref2: "",
    amounts: "",
    remark: "",
  };
  const { setPropsValue } = useGlobalContext();
  const [qrValue, setQrValue] = useState<QrGeneratorProps>(initialQrValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = async (value: QrGeneratorProps) => {
    if (!value.customerName || !value.ref2 || !value.amounts) {
      Alert.alert("Please fill in all required fields");
      return;
    } 
    if (!Validate.value(value.ref2,["isUppercase", "isNumber"])) {
      Alert.alert("Invalid reference. It should only contain uppercase letters and numbers");
      return;
    }
    if (Validate.value(value.ref2,"isLowercase")) {
      Alert.alert("Reference should not contain any lowercase letters");
      return;
    }
    else {
      try {
        setIsSubmitting(true);
        const result = await qrBase.getQRCode(value);
        setPropsValue(result);
        Alert.alert("QR Code generated successfully");
        router.push(`/qr/image`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <ThemedView className="h-full">
        <ScrollView>
          <View className="flex p-8">
            <ThemedText className="text-2xl font-pextrabold">
              SCB Payment
            </ThemedText>
          </View>
          <View className="mx-4 md:mx-12 mb-12 bg-gray-200 rounded-md drop-shadow-lg p-6 md:p-12">
            <FormField
              title="Customer Name"
              value={qrValue.customerName}
              placeholder="Customer*"
              handleChangeText={(e) =>
                setQrValue({ ...qrValue, customerName: e })
              }
              required
            />
            <FormField
              title="Amounts"
              value={qrValue.amounts}
              placeholder="Fill your amount here*"
              keyboardType="number-pad"
              handleChangeText={(e) => setQrValue({ ...qrValue, amounts: e })}
              otherStyles="mt-7"
              required
            />
            <FormField
              title="Reference"
              value={qrValue.ref2}
              placeholder="Reference*"
              handleChangeText={(e) => setQrValue({ ...qrValue, ref2: e })}
              otherStyles="mt-7"
              required
            />
            <FormField
              title="Remark"
              value={qrValue.remark}
              placeholder="Remark"
              handleChangeText={(e) => setQrValue({ ...qrValue, remark: e })}
              otherStyles="mt-7 my-7"
            />
            <View className="flex-row">
              <CustomButton
                title="Create QR Code"
                disabled={isSubmitting}
                onPress={() => handleChange(qrValue)}
                containerStyles="flex-1"
              />
              <CustomButton
                title="Clear"
                onPress={() => setQrValue(initialQrValue)}
                containerStyles="ml-4 flex-1 bg-primary"
              />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default ScanPage;
