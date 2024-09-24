import {createStackNavigator} from "@react-navigation/stack";
import {LearnCoursePage} from "../../../pages/CoursesStack/LearnCoursePage";
import {StudyStack} from "./StudyStack";

const Stack = createStackNavigator();

export const LearnCourseStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'LearnCoursePage'}
            screenOptions={{
                title: 'Courses',
                headerShown: false,
            }}>
            <Stack.Screen
                name='LearnCoursePage'

                component={LearnCoursePage}
            />
            <Stack.Screen
                name='StudyStack'
                component={StudyStack}
            />
        </Stack.Navigator>
    );
}