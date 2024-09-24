import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {UserActionStack} from "../UserActionStack";
import {UserLoginStack} from "../UserLoginStack";
import {LearnCourseStack} from "./LearnCourseStack";
import {CreateCourseStack} from "./CreateCourseStack";
import {YouNotLoggedPage} from "../../../pages/CoursesStack/YouNotLoggedPage";

const Stack = createStackNavigator();

export const CoursesStack = () => {
    const {loggedUser} = useSelector(state => state.login)

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {loggedUser
                ? loggedUser.role === 1
                    ? <Stack.Screen name='LearnCourseStack' component={LearnCourseStack} />
                    : <Stack.Screen name='CreateCourseStack' component={CreateCourseStack} />
                : <Stack.Screen name='YouNotLoggedPage' component={YouNotLoggedPage} />
            }

        </Stack.Navigator>
    )
}

