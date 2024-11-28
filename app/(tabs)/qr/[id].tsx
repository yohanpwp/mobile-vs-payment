import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const QrImageGallery = (props) => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>QrImageGallery</Text>
    </View>
  )
}

export default QrImageGallery