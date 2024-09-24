import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {PulseLoader} from "../../components/PulsePreloader";
import {CustomAppInput} from "../../components/UI/CustomAppInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useMemo, useState} from "react";
import {auth} from "../../config/firebaseConfig";
import {FontAwesome, FontAwesome6, Fontisto} from "@expo/vector-icons";
import {COLORS} from "../../helpers/colors";
import {useDispatch, useSelector} from "react-redux";
import {clearAllFields, setEmail, setError, setIsLoading, setPassword, setShowPassword} from "../../store/loginSlice";
import {CustomAppButton} from "../../components/UI/CustomAppButton";
import {ErrorTextBlock} from "../../components/UI/ErrorTextBlock";
import {useNavigation} from "@react-navigation/native";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {
        email,
        password,
        showPassword,
        isLoading,
        error
    } = useSelector(state => state.login)

    const isButtonDisabled = useMemo(() => {
        return email.trim() && password.trim() && (password.trim().length >= 6)
    }, [email, password])

    const loginFunc = () => {
        dispatch(setIsLoading(true))
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                dispatch(setIsLoading(false))
                dispatch(clearAllFields())
            })
            .catch((error) => {
                dispatch(setIsLoading(false))
                dispatch(setError(error.message))
            });
    };


    return (
        <ActiveAreaWrapper
            isPageWithKeyboard={true}
            myStyle={{
                flex: 1,
                justifyContent: 'center'
            }}
        >
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Log In</Text>
                <PulseLoader isAnimating={isLoading}/>
                <TouchableOpacity
                    onPress={() => dispatch(clearAllFields())}
                >
                    <FontAwesome6 name="eraser" size={30} color={COLORS.darkGray} />
                </TouchableOpacity>
            </View>

            <ErrorTextBlock text={error} />
            <View>
                <CustomAppInput
                    placeholderText={"Email"}
                    icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                    onChangeValue={(text) => dispatch(setEmail(text))}
                    onRightIconPress={() => dispatch(setEmail(''))}
                    value={email}
                    isError={!!error}
                />


                <CustomAppInput
                    placeholderText={"Password"}
                    icon={<FontAwesome name="eye" size={24} color={COLORS.darkGray} />}
                    onChangeValue={(text) => dispatch(setPassword(text))}
                    onRightIconPress={() => dispatch(setShowPassword(!showPassword))}
                    value={password}
                    isError={!!error}
                    isPassword={!showPassword}
                />

                <CustomAppButton
                    text={'Log in'}
                    additionalStyle={{}}
                    disabled={!isButtonDisabled}
                    onPress={() => loginFunc()}
                />
            </View>

            <TouchableOpacity style={styles.transferLinkWrapper} onPress={() => navigation.navigate('signup')}>
                <Text style={styles.transferLink}>{'Sign Up'}</Text>
                <FontAwesome name="arrow-right" size={22} color={COLORS.darkGray} />
            </TouchableOpacity>

        </ActiveAreaWrapper>
    )
}

const styles = StyleSheet.create({
    titleWrapper: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.red,
    },

    transferLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 25,
    },

    transferLink: {
        color: COLORS.darkGray,
        fontSize: 18,
    },
})
