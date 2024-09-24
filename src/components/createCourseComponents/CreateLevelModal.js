import React, {useMemo, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {COLORS} from "../../helpers/colors";
import {CustomAppInput} from "../UI/CustomAppInput";
import {FontAwesome} from "@expo/vector-icons";
import {setLessons} from "../../store/createCourseSlice";
import {CustomTextArea} from "../UI/CustomTextArea";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {QuizGenerator} from "./QuizGenerator";
import {CustomAppButton} from "../UI/CustomAppButton";
import {useDispatch} from "react-redux";
import {extractVideoId} from "../../helpers/extractVideoId";


export const CreateLevelModal = ({ isVisible, onClose }) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [levelDescription, setLevelDescription] = useState('');
    const [questions, setQuestions] = useState([]);


    const isButtonDisabled = useMemo(() => {
        return title.trim() && videoLink.trim() && extractVideoId(videoLink) && levelDescription.trim() && questions.length
    }, [videoLink, levelDescription, questions, title])


    const pressCansel = () => {
        setTitle('')
        setVideoLink('')
        setLevelDescription('')
        setQuestions([])
        onClose()
    }

    const pressSave = () => {

        const lessonData = {
            title,
            videoLink,
            levelDescription,
            questions
        }

        dispatch(setLessons(lessonData))

        pressCansel()
    }


    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="fade"
        >
            <ActiveAreaWrapper
                isPageWithKeyboard={true}
                bgColor={'rgba(0, 0, 0, 0.8)'}
                myStyle={{
                    flex: 1,
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <View style={styles.section}>
                            <Text style={styles.subTitle}>Lesson title</Text>
                            <CustomAppInput
                                placeholderText={"Title"}
                                icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                                onChangeValue={(text) => setTitle(text)}
                                onRightIconPress={() => setTitle('')}
                                value={title}
                                // isError={!!courseError}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.subTitle}>Link to video from YouTube</Text>
                            <View style={{paddingVertical: 7}}>
                                {
                                    videoLink
                                        ? (extractVideoId(videoLink)) ? <Text style={{color: 'green'}}>The link is valid</Text> : <Text style={{color: 'red'}}>The link is not valid</Text>
                                        : null
                                }
                            </View>
                            <CustomAppInput
                                placeholderText={"Link to video"}
                                icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                                onChangeValue={(text) => setVideoLink(text)}
                                onRightIconPress={() => setVideoLink('')}
                                value={videoLink}
                                // isError={!!courseError}
                            />
                        </View>

                        <View style={[styles.section, {marginBottom: 15}]}>
                            <Text style={styles.subTitle}>Lesson description</Text>
                            <CustomTextArea
                                value={levelDescription}
                                onChangeValue={(value) => setLevelDescription(value)}
                                maxHeight={300}
                                placeholder={'Description'}
                            />
                        </View>


                        <View style={[styles.section, {marginBottom: 15}]}>
                            <Text style={styles.subTitle}>Create quiz</Text>
                            <QuizGenerator questions={questions} setQuestions={setQuestions}/>
                        </View>

                        <View style={styles.controlsBlock}>
                            <CustomAppButton
                                text={'Cancel'}
                                additionalStyle={{
                                    width: '40%'
                                }}
                                onPress={pressCansel}
                                bgColor={COLORS.white}
                                borderColor={COLORS.darkGray}
                                textColor={COLORS.darkGray}
                            />

                            <CustomAppButton
                                text={'Save'}
                                additionalStyle={{
                                    width: '40%'
                                }}
                                onPress={pressSave}
                                bgColor={!isButtonDisabled ? COLORS.white : COLORS.red}
                                borderColor={COLORS.red}
                                textColor={COLORS.white}
                                disabled={!isButtonDisabled}
                            />
                        </View>

                    </View>
                </View>
            </ActiveAreaWrapper>

        </Modal>
    );
};



const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.red
    },

    subTitle: {
        marginBottom: 5,
        color: COLORS.darkGray,
        fontSize: 16
    },
    section: {},

    controlsBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

