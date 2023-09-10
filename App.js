/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { store } from './src/Redux/store.js';

import Navigation from './src/navigation/bottomTabs.js'
import HomeStack from './src/navigation/homeStack.js'
import MainIcons from './src/components/mainIcons.js';
import AuthNavigation from './src/navigation/authNavigation.js'
import { Init } from './src/Redux/actions.js'
// import {  useSelector, useDispatch } from 'react-redux'


const Stack = createNativeStackNavigator();


function App() {
  // const user_token = useSelector(state=> state.user.user_token)

  const [loading, setLoading] = useState(true);

  
  return (
      <Provider store={store} >
        <NavigationContainer>
          {/* <HomeStack/> */}
          <Navigation />
        </NavigationContainer>
      </Provider>
  );
}

export default App;
