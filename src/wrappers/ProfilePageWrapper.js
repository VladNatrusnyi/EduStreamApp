import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../helpers/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
export const ProfilePageWrapper = ({children}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.wrapper}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.burgerWrapper}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialCommunityIcons name="forwardburger" size={28} color={COLORS.red} />
                </TouchableOpacity>
            </View>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    headerWrapper: {
        height: 40,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightRed,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wrapper: {
        flex: 1,
    },

    burgerWrapper: {
        flex: 1,

    },
    titleWrapper: {
        flex: 3,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: 'bold'
    },
    rightBtnWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})
