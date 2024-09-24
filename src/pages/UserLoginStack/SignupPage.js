import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {PulseLoader} from "../../components/PulsePreloader";
import {CustomAppInput} from "../../components/UI/CustomAppInput";
import {FontAwesome, FontAwesome6, Fontisto} from "@expo/vector-icons";
import {COLORS} from "../../helpers/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    clearAllFields,
    setEmail,
    setError,
    setIsLoading,
    setLoggedUser,
    setName,
    setPassword, setRole,
    setShowPassword
} from "../../store/loginSlice";
import {CustomAppButton} from "../../components/UI/CustomAppButton";
import {ErrorTextBlock} from "../../components/UI/ErrorTextBlock";
import {useNavigation} from "@react-navigation/native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import {auth} from "../../config/firebaseConfig";
import {useMemo} from "react";
import {RoleSwitch} from "../../components/UI/RoleSwitch";


export const SignupPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {
        email,
        name,
        password,
        showPassword,
        isLoading,
        error,
        role
    } = useSelector(state => state.login)


    const isButtonDisabled = useMemo(() => {
        return name.trim() && email.trim() && password.trim() && (password.trim().length >= 6)
    }, [name, email, password])

    const signupFunc = () => {
        dispatch(setIsLoading(true))
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                const db = getDatabase();
                const usersRef = ref(db, 'users');

                const newUserRef = push(usersRef);
                const newUserId = newUserRef.key;

                const userData = {
                    userName: name,
                    email: user.email,
                    uid: user.uid,
                    id: newUserId,
                    photoURL: '',
                    role: role,
                    description: '',
                    coursesId: JSON.stringify([])
                };

                set(newUserRef, userData)
                    .then(async () => {
                        dispatch(setLoggedUser(userData))

                        dispatch(setIsLoading(false))
                        dispatch(clearAllFields()) //clear all fields
                    })
                    .catch((error) => {
                        dispatch(setIsLoading(false))
                        dispatch(setError(error.message))
                        console.log('Error adding new user to db:', error.message);
                    });

            })
            .catch((error) => {
                dispatch(setIsLoading(false))
                dispatch(setError(error.message))
                console.log('ERROR Registered user in auth', error.message)
            });
    };

    const getUserRole = (roleId) => {
        dispatch(setRole(roleId))
    }


    return (
        <ActiveAreaWrapper
            isPageWithKeyboard={true}
            myStyle={{
                flex: 1,
                justifyContent: 'center'
            }}
        >
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Sign Up</Text>
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
                    placeholderText={"Name"}
                    icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                    onChangeValue={(text) => dispatch(setName(text))}
                    onRightIconPress={() => dispatch(setName(''))}
                    value={name}
                    isError={!!error}
                />

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

                <RoleSwitch role={role} onTabChange={getUserRole}/>

                <CustomAppButton
                    text={'Sign Up'}
                    additionalStyle={{}}
                    disabled={!isButtonDisabled}
                    onPress={signupFunc}
                />
            </View>

            <TouchableOpacity style={styles.transferLinkWrapper} onPress={() => navigation.navigate('login')}>
                <FontAwesome name="arrow-left" size={22} color={COLORS.darkGray} />
                <Text style={styles.transferLink}>{'Log In'}</Text>
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
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 25,
    },

    transferLink: {
        color: COLORS.darkGray,
        fontSize: 18,
    },
})
