import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'

const Wishlist = () => {
  return (
    <SafeAreaView className='items-center'>
      <View className='h-14 w-screen bg-blue-950 '>
            <View className='flex-row justify-between' >
              <Image
                className="h-6 w-8 mt-4 ml-4 "
                source={require("../../assets/icons/left_arrow.png")}
              />

              <Text className='pl-2 pt-3 mr-12 text-white text-xl' >
                Wishlist
              </Text>

              <Image
                className="h-6 w-6 mt-4 ml-20 mr-2 "
                source={require("../../assets/icons/icon_search.png")}
              />

               <Image
                className="h-6 w-5 mt-4"
                source={require("../../assets/icons/icon_notification_.png")}
              />

              <Image
                className="h-7 w-7 mt-3 mr-4"
                source={require("../../assets/icons/icon-cart.png")}
              />

            </View>
          </View>





      <ScrollView>
        <View>
          

          <View className='container h-full max-h-screen w-screen flex flex-row flex-wrap md-2'>

            <View className='h-52 w-42 ml-6 bg-orange-400 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-4 pt-3 ml-1 text-white text-sm' >
                  Add to bag
                </Text>

                <Image
                  className="h-7 w-7 ml-7 mt-2"
                  source={require("../../assets/icons/icon-cart.png")}
                />
              </View>
            </View>

            <View className='h-52 w-42 ml-6 bg-orange-400 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-3 ml-1 text-white text-sm' >
                Add to bag
                </Text>

                <Image
                  className="h-7 w-7 ml-7 mt-2"
                  source={require("../../assets/icons/icon-cart.png")}
                />
              </View>
            </View>

            <View className='h-52 w-42 ml-6 bg-orange-400 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-3 ml-1 text-white text-sm' >
                Add to bag
                </Text>

                <Image
                  className="h-7 w-7 ml-7 mt-2"
                  source={require("../../assets/icons/icon-cart.png")}
                />
              </View>
            </View>

            <View className='h-52 w-42 ml-6 bg-orange-400 rounded-t-2xl mt-6'>
              <Image
                className="h-40 w-40 mx-auto rounded-t-2xl "
                source={require("../../assets/topbrand3.jpeg")}
              />

              <View className='flex-row'>
                <Text className='pl-1 pt-3 ml-1 text-white text-sm' >
                Add to bag
                </Text>

                <Image
                  className="h-7 w-7 ml-7 mt-2"
                  source={require("../../assets/icons/icon-cart.png")}
                />
              </View>

            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Wishlist