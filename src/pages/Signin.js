import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, Button, Pressable, PermissionsAndroid, SafeAreaView } from "react-native";
import axios from "axios";
import { Padding, Color, FontFamily, FontSize, Border } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL, config } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerifyOTPModal from "../components/verifyOTPModal";
import { useSelector, useDispatch } from 'react-redux'
import { Login } from "../Redux/actions";
// import uploadImage from '../config/manage_images'


const Signin = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [image, set_image] = useState('')
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [err_email, set_err_email] = useState('')
  const [err_password, set_err_password] = useState('')
  const [show_modal, set_show_modal] = useState(false)
  const [user_token, set_user_token] = useState('')

  
  const handleLogin = async () => {
    set_err_email('')
    set_err_password('')

    var formIsValid = true
    if (email === '') {
      set_err_email('Email is required.')
      return formIsValid = false
    }
    else if (password === '') {
      set_err_password('Password is required.')
      return formIsValid = false
    }
    else if (password.length < 8) {
      set_err_password("Password must contain 8 characters are requred.")
    }

    const data = {
      email: email,
      password: password
    }
    console.log(data)

    const res = await axios.post(API_BASE_URL+'/auth/', data, config());
    if (res.status === 200) {
      console.log('login', res.data)
      set_user_token(res.data.message.token)
      // console.log(token)
      const reqConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${res.data.message.token}`
        }
      }
      const refreshTokenRes = await axios.get(API_BASE_URL + '/auth/refresh', reqConfig)
      console.log('refreshToken', refreshTokenRes.data.message)
      if (refreshTokenRes.status === 201) {
        const auth = {
          user_token: refreshTokenRes.data.message.token,
          email: refreshTokenRes.data.message.email,
          username: refreshTokenRes.data.message.username,
          roles: JSON.stringify(refreshTokenRes.data.message.roles),
          isAdminUser: refreshTokenRes.data.message.roles.Admin? true: false,
          active_status: refreshTokenRes.data.message.active_status
        }

        if (refreshTokenRes.data.message.active_status == false) {
          set_show_modal(true)
        }
        else {
          dispatch(Login(auth))
          navigation.navigate('Home')
        }
      }
    }
    else if(res.status === 400) {
      console.log(res.status, res.data)
    }
  }

  return (
    <SafeAreaView className='items-center'>
      <View className="container absolute justify-items-center">
        <View className="border-box w-[50%] m-auto p-2 align-middle">
          <Text className="select-text text-blue-900 font-extrabold text-2xl top-8 left-3 justify-center ">WELCOME TO</Text>
          <Image
            className="h-26 w-17 mt-12 ml-10"
            source={require("../../assets/shopper_logo.png")}
          />
          <Text className="text-blue-900 tracking-widest mt-2 ml-7">SHOPPER BEES</Text>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-blue-900 text-lg ml-2">Email</Text>
          <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" value={email} onChangeText={(e) => set_email(e)} placeholder="Email"></TextInput>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-blue-900 text-lg ml-2">Password</Text>
          <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" value={password} onChangeText={(e) => set_password(e)} placeholder="Password"></TextInput>
        </View>
        <Pressable className='inline-block rounded-lg bg-blue-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-400 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-blue-400 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-blue-400 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-blue-400 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-blue-400 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] mt-12 mx-12' onPress={() => handleLogin()} >
          <Text className="text-neutral-50 border-box w-[50%] mx-24 align-middle font-bold"  >Sign in</Text>
        </Pressable>

        <Pressable className="mt-36 " onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-orange-500 w-[50%] mx-28 align-middle hover:text-orange-300 focus:text-orange-300">Don't have an account?</Text>
        </Pressable>
        {/* <Image source={{uri: image}} className="h-32 w-24"/> */}
        {/* <Button title="Select" onPress={() => handleDocumentSelection()} /> */}

      </View>
      {
        show_modal ? <VerifyOTPModal callback={() => set_show_modal(!show_modal)} navigation={navigation} /> : null
      }
    </SafeAreaView>
  );
};

export default Signin;
