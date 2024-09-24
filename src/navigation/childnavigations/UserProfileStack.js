import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {UserLoginStack} from "./UserLoginStack";
import {UserActionStack} from "./UserActionStack";

const Stack = createStackNavigator();

export const UserProfileStack = () => {

    const {loggedUser} = useSelector(state => state.login)

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {loggedUser
                ? <Stack.Screen name='UserActionStack' component={UserActionStack} />
                : <Stack.Screen name='UserLoginStack' component={UserLoginStack} />}

        </Stack.Navigator>
    )
}