import { View, Text } from "react-native";
import React from "react";

const IconStatus = (status: string) => {
  switch (status) {
    case "Paid":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-green-500 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    case "ชำระแล้ว":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-green-500 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    case "Canceled":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-red-500 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    case "ยกเลิก":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-red-500 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    case "Created":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-blue-800 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    case "สร้างแล้ว":
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-blue-800 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
    default:
      return (
        <View className="flex-row py-1 px-2 sm:py-4 sm:px-6 items-center bg-blue-800 rounded-lg">
          <Text className="text-center text-white sm:text-xl">{status}</Text>
        </View>
      );
  }
};

export default IconStatus;
