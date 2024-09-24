import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {AntDesign, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {COLORS} from "../helpers/colors";
import {clearAllFields, setError, setIsLoading, setLoggedUser, setName} from "../store/loginSlice";
import {CustomAppInput} from "./UI/CustomAppInput";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useMemo, useState} from "react";
import {CustomTextArea} from "./UI/CustomTextArea";
import {CustomAppButton} from "./UI/CustomAppButton";
import * as ImagePicker from "expo-image-picker";
import {UserLogoImage} from "./UI/UserLogoImage";
import {ErrorTextBlock} from "./UI/ErrorTextBlock";
import {PulseLoader} from "./PulsePreloader";
import {ref, set} from "firebase/database";
import {db} from "../config/firebaseConfig";
import {convertLink} from "../helpers/convertLink";

export const EditProfileForm = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {
        loggedUser,
        error,
        isLoading
    } = useSelector(state => state.login)

    const [photo, setPhoto] = useState(loggedUser ? loggedUser.photoURL : null)

    const [name, setName] = useState(loggedUser ? loggedUser.userName : '');

    const [description, setDescription] = useState(loggedUser ? loggedUser.description : '');

    const uploadPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
        }
    };

    const isBtnDisabled = useMemo(() => {
        return name.trim()
    }, [name])


    const saveChanges =  async () => {
        dispatch(setIsLoading(true))
        if (photo && photo !== loggedUser.photoURL) {
            convertLink(photo, loggedUser.uid)
                .then((imageUrl) => {
                    const userRef = ref(db, `users/${loggedUser.id}`);
                    const updatedData = {
                        ...loggedUser,
                        userName: name,
                        photoURL: imageUrl,
                        description: description
                    }
                    set(userRef, updatedData)
                        .then(() => {
                            dispatch(setLoggedUser(updatedData))
                            console.log(`User data successfully updated`);
                            dispatch(setIsLoading(false))
                            dispatch(clearAllFields())
                            navigation.navigate('ProfileInfoPage')
                        })
                        .catch((error) => {
                            console.error(`Error updating user data`, error);
                            dispatch(setError(error.message))
                            dispatch(setIsLoading(false))
                        });

                })
                .catch((error) => {
                    dispatch(setIsLoading(false))
                    dispatch(setError(error.message))
                    console.error("Error getting url", error);
                });
        } else {
            const userRef = ref(db, `users/${loggedUser.id}`);
            const updatedData = {
                ...loggedUser,
                userName: name,
                description: description
            }
            set(userRef, updatedData)
                .then(() => {
                    dispatch(setLoggedUser(updatedData))
                    dispatch(setIsLoading(false))
                    console.log(`User data successfully updated`);
                    dispatch(clearAllFields())
                    navigation.navigate('ProfileInfoPage')
                })
                .catch((error) => {
                    dispatch(setIsLoading(false))
                    dispatch(setError(error.message))
                    console.error(`Error updating user data`, error);
                });
        }
    }


    return (
        <View>

            <View style={[styles.section, {marginBottom: 15}]}>
                <Text style={styles.subTitle}>Сhange image</Text>

                <View style={styles.editImageWrapper}>
                    <UserLogoImage URL={photo} />
                    <TouchableOpacity onPress={uploadPhoto} style={styles.editImageButton}>
                        <FontAwesome5 name="edit" size={24} color={COLORS.darkGray} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.section}>
                <Text style={styles.subTitle}>Сhange name</Text>
                <CustomAppInput
                    placeholderText={"Name"}
                    icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                    onChangeValue={(text) => setName(text)}
                    onRightIconPress={() => setName('')}
                    value={name}
                    isError={!!error}
                />
            </View>

            <View style={[styles.section, {marginBottom: 15}]}>
                <Text style={styles.subTitle}>Сhange description</Text>
                <CustomTextArea
                    value={description}
                    onChangeValue={(value) => setDescription(value)}
                    maxHeight={300}
                    placeholder={'Description'}
                />
            </View>

            <ErrorTextBlock text={error} />

            <PulseLoader isAnimating={isLoading}/>

            <CustomAppButton
                text={'Save changes'}
                additionalStyle={{}}
                disabled={!isBtnDisabled}
                onPress={saveChanges}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        marginBottom: 5,
        color: COLORS.darkGray,
        fontSize: 16
    },
    section: {},

    editImageWrapper: {
        alignItems: 'center',
        position: "relative"
    },

    editImageButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 15
    },
})