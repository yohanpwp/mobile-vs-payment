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
import { useTranslation } from "react-i18next";
import useAlert from "@/hooks/useAlert";
import { MessageType } from "@/constants/types";
import MyAlert from "@/components/display/alert";

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
  const { t } = useTranslation();
  const { openAlert, alertModalState } = useAlert();

  const handleChange = async (value: QrGeneratorProps) => {
    if (!value.customerName || !value.ref2 || !value.amounts) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Please fill in all required fields"),
      });
      return;
    }
    if (!Validate.value(value.ref2, ["isUppercase", "isNumber"])) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Reference must contain uppercase letters and numbers"),
      });
      return;
    }
    if (Validate.value(value.ref2, "isLowercase")) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Reference should not contain any lowercase letters"),
      });
      return;
    } else {
      try {
        setIsSubmitting(true);
        const result = await qrBase.getQRCode(value);
        if (result) {
          setPropsValue(result);
          router.replace(`/qr/image`);
          setQrValue(initialQrValue);
          const value = {
            body: result,
            amounts: result.qrBody.amounts,
            token: result.qrBody.token,
            customerName: result.customerName,
            remark: result.remark,
          };
          await qrBase.postSaveHistoryQrCode(value);
        } else {
          Alert.alert("Invalid reference or amount. Please try again.");
          return;
        }
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
            <ThemedText type="title">{t("Create QR Code")}</ThemedText>
          </View>
          <View className="mx-4 md:mx-12 mb-12 bg-gray-400 rounded-2xl drop-shadow-lg p-6 md:p-12">
            <FormField
              title={t("Customer")}
              value={qrValue.customerName}
              handleChangeText={(e) =>
                setQrValue({ ...qrValue, customerName: e })
              }
              otherStyles="mt-3"
              required
            />
            <FormField
              title={t("Amount")}
              value={qrValue.amounts}
              keyboardType="number-pad"
              handleChangeText={(e) => setQrValue({ ...qrValue, amounts: e })}
              otherStyles="mt-7"
              required
            />
            <FormField
              title={t("Reference")}
              value={qrValue.ref2}
              handleChangeText={(e) => setQrValue({ ...qrValue, ref2: e })}
              otherStyles="mt-7"
              required
            />
            <FormField
              title={t("Remark")}
              value={qrValue.remark}
              handleChangeText={(e) => setQrValue({ ...qrValue, remark: e })}
              otherStyles="mt-7 my-7"
            />
            <View className="flex-row mr-2">
              <CustomButton
                title={t("Create QR Code")}
                disabled={isSubmitting}
                onPress={() => handleChange(qrValue)}
                containerStyles="w-3/4"
              />
              <CustomButton
                title={t("Clear")}
                onPress={async () => setQrValue(initialQrValue)}
                containerStyles="ml-4 w-1/4 bg-slate-400 dark:bg-slate-600"
              />
            </View>
          </View>
          <MyAlert {...alertModalState} />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default ScanPage;
