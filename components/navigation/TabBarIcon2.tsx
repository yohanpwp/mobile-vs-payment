import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentPropsWithRef } from "react";
import { View, Text } from "react-native";

interface tabBarIconProps {
  icon: ComponentPropsWithRef<typeof Ionicons>["name"];
  color: string;
  name?: string;
  focused: boolean;
}
export function TabBarIcon2({ icon, color, name, focused }: tabBarIconProps) {
  return (
    <View className="flex items-center justify-center w-full h-full">
        {/* Use icon from your images instead change icon type to string */}
        {/* <Image source={icon)} resizeMode="contain" tintColor={color} className= "w-6 h-6" /> */}
        {/* Use icon from ionicIconComponent */}
      <Ionicons
        name={icon}
        size={focused? 26 : 24}
        color={color}
        className="align-middle justify-center"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center`} style={{ color: color }}>{name}</Text>
    </View>
  );
}
