import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentPropsWithRef } from "react";

export type ItemListProps = {
    label: string;
    icon: ComponentPropsWithRef<typeof Ionicons>["name"];
    route: string;
  }[]

const MenuItem = ({ itemList } : { itemList: ItemListProps }) => {
  return (
    <View className='flex-1'>
      {itemList.map((item, index) => (
        <TouchableOpacity>
            <View className='flex-row px-4 sm:px-8 h-[120px] bg-slate-200 border-y-2 border-black items-center'>
                <Ionicons name={item.icon} size={26} color="black" />
                <Text key={index} className='ml-4'>{item.label}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MenuItem