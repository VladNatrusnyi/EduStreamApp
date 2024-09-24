import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {COLORS} from "../../helpers/colors";
import {Entypo} from "@expo/vector-icons";
import {EditProfileForm} from "../EditProfileForm";
import {DeleteProfileForm} from "../DeleteProfileForm";

const Accordion = ({ title, children, isOpen, setIsOpen }) => {
    const handlePress = () => {
        if (isOpen === title) {
            setIsOpen('');
        } else {
            setIsOpen(title);
        }
    };

    return (
        <View style={{
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: COLORS.lightRed,
            borderColor: COLORS.red,
            padding: 20
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                onPress={handlePress}
            >
                <Text style={styles.title}>{title}</Text>
                <Entypo name={isOpen === title ? 'chevron-up' : 'chevron-down'} size={26} color={COLORS.darkGray} />
            </TouchableOpacity>
            {isOpen === title && <View style={styles.content}>{children}</View>}
        </View>
    );
};

export const SettingsAccordion = () => {
    const [openTab, setOpenTab] = useState('Edit profile information');

    return (
        <View style={styles.container}>
            <Accordion
                title="Edit profile information"
                isOpen={openTab}
                setIsOpen={setOpenTab}
            >
                <EditProfileForm />
            </Accordion>
            <Accordion
                title="Delete user account"
                isOpen={openTab}
                setIsOpen={setOpenTab}
            >
                <DeleteProfileForm/>
            </Accordion>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 20,
        color: COLORS.darkGray
    },
    content: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 10
    },
});
