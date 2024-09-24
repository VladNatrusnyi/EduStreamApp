import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {COLORS} from "../../helpers/colors";
import {CustomAppButton} from "../UI/CustomAppButton";

export const QuizPlay = ({quiz}) => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.length).fill(null));
    const [score, setScore] = useState(null);

    const selectAnswer = (questionIndex, optionIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const clearAnswers = () => {
        setSelectedAnswers(Array(quiz.length).fill(null));
        setScore(null);
    };

    const checkAnswers = () => {
        const calculatedScore = selectedAnswers.reduce((acc, selectedAnswer, index) => {
            return acc + (selectedAnswer === quiz[index].correctAnswer ? 1 : 0);
        }, 0);
        setScore(calculatedScore);
    };

    const allQuestionsAnswered = selectedAnswers.every(answer => answer !== null);

    return (
        <ScrollView style={styles.container}>
            {quiz.map((question, questionIndex) => (
                <View key={questionIndex} style={styles.questionItem}>
                    <Text style={styles.questionText}>{questionIndex + 1}) {question.question}</Text>
                    {question.options.map((option, optionIndex) => (
                        <TouchableOpacity
                            key={optionIndex}
                            style={[
                                styles.optionButton,
                                selectedAnswers[questionIndex] === optionIndex && styles.selectedOption,
                            ]}
                            onPress={() => selectAnswer(questionIndex, optionIndex)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
            {score !== null && (
                <Text style={styles.scoreText}>Score: {score}</Text>
            )}
            <View style={styles.buttonsContainer}>

                <CustomAppButton
                    text={'Clear'}
                    additionalStyle={{
                        width: '40%'
                    }}
                    onPress={clearAnswers}
                    bgColor={COLORS.white}
                    borderColor={COLORS.darkGray}
                    textColor={COLORS.darkGray}
                />

                <CustomAppButton
                    disabled={!allQuestionsAnswered}
                    text={'Check'}
                    additionalStyle={{
                        width: '40%'
                    }}
                    onPress={checkAnswers}
                    textColor={!allQuestionsAnswered && COLORS.white}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    questionItem: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 10,
        color: COLORS.darkGray,
        fontWeight: 'bold'
    },
    optionButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.darkGray,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedOption: {
        backgroundColor: COLORS.lightRed,
    },
    optionText: {
        fontSize: 16,
    },
    buttonsContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scoreText: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 10,
        color: COLORS.darkGray,
        fontWeight: 'bold'
    },
});
