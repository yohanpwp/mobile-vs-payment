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
    <View className="flex-1">
        {/* Use icon from your images instead change icon type to string */}
        {/* <Image source={icon)} resizeMode="contain" tintColor={color} className= "w-6 h-6" /> */}
        {/* Use icon from ionicIconComponent */}
      <Ionicons
        name={icon}
        size={focused? 28 : 26}
        color={color}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-[10px] text-center`} style={{ color: color }}>{name}</Text>
    </View>
  );
}
