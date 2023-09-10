import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import { API_BASE_URL, config } from '../config';


function Categories({route, navigation}) {
  const {category_id} = route.params;
  // console.log(category_id)

  const [products_list, set_products_list] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const res = await axios.get(API_BASE_URL+`/products/category/${category_id}`, config())

    if(res.data.status) {
      set_products_list(res.data.message)
      // console.log('firstProduct', res.data.message)
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

              <Text className='pl-2 pt-3 mr-12 text-white text-xl' >
                Products
              </Text>

              <Image
                className="h-6 w-6 mt-4 ml-20 "
                source={require("../../assets/icons/icon_search.png")}
              />

              <Image
                className="h-6 w-5 mt-4 mr-4"
                source={require("../../assets/icons/icon_notification_.png")}
              />
            </View>
          </View>





      <ScrollView>
        <View>
          

          <View className='container h-full max-h-screen w-screen flex flex-row flex-wrap md-2'>
            {
              products_list.map((data, i) => (
                <View className='h-60 w-42 ml-6 bg-orange-500 rounded-t-2xl mt-6'>
                  <Pressable key={i} onPress={() => navigation.navigate('ProductDetails', {product_id: data._id})} >
              <Image source={{uri: data.color[0].images[1].image_uri}} className="h-40 w-40 mx-auto rounded-t-2xl"/>

                </Pressable>
              <View className='flex-row'>
                <Pressable onPress={() => navigation.navigate('ProductDetails', {product_id: data._id})} >
                <Text className='pl-1 pt-4 ml-1 text-white text-sm' >
                  {data.product_name}
                </Text>
                </Pressable>

                <Image
                  className="h-6 w-7 ml-5 mt-4"
                  source={require("../../assets/icons/wishlist_icon.png")}
                />
              </View>
              <Text className='pl-1 ml-1 text-white text-xl' >
                {data.discounted_price}
              </Text>
            </View>
              ))
            }
            {/* <View className='h-60 w-42 ml-6 bg-orange-500 rounded-t-2xl mt-6'>
              <Image source={{uri: image}} className="h-40 w-40 mx-auto rounded-t-2xl"/>

              <View className='flex-row'>
                <Text className='pl-1 pt-4 ml-1 text-white text-sm' >
                  Products name 1
                </Text>

                <Image
                  className="h-6 w-7 ml-5 mt-4"
                  source={require("../../assets/icons/wishlist_icon.png")}
                />
              </View>
              <Text className='pl-1 ml-1 text-white text-xl' >
                1000
              </Text>
            </View>

            <View className='h-60 w-42 ml-6 bg-slate-500 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-4 ml-1 text-white text-sm' >
                  Products name 2
                </Text>

                <Image
                  className="h-6 w-7 ml-5 mt-4"
                  source={require("../../assets/icons/wishlist_icon.png")}
                />
              </View>
              <Text className='pl-1 ml-1 text-white text-xl' >
                1000
              </Text>

            </View>

            <View className='h-60 w-42 ml-6 bg-slate-500 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-4 ml-1 text-white text-sm' >
                  Products name3
                </Text>

                <Image
                  className="h-6 w-7 ml-5 mt-4"
                  source={require("../../assets/icons/wishlist_icon.png")}
                />
              </View>
              <Text className='pl-1 ml-1 text-white text-xl' >
                1000
              </Text>

            </View>

            <View className='h-60 w-42 ml-6 bg-slate-500 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-4 ml-1 text-white text-sm' >
                  Products name 4
                </Text>

                <Image
                  className="h-6 w-7 ml-5 mt-4"
                  source={require("../../assets/icons/wishlist_icon.png")}
                />
              </View>
              <Text className='pl-1 ml-1 text-white text-xl' >
                1000
              </Text>

            </View> */}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Categories