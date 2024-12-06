import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MenuItem, { ItemListProps } from "@/components/navigation/MenuItem";

const Usermenu = () => {
  const items: ItemListProps = [
    { label: "Edit Profile", icon: "id-card-sharp", route: "Profile" },
    { label: "Settings", icon: "settings-sharp", route: "Settings" },
    { label: "Logout", icon: "log-out-sharp", route: "SignOut" },
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
