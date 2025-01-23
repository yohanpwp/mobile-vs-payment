import { View, Text, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { images } from "@/constants/Images";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";

const ChangePasswordPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { isLoading, setIsLoading } = useGlobalContext();
  const { t, i18n } = useTranslation();

  const handleValueChange = (value: string) => {
    setSelectedLanguage(value);
    setIsLoading(true);
    setTimeout(() => {
      i18n.changeLanguage(value);
      AsyncStorage.setItem("language", value);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, []);

  let thaiLabel = "";
  let englishLabel = "";
  if (i18n.language === "th") {
    thaiLabel = "ภาษาไทย";
    englishLabel = "อังกฤษ";
  } else {
    thaiLabel = "Thai";
    englishLabel = "English";
  }

  const placeholder = {
    label: selectedLanguage == "en" ? `Select an item...` : `เลือกภาษา...`,
    value: null,
  };

  const items = [
    { label: thaiLabel, value: "th" },
    { label: englishLabel, value: "en" },
  ];

  return (
    <ThemedView className="bg-white flex-1">
      <Loader isLoading={isLoading} />
      <View className="w-full flex-row justify-center items-center my-2">
        <Image
          source={images.appIcon}
          resizeMode="cover"
          className="w-[100px] h-[100px] "
        />
        <ThemedText className="text-2xl text-black text-semibold font-psemibold ml-4">
          QRPay Express
        </ThemedText>
      </View>
      <View className="mx-4 md:mx-12 p-4 md:p-12 rounded-2xl shadow-md dark:bg-gray-400">
        <View className="flex-row justify-between">
          <View className="flex-row gap-3 items-center">
            <MaterialIcons name="language" size={28} color="black" />
            <Text>{t("Change languages")}</Text>
          </View>
          <View className="w-1/3 sm:w-1/2 bg-gray-200 rounded-lg">
            <RNPickerSelect
              onValueChange={handleValueChange}
              items={items}
              value={selectedLanguage}
              placeholder={placeholder}
            />
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

export default ChangePasswordPage;
