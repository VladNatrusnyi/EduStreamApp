import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {COLORS} from "../../helpers/colors";
import {CustomAppButton} from "../UI/CustomAppButton";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {CustomAppInput} from "../UI/CustomAppInput";

export const QuizGenerator = ({setQuestions, questions}) => {
    const [showForm, setShowForm] = useState(false);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(null);


    const handleOptionChange = (text, index) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
    };

    const saveQuestion = () => {
        setQuestions([...questions, { question, options, correctAnswer, id: Date.now().toString() }]);
        setQuestion('');
        setOptions(['', '', '']);
        setCorrectAnswer(null);
        setShowForm(false);
    };

    const deleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const allFieldsFilled = question && options.every(option => option) && correctAnswer !== null;

    return (
        <ScrollView style={styles.container}>
            <CustomAppButton
                text={showForm ? 'Hide Form' : 'Create Question'}
                additionalStyle={{
                }}
                onPress={() => setShowForm(!showForm)}
                bgColor={'transpatent'}
                borderColor={COLORS.blue}
                textColor={COLORS.blue}
            />


            {showForm && (
                <View style={styles.form}>
                    <CustomAppInput
                        placeholderText={"Question"}
                        icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                        onChangeValue={(text) => setQuestion(text)}
                        onRightIconPress={() => setQuestion('')}
                        value={question}
                        // isError={!!courseError}
                    />

                    {options.map((option, index) => (
                        <CustomAppInput
                            key={index}
                            placeholderText={`Answer ${index + 1}`}
                            icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                            onChangeValue={(text) => handleOptionChange(text, index)}
                            onRightIconPress={() => handleOptionChange('', index)}
                            value={option}
                            paddingVertical={15}
                            // isError={!!courseError}
                        />

                    ))}
                    {question && options.every(option => option) && (
                        <View style={styles.radioGroup}>
                            <Text style={styles.subTitle}>Mark the correct answer</Text>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.radioButton}
                                    onPress={() => setCorrectAnswer(index)}
                                >
                                    <View style={[styles.radioCircle, correctAnswer === index && styles.radioCircleSelected]} />
                                    <Text style={styles.radioText}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <CustomAppButton
                        text={'Save Question'}
                        additionalStyle={{
                        }}
                        onPress={saveQuestion}
                        bgColor={!allFieldsFilled ? COLORS.white : 'transparent'}
                        borderColor={COLORS.blue}
                        textColor={!allFieldsFilled ? COLORS.white : COLORS.blue}
                        disabled={!allFieldsFilled}
                    />
                </View>
            )}

            <View style={styles.questionList}>
                {questions.map((q, index) => (
                    <View key={index} style={styles.questionItem}>
                        <Text style={styles.questionItemText}>{index + 1}) {q.question}</Text>
                        {q.options.map((option, idx) => (
                            <Text key={idx} style={q.correctAnswer === idx ? styles.correctOption : styles.option}>
                                - {option}
                            </Text>
                        ))}
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => deleteQuestion(index)}
                        >
                            <MaterialIcons name="delete" size={24} color={COLORS.red} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    form: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    radioGroup: {
        marginBottom: 20,
        paddingHorizontal: 10
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioText: {
        marginRight: 10,
        color: COLORS.blue,
        fontSize: 16
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.blue,
        marginRight: 10,
    },
    radioCircleSelected: {
        backgroundColor: COLORS.darkGray,
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
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
    deleteBtn: {
      position: 'absolute',
      right: 10,
        top: 10
    },

    subTitle: {
        marginBottom: 10,
        color: COLORS.darkGray,
        fontSize: 16
    },
});
