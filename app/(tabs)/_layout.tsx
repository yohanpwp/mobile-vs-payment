import { Tabs, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TabBarIcon2 } from "@/components/navigation/TabBarIcon2";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
   const { isLoading, isLoggedIn } = useGlobalContext();
   const { t } = useTranslation();
  
    if (isLoading && !isLoggedIn) {
      return <Redirect href={"/(auth)/sign-in"} />;
    }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            paddingVertical: 30,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("Home"),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon2
                icon={focused ? "home" : "home-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "QR Code",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon2
                icon={focused ? "qr-code" : "qr-code-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="usermenu"
          options={{
            title: t("Menu"),
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon2
                icon={focused ? "menu" : "menu-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
