import {Text, StyleSheet} from 'react-native'
export const ErrorTextBlock = ({text}) => {
    return (
        <>
            {
                text && <Text style={styles.container}>
                    {text}
                </Text>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'red',
        fontSize: 16,
        marginBottom: 15
    },
})