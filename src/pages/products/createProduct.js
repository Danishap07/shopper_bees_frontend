import { View, Text, SafeAreaView, ScrollView, TextInput, PermissionsAndroid, Button, Pressable, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { API_BASE_URL, config } from '../../config';
import { sizesData } from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNPickerSelect from 'react-native-picker-select';
// import {Picker} from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

function CreateProduct() {
    // { product_name, actual_price, discounted_price, stock_quantity, category_id, sub_category_id, color, product_description, size }
    const [user_token, set_user_token] = useState(AsyncStorage.getItem('user_token'))
    const [product_name, set_product_name] = useState('')
    const [actual_price, set_actual_price] = useState('')
    const [discounted_price, set_discounted_price] = useState('')
    const [stock_quantity, set_stock_quantity] = useState('')
    const [category_id, set_category_id] = useState('')
    const [sub_category_id, set_sub_category_id] = useState('')
    const [color, set_color] = useState('')
    const [images_1, set_images_1] = useState('')
    const [images_2, set_images_2] = useState('')
    const [images_3, set_images_3] = useState('')
    const [product_description, set_product_description] = useState('')
    const [size, set_size] = useState([])
    const [err_product_name, set_err_product_name] = useState('')
    const [err_actual_price, set_err_actual_price] = useState('')
    const [err_discounted_price, set_err_discounted_price] = useState('')
    const [err_stock_quantity, set_err_stock_quantity] = useState('')
    const [err_color, set_err_color] = useState('')
    const [err_image, set_err_image] = useState('')
    const [err_product_description, set_err_product_description] = useState('')
    const [category_list, set_category_list] = useState([])
    const [sub_category_list, set_sub_category_list] = useState([])
    const [category_focus, set_category_focus] = useState(false)
    const [sub_category_focus, set_sub_category_focus] = useState(false)

    //     const pickerRef = useRef();

    // function open() {
    //   pickerRef.current.focus();
    // }

    // function close() {
    //   pickerRef.current.blur();
    // }

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const res = await axios.get(API_BASE_URL + '/category/categories', config())
        if (res.data.status) {
            console.log("first", true)
            set_category_list(res.data.message)
            console.log(res.data.message)
        }
    }

    const handleDocumentSelection = async (props) => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        // console.log(PermissionsAndroid.RESULTS.GRANTED, "hello: ", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("hello")
            const result = await launchImageLibrary()
            // await uploadImage(result.assets[0])
            if (props == '1') {
                set_images_1(result.assets[0].uri)
            }
            else if (props == '2') {
                set_images_2(result.assets[0].uri)
            }
            else if (props == '3') {
                set_images_3(result.assets[0].uri)
            }
        }
    }

    const handleProduct = async () => {
        set_err_actual_price('')
        set_err_product_name('')
        set_err_stock_quantity('')
        set_err_discounted_price('')
        set_err_product_description('')
        set_err_image('')
        set_err_color('')

        var formIsValid = true;
        if (product_name == '') {
            set_err_product_name('Product name is required.')
            return formIsValid = false
        }
        else if (actual_price == 0) {
            set_err_actual_price('Actual Price is required.')
            return formIsValid = false
        }
        else if (discounted_price == 0) {
            set_err_discounted_price('Discounted Price is required.')
            return formIsValid = false
        }
        else if (product_description == '') {
            set_err_product_description('product descripttion is required.')
            return formIsValid = false
        }
        else if (images_1 == '') {
            set_err_image('Image is required.')
            return formIsValid = false
        }
        // else if()
        const data = {
            product_name: product_name,
            actual_price: Number(actual_price),
            discounted_price: Number(discounted_price),
            stock_quantity: Number(stock_quantity),
            category_id: category_id,
            sub_category_id: sub_category_id,
            color: color,
            images: [images_1, images_2, images_3],
            product_description: product_description,
            size: ["m", "l", "xl"]
        }

        console.log(config(user_token._j))

        const res = await axios.post(API_BASE_URL + '/products/create-product', data, config(user_token._j))
        if (res.status == 200) {
            console.log(res.data);
        }
        else if (res.status == 401) {
            console.log(res.data)
        }
        else {
            console.log("unable to show response")
        }


    }
    //   const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0


    return (
        <SafeAreaView className='items-center'>
            <View className="container absolute justify-items-center">
                {/* <View className="border-box w-[50%] m-auto p-2 align-middle"> */}
                {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={64}> */}
                    <ScrollView>
                        <View className="px-4 pt-12">
                            <Text className="text-blue-900 text-lg ml-2">Product Name</Text>
                            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Product Name" value={product_name} onChangeText={(text) => set_product_name(text)}></TextInput>
                            <Text className='text-red-700 ml-2' >{err_product_name}</Text>

                            <Text className="text-blue-900 text-lg ml-2">Actual Price</Text>
                            <TextInput keyboardType='numeric' className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholderTextColor={{ color: 'Black' }} placeholder="Actual Price" value={actual_price} onChangeText={(text) => set_actual_price(text)} ></TextInput>
                            <Text className='text-red-700 ml-2' >{err_actual_price}</Text>

                            <Text className="text-blue-900 text-lg ml-2">Discounted Price</Text>
                            <TextInput keyboardType='numeric' className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Discounted Price" value={discounted_price} onChangeText={(text) => set_discounted_price(text)}></TextInput>
                            <Text className='text-red-700 ml-2' >{err_discounted_price}</Text>

                            <Text className="text-blue-900 text-lg ml-2">Stock Quantity</Text>
                            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Stock Quantity" value={stock_quantity} onChangeText={(text) => set_stock_quantity(text)}></TextInput>
                            <Text className='text-red-700 ml-2' >{err_stock_quantity}</Text>

                            <Text className="text-blue-900 text-lg ml-2">category</Text>
                            <Dropdown
                                style={[{
                                    height: 50,
                                    borderColor: 'gray',
                                    borderWidth: 0.5,
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                }, category_focus && { borderColor: 'blue' }]}
                                value={category_id} 
                                data={category_list} 
                                selectedTextStyle={{ fontSize: 16, fontStyle: 'normal' }} 
                                labelField="name"
                                onChange={item => {
                                    set_category_id(item._id);
                                    set_sub_category_list(item.sub_category_name)
                                    set_category_focus(false);
                                }}
                            />

                            <Text className="text-blue-900 text-lg ml-2">sub-category</Text>
                            <Dropdown
                                style={[{
                                    height: 50,
                                    borderColor: 'gray',
                                    borderWidth: 0.5,
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                }, sub_category_focus && { borderColor: 'blue' }]}
                                value={sub_category_id} 
                                data={sub_category_list} 
                                selectedTextStyle={{ fontSize: 16, fontStyle: 'normal' }} 
                                labelField="name"
                                onChange={item => {
                                    set_category_id(item._id);
                                    set_sub_category_focus(false);
                                }}
                            />
                            {/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        /> */}

                            {/* <SelectBox label="Select Category"
                            options={sizesData}
                            value={category_id}
                            onChange={(val) => set_category_id(val)}
                            hideInputFilter={false} /> */}

                            <Text className="text-blue-900 text-lg ml-2">color</Text>
                            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="Product color" value={color} onChangeText={(text) => set_color(text)}></TextInput>
                            <Text className='text-red-700 ml-2' >{err_color}</Text>

                            {/* <Picker
                                ref={pickerRef}
                                selectedValue={category_id}
                                className='w-[100] h-[50]'
                                onValueChange={(value) => set_category_id(value)}
                            >
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker> */}

                            <Button className="flex items-center mb-4" title='Add image 1' onPress={() => handleDocumentSelection("1")} />
                            <Button className="flex items-center mb-4" title='Add image 2' onPress={() => handleDocumentSelection("2")} />
                            <Button className="flex items-center gap-3 " title='Add image 1' onPress={() => handleDocumentSelection("3")} />
                            <Text className='text-red-700 ml-2' >{err_image}</Text>

                            <Text className="text-blue-900 text-lg ml-2">Product Description</Text>
                            <TextInput className="placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm tracking-wider" placeholder="First name" value={product_description} onChangeText={(text) => set_product_description(text)}></TextInput>
                            <Text className='text-red-700 ml-2' >{err_product_description}</Text>

                            <Pressable onPress={() => handleProduct()} className='inline-block  mx-10 rounded-lg bg-blue-900 py-3 text-xs font-medium leading-normal active:bg-blue-700 ' >
                                <Text className="text-neutral-50 w-[50%] mx-24 align-middle font-bold ">Create product</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                {/* </KeyboardAvoidingView> */}
                {/* </View> */}
            </View>

        </SafeAreaView>
    )
}

export default CreateProduct