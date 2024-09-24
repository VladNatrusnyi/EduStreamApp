import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {COLORS} from "../../helpers/colors";

export const RoleSwitch = ({role, onTabChange }) => {

    const handleTabChange = (tabId) => {
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, role === 1 && styles.activeTab]}
                onPress={() => handleTabChange(1)}
            >
                <Text style={styles.tabText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, role === 2 && styles.activeTab]}
                onPress={() => handleTabChange(2)}
            >
                <Text style={styles.tabText}>Teacher</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 15
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: COLORS.darkGray,
        marginHorizontal: 4,
        borderRadius: 15,
    },
    activeTab: {
        backgroundColor: COLORS.red,
    },
    tabText: {
        color: 'white',
        fontSize: 18,
    },
});

