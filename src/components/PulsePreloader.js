import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import {COLORS} from "../helpers/colors";

export const PulseLoader = ({ isAnimating }) => {
    const pulseAnims = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
    ];

    const animationLoops = useRef(pulseAnims.map(() => null));

    const startPulsing = (anim, index) => {
        animationLoops.current[index] = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1.2,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        );
        animationLoops.current[index].start();
    };

    const stopPulsing = (index) => {
        if (animationLoops.current[index]) {
            animationLoops.current[index].stop();
            animationLoops.current[index] = null;
        }
    };

    useEffect(() => {
        if (isAnimating) {
            pulseAnims.forEach((anim, index) => {
                // Додаємо затримку перед початком кожної анімації
                setTimeout(() => startPulsing(anim, index), index * 400);
            });
        } else {
            pulseAnims.forEach((_, index) => {
                stopPulsing(index);
            });
        }

        // Очищаємо setTimeout, коли компонент буде розмонтовано
        return () => {
            pulseAnims.forEach((_, index) => {
                clearTimeout(index);
                stopPulsing(index);
            });
        };
    }, [isAnimating]);

    const circleStyle = (anim) => ({
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.red,
        marginHorizontal: 5,
        opacity: anim.interpolate({
            inputRange: [1, 1.2],
            outputRange: [1, 0.7],
        }),
        transform: [{ scale: anim }],
    });

    if (!isAnimating) {
        return null;
    }

    return (
        <View style={styles.container}>
            {pulseAnims.map((anim, index) => (
                <Animated.View key={index} style={circleStyle(anim)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
