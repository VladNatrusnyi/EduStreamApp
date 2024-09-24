import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect} from "react";
import {COLORS} from "../helpers/colors";
import {useDispatch, useSelector} from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../config/firebaseConfig";
import {equalTo, get, getDatabase, orderByChild, query, ref} from "firebase/database";
import {View, Text, StyleSheet} from "react-native";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {setLoggedUser} from "../store/loginSlice";
import {UserProfileStack} from "./childnavigations/UserProfileStack";
import {CoursesStack} from "./childnavigations/courses/CoursesStack";
import {CoursesListPage} from "../pages/CoursesListPage";

const Tab = createBottomTabNavigator();

export const Navigator = () => {

  const dispatch = useDispatch()

  const {loggedUser} = useSelector(state => state.login)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const db = getDatabase();
        const userRef = ref(db, "users");
        const sortedUsers = query(userRef, orderByChild('uid'), equalTo(uid));

        get(sortedUsers)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              if (userData) {
                const key = Object.keys(userData)[0];
                dispatch(setLoggedUser(userData[key]));
                console.log("Success getting user by id");
              } else {
                dispatch(setLoggedUser(null));
              }
            } else {
              console.log("User not found");
            }
          })
          .catch((error) => {
            console.error("Error getting user by id", error.message);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="CoursesListPage"
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="CoursesListPage"
          component={CoursesListPage}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View style={[
                styles.tabIconWrapper,
                focused ? styles.tabIconFocused : null
              ]}>
                <FontAwesome name="list-ul" size={24} color={COLORS.white} />
                {focused && <Text style={styles.tabText}>Courses</Text>}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="CoursesStack"
          component={CoursesStack}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View style={[
                styles.tabIconWrapper,
                focused ? styles.tabIconFocused : null
              ]}>
                {
                  (loggedUser && loggedUser.role === 2)
                    ? <>
                      <FontAwesome name="plus" size={24} color={COLORS.white} />
                      {focused && <Text style={styles.tabText}>Create</Text>}
                    </>
                    : <>
                      <Entypo name="open-book" size={24} color={COLORS.white} />
                      {focused && <Text style={styles.tabText}>Study</Text>}
                    </>
                }
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="UserProfileStack"
          component={UserProfileStack}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View style={[
                styles.tabIconWrapper,
                focused ? styles.tabIconFocused : null
              ]}>
                <FontAwesome name="user" size={24} color={COLORS.white} />
                {focused && <Text style={styles.profileText}>Profile</Text>}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.red,
  },
  tabIconWrapper: {
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 100,
    marginTop: 10,
  },
  tabIconFocused: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.red,
  },
  tabText: {
    color: COLORS.white,
    fontSize: 14,
  },
  profileText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
