import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {COLORS} from "../../helpers/colors";

export const CustomTextArea = ({placeholder, value, maxHeight = 250, onChangeValue}) => {

    const handleClearText = () => {
        onChangeValue('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                multiline
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChangeValue(text)}
                style={[
                    styles.textInput,
                    {maxHeight: maxHeight}
                ]}
            />
            <TouchableOpacity onPress={handleClearText} style={styles.clearIcon}>
                <FontAwesome name="close" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
        padding: 20,
        borderWidth: 2,
        borderColor: COLORS.darkGray,
        borderRadius: 20,
    },
    textInput: {
        flex: 1,
        textAlignVertical: 'top',
        color: COLORS.darkGray,
        fontSize: 16
    },
    clearIcon: {
        position: 'absolute',
        right: 15,
        top: 10,
    },
});
