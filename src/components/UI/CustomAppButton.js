import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../../helpers/colors";

export const CustomAppButton = ({
                                    onPress,
                                    text,
                                    disabled = false,
                                    additionalStyle,
                                    bgColor = COLORS.red,
                                    textColor= COLORS.white,
                                    borderColor = COLORS.red
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={{
                ...styles.button,
                ...additionalStyle,
                backgroundColor: disabled ? COLORS.darkGray : bgColor,
                borderWidth: 2,
                borderColor: disabled ? COLORS.darkGray : borderColor
        }}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18
    }
})