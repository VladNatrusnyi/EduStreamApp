import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ActiveAreaWrapper} from "../wrappers/ActiveAreaWrapper";
import {useEffect, useMemo, useState} from "react";
import {getDatabase, query, ref, onValue} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {setCoursesInDB, setUsersInDB} from "../store/datafromDBSlice";
import {PulseLoader} from "../components/PulsePreloader";
import {ErrorTextBlock} from "../components/UI/ErrorTextBlock";
import {CourseCard} from "../components/coursesList/CourseCard";
import {SideDrawer} from "../components/UI/SideDrawer";

import {COLORS} from "../helpers/colors";
import {Feather} from "@expo/vector-icons";
import {UserLogoImage} from "../components/UI/UserLogoImage";
import {useNavigation} from "@react-navigation/native";

export const CoursesListPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { usersInDB, coursesInDB } = useSelector(state => state.dbData)
    const {loggedUser} = useSelector(state => state.login)
    const {searchText, categoryValue, popularity, creationDate} = useSelector(state => state.filter)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [isDrawer, setIsDrawer] = useState(false)


    const filteredCourses = useMemo(() => {
        if (coursesInDB) {
            let res = [...coursesInDB];

            if (searchText) {
                res = res.filter(el => el.courseName.toLowerCase().includes(searchText.toLowerCase().trim()));
            }

            if (categoryValue) {
                res = res.filter(el => el.courseCategoryId === categoryValue);
            }

            res.sort((a, b) => {
                if (popularity) {
                    if (popularity === 1) {
                        return b.subscriptions - a.subscriptions;
                    } else {
                        return a.subscriptions - b.subscriptions;
                    }
                }

                if (creationDate) {
                    if (creationDate === 1) {
                        return b.creationDate - a.creationDate;
                    } else {
                        return a.creationDate - b.creationDate;
                    }
                }

                return 0;
            });

            return res;
        }
    }, [coursesInDB, searchText, categoryValue, popularity, creationDate]);


    const followChangesCoursesOnDB = () => {
        setIsLoading(true);
        const db = getDatabase();
        const coursesRef = ref(db, 'courses');

        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const coursesArray = Object.keys(data).map((key) => data[key]);
                dispatch(setCoursesInDB(coursesArray));
            } else {
                dispatch(setCoursesInDB(null));
            }
            setIsLoading(false);
            setError('');
        }, (error) => {
            setError(error.message);
            setIsLoading(false);
        });
    };

    const followChangesUsersOnDB = () => {
        setIsLoading(true);
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const usersArray = Object.keys(data).map((key) => data[key]);
                dispatch(setUsersInDB(usersArray));

            } else {
                dispatch(setUsersInDB(null));
            }
            setIsLoading(false);
            setError('');
        }, (error) => {
            setError(error.message);
            setIsLoading(false);
        });
    };


    useEffect(() => {
        followChangesCoursesOnDB();
        followChangesUsersOnDB()
    }, [loggedUser]);


    return (
        <ActiveAreaWrapper myStyle={{
            flex: 1,
        }}>

            <View style={styles.headerWrap}>
                <TouchableOpacity
                    onPress={() => setIsDrawer(!isDrawer)}
                >
                    <Feather name="filter" size={28} color={COLORS.darkGray} />
                </TouchableOpacity>

                {
                    loggedUser &&
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UserProfileStack')}
                    >
                        <UserLogoImage size={40} URL={loggedUser.photoURL} />
                    </TouchableOpacity>

                }
            </View>

            <SideDrawer isOpen={isDrawer} onClose={() => setIsDrawer(false)} />
            <ScrollView>
                {
                    !!filteredCourses && filteredCourses.length ?
                    filteredCourses.map(course => {
                        return (
                            <CourseCard key={course.id} courseData={course}/>
                        )
                    })
                        : <Text style={styles.noFound}>No courses found.</Text>

                }
            </ScrollView>


            <PulseLoader isAnimating={isLoading}/>
            <ErrorTextBlock text={error} />
        </ActiveAreaWrapper>
    )
}


const styles = StyleSheet.create({
    headerWrap: {
        height: 50,
        borderBottomWidth: 2,
        borderColor: COLORS.lightRed,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noFound: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        color: COLORS.darkGray
    }
})
