import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {ScrollView, Text} from "react-native";
import {ChoosenCourseCard} from "../../components/coursesList/ChoosenCourseCard";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {NonBlock} from "../../components/UI/NonBlock";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../../helpers/colors";

export const LearnCoursePage = () => {
    const navigation = useNavigation()
    const { usersInDB, coursesInDB } = useSelector(state => state.dbData)
    const {loggedUser} = useSelector(state => state.login)

    const userCourses = useMemo(() => {
        if (coursesInDB && loggedUser) {
            return coursesInDB.filter(el => loggedUser.coursesId.includes(el.id))
        }
    }, [coursesInDB])
    return (
        <ActiveAreaWrapper myStyle={{
            flex: 1,
        }}>
            <Text style={{
                fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom: 10, color: COLORS.darkGray
            }}>Active courses</Text>
            {
                userCourses && userCourses.length
                    ? <ScrollView>
                        {
                            userCourses.map(course => {
                                return (
                                    <ChoosenCourseCard key={course.id} courseData={course} isTeacher={false} />
                                )
                            })
                        }
                    </ScrollView>

                    : <NonBlock
                        text={'You are not taking any courses yet.'}
                        onPress={() => navigation.navigate('CoursesListPage')}
                        btnText={'Get courses'}
                    />
            }

        </ActiveAreaWrapper>
    )
}
