import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, ComponentPropsWithRef } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";

interface FormFieldProps {
  title?: string;
  type?: string;
  value: string | undefined;
  placeholder?: string | undefined;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
  disabled?: boolean;
  icon?: ComponentPropsWithRef<typeof Entypo>["name"];
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
  disabled = false,
  icon,
  ...props
}: FormFieldProps & TextInputProps) => {
  // Add state to show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      setTouched(false);
    }
  }, []);

  const { t, i18n } = useTranslation();

  let helperText = ''

  if (i18n.language === 'en') {
    helperText = `${title ?? placeholder} is required.`
  } else if (i18n.language === 'th') {
    helperText = `ระบุค่าในช่อง ${title?? placeholder} ให้เรียบร้อย`
  }

  const handleBlur = () => {
    setTouched(true);
  };
  return (
    <View className={`${otherStyles}`}>
      <View className="border-2 border-gray-400 w-full gap-4 bg-slate-100 rounded-2xl active:border-gray-700 items-center flex-row">
        {title && (
          <Text className="absolute border-2 border-gray-400 bg-slate-100 -top-4 left-5 text-gray-700 rounded-lg p-1 font-pmedium">
            {title}{required? '*' : ''}
          </Text>
        )}

        {icon && (
          <View>
            <Entypo className="ml-4" name={icon} size={24} color="black" />
          </View>
        )}
        <TextInput
          {...props}
          className={`flex-1 text-black font-psemibold text-base px-4 py-4 ${
            disabled ? "text-gray-500" : ""
          }`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType}
          editable={!disabled}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              className="mr-2"
              name={showPassword ? "eye" : "eye-with-line"}
              size={24}
              color="#7b7b8b"
            />
          </TouchableOpacity>
        )}
      </View>
      {required && value == "" && touched && (
        <Text className="text-red-600 text-sm ml-2">
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default FormField;
