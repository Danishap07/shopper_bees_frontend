import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import ProductDetails from '../pages/productDetails';
import Navigation from './bottomTabs'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeStack' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeStack' component={Home} />
        <Stack.Screen name='Categories' component={Categories} />
        <Stack.Screen name='ProductDetails' component={ProductDetails} />

    </Stack.Navigator>
  )
}

export default HomeStack