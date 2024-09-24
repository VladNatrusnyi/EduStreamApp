import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {Text, TouchableOpacity} from 'react-native'
import {Entypo} from "@expo/vector-icons";
import {COLORS} from "../../helpers/colors";
import {useNavigation} from "@react-navigation/native";

export const YouNotLoggedPage = () => {

    const navigation = useNavigation()

    return (
        <ActiveAreaWrapper myStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text
                style={{
                    fontSize: 16,
                    color: COLORS.red,
                    marginBottom: 20
                }}
            >You must log in to take or create courses.</Text>
            <TouchableOpacity
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}
                onPress={() => navigation.navigate('UserProfileStack')}

            >
                <Entypo name="login" size={24} color={COLORS.blue} />
                <Text
                    style={{
                        fontSize: 16,
                        color: COLORS.blue,
                    }}
                >Go to the login page</Text>
            </TouchableOpacity>
        </ActiveAreaWrapper>
    )
}