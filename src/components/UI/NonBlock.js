import {StyleSheet, Text, View} from "react-native";
import {CustomAppButton} from "./CustomAppButton";
import {COLORS} from "../../helpers/colors";

export const NonBlock = ({text, btnText, onPress}) => {
    return (
        <View style={styles.nonBlock}>
            <Text style={styles.nonText}>{text}</Text>
            <CustomAppButton
                text={btnText}
                additionalStyle={{}}
                bgColor={'transparent'}
                textColor={COLORS.red}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    nonBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nonText: {
        fontSize: 18,
        marginBottom: 10
    }
})