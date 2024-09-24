import {ProfilePageWrapper} from "../../wrappers/ProfilePageWrapper";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {ChoosenCourseCard} from "../../components/coursesList/ChoosenCourseCard";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../helpers/colors";
import {NonBlock} from "../../components/UI/NonBlock";
import {useNavigation} from "@react-navigation/native";

export const ProfileCoursesListPage = () => {

    const navigation = useNavigation()

    const { usersInDB, coursesInDB } = useSelector(state => state.dbData)
    const {loggedUser} = useSelector(state => state.login)

    const createdCourses = useMemo(() => {
        if (loggedUser) {
            if (loggedUser.role === 1) {
                if (coursesInDB && loggedUser) {
                    return coursesInDB.filter(el => loggedUser.coursesId.includes(el.id))
                }
            } else {
                if (coursesInDB && loggedUser) {
                    return coursesInDB.filter(el => el.creatorId === loggedUser.uid)
                }
            }
        }

    }, [coursesInDB, loggedUser])

    return (
        <ActiveAreaWrapper myStyle={{flex: 1}}>
            <ProfilePageWrapper>
                {
                    createdCourses && createdCourses.length
                        ? <ScrollView>
                            {
                                createdCourses.map(course => {
                                    return (
                                        <ChoosenCourseCard key={course.id} courseData={course} isTeacher={loggedUser.role === 2} />
                                    )
                                })
                            }
                        </ScrollView>
                        : loggedUser && loggedUser.role === 1
                            ? <NonBlock
                                text={'You are not taking any courses yet.'}
                                onPress={() => navigation.navigate('CoursesListPage')}
                                btnText={'Get courses'}
                            />
                            : <NonBlock
                                text={'You haven\'t created your own courses yet.'}
                                onPress={() => navigation.navigate('CoursesStack')}
                                btnText={'Create course'}
                            />
                }

            </ProfilePageWrapper>
        </ActiveAreaWrapper>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        marginBottom: 5,
        color: COLORS.darkGray,
        fontSize: 16
    },
})
