import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// import from projects
import { UserDataProps } from "@/constants/propUser";
import { images } from "@/constants/Images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [userData, setUserData] = useState<UserDataProps>({
    email: "",
    username: "",
    password: "",
    firstName: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (!userData.email || !userData.username || !userData.password) {
      Alert.alert("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(userData);
      // set it to global state
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Add your custom styles here or import them from a separate file
    <SafeAreaView className="flex-grow">
      <ScrollView className="bg-gray-400">
        <View className="w-full justify-center">
          <Image source={images.VerismartLogo} className="w-[160px] h-[60px]" />
          <View className="w-screen flex-row justify-between items-center px-2 my-5">
            <Text className="text-2xl text-black text-semibold font-psemibold">
              Sign-Up
            </Text>
            <Link href={"/(auth)/sign-in"}>
              <Text className="text-blue-600 underline">
                Already have an account?
              </Text>
            </Link>
          </View>
          <View className="mx-4 md:mx-12 p-4 md:p-12 bg-white rounded-2xl shadow-lg">
            <FormField
              title="First Name"
              placeholder="First Name"
              value={userData.firstName}
              handleChangeText={(e) =>
                setUserData({ ...userData, firstName: e })
              }
            />
            <FormField
              title="Last Name"
              placeholder="Last Name"
              value={userData.lastName}
              handleChangeText={(e) =>
                setUserData({ ...userData, lastName: e })
              }
              otherStyles="mt-7"
            />
            <FormField
              title="Username"
              placeholder="Username"
              value={userData.username}
              handleChangeText={(e) =>
                setUserData({ ...userData, username: e })
              }
              otherStyles="mt-7"
            />
            <FormField
              title="E-Mail"
              placeholder="E-Mail"
              value={userData.email}
              handleChangeText={(e) => setUserData({ ...userData, email: e })}
              otherStyles="mt-7"
            />
            <FormField
              title="Password"
              type="password"
              placeholder="Password"
              value={userData.password}
              handleChangeText={(e) =>
                setUserData({ ...userData, password: e })
              }
              otherStyles="mt-7"
            />
            <FormField
              title="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              handleChangeText={(e) =>
                setUserData({ ...userData, confirmPassword: e })
              }
              otherStyles="mt-7"
            />
            <CustomButton
              title="Create Account"
              onPress={handleSubmit}
              containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white"
              disabled={isSubmitting}
              icon="add-circle-sharp"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
