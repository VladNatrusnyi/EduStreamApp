import {ProfilePageWrapper} from "../../wrappers/ProfilePageWrapper";
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {UserLogoImage} from "../../components/UI/UserLogoImage";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../helpers/colors";
import {roles} from "../../mock/mock";
import {Entypo, Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../../config/firebaseConfig";
import {signOut} from "firebase/auth";
import {USER_LOGOUT_FROM_SYSTEM} from "../../store";

export const ProfileInfoPage = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const {loggedUser} = useSelector(state => state.login)

    const showAlert = () => {
        Alert.alert(
            "Warning",
            "Are you sure to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Ok", onPress: () => logout() }
            ],
            { cancelable: false }
        );
    };

    const logout = () => {
        signOut(auth).then( async () => {
            dispatch({type: USER_LOGOUT_FROM_SYSTEM})
            // navigation.navigate('Forum')
        }).catch((error) => {
            console.log('Error logout: ', error)
        });
    };

    return (
        <ActiveAreaWrapper myStyle={{flex: 1}}>
            <ProfilePageWrapper>
                {
                    loggedUser &&
                    <ScrollView>
                        <View style={styles.headPart}>
                            <UserLogoImage size={150} URL={loggedUser.photoURL} />
                            <Text style={styles.userName}>{loggedUser.userName}</Text>
                            <View style={styles.badgeWrapper}>
                                <Text style={styles.badgeText}>
                                    {roles.find(el => el.id === loggedUser.role).roleName}
                                </Text>
                            </View>

                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.descText}>Description</Text>
                                <View style={styles.line}></View>
                                <View>
                                    {
                                        loggedUser.description
                                            ? <Text style={styles.btnText}>{loggedUser.description}</Text>
                                            : <TouchableOpacity
                                                style={styles.addButton}
                                                onPress={() => navigation.navigate('ProfileSettingsPage')}
                                            >
                                                <Entypo name="plus" size={24} color={COLORS.blue} />
                                                <Text style={styles.btnText}>add description</Text>
                                            </TouchableOpacity>
                                    }

                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.logoutBtnWrapper}
                                onPress={showAlert}
                            >
                                <Feather name="log-out" size={24} color={COLORS.darkGray} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
            </ProfilePageWrapper>
        </ActiveAreaWrapper>
    )
}

const styles = StyleSheet.create({
    headPart: {
        alignItems: 'center',
        gap: 10,
        position: 'relative'
    },
    userName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.red
    },
    badgeWrapper: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLORS.darkGray
    },
    badgeText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.darkGray
    },

    descriptionWrapper: {
        width: '100%',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.blue,
        marginTop: 10
    },
    descText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.blue,
        marginBottom: 5
    },
    line: {
        borderBottomWidth: 1,
        borderColor: COLORS.blue,
        marginBottom: 10
    },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        justifyContent: 'center'
    },
    btnText: {
        color: COLORS.blue,
    },

    logoutBtnWrapper: {
        position: 'absolute',
        right: 0,
        padding: 15,
        backgroundColor: COLORS.lightRed,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

