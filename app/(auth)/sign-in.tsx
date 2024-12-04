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
import { postLogin } from "@/lib/userdatabase";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => { 
  // Use the global context
  const { setUser, setIsLoggedIn } = useGlobalContext();
  // Define the state
  const [form, setForm] = useState<AuthUserProps>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value: AuthUserProps) => {
    if (!form.username ||!form.password) {
      Alert.alert("Please fill in all required fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const result = await postLogin(form);
      if (!result.message) {
        setUser(result);
        setIsLoggedIn(true); // Update the global state
        router.replace('/')
      } else {
        Alert.alert(result.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Add your custom styles here or import them from a separate file
    <SafeAreaView className="flex-1">
      <ScrollView className="bg-white">
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
        <View className="mx-4 md:mx-12 p-4 md:p-12 rounded-2xl shadow-lg">
          <FormField
            title="Username"
            placeholder="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-3"
            autoComplete="username"
            required
          />
          <FormField
            title="Password"
            type="password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            required
          />
          <View className="flex-row items-center">
            <Switch
              value={form.rememberMe}
              onValueChange={() =>
                setForm({ ...form, rememberMe: !form.rememberMe })
              }
            />
            <Text>Keep me signed in</Text>
          </View>
          <CustomButton
            title="Sign In"
            onPress={() => handleSubmit(form)}
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
