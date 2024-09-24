import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import { COLORS } from "../../helpers/colors";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import {CustomAppButton} from "../UI/CustomAppButton";
import {useDispatch} from "react-redux";
import {deleteLevel} from "../../store/createCourseSlice";

const Accordion = ({ title, children, isOpen, setIsOpen }) => {
    const handlePress = () => {
        setIsOpen(isOpen === title ? '' : title);
    };

    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity style={styles.accordionHeader} onPress={handlePress}>
                <Text style={styles.title}>{title}</Text>
                <Entypo name={isOpen === title ? 'chevron-up' : 'chevron-down'} size={26} color={COLORS.darkGray} />
            </TouchableOpacity>
            {isOpen === title && <View style={styles.content}>{children}</View>}
        </View>
    );
};

const OpenURLButton = ({ url, children }) => {
    const handlePress = () => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={{color: COLORS.blue}}>{children}</Text>
        </TouchableOpacity>
    );
};

export const CreateLessonAccordionPreview = ({ data }) => {
    const dispatch = useDispatch()


    const [openTab, setOpenTab] = useState('');


    return (
        <View style={styles.container}>
            {data.sort((a, b) => a.order - b.order).map((item) => (
                <Accordion
                    key={item.id}
                    title={`${item.order}. ${item.title}`}
                    isOpen={openTab}
                    setIsOpen={setOpenTab}
                >
                    <View>
                        <View style={styles.block}>
                            <Text style={styles.blockText}>Info</Text>
                            <View style={styles.line}></View>

                            <Text style={styles.text}>
                                {item.levelDescription}
                            </Text>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.blockText}>Link</Text>
                            <View style={styles.line}></View>

                            <OpenURLButton url={item.videoLink}>
                                Open video link
                            </OpenURLButton>
                        </View>


                        <View style={styles.block}>
                            <Text style={styles.blockText}>Quiz</Text>
                            <View style={styles.line}></View>

                            <View style={styles.questionList}>
                                {item.questions.map((q, index) => (
                                    <View key={index} style={styles.questionItem}>
                                        <Text style={styles.questionItemText}>{index + 1}) {q.question}</Text>
                                        {q.options.map((option, idx) => (
                                            <Text key={idx} style={q.correctAnswer === idx ? styles.correctOption : styles.option}>
                                                - {option}
                                            </Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </View>


                        <CustomAppButton
                            text={'Delete lesson'}
                            additionalStyle={{
                            }}
                            onPress={() => dispatch(deleteLevel(item.id))}
                            bgColor={'transpatent'}
                            borderColor={COLORS.red}
                            textColor={COLORS.red}
                        />

                    </View>
                </Accordion>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    accordionContainer: {
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: COLORS.lightRed,
        borderColor: COLORS.red,
        padding: 20,
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 20,
        color: COLORS.darkGray,
    },
    content: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 10,
    },

    block: {
        marginBottom: 15
    },
    blockText: {
        fontSize: 16,
        color: COLORS.darkGray,
        fontWeight: 'bold'
    },
    line: {
        borderBottomWidth: 1,
        borderColor: COLORS.darkGray,
        marginVertical: 5
    },
    text: {
        color: COLORS.darkGray
    },

    questionList: {
        marginTop: 20,
    },
    questionItem: {
        marginBottom: 20,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: COLORS.darkGray,
        position: 'relative'
    },
    questionItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    option: {
        marginLeft: 20,
        fontSize: 16
    },
    correctOption: {
        marginLeft: 20,
        color: 'green',
        fontSize: 16
    },
});


