import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL, config } from '../config'

const ProductDetails = ({route, navigation}) => {
    const {product_id } = route.params;
    console.log("first", product_id)

    const [product_details, set_product_details] = useState({})

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        const res = await axios.get(API_BASE_URL+`/products/${product_id}`, config())
        if(res.data.status) {
            console.log(res.data.message)
            set_product_details(res.data.message)
        }

    }
    return (
        <SafeAreaView className='items-center'>
            <View className='h-14 w-screen bg-blue-950 '>
                <View className='flex-row justify-between' >
                    <Image
                        className="h-6 w-8 mt-4 ml-4 "
                        source={require("../../assets/icons/left_arrow.png")}
                    />
                </View>
            </View>
            <ScrollView>
                <Image src={{uri: data.color[0].images[0].image_uri}} className='h-40 w-40 items-center m-3 rounded ' />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductDetails