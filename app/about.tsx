import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text className='text-3xl'>About Page</Text>
      </View>
      <View className='flex-auto'>
        <CustomButton onPress={() => console.log('Yes')} title='Print' containerStyles='bg-yellow-500 px-24'></CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
export default AboutPage