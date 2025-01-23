import {
  ScrollView,
  Image,
  Text,
  View,
  TextInputBase,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";

// import from project
import { images } from "@/constants/Images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { AuthUserProps } from "@/constants/propUser";
import { postLogin } from "@/lib/userdatabase";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import { useQrHistoryStore } from "@/context/QrHistoryStore";
import MyAlert from "@/components/display/alert";
import useAlert from "@/hooks/useAlert";
import { MessageType } from "@/constants/types";

const SignIn = () => {
  // Use the global context
  const { setUser, setIsLoggedIn, isLoading } = useGlobalContext();
  const { fetchData } = useQrHistoryStore();
  const [t] = useTranslation();
  const { openAlert, alertModalState } = useAlert();
  // Define the state
  const [form, setForm] = useState<AuthUserProps>({
    username: "",
    password: "",
    rememberMe: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value: AuthUserProps) => {
    if (!form.username || !form.password) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Please fill in all required fields"),
      });
    } else {
      try {
        setIsSubmitting(true);
        const result = await postLogin(form);
        if (!result.message) {
          setUser(result);
          fetchData(result);
          setIsLoggedIn(true); // Update the global state
          router.replace("/");
        } else {
          openAlert({
            messageType: MessageType.error,
            headerText: "Failed",
            messageText: result.message,
          });
        }
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    // Add your custom styles here or import them from a separate file
    <ThemedView className="flex-1">
      <Loader isLoading={isLoading} />
      <ScrollView>
        <View className="w-full flex-row justify-center items-center mx-2 mt-4 mb-2 ">
          <Image
            source={images.appIcon}
            resizeMode="cover"
            className="w-[100px] h-[100px] "
          />
          <Text className="text-2xl text-black dark:text-white text-semibold font-psemibold ml-4">
            QRPay Express
          </Text>
        </View>
        <View className="mx-4 md:mx-12 p-8 md:p-12 rounded-2xl shadow-md dark:bg-gray-400">
          <FormField
            placeholder={t("Username")}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            autoComplete="username"
            icon="user"
            required
          />
          <FormField
            type="password"
            placeholder={t("Password")}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            icon="lock"
            otherStyles="mt-7"
            required
          />
          <View className="text-end items-end mt-2">
            <Link href={"/(auth)/forget-password"}>
              <Text className="text-blue-600 underline">
                {t("Forget Password?")}
              </Text>
            </Link>
          </View>
          <CustomButton
            title={t("Login")}
            onPress={() => handleSubmit(form)}
            containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white"
            disabled={isSubmitting}
            icon="enter"
          />
        </View>
        <MyAlert {...alertModalState} />
      </ScrollView>
    </ThemedView>
  );
};

export default SignIn;
