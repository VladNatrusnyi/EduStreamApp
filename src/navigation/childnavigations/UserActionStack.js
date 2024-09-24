import {Platform, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {useSelector} from "react-redux";
import {COLORS} from "../../helpers/colors";
import {HomePage} from "../../pages/HomePage";
import {AntDesign, Feather, FontAwesome5, Octicons} from "@expo/vector-icons";
import {UserLogoImage} from "../../components/UI/UserLogoImage";
import {ProfileInfoPage} from "../../pages/UserActiveStack/ProfileInfoPage";
import {ProfileSettingsPage} from "../../pages/UserActiveStack/ProfileSettingsPage";
import {ProfileCoursesListPage} from "../../pages/UserActiveStack/ProfileCoursesListPage";

const Drawer = createDrawerNavigator();


const DrawerContent = (props) => {

    const {loggedUser} = useSelector(state => state.login)

    console.log('loggedUser', loggedUser)

    return (
        <DrawerContentScrollView {...props}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                {
                    loggedUser && <View style={styles.container}>
                            <View style={styles.headWrapper}>
                                <UserLogoImage URL={loggedUser.photoURL} />

                                <Text style={styles.name}>{loggedUser.userName}</Text>
                            </View>
                        </View>
                }
                <DrawerItemList  {...props} />

            </View>
        </DrawerContentScrollView>
    );
}

export const UserActionStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName={'ProfileInfoPage'}

            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: COLORS.red,
                drawerInactiveTintColor: COLORS.darkGray,
                sceneContainerStyle: {
                    backgroundColor: 'transparent',
                },
                drawerContentStyle: {
                    borderRightWidth: 2,
                    borderColor: COLORS.darkGray
                },
                headerTransparent: true,
            }}
        >
            <Drawer.Screen
                name="ProfileInfoPage"
                component={ProfileInfoPage}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ color }) => (
                        <View style={{width: 30}}>
                            <Feather name="user" size={24} color={color} />
                        </View>
                    ),
                }}
            />

            <Drawer.Screen
                name="ProfileSettingsPage"
                component={ProfileSettingsPage}
                options={{
                    title: 'Settings',
                    drawerIcon: ({ color }) => (
                        <View style={{width: 30}}>
                            <Feather name="settings" size={24} color={color} />
                        </View>
                    ),
                }}
            />

            <Drawer.Screen
                name="ProfileCoursesListPage"
                component={ProfileCoursesListPage}
                options={{
                    title: 'Сourses',
                    drawerIcon: ({ color }) => (
                        <View style={{width: 30}}>
                            <Feather name="book" size={24} color={color} />
                        </View>
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    headWrapper: {
        padding: 20,
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
    },
    name: {
        color: COLORS.red,
        fontWeight: 'bold',
        fontSize: 22,
    },
})
