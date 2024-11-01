import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

interface FormFieldProps {
  title: string;
  type?: string;
  value: string | undefined;
  placeholder: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}
const FormField = ({
  title,
  type,
  value,
  placeholder,
  handleChangeText,
  keyboardType = "default",
  otherStyles,
  ...props
}: FormFieldProps) => {
  // Add state to show/hide password
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={24}
              color="#7b7b8b"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
