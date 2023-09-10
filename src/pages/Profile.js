import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Logout } from '../Redux/actions'

const Profile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  return (
    <SafeAreaView className='items-center'>
      <View className='h-14 w-screen bg-blue-950'>
        <View className='flex-row justify-between' >

        </View>
      </View>
      <Text>This is Profile Page.</Text>
      <Button title='Logout' onPress={() => dispatch(Logout())} />
    </SafeAreaView>
  )
}

export default Profile