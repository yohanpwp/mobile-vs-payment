import { ScrollView, Image, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";

// import from project
import { images } from "@/constants/Images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { userForgetPassword } from "@/lib/userdatabase";
import { useTranslation } from "react-i18next";
import MyAlert from "@/components/display/alert";
import useAlert from "@/hooks/useAlert";
import { MessageType } from "@/constants/types";

const ForgetPassword = () => {
  // Define the state
  const [form, setForm] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const { openAlert, alertModalState } = useAlert();

  const handleSubmit = async (value: any) => {
    if (!form.email) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Please fill in all required fields"),
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await userForgetPassword(value);
      if (result.message === "Password reset email sent") {
        openAlert({
          messageType: MessageType.success,
          headerText: t("We received your request"),
          messageText: t("Please check your e-mail to reset your password"),
          onProceed: () => { router.replace("/(auth)/sign-in");},
        });
      } else {
        openAlert({
          messageType: MessageType.danger,
          headerText: "Failed",
          messageText: result.message,
        });
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Add your custom styles here or import them from a separate file
    <ThemedView className="flex-1">
      <ScrollView className="h-full">
        <View className="w-full flex-row justify-center items-center mx-2 mt-4 mb-2 ">
          <Image
            source={images.appIcon}
            resizeMode="cover"
            className="w-[100px] h-[100px] "
          />
          <Text className="text-2xl text-black text-semibold font-psemibold ml-4 dark:text-white">
            QRPay Express
          </Text>
        </View>
        <View className="mx-4 md:mx-12 p-8 md:p-12 rounded-2xl">
          <Text className="dark:text-white">
            {t(
              "Enter your email address to receive a link to create a new password via email."
            )}
          </Text>
          <FormField
            placeholder="E-mail address"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            autoComplete="email"
            keyboardType="email-address"
            otherStyles="mt-3"
            icon="mail"
            required
          />
          <CustomButton
            title={t("Send E-mail")}
            onPress={() => handleSubmit(form)}
            containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white gap-3"
            disabled={isSubmitting}
            icon="send-sharp"
          />
        </View>
        <MyAlert {...alertModalState} />
      </ScrollView>
    </ThemedView>
  );
};

export default ForgetPassword;
