import {createStackNavigator} from "@react-navigation/stack";
import {HomePage} from "../../../pages/HomePage";
import {CreateCoursePage} from "../../../pages/CoursesStack/CreateCoursePage";

const Stack = createStackNavigator();

export const CreateCourseStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'CreateCoursePage'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name='CreateCoursePage'
                component={CreateCoursePage}
            />
        </Stack.Navigator>
    );
}