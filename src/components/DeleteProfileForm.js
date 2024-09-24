import {View, Text, StyleSheet} from "react-native";
import {CustomAppInput} from "./UI/CustomAppInput";
import {FontAwesome} from "@expo/vector-icons";
import {COLORS} from "../helpers/colors";
import {setPassword, setShowPassword} from "../store/loginSlice";
import {CustomAppButton} from "./UI/CustomAppButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useMemo, useState} from "react";
import {auth, db} from "../config/firebaseConfig";
import {deleteUser, getAuth, signOut, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {equalTo, get, getDatabase, orderByChild, query, ref, remove, update} from "firebase/database";
import { getStorage, ref as storeRef, deleteObject } from "firebase/storage";
import {USER_LOGOUT_FROM_SYSTEM} from "../store";
import {PulseLoader} from "./PulsePreloader";
import {ErrorTextBlock} from "./UI/ErrorTextBlock";

export const DeleteProfileForm = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const {loggedUser} = useSelector(state => state.login)

    const {
        password,
        showPassword
    } = useSelector(state => state.login)

    const isButtonDisabled = useMemo(() => {
        return password.trim() && password.length >= 6
    }, [password])

    const deleteAccountFunc = async () => {
        setIsLoading(true)
        try {
            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(user.email, password);

            await reauthenticateWithCredential(user, credential);

            await deleteUser(user);

            const userRef = ref(db, `users/${loggedUser.id}`);
            await remove(userRef);


            if (loggedUser.photoURL) {
                const storage = getStorage();
                const desertRef = storeRef(storage, loggedUser.uid);
                await deleteObject(desertRef);
            }

            const coursesRef = ref(db, 'courses');
            const coursesToDeleteRef = query(coursesRef, orderByChild('creatorId'), equalTo(loggedUser.uid));

            const snapshot = await get(coursesToDeleteRef);

            if (snapshot.val()) {
                for (const [childSnapshotKey, childSnapshot] of Object.entries(snapshot.val())) {
                    await remove(ref(db, `courses/${childSnapshotKey}`));
                }
            }

            setIsLoading(false);

            dispatch({type: USER_LOGOUT_FROM_SYSTEM})

        } catch (error) {
            setError(`Error deleting account: ${error.message}`);
            setIsLoading(false);
        }
    };

    return (
        <View>
            <Text style={styles.deleteTitle}>Deleting a profile</Text>
            <Text style={styles.deleteSubtitle}>Warning: Deleting a user will permanently remove all information associated with that user.</Text>
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
                text={'Delete'}
                additionalStyle={{}}
                disabled={!isButtonDisabled}
                onPress={() => deleteAccountFunc()}
            />

            <PulseLoader isAnimating={isLoading}/>
            <ErrorTextBlock text={error} />
        </View>
    )
}

const styles = StyleSheet.create({
    deleteTitle: {
        color: COLORS.darkGray,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
    deleteSubtitle: {
        color: COLORS.darkGray,
        marginBottom: 15,
        textAlign: 'center',
    }
})