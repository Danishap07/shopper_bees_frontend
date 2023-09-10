import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Home from '../pages/Home';
import Categories from '../pages/Categories';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import MainIcons from '../components/mainIcons';
import Orders from '../pages/Orders';
import Profile from '../pages/Profile';
import AuthNavigation from './authNavigation';
import { Init } from '../Redux/actions';
import HomeStack from './homeStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    // const dispatch = useDispatch()
    const login_data = useSelector((state) => state.user)
    // console.log('loginData', login_data)

    const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    // setLoading(false);
  }

  useEffect(() => {
    init()
  }, [])

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } 
                    else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } 
                    else if (route.name === 'Orders') {
                        iconName = focused ? 'bag' : 'bag-outline'
                    }
                    else if (route.name === 'Wishlist') {
                        iconName = focused ? 'heart' : 'heart-outline'
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    }
                    else if (route.name === 'Login') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarStyle: { height: '6%', position: 'absolute' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarInactiveBackgroundColor: '#172554',
                tabBarActiveBackgroundColor: '#f08513'
            })
        } initialRouteName='Home' >
            <Tab.Screen name='Home' component={HomeStack} />
            <Tab.Screen name='Cart' component={Cart} />
            <Tab.Screen name='Orders' component={Orders} />
            <Tab.Screen name='Wishlist' component={Wishlist} />
            <Tab.Screen name={login_data.isUserAuthenticated?'Profile': 'Login'} component={AuthNavigation} />
        </Tab.Navigator>
    )
}

export default Navigation