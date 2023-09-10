import { useState } from 'react'
import { View, Text, Modal, SafeAreaView, ScrollView, Button, Pressable } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import axios from 'axios'
import { API_BASE_URL, config } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

function VerifyOTPModal(props) {
  const navigation = useNavigation()
  const [modal_visible, set_modal_visible] = useState(true)
  const [otp_value, set_otp_value] = useState('')
  const [err_otp_value, set_err_otp_value] = useState('')
  const [user_token, set_user_token] = useState(AsyncStorage.getItem('user_token'))
  const [ user_email, set_user_email ] = useState(AsyncStorage.getItem('email'))

  // console.log("first")

  // useEffect(() => {
  //     set
  // }, [])
  const handleOTP = async () => {
    // console.log("first otp")
    var formIsValid = true;
    if(otp_value.length !== 6) {
      set_err_otp_value("Please provide a 6 digit OTP.");
      return formIsValid = false
    }
    const data = {
      otp: otp_value,
      email: user_email
    }
    const reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,
        'Authorization': `Bearer ${user_token}`
      }
    }
    const res = await axios.post(API_BASE_URL + '/auth/verify-otp', data, reqHeaders);
    console.log(res)
    if(res.status === 201) {
      console.log(res.data.message)
      navigation.navigate('Home')
    }
    else {
      set_err_otp_value(res.data.message)
      console.log(res.data.message)
    }
  }
  return (
    <SafeAreaView className='items-center'>
      {/* <Text>Hello</Text> */}
      <Modal className='bg-slate-700' animationType='slide' transparent={false} visible={modal_visible} onRequestClose={() => set_modal_visible(!modal_visible) && props.callback} >
        <View className='p-2 items-center justify-center mx-16'>
          <Text className='select-text text-blue-900 font-extrabold text-2xl top-24 text-center justify-center '>Verify OTP</Text>
          <View className='my-16'>
            <OTPInputView value={otp_value} pinCount={6} style={{ width: '120%', height: 200, marginLeft: '16%' }} onCodeChanged={(e) => set_otp_value(e)}
             codeInputFieldStyle={{borderColor: '#000', fontWeight: 'bold', color: '#000'}} codeInputHighlightStyle={{borderColor: "#130d7a"}}/>
             <Text className='text-red-700 ml-2' >{err_otp_value}</Text>
            
            <Pressable onPress={() => handleOTP()} className='inline-block rounded-lg bg-blue-900 px-6 py-3 text-xs font-medium leading-normal active:bg-blue-700 my-12 mx-12' >
            <Text className="text-neutral-50 w-[50%] mx-24 align-middle font-bold ">Verify</Text>
          </Pressable>
            {/* <Text className=''>Hello</Text> */}
          </View>
          {/* <Button onPress={() => handleOTP()} title='Verify OTP' /> */}
        </View>

      </Modal>
    </SafeAreaView>

  )
}

export default VerifyOTPModal