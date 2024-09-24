import React, {useMemo, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {COLORS} from "../../helpers/colors";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {QuizPlay} from "../createCourseComponents/QuizPlay";
import {Ionicons} from "@expo/vector-icons";

export const QuizModal = ({ isVisible, onClose, quiz }) => {

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="fade"
        >
            <ActiveAreaWrapper
                bgColor={'rgba(0, 0, 0, 0.8)'}
                myStyle={{
                    flex: 1,
                    marginBottom: 40
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Quiz</Text>
                            <TouchableOpacity
                                onPress={onClose}
                                style={styles.closeBtn}
                            >
                                <Ionicons name="close" size={28} color={COLORS.darkGray} />
                            </TouchableOpacity>
                        </View>

                        <QuizPlay quiz={quiz} />
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
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.blue
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
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.darkGray
    },
    closeBtn: {
        padding: 10,
        backgroundColor: COLORS.lightRed,
        borderRadius: 100
    }
});

