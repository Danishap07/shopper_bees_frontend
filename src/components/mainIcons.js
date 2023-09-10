import React from 'react'
import { View, Text, Image, Pressable, SafeAreaView } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


function MainIcons() {
    const navigation = useNavigation();

    return (
    <SafeAreaView className='items-center'>
        <View className='container flex-row h-16 w-screen bg-blue-950'>
            {/* <Text className='text-black'>Tanzila</Text> */}
            {/* <SvgXml xml="../../assets/icons/home_logo.svg" width="27" height="27" /> */}
            <Pressable onPress={() => navigation.navigate('Home')}>
           
           
            <View className='ml-8 mt-[8px] pd-2'>
                <Image
                    className="ml-[2px]"
                    source={require("../../assets/icons/homeIcon.png")}
                />
                <Text className="mt-2 text-white">Home</Text>
            </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Cart')}>
                <View className='ml-8 mt-[8px] pd-2'>
                    <Image
                        className="ml-[2px]"
                        source={require("../../assets/icons/icon-cart.png")}
                    />
                    <Text className="mt-2 text-white">Cart</Text>
                </View>
            </Pressable>

            <View className='ml-8 mt-[8px] pd-2'>
                <Image
                    className="ml-[2px]"
                    source={require("../../assets/icons/icon-order-box.png")}
                />
                <Text className="mt-2 text-white">Orders</Text>
            </View>

            <Pressable onPress={() => navigation.navigate('Wishlist')}>
                <View className=' ml-8 mt-[8px] pd-2'>
                    <Image
                        className="h-6 w-7 ml-[2px]"
                        source={require("../../assets/icons/wishlist_icon.png")}
                    />
                    <Text className="mt-2 text-white">Wishlist</Text>
                </View>
            </Pressable>

            <View className='ml-8 mt-[8px] pd-2'>
                <Image
                    className="ml-[2px]"
                    source={require("../../assets/icons/profile_icon.png")}
                />
                <Text className="mt-2 text-white">Profile</Text>
            </View>
        </View>
        </SafeAreaView>

    )
}

export default MainIcons