import {StyleSheet, Text, View} from "react-native";
import {CustomAppInput} from "../UI/CustomAppInput";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {COLORS} from "../../helpers/colors";
import {CustomTextArea} from "../UI/CustomTextArea";
import {ErrorTextBlock} from "../UI/ErrorTextBlock";
import {PulseLoader} from "../PulsePreloader";
import {CustomAppButton} from "../UI/CustomAppButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useMemo, useState} from "react";
import {
    clearAllFieldsCourseSlice,
    setCourseCategoryId,
    setCourseDescription,
    setCourseName
} from "../../store/createCourseSlice";
import RNPickerSelect from 'react-native-picker-select';
import {courseCategoriesArr} from "../../mock/mock";
import {CreateLevelModal} from "./CreateLevelModal";
import {CreateLessonAccordionPreview} from "./CreateLessonAccordionPreview";
import {db} from "../../config/firebaseConfig";
import { ref, set, push } from "firebase/database";
import FlashMessage, {showMessage} from "react-native-flash-message";


export const CreateCourseForm = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {
        courseName,
        courseDescription,
        courseCategoryId,
        lessons
    } = useSelector(state => state.createCourse)

    const {
        loggedUser,
    } = useSelector(state => state.login)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [modalVisible, setModalVisible] = useState(false)


    const isBtnDisabled = useMemo(() => {
        return courseName.trim() && courseDescription.trim() && courseCategoryId && lessons.length
    }, [courseName, courseDescription, courseCategoryId, lessons])

    const showFlashMessage = () => {
        showMessage({
            message: 'Success',
            description: "The course has been successfully created.",
            type: 'success',
            duration: 3000,
            statusBarHeight: 10
        });
    };

    const createCourse = async () => {
        setIsLoading(true)
        const questionRef = ref(db, 'courses');

        const newQuestionIdRef = await push(questionRef);

        set(newQuestionIdRef, {
            id: newQuestionIdRef.key,
            creatorId: loggedUser.uid,
            creationDate: Date.now(),
            courseName,
            courseDescription,
            courseCategoryId,
            lessons,
            subscriptions: 0,
            likes: JSON.stringify([]),
            dislikes: JSON.stringify([])
        })
            .then(() => {
                setIsLoading(false)
                setError('')
                dispatch(clearAllFieldsCourseSlice())
                showFlashMessage()
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
            });
    }


    return (
        <>
            <CreateLevelModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
            <FlashMessage position="top" />
            <View>
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Course name</Text>
                    <CustomAppInput
                        placeholderText={"Name"}
                        icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                        onChangeValue={(text) => dispatch(setCourseName(text))}
                        onRightIconPress={() => dispatch(setCourseName(''))}
                        value={courseName}
                        isError={!!error}
                    />
                </View>

                <View style={[styles.section, {marginBottom: 15}]}>
                    <Text style={styles.subTitle}>Course description</Text>
                    <CustomTextArea
                        value={courseDescription}
                        onChangeValue={(value) => dispatch(setCourseDescription(value))}
                        maxHeight={300}
                        placeholder={'Description'}
                    />
                </View>


                <View style={[styles.section, {marginBottom: 15}]}>
                    <Text style={styles.subTitle}>Course category</Text>
                    <RNPickerSelect
                        value={courseCategoryId}
                        onValueChange={(value) => dispatch(setCourseCategoryId(value))}
                        items={courseCategoriesArr.map((el) => {
                            return {
                                label: el.categoryName,
                                value: el.id
                            }
                        })}
                        style={{
                            inputIOS: styles.inputSelect,
                            inputAndroid: styles.inputSelect,
                        }}
                    />
                </View>

                <View style={[styles.section, {marginBottom: 15}]}>
                    <Text style={styles.subTitle}>Creating lessons</Text>

                    <CustomAppButton
                        text={'+ create lesson'}
                        additionalStyle={{
                            marginBottom: 10
                        }}
                        onPress={() => setModalVisible(true)}
                        bgColor={'transpatent'}
                        borderColor={COLORS.blue}
                        textColor={COLORS.blue}
                    />

                    <CreateLessonAccordionPreview data={lessons} />
                </View>

                <ErrorTextBlock text={error} />

                <PulseLoader isAnimating={isLoading}/>

                <CustomAppButton
                    text={'Create course'}
                    additionalStyle={{
                        marginBottom: 15
                    }}
                    disabled={!isBtnDisabled}
                    onPress={createCourse}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        marginBottom: 5,
        color: COLORS.darkGray,
        fontSize: 16
    },
    section: {},

    editImageWrapper: {
        alignItems: 'center',
        position: "relative"
    },

    editImageButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 15
    },

    selectStyle: {
        backgroundColor: 'red'
    },
    inputSelect: {
        fontSize: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: COLORS.darkGray,
        borderRadius: 20,
        color: COLORS.darkGray,
        backgroundColor: COLORS.white,
        paddingRight: 30,
    },

})
