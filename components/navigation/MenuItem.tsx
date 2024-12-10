import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter, Href } from 'expo-router';
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentPropsWithRef } from "react";

export type ItemListProps = {
    label: string;
    icon: ComponentPropsWithRef<typeof Ionicons>["name"];
    route?: Href;
    onPress?: () => void;
  }[]

const MenuItem = ({ itemList } : { itemList: ItemListProps }) => {
  const navigation = useRouter()
  const handleClick = (route: Href | undefined, onPress: (() => void) | undefined) => {
    if (route) {
    navigation.navigate(route)
    } else if (onPress) {
      onPress()
    }
  }

  return (
    <View className='flex-1'>
      {itemList.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleClick(item.route, item.onPress)}>
            <View className='flex-row px-4 sm:px-8 h-[120px] bg-slate-200 border-2 mt-2 border-black items-center'>
                <Ionicons name={item.icon} size={26} color="black" />
                <Text className='ml-4'>{item.label}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MenuItem