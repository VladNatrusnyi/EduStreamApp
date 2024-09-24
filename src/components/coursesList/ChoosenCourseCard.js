import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {UserLogoImage} from "../UI/UserLogoImage";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../../helpers/colors";
import {courseCategoriesArr} from "../../mock/mock";
import {formatDate} from "../../helpers/formatDate";
import {CustomAppButton} from "../UI/CustomAppButton";
import {ref, set, remove} from "firebase/database";
import {db} from "../../config/firebaseConfig";
import {setLoggedUser} from "../../store/loginSlice";
import {useNavigation} from "@react-navigation/native";
import {PulseLoader} from "../PulsePreloader";
import {ErrorTextBlock} from "../UI/ErrorTextBlock";
import {setCurrentCourseData} from "../../store/studySlice";


export const ChoosenCourseCard = ({courseData, isTeacher = false}) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { usersInDB, coursesInDB } = useSelector(state => state.dbData)
    const {loggedUser} = useSelector(state => state.login)

    const [isShowDetails, setIsShowDetails] = useState(false)


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const updateSubscriptionsNumber = () => {
        setIsLoading(true)
        const courseRef = ref(db, `courses/${courseData.id}`);
        const updatedData = {
            ...courseData,
            subscriptions: courseData.subscriptions - 1
        }
        set(courseRef, updatedData)
            .then(() => {
                setIsLoading(false)
                console.log(`Subscriptions successfully updated`);
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
                console.error(`Error updating Subscriptions number`, error);
            });
    }

    const unsubscribeOnCourse = () => {
        setIsLoading(true)
        const userRef = ref(db, `users/${loggedUser.id}`);
        const updatedData = {
            ...loggedUser,
            coursesId: JSON.stringify(JSON.parse(loggedUser.coursesId).filter(el => el !== courseData.id).filter(el => coursesInDB.find(item => item.id === el)))
        }
        set(userRef, updatedData)
            .then(() => {
                updateSubscriptionsNumber()
                dispatch(setLoggedUser(updatedData))
                setIsLoading(false)
                console.log(`User data successfully updated`);
                // navigation.navigate('CoursesStack')
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
                console.error(`Error updating user data`, error);
            });
    }


    const deleteCourse = async () => {
        setIsLoading(true);
        try {
            const courseRef = ref(db, `courses/${courseData.id}`);
            await remove(courseRef);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const courseAuthor = useMemo(() => {
        return usersInDB && usersInDB.find(user => user.uid === courseData.creatorId)
    }, [usersInDB])

    return (
        <View style={styles.container}>
            <View style={styles.titleWrap}>
                <Text style={styles.titleText}>{courseData.courseName}</Text>
            </View>
            <View style={styles.bottomContainer}>
                {
                    !!courseAuthor &&
                    <View style={styles.photoWrap}>
                        <UserLogoImage size={70} URL={courseAuthor.photoURL} />
                        <View style={styles.likesWrap}>
                            <View style={{alignItems: 'center'}}>
                                <AntDesign name="like2" size={24} color={COLORS.darkGray} />
                                <Text style={{color: COLORS.darkGray}}>{JSON.parse(courseData.likes).length}</Text>
                            </View>

                            <View style={{alignItems: 'center'}}>
                                <AntDesign name="dislike2" size={24} color={COLORS.darkGray} />
                                <Text style={{color: COLORS.darkGray}}>{JSON.parse(courseData.dislikes).length}</Text>
                            </View>

                        </View>
                    </View>
                }


                <View style={styles.infoWrap}>
                    {
                        !!courseAuthor &&
                        <Text style={styles.infoLabel}>Author: <Text style={styles.infoLabelText}>{courseAuthor.userName}</Text></Text>
                    }

                    <Text style={styles.infoLabel}>Category: <Text style={styles.infoLabelText}>{courseCategoriesArr.find(el => el.id === courseData.courseCategoryId).categoryName}</Text></Text>
                    <Text style={styles.infoLabel}>Subscriptions: <Text style={styles.infoLabelText}>{courseData.subscriptions}</Text></Text>
                    <Text style={styles.infoLabel}>Date of creation: <Text style={styles.infoLabelText}>{formatDate(courseData.creationDate)}</Text></Text>
                    <Text style={styles.infoLabel}>Number of lessons: <Text style={styles.infoLabelText}>{courseData.lessons.length}</Text></Text>

                    <View style={styles.subscribeWrap}>
                        <PulseLoader isAnimating={isLoading}/>
                        <ErrorTextBlock text={error} />

                        {
                            isTeacher
                                ? <CustomAppButton
                                    text={'Delete Course'}
                                    additionalStyle={{
                                        marginVertical: 10
                                    }}
                                    onPress={deleteCourse}
                                />
                                : <View>
                                    <CustomAppButton
                                        bgColor={'transparent'}
                                        borderColor={COLORS.darkGray}
                                        textColor={COLORS.darkGray}
                                        text={'Unsubscribe'}
                                        additionalStyle={{
                                            marginVertical: 10
                                        }}
                                        onPress={unsubscribeOnCourse}
                                    />
                                    <CustomAppButton
                                        text={'Go to study'}
                                        additionalStyle={{
                                            marginVertical: 10
                                        }}
                                        onPress={() => {
                                            dispatch(setCurrentCourseData(courseData))
                                            navigation.navigate('StudyStack')
                                        }}
                                    />
                                </View>
                        }

                        <TouchableOpacity
                            onPress={() => setIsShowDetails(!isShowDetails)}
                            style={{alignSelf: 'flex-end', marginTop: 10}}>
                            <Text style={{color: COLORS.blue}}>{isShowDetails ? 'Hide details' : 'More details...'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {
                !!isShowDetails &&
                <View style={styles.detailsWrap}>

                    <Text style={styles.detailsText}>{courseData.courseDescription}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: COLORS.blue,
        marginBottom: 15
    },

    titleWrap: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: COLORS.darkGray
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.red
    },

    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },

    likesWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        marginTop: 10
    },

    photoWrap: {
        height: '100%',
        paddingVertical: 10,
        paddingLeft: 10,
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderColor: COLORS.darkGray
    },

    infoWrap: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10
    },

    infoLabel: {
        fontSize: 16,
        color: COLORS.darkGray,
        marginBottom: 5
    },
    infoLabelText: {
        fontWeight: 'bold',
        color: COLORS.red
    },

    subscribeWrap: {
    },

    detailsWrap: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: COLORS.darkGray,
    },
    detailsText: {
        color: COLORS.darkGray
    }
})
