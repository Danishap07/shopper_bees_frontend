import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'

const Cart = () => {

  return (
      <SafeAreaView className='item-center'>
      <View className='h-14 w-screen bg-blue-950 '>
            <View className='flex-row justify-between' >
              <Image
                className="h-6 w-8 mt-4 ml-4 "
                source={require("../../assets/icons/left_arrow.png")}
              />

              <Text className='pl-2 pt-3 mr-12 text-white text-xl' >
                Cart
              </Text>

               <Image
                className="h-6 w-5 ml-28 mt-4"
                source={require("../../assets/icons/icon_notification_.png")}
              />

              <Image
                className="h-5 w-6 mt-4 mr-4"
                source={require("../../assets/icons/wishlist_icon.png")}
              />

            </View>
          </View>

          <View>
          <Image
                className="h-4 w-11/12 ml-4 mt-4 mr-4 "
                source={require("../../assets/icons/cart-address-payment1.png")}
              />

        <View className='flex-row'>
            {/* <CheckBox className='bg-blue-950 justify-center' /> */}
            {/* <TouchableWithoutFeedback accessibilityRole="checkbox"/>
             */}
        
          <View className='h-52 w-42 ml-2 bg-slate-500 rounded-2xl mt-6 mr-4'>
              <Image
                className="h-52 w-40 rounded-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

            </View>
            </View>
          </View>
          </SafeAreaView>
    
  )
}

export default Cart