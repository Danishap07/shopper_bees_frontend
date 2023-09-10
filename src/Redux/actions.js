import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
    return async dispatch => {
      let user_token = await AsyncStorage.getItem('user_token');
      let username = await AsyncStorage.getItem('username');
      let email = await AsyncStorage.getItem('email');
      let roles = await AsyncStorage.getItem('roles');
      let activity_status = await AsyncStorage.getItem('activity_status');
      let isAdminUser = await AsyncStorage.getItem('isAdminUser');
      console.log(isAdminUser)

      const auth = {
        user_token: user_token,
        username: username,
        email: email,
        roles: roles,
        activity_status: JSON.parse(activity_status),
        isAdminUser: isAdminUser == '1'? true : false
      }
      // const { user_token, username } = auth
      // let user_token = await AsyncStorage.getItem('user_token')
      if (user_token !== null) {
        // console.log('token fetched', user_token, username, auth);
        dispatch({
          type: 'login',
          payload: auth,
        })
      }
    }
  }

export const Login = (auth) => {
    return async dispatch => {
        // let user_token = null
        const { user_token, email, username, roles, active_status } = auth
        // console.log('token', user_token)
        await AsyncStorage.setItem('user_token', auth.user_token)
        await AsyncStorage.setItem('username', auth.username)
        await AsyncStorage.setItem('roles', JSON.stringify(auth.roles))
        await AsyncStorage.setItem('email', auth.email)
        await AsyncStorage.setItem('activity_status', JSON.stringify(auth.active_status))
        console.log("hsgdhg", auth.isAdminUser)
        if(auth.isAdminUser) {
          await AsyncStorage.setItem('isAdminUser', '1')
        }
        else{
          await AsyncStorage.setItem('isAdminUser', '0')
        }
        // await AsyncStorage.setItem('user_token', auth.user_token)
        
        console.log("Item Stored in asyncStorage.")
        dispatch({
            type: 'login',
            payload: auth
        })
    }
} 

export const Logout = () => {
    return async dispatch => {
        await AsyncStorage.clear()
        dispatch({
            type: 'logout'
        })
    }
}