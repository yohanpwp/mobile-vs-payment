import { View, Text, TouchableOpacity } from "react-native";
import React, { ComponentPropsWithRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomButtonProps {
  onPress: () => void;
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
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        !disabled
          ? `bg-blue-600 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`
          : `bg-slate-500 rounded-xl min-h-[62px] justify-center items-center`
      }
      disabled={disabled}
      onPress={onPress}
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
