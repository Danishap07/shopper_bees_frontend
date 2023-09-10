import axios from 'axios';
import { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, Button, Platform, KeyboardAvoidingView } from 'react-native'
import { API_BASE_URL, config, instance } from '../config';
import VerifyOTPModal from '../components/verifyOTPModal';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [username, set_username] = useState('');
  const [email, set_email] = useState('');
  const [mobile_no, set_mobile_no] = useState('');
  const [password, set_password] = useState('');
  const [err_first_name, set_err_first_name] = useState('');
  const [err_last_name, set_err_last_name] = useState('');
  const [err_username, set_err_username] = useState('');
  const [err_email, set_err_email] = useState('');
  const [err_mobile_no, set_err_mobile_no] = useState('');
  const [err_password, set_err_password] = useState('');
  const [show_modal, set_show_modal] = useState(false)

  // useEffect(() => {
  //   console.log(first_name)
  // }, [first_name])
  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  const handleSignUp = async () => {
    set_err_first_name('');
    set_err_last_name('');
    set_err_username('');
    set_err_email('');
    set_err_password('');
    set_err_mobile_no('');
    // console.log("hello", typeof(mobile_no));

    var formIsValid = true;

    if (first_name === '') {
      set_err_first_name('First Name is required.')
      return formIsValid = false
    }
    else if(!isNaN(first_name)) {
      set_err_first_name('First name should not be a number.')
      return formIsValid = false
    }
    else if (first_name.length < 3) {
      set_err_first_name('First Name must be of atleast 3 characters.')
      return formIsValid = false
    }
    else if (last_name === '') {
      set_err_last_name('Last Name is required.')
      return formIsValid = false
    }
    else if(!isNaN(last_name)) {
      set_err_last_name('Last name should not be a number.')
      return formIsValid = false
    }
    else if (username === '') {
      set_err_username('Username is required.')
      return formIsValid = false
    }
    else if (username.length < 6 || username.length > 12) {
      set_err_username('Username must contain min 6 & max 12 characters.')
      return formIsValid = false
    }
    else if (!username.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i)) {
      set_err_username('Username must contain alphanumeric characters.')
      return formIsValid = false
    }
    else if (email === '') {
      set_err_email('Email is required.')
      return formIsValid = false
    }
    else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      set_err_email('Invalid email address.')
      return formIsValid = false
    }
    else if (mobile_no === '') {
      set_err_mobile_no('Phone Number is required.')
      return formIsValid = false
    }
    else if (mobile_no.length < 10) {
      set_err_mobile_no('Invalid mobile number.')
      return formIsValid = false
    }
    else if (password === '') {
      set_err_password('Password is required.')
      return formIsValid = false
    }
    else if (password.length < 8) {
      set_err_password("Password must contain 8 characters are requred.")
    }
    else if (password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])$/)) {
      set_err_password('Must contain a Uppercase & Lowercase character & a Number')
    }

    const data = {
      "username": username,
      "email": email,
      "password": password,
      "firstname": first_name,
      "lastname": last_name,
      "mobile_no": mobile_no
    }
    // console.log(data)

    const login_data = {
      "email": email,
      "password": password
    }
    // console.log(data)

    const res = await axios.post(API_BASE_URL + '/users', data, config())
    if (res.status == 200) {
      console.log(res.data)
      // set_email('')

      const login_res = await axios.post(API_BASE_URL + '/auth/', login_data, config())
      console.log(login_res)
      if (login_res.status == 200) {
        const auth = {
          "user_token": login_res.data.message.token,
          "email": login_res.data.message.email,
          "username": login_res.data.message.username,
          "roles": JSON.stringify(login_res.data.message.roles),
          "active_status": JSON.stringify(login_res.data.message.active_status)
        }
        console.log(login_res.data.message);
        const reqConfig = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${login_res.data.message.token}`
          }
        }
        const refreshTokenRes = await axios.get(API_BASE_URL + '/auth/refresh', reqConfig)
        // console.log('refreshToken', refreshTokenRes.data.message)
        if (refreshTokenRes.status === 201) {
          const auth = {
            "user_token": refreshTokenRes.data.message.token,
            "email": refreshTokenRes.data.message.email,
            "username": refreshTokenRes.data.message.username,
            "roles": JSON.stringify(refreshTokenRes.data.message.roles),
            "active_status": JSON.stringify(refreshTokenRes.data.message.active_status)
          }
  
          // try {
          //   await AsyncStorage.setItem('auth', JSON.stringify(auth));
          // }
          // catch (err) {
          //   console.log(err);
          // }
  
          if (refreshTokenRes.data.message.active_status == false) {
            set_show_modal(true)
          }
          else {
            dispatch(Login(auth))
            navigation.navigate('Home')
          }
        }
        // await AsyncStorage.setItem('auth', login_res.data.message.email)
        // await AsyncStorage.setItem('username', login_res.data.message.username)
        // await AsyncStorage.setItem('roles', JSON.stringify(login_res.data.message.roles))
        // await AsyncStorage.setItem('user_token', login_res.data.message.token)
        // set_show_modal(true);
        set_username("")
        set_email("")
        set_first_name("")
        set_last_name("")
        set_password("")
        set_mobile_no("")
      }

    }
    else if (res.status == 409) {
      console.log("This email already exist please sign in or create account using different email")
    }
    // console.log("Do not run")
  }

  return (
    <SafeAreaView className='items-center'>
      <ScrollView>

        {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}> */}

          <View className="border-box w-[50%] m-auto p-2 align-middle">
            <Text className="select-text text-blue-900 font-extrabold text-2xl top-8 text-center justify-center "> CREATE A NEW ACCOUNT</Text>
          </View>

          <View className="px-4 pt-12">
            <Text className="text-blue-900 text-lg ml-2">First Name</Text>
            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="First name" value={first_name} onChangeText={(e) => set_first_name(e)}></TextInput>
            <Text className='text-red-700 ml-2' >{err_first_name}</Text>
          </View>

          <View className="px-4 pt-6">
            <Text className="text-blue-900 text-lg ml-2">Last Name</Text>
            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Last name" value={last_name} onChangeText={(e) => set_last_name(e)}></TextInput>
            <Text className='text-red-700 ml-2' >{err_last_name}</Text>

          </View>

          <View className="px-4 pt-6">
            <Text className="text-blue-900 text-lg ml-2"> Username</Text>
            <TextInput
              className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Username" value={username} onChangeText={(e) => set_username(e)}></TextInput>
            <Text className='text-red-700 ml-2' >{err_username}</Text>
          </View>

          <View className="px-4 pt-6">
            <Text className="text-blue-900 text-lg ml-2">Email</Text>
            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Email" value={email} onChangeText={(e) => set_email(e.toLowerCase())}></TextInput>
            <Text className='text-red-700 ml-2' >{err_email}</Text>
          </View>

          <View className="px-4 pt-6">
            <Text className="text-blue-900 text-lg ml-2">Phone No</Text>
            <TextInput keyboardType="numeric" maxLength={10} className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Phone no" value={mobile_no} onChangeText={(e) => set_mobile_no(e)}></TextInput>
            <Text className='text-red-700 ml-2' >{err_mobile_no}</Text>
          </View>

          <View className="px-4 pt-6">
            <Text className="text-blue-900 text-lg ml-2">Password</Text>
            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Password" value={password} onChangeText={(e) => set_password(e)}></TextInput>
            <Text className='text-red-700 ml-2' >{err_password}</Text>
          </View>

          <Pressable onPress={() => handleSignUp()} className='inline-block rounded-lg bg-blue-900 px-6 py-3 text-xs font-medium leading-normal active:bg-blue-700 my-12 mx-12' >
            <Text className="text-neutral-50 w-[50%] mx-24 align-middle font-bold ">Sign up</Text>
          </Pressable>

          {/* <Button title='Sign up' onPress={() => handleSignUp()}></Button> */}


        {/* </KeyboardAvoidingView> */}
        {
          show_modal ? <VerifyOTPModal callback={() => set_show_modal(!show_modal)} /> : null
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup