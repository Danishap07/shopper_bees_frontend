import AsyncStorage from "@react-native-async-storage/async-storage"

const initialState = {
    user_token: null,
    email: null,
    username: null,
    roles: null,
    active_status: null,
    isUserAuthenticated: false,
    isAdminUser: false
}

const userReducer = (state = initialState, action) => {
    // console.log('action_payload', action.payload?.user_token)
    if (action.type == 'login') {
        // var isAdminUser = false
        const { user_token, email, username, roles, active_status, isAdminUser } = action.payload
        // console.log(roles.Admin)
        // if(roles?.Admin) {
        //     isAdminUser = true
        // }
        console.log("helloUser", isAdminUser)
        return {
            ...state,
            user_token: user_token,
            email: email,
            username: username,
            roles: roles,
            active_status: active_status,
            isUserAuthenticated: true,
            isAdminUser: isAdminUser
        }
    }
    else if (action.type == 'logout') {
        return {
            ...state,
            user_token: null,
            email: null,
            username: null,
            roles: null,
            active_status: null,
            isUserAuthenticated: false,
            isAdminUser: false
        }
    }
    else {
        return state
    }
    // switch (action.type) {
    //     case 'login': 
    //     const { user_token, email, username, roles, active_status } = action.payload
    //     return {
    //         ...state,
    //         user_token: user_token,
    //         email: email,
    //         username: username,
    //         roles: roles,
    //         active_status: active_status,
    //         isUserAuthenticated: true
    //     };
    //     case 'logout': 
    //     return {
    //         ...state,
    //         user_token: null,
    //         email: null,
    //         username: null,
    //         roles: null,
    //         active_status: null,
    //         isUserAuthenticated: false
    //     }
    //     default: state
    // }
}
// userReducer({ type: 'login', payload: auth })

export default userReducer