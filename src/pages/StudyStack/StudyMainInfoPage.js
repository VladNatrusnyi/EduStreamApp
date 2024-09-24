
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { ActiveAreaWrapper } from '../../wrappers/ActiveAreaWrapper';
import { courseCategoriesArr } from '../../mock/mock';
import { UserLogoImage } from '../../components/UI/UserLogoImage';
import {useMemo, useState} from 'react';
import { formatDate } from '../../helpers/formatDate';
import {COLORS} from "../../helpers/colors";
import {AntDesign} from "@expo/vector-icons";
import {ref, set} from "firebase/database";
import {db} from "../../config/firebaseConfig";
import {ErrorTextBlock} from "../../components/UI/ErrorTextBlock";
import {useNavigation} from "@react-navigation/native";

export const StudyMainInfoPage = () => {
    const { currentCourseData } = useSelector((state) => state.study);
    const { loggedUser } = useSelector((state) => state.login);
    const { usersInDB, coursesInDB } = useSelector((state) => state.dbData);

    const dispatch = useDispatch()
    const navigation = useNavigation()


    const courseData = useMemo(() => {
        if (coursesInDB && currentCourseData) {
            return coursesInDB.find((course) => course.id === currentCourseData.id);
        }
    }, [currentCourseData, coursesInDB]);

    const creatorData = useMemo(() => {
        if (usersInDB && courseData) {
            return usersInDB.find((user) => user.uid === courseData.creatorId);
        }
    }, [courseData, usersInDB]);


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const updateCourseLikesNumber = () => {
        setIsLoading(true)
        const courseRef = ref(db, `courses/${courseData.id}`);
        const updatedData = {
            ...courseData,
            likes: courseData.likes.includes(loggedUser.id)
                ? JSON.stringify(JSON.parse(courseData.likes)
                    .filter(el => el !== loggedUser.id)
                    .filter((el) => !usersInDB.includes(el)))
                : JSON.stringify([...JSON.parse(courseData.likes), loggedUser.id])
        }
        set(courseRef, updatedData)
            .then(() => {
                setIsLoading(false)
                console.log(`Likes successfully updated`);
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
                console.error(`Error updating Likes number`, error);
            });
    }


    const updateCourseDislikesNumber = () => {
        setIsLoading(true)
        const courseRef = ref(db, `courses/${courseData.id}`);
        const updatedData = {
            ...courseData,
            dislikes: courseData.dislikes.includes(loggedUser.id)
                ? JSON.stringify(JSON.parse(courseData.dislikes)
                    .filter(el => el !== loggedUser.id)
                    .filter((el) => !usersInDB.includes(el)))
                : JSON.stringify([...JSON.parse(courseData.dislikes), loggedUser.id])
        }
        set(courseRef, updatedData)
            .then(() => {
                setIsLoading(false)
                console.log(`Dislikes successfully updated`);
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
                console.error(`Error updating Dislikes number`, error);
            });
    }

    return (
        <ActiveAreaWrapper
            myStyle={styles.container}
        >
            {courseData && (
                <ScrollView style={styles.courseContainer}>
                    {creatorData && (
                        <View style={styles.creatorContainer}>
                            <UserLogoImage size={60} URL={creatorData.photoURL} />
                            <Text style={styles.userName}>{creatorData.userName}</Text>
                        </View>
                    )}

                    <Text style={styles.courseName}>{courseData.courseName}</Text>
                    <Text style={styles.courseDescription}>{courseData.courseDescription}</Text>
                    <Text style={styles.categoryName}>
                        {courseCategoriesArr.find((el) => el.id === courseData.courseCategoryId).categoryName}
                    </Text>

                    <Text style={styles.creationDate}>{formatDate(courseData.creationDate)}</Text>

                    <View style={styles.likeWrapper}>
                        <TouchableOpacity
                            onPress={updateCourseDislikesNumber}
                            style={styles.statsWrapper}>
                            <AntDesign name="dislike2" size={24} color={COLORS.darkGray} />
                            <Text style={styles.stats}> {JSON.parse(courseData.dislikes).length}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={updateCourseLikesNumber}
                            style={styles.statsWrapper}>
                            <AntDesign name="like2" size={24} color={COLORS.darkGray} />
                            <Text style={styles.stats}> {JSON.parse(courseData.likes).length}</Text>
                        </TouchableOpacity>
                    </View>

                    <ErrorTextBlock text={error} />

                    <Text style={styles.lessonsTitle}>Lessons</Text>

                    <View style={{marginVertical: 15}}>
                        {
                            courseData.lessons.map(lesson => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('StudyLessonPage', {lessonData: lesson})
                                        }}
                                        style={styles.levelWrap}
                                        key={lesson.id}
                                    >
                                        <Text style={styles.levelTitle}>{lesson.title}</Text>
                                        <AntDesign name="right" size={24} color={COLORS.darkGray} />
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </ScrollView>
            )}
        </ActiveAreaWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -20,
        marginBottom: 20
    },
    courseContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: COLORS.red,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    creatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        marginLeft: 10,
        fontSize: 18,
        color: COLORS.darkGray,
        fontWeight: 'bold',
    },
    courseName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    courseDescription: {
        marginBottom: 5,
        fontSize: 16,
        color: COLORS.darkGray,
    },
    categoryName: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
        marginTop: 10
    },
    creationDate: {
        fontStyle: 'italic',
        marginBottom: 10,
        color: COLORS.darkGray,
    },
    likeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 20
    },
    statsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        height: 70,
        width: 70,
        backgroundColor: COLORS.lightRed,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 100
    },
    stats: {
        fontSize: 20,
        color: COLORS.darkGray
    },

    lessonsTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.darkGray
    },
    levelWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.lightRed,
        marginBottom: 15,
        gap: 10
    },
    levelTitle: {
        fontSize: 18,
        color: COLORS.darkGray,
    }
});
