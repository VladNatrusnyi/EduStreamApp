import React, { useRef, useState } from 'react';
import { Animated, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../helpers/colors';

export const CustomAppInput = ({
                                   value,
                                   onChangeValue,
                                   placeholderText,
                                   icon = null,
                                   onRightIconPress,
                                   paddingVertical = 20,
                                   isPassword = false,
    isError = false
                               }) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelAnim = useRef(new Animated.Value(0)).current;

    const onFocus = () => {
        setIsFocused(true);
        Animated.timing(labelAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const onBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelStyle = {
        position: 'absolute',
        left: 15,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [25, -10],
        }),
        fontSize: 16,
        paddingHorizontal: 5,
        opacity: labelAnim,
        borderRadius: 100
    };

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: isError ? COLORS.lightRed : COLORS.white,
                borderColor: isError ? COLORS.red : COLORS.darkGray,
            }
        ]}>
            <Animated.Text
                style={[
                    labelStyle,
                    {
                        color: isError ? COLORS.white : COLORS.darkGray,
                        backgroundColor: isError ? COLORS.red : COLORS.white,
                        borderRadius: 100
                    }
                ]}>
                {placeholderText}
            </Animated.Text>
            <TextInput
                placeholderTextColor={COLORS.darkGray}
                style={[
                    styles.input,
                    isFocused && { paddingTop: 25 },
                    {paddingVertical: paddingVertical,}
                ]}
                placeholder={isFocused ? '' : placeholderText}
                value={value}
                autoCapitalize={'none'}
                onChangeText={onChangeValue}
                secureTextEntry={isPassword}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {
                icon &&
                <TouchableOpacity onPress={onRightIconPress}>
                    {icon}
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 2,
        paddingHorizontal: 15,
        marginBottom: 20,
        position: 'relative',
        width: '100%',
    },

    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 18,
        color: COLORS.darkGray,
    },
});
