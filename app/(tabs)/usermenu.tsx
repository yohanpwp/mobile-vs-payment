import { View, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Loader from "@/components/Loader";
import MenuItem, { ItemListProps } from "@/components/navigation/MenuItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants/Images";
import { useTranslation } from 'react-i18next';
const Usermenu = () => {
  const { logout, isLoading } = useGlobalContext();
  const { t } = useTranslation();

  const items: ItemListProps = [
    { label: t("Edit Profile"), icon: "id-card-sharp", route: "/profile/edit" },
    {
      label: t("Change Password"),
      icon: "log-out-sharp",
      route: "/profile/change-password",
    },
    { label: t("Settings"), icon: "settings-sharp", route: '/profile/setting'},
  ];

  return (
    <ThemedView className="h-full">
      <Loader isLoading={isLoading} />
      <ScrollView className="flex-1">
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
        <View className="flex-1">
          <MenuItem itemList={items} />
        </View>
      </ScrollView>
      <View>
        <View className="flex justify-center items-center w-full border-t-2 border-slate-400 px-6">
          <Pressable
            onPress={logout}
            className="p-4 w-1/2 sm:w-1/4 max-w-60 active:bg-slate-200 items-center rounded-lg"
          >
            <ThemedText type="subtitle">{t('Logout')}</ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
};

export default Usermenu;
