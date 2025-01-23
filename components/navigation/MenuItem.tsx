import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, Href } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentPropsWithRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export type ItemListProps = {
  label: string;
  icon: ComponentPropsWithRef<typeof Ionicons>["name"];
  route?: Href;
  onPress?: () => void;
}[];

const MenuItem = ({
  itemList,
  classname,
}: {
  itemList: ItemListProps;
  classname?: string;
}) => {
  const navigation = useRouter();
  const handleClick = (
    route: Href | undefined,
    onPress: (() => void) | undefined
  ) => {
    if (route) {
      navigation.navigate(route);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <View className="flex-1">
      {itemList.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleClick(item.route, item.onPress)}
        >
          <View
            className={`flex-row px-4 sm:px-8 bg-slate-200 py-6 border-b-2 border-gray-400 items-center justify-between ${classname}`}
          >
            <View className="flex-row items-center">
              <Ionicons name={item.icon} size={32} color="black" />
              <Text className="ml-4 text-xl">{item.label}</Text>
            </View>
            <View>
              <AntDesign name="right" size={18} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuItem;
