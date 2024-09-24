import {createStackNavigator} from "@react-navigation/stack";
import {LoginPage} from "../../pages/UserLoginStack/LoginPage";
import {SignupPage} from "../../pages/UserLoginStack/SignupPage";



const Stack = createStackNavigator();

export const UserLoginStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'login'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name='login'
                component={LoginPage}
            />
            <Stack.Screen
                name='signup'
                component={SignupPage}
            />
        </Stack.Navigator>
    );
}