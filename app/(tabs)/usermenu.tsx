import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const Usermenu = () => {
  return (
    <SafeAreaView className='h-full'>
      <ThemedView className='h-full'>
        <View className='flex-1'>
          <ThemedText>SCB Payment</ThemedText>
        </View>
        {/* Create a new data table */}
        <Text>Holy Shit</Text>
        
      </ThemedView>
    </SafeAreaView>
  )
}

export default Usermenu