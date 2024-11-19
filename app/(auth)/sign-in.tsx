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
import { SafeAreaView } from "react-native-safe-area-context";

// import from project
import { images } from "@/constants/Images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { AuthUserProps } from "@/constants/propUser";
import { signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  // Define the state
  const [user, setUser] = useState<AuthUserProps>({
    email: '',
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value: AuthUserProps) => {
    try {
      const result = await signIn(value.email, value.password);
      setIsSubmitting(true);
      router.replace('/(tabs)')
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Add your custom styles here or import them from a separate file
    <SafeAreaView className="bg-gray-400 h-full">
      <ScrollView>
        <View className="w-full justify-center min-w-[85vh]">
          <Image source={images.VerismartLogo} className="w-[160px] h-[60px]" />
          <View className="w-screen flex-row justify-between items-center px-4 my-5">
            <Text className="text-2xl text-black text-semibold font-psemibold">
              Sign-In
            </Text>
            <Link href={"/(auth)/sign-up"}>
              <Text className="text-blue-600 underline">
                Don't have an account?
              </Text>
            </Link>
          </View>
        </View>
        <View className="mx-4 md:mx-12 p-4 md:p-12 bg-white rounded-2xl shadow-lg">
          <FormField
            title="E-mail"
            placeholder="E-mail"
            value={user.email}
            handleChangeText={(e) => setUser({ ...user, email: e })}
            otherStyles="mt-3"
          />
          <FormField
            title="Password"
            type="password"
            placeholder="Password"
            value={user.password}
            handleChangeText={(e) => setUser({ ...user, password: e })}
            otherStyles="mt-7"
          />
          <View className="flex-row items-center">
            <Switch
              value={user.rememberMe}
              onValueChange={() =>
                setUser({ ...user, rememberMe: !user.rememberMe })
              }
            />
            <Text>Keep me signed in</Text>
          </View>
          <CustomButton
            title="Sign In"
            onPress={() => handleSubmit(user)}
            containerStyles="mt-6 bg-blue-500 py-3 font-psemibold text-white"
            disabled={isSubmitting}
            icon="enter"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
