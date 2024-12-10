import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MenuItem, { ItemListProps } from "@/components/navigation/MenuItem";
import { useGlobalContext } from "@/context/GlobalProvider";

const Usermenu = () => {
  const { logout } = useGlobalContext();

  const items: ItemListProps = [
    { label: "Edit Profile", icon: "id-card-sharp", route: "/(tabs)" },
    { label: "Settings", icon: "settings-sharp" },
    { label: "Logout", icon: "log-out-sharp", onPress: logout },
  ];

  return (
    <ThemedView className="h-full">
      <View className="flex-1">
        <View className="flex-1 m-8">
          <MenuItem itemList={items} />
        </View>
        <View className="flex bg-green-500">
          <ThemedText>SCB Payment</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default Usermenu;
