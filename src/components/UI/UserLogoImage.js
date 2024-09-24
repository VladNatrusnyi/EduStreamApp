import {View, StyleSheet, Image} from "react-native";
import {COLORS} from "../../helpers/colors";

export const UserLogoImage = ({size = 100, URL = ''}) => {
    return (
        <View style={{width: size, height: size}}>
            {
                    <View style={styles.wrapper}>
                        <Image
                            style={styles.image}
                            source={ URL ? {uri: URL} : require('../../../assets/img/personIcon.png')}
                            resizeMode='cover'
                        />
                    </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 100,
        borderWidth: 3,
        borderColor: COLORS.red,
        padding: 5,
        backgroundColor: COLORS.white
    },
    image: {
        borderRadius: 100,
        width: '100%',
        height: '100%',
    },
})