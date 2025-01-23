import { View, Text, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { images } from "@/constants/Images";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { changeMypassword } from "@/lib/userdatabase";
import { useTranslation } from 'react-i18next';
import MyAlert from "@/components/display/alert";
import useAlert from "@/hooks/useAlert";
import { MessageType } from "@/constants/types";

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const { openAlert, alertModalState } = useAlert();

  const handleSubmit = async () => {
    if (!form.password || !form.newPassword || !form.confirmPassword) {
      openAlert({
              messageType: MessageType.warning,
              headerText: t("Warning"),
              messageText: t("Please fill in all required fields"),
            });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Must match 'password' field value"),
      });
      return;
    }
    try {
      setIsSubmitting(true);
      await changeMypassword(form);
    } catch (error) {
      openAlert({
        messageType: MessageType.error,
        headerText: t("Error"),
        messageText: t("Error updating password"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ThemedView className="bg-white flex-1">
      <View className="w-full flex-row justify-center items-center my-2">
        <Image
          source={images.appIcon}
          resizeMode="cover"
          className="w-[100px] h-[100px] "
        />
        <ThemedText className="text-2xl text-black text-semibold font-psemibold ml-4">
          QRPay Express
        </ThemedText>
      </View>
      <View className="mx-4 md:mx-12 p-8 md:p-12 rounded-2xl shadow-md dark:bg-gray-400">
        <FormField
          title={t("Password")}
          type="password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-3"
          autoComplete="password"
          required
        />
        <FormField
          title={t("New Password")}
          type="password"
          value={form.newPassword}
          handleChangeText={(e) => setForm({ ...form, newPassword: e })}
          otherStyles="mt-7"
          required
        />
        <FormField
          title={t("Confirm Password")}
          type="password"
          value={form.confirmPassword}
          handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
          otherStyles="mt-7"
          required
        />

        <CustomButton
          title={t("Change Password")}
          onPress={() => handleSubmit()}
          containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white"
          disabled={isSubmitting}
          icon="sync-outline"
        />
      </View>
      <MyAlert {...alertModalState} />
    </ThemedView>
  );
};

export default ChangePasswordPage;
