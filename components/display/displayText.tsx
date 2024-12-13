import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const showOnlyAvailableText = (text: string | undefined): string => {
  return text ? text : "-";
};

const showIconStatus = (status: string | undefined) => {
  switch (status) {
    case "Paid":
      return (
        <View className="flex-row py-1 px-2 items-center bg-green-500 rounded-lg">
          <Text className="text-center text-white">{status}</Text>
        </View>
      );
    case "Canceled":
      return (
        <View className="flex-row py-1 px-2 items-center bg-red-500 rounded-lg">
          <Text className="text-center text-white">{status}</Text>
        </View>
      );
    case "Created":
      return (
        <View className="flex-row py-1 px-2 items-center bg-blue-800 rounded-lg">
          <Text className="text-center text-white">{status}</Text>
        </View>
      );
    default:
      break;
  }
};

const displayNumberWithComma = (value: string | number) => {
  let typeNumber = typeof value == "string" ? Number(value) : value;
  let displayNumber = typeNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
  return displayNumber;
};

const formatDatesPicker = (value: string) => {
  return Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(Date.parse(value));
};

export const displayText = {
  showOnlyAvailableText,
  showIconStatus,
  formatDatesPicker,
};

export const displayNumber = { displayNumberWithComma };
