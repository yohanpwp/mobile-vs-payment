import { View, Text, TouchableOpacity } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import React, { ComponentPropsWithRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomButtonProps {
  onPress: () => Promise<void> | void;
  title: string;
  disabled?: boolean;
  textStyles?: string;
  containerStyles?: string;
  icon?: ComponentPropsWithRef<typeof Ionicons>["name"];
  iconColor?: string; 
}

const CustomButton = ({
  onPress,
  title,
  disabled = false,
  textStyles,
  containerStyles,
  icon,
  iconColor = 'white'
}: CustomButtonProps) => {
  const { setIsLoading } = useGlobalContext();
  const handlePress = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await onPress();
      } catch (error) {
        // Handle error if needed
        console.error("Error performing action", error);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Simulate network delay for demonstration purposes. Replace with actual API call.
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        !disabled
          ? `bg-blue-600 rounded-xl min-h-[50px] justify-center items-center ${containerStyles}`
          : `rounded-xl min-h-[50px] justify-center items-center ${containerStyles} bg-slate-500`
      }
      disabled={disabled}
      onPress={handlePress}
    >
      <View className="flex-row gap-2">
        <Text
          className={
            !disabled
              ? `font-semibold text-lg text-white ${textStyles}`
              : `${textStyles} font-semibold text-lg text-gray-700`
          }
        >
          {title}
        </Text>
        {icon && <Ionicons
          name={icon}
          size={28}
          color={iconColor}
        />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
