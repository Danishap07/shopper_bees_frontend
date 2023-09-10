import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import CreateProduct from '../pages/products/createProduct';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
    const login_data = useSelector((state) => state.user)
    console.log(login_data)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                login_data.isUserAuthenticated?
                <>
                <Stack.Screen name='ProfileStack' component={Profile} />
                <Stack.Screen name='CreateProduct' component={CreateProduct} />
                </>
                :
                <>
                <Stack.Screen name='Signin' component={Signin} />
                <Stack.Screen name='SignUp' component={Signup} />
                </>
            }
            
        </Stack.Navigator>
    )
}

export default AuthNavigation