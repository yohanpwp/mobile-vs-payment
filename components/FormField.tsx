import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";

interface FormFieldProps {
  title: string;
  type?: string;
  value: string | undefined;
  placeholder: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  required? : boolean;
}
const FormField = ({
  title,
  type,
  value,
  placeholder,
  handleChangeText,
  keyboardType = "default",
  otherStyles,
  required = false,
  ...props
}: FormFieldProps & TextInputProps) => {
  // Add state to show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      setTouched(false);
    }}, []
  )

  const handleBlur = () => {
    setTouched(true);
  };
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-slate-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          {...props}
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onBlur={handleBlur}
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
      { required && (value == '') && touched && <Text className="text-red-600 text-sm ml-2">{title} is required.</Text>}
    </View>
  );
};

export default FormField;
