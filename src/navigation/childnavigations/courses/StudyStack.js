import {createStackNavigator} from "@react-navigation/stack";
import {StudyMainInfoPage} from "../../../pages/StudyStack/StudyMainInfoPage";
import {StudyLessonPage} from "../../../pages/StudyStack/StudyLessonPage";

const Stack = createStackNavigator();

export const StudyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'StudyMainInfoPage'}
            screenOptions={{
                // headerShown: false,
            }}>
            <Stack.Screen
                options={{
                    title: ''
                   }}
                name='StudyMainInfoPage'
                component={StudyMainInfoPage}
            />

            <Stack.Screen
                options={{
                    title: 'Lesson'
                }}
                name='StudyLessonPage'
                component={StudyLessonPage}
            />
        </Stack.Navigator>
    );
}

