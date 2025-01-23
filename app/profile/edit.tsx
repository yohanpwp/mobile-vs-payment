import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { updateUser } from "@/lib/userdatabase";
import { Validate } from "@/constants/Validates";
import { useTranslation } from "react-i18next";
import MyAlert from "@/components/display/alert";
import useAlert from "@/hooks/useAlert";
import { MessageType } from "@/constants/types";

const EditProfilePage = () => {
  const { isLoading, user, propsValue, setPropsValue, refresh } =
    useGlobalContext();
  const [userData, setUserData] = useState({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    image: "infinite",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { t } = useTranslation();
  const { openAlert, alertModalState } = useAlert();

  const handlePickImage = async () => {
    if (propsValue.profileImage) {
      const result = {
        ...userData,
        image: "data:image/jpeg;base64," + propsValue.profileImage.base64,
      };
      setUserData(result);
      return result;
    } else {
      const result = { ...userData, image: user?.image as string };
      setUserData(result);
      return result;
    }
  };

  const handleSubmit = async () => {
    if (!userData.firstName || !userData.lastName || !userData.username) {
      openAlert({
        messageType: MessageType.warning,
        headerText: t("Warning"),
        messageText: t("Please fill in all required fields"),
      });
      return;
    }
    setIsSubmitting(true);
    // Validate email format
    if (userData.email) {
      const validation = Validate.value(userData.email, "isSpecialChar");
      if (!validation) {
        openAlert({
          messageType: MessageType.warning,
          headerText: t("Warning"),
          messageText: t("Invalid email format"),
        });
        setIsSubmitting(false);
        return;
      }
    }
    const formData = await handlePickImage();
    try {
      // Update user data in the backend
      const result = await updateUser(formData);
      // // Navigate back to the home page
      if (result) {
        setPropsValue({ profileImage: null });
        refresh();
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ThemedView className="flex-1">
      <Loader isLoading={isLoading} />

      <ScrollView >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <View className="flex items-center w-full my-3 gap-3">
                <Avatar
                  src={{ uri: propsValue?.profileImage?.uri ?? user?.image }}
                  textWithoutPic={user?.firstName[0]}
                  upload
                />
                <ThemedText type="defaultSemiBold">{`${user?.username}`}</ThemedText>
              </View>
              <View className="mx-4">
                {/* Edit profile form */}
                <View className="mx-2 md:mx-16 p-8 md:p-12 rounded-2xl shadow-sm dark:bg-gray-400">
                  <FormField
                    title={t("First Name")}
                    value={userData.firstName}
                    handleChangeText={(e) =>
                      setUserData({ ...userData, firstName: e })
                    }
                    otherStyles="mt-4"
                    required
                  />
                  <FormField
                    title={t("Last Name")}
                    value={userData.lastName}
                    handleChangeText={(e) =>
                      setUserData({ ...userData, lastName: e })
                    }
                    otherStyles="mt-7"
                  />
                  <FormField
                    title={t("Username")}
                    value={userData.username}
                    handleChangeText={(e) =>
                      setUserData({ ...userData, username: e })
                    }
                    otherStyles="mt-7"
                    disabled
                  />
                  <FormField
                    title="E-mail"
                    keyboardType="email-address"
                    value={userData.email}
                    handleChangeText={(e) =>
                      setUserData({ ...userData, email: e })
                    }
                    otherStyles="mt-7"
                  />
                  <CustomButton
                    title={t("Save")}
                    onPress={handleSubmit}
                    containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white"
                    disabled={isSubmitting}
                    icon="add-circle-sharp"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <MyAlert {...alertModalState} />
      </ScrollView>
    </ThemedView>
  );
};

export default EditProfilePage;
