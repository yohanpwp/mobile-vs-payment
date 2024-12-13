import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Loader from "@/components/Loader";
import MenuItem, { ItemListProps } from "@/components/navigation/MenuItem";
import { useGlobalContext } from "@/context/GlobalProvider";

const Usermenu = () => {
  const { logout, isLoading } = useGlobalContext();

  const items: ItemListProps = [
    { label: "Profile", icon: "id-card-sharp", route: "/(tabs)" },
    { label: "Settings", icon: "settings-sharp" },
    { label: "Logout", icon: "log-out-sharp", onPress: logout },
  ];

  return (
    <ThemedView className="h-full">
      <Loader isLoading={isLoading} />
      <View className="flex-1">
        <View className="flex p-8">
          <ThemedText type="title">SCB Payment</ThemedText>
        </View>
        <View className="flex-1 m-8">
          <MenuItem itemList={items} />
        </View>
      </View>
    </ThemedView>
  );
};

export default Usermenu;
