import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  useColorScheme,
  Text,
  Button,
  Image,
  ImageBackground,
  TextInput,
  Pressable
} from 'react-native'
import { API_BASE_URL, IMG_BASE_URL, config } from '../config';
import MainIcons from '../components/mainIcons';
import { useSelector } from 'react-redux'
import { Screen } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


function Home({ navigation }) {
  const data = useSelector((state) => state.user)
  // console.log("firstTime", data)

  const [user_token, set_user_token] = useState('')
  const [is_admin_user, set_is_admin_user] = useState(data.isAdminUser)
  const [category_list, set_category_list] =useState([])

  useEffect(() => {
    getCategories();
}, [])

const getCategories = async () => {
    const res = await axios.get(API_BASE_URL+'/category/categories', config())
    // console.log(res)
    if (res.data.status) {
        // console.log("first", true)
        set_category_list(res.data.message)
    }
}
  //   // const token = await AsyncStorage.getItem('auth')
  //   // console.log(token.roles.user);
    // set_is_admin_user(data.isAdminUser)
  // }, [is_admin_user])


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = "dark:bg-slate-900"
  return (
    // <>

    <SafeAreaView className='items-center'>
      {/* <StatusBar/> */}
      <View className='h-14 w-screen bg-blue-950'>
        <View className='flex-row justify-between' >

          <View className="px-4 m-2 ">
            <TextInput className="absolute bg-blue-950 w-52 border border-white rounded-full ml-4 py-1 pl-4 max-w-xs shadow-sm " placeholder="Search" placeholderTextColor="#ffff">
              {/* <Image
           className="h-4 w-4 "
           source={require("../assets/icons/icon_search.png")}
         /> */}
            </TextInput>
          </View>

          {/* <Image
            className="h-6 w-5 mt-4 mr-4"
            source={require("../../assets/icons/icon_notification_.png")}
          /> */}
        </View>
      </View>


      <ScrollView>
        {
          data.isAdminUser
          ?
          <View className='flex-1 justify-center gap-4 mt-4 mx-4'>
          <Pressable className='border-2 border-emerald-500 h-12 px-4 items-center justify-center rounded-md' onPress={() => navigation.navigate('Profile', { screen: 'CreateProduct' })}>
            <Text className='font-bold text-base text-emerald-500 onfocus:text-emerald-700'>+ Create Product</Text>
          </Pressable>
        </View>
        :
        null
        }
        {/* <Button variant="gradient" className="flex items-center gap-3" title='+ Create Product' onPress={() => navigation.navigate('Profile', { screen: 'CreateProduct' })} /> */}

        <View className='container'>
          <View className='container flex-row justify-center'>
            <View className='mt-4 '>
              <View className='rounded-full overflow-hidden  h-14 w-14' >
                <Image
                  className="h-14 w-14"
                  source={require("../../assets/saleimg.jpeg")}
                />
              </View>
              <Text className='text-blue-900 ml-4 font-bold'>Sale</Text>
            </View>

            <View className='ml-4 mt-4 '>
              <View className='rounded-full overflow-hidden  h-14 w-14' >
                <Image
                  className="h-14 w-14"
                  source={require("../../assets/womenimg.jpeg")}
                />
              </View>
              <Text className='text-blue-900 ml-2 font-bold'>Women</Text>
            </View>

            <View className='ml-4 mt-4 '>
              <View className='rounded-full overflow-hidden  h-14 w-14' >
                <Image
                  className="h-14 w-14"
                  source={require("../../assets/menimg.jpeg")}
                />
              </View>
              <Text className='text-blue-900 ml-4 font-bold'>Men</Text>
            </View>

            <View className='ml-4 mt-4 '>
              <View className='rounded-full overflow-hidden  h-14 w-14' >
                <Image
                  className="h-14 w-14"
                  source={require("../../assets/girlimg.jpeg")}
                />
              </View>
              <Text className='text-blue-900 ml-4 font-bold'>Girls</Text>
            </View>

            <View className='ml-4 mt-4 '>
              <View className='rounded-full overflow-hidden  h-14 w-14' >
                <Image
                  className="h-14 w-14"
                  source={require("../../assets/boysimg.jpeg")}
                />
              </View>
              <Text className='text-blue-900 ml-4 font-bold'>Boys</Text>
            </View>

          </View>
          <View className='mt-4 flex-row justify-center'>
            <Pressable onPress={() => navigation.navigate('Categories', { category_id: '64dde42f3af4cb429c1abfcd'})}>
              <ImageBackground className='relative h-48 w-44 ' source={require('../../assets/for_her_img.jpeg')}>
                <Text className="select-text text-blue-900 font-bold absolute bottom-2 left-2">For her</Text>
              </ImageBackground>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Categories', { category_id: '64dde260f286abc5c22f126d'})}>
            <ImageBackground className='relative h-48 w-44' source={require('../../assets/for_him_img.jpeg')}>
              <Text className="select-text text-blue-900 font-bold absolute bottom-2 right-2">For him</Text>
            </ImageBackground>
            </Pressable>
          </View>

          <Text className="select-text text-blue-900 font-extrabold text-xl pt-5 pl-5">Top Brands</Text>
          <ScrollView horizontal={true}>
            <View className='flex-row pt-2 snap-x ...'>
              <Image
                className="h-28 w-36 rounded-md "
                source={require("../../assets/topbrand1.jpeg")}
              />
              {/* <Image
              className="h-28 w-36 ml-4 rounded-md bg-slate-500"
              source={require("../assets/icons/home_logo.svg")}
            /> */}

              <Image
                className="h-28 w-36 ml-4 rounded-md "
                source={require("../../assets/topbrand2.jpeg")}
              />

              <Image
                className="h-28 w-36 ml-4 rounded-md"
                source={require("../../assets/topbrand3.jpeg")}
              />
            </View>
          </ScrollView>
          {/* 
          {/* <View style={{ flex: 1, backgroundColor: 'red' }}>

          </View> */}

          <View className='box-border h-60 w-screen bg-slate-500 mt-6'>
            <Text className='pl-4 pt-3 text-white font-extrabold text-xl' >
              Trending
            </Text>
            <View className='flex-row'>
              <Image
                className="h-40 w-36 mt-2 ml-4 "
                source={require("../../assets/topbrand3.jpeg")}
              />
              <Image
                className="h-40 w-52 mt-2 "
                source={require("../../assets/trending2.jpeg")}
              />

            </View>
          </View>

          <View className='pt-2 pl-2 '>
            <Text className='text-blue-900 font-extrabold text-xl ml-2'>
              Budget Buys
            </Text>
            <View className='flex-row'>

              <ImageBackground
                className="h-28 w-20 ml-2 mt-2 mb-28 rounded-lg"
                source={require("../../assets/budgetbuy1.jpeg")}
              >
                <Text className="select-text text-white font-bold absolute top-2 left-3">90% OFF</Text>
              </ImageBackground>
              <ImageBackground
                className="h-28 w-20 ml-3 mt-2 mb-28 rounded-md"
                source={require("../../assets/budgetbuy4.jpeg")}
              >
                <Text className="select-text text-white font-bold absolute top-2 left-3">70% OFF</Text>
              </ImageBackground>
              <ImageBackground
                className="h-28 w-20 ml-3 mt-2 mb-28 rounded-md"
                source={require("../../assets/budgetbuy5.jpeg")}
              >
                <Text className="select-text text-white font-bold absolute top-2 left-3">60% OFF</Text>
              </ImageBackground>
              <ImageBackground
                className="h-28 w-20 ml-3 mt-2 mb-28 rounded-md"
                source={require("../../assets/budgetbuy7.jpeg")}
              >
                <Text className="select-text text-white font-bold absolute top-2 left-3">50% OFF</Text>
              </ImageBackground>
            </View>
          </View>
          <View className="box-border mt-2">
          </View>

        </View>

      </ScrollView>
      <MainIcons />
    </SafeAreaView>
    // </>


    // // <SafeAreaView >
    //    {/* <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //   /> */}

    //   {/* <View> */}

    //     {/* <Image
    //     className="w-[146] absolute left-0 top-0 h-[132] rounded-t-[Border.br\_mini]"
    //       // style={[styles.frameChild, styles.frameLayout]}
    //       // resizeMode="cover"
    //       source={require("../assets/rectangle-21.png")}
    //     /> */}
    //     {/* <Text className='font-bold bg-slate-600'>Hello, Welcome To the Home page.</Text>
    //     <View> 
    //       <Button className='bg-red-400 font-bold' title='Feed' onPress={()=> navigation.navigate('Feed')} />
    //     </View> */}
    //   {/* </View> */}

    // // </SafeAreaView>
  )
}


export default Home