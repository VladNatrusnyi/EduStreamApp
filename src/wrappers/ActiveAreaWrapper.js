import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View, StyleSheet} from "react-native";

export const ActiveAreaWrapper = ({children, bgColor = '#F4F6FE',  isPageWithKeyboard = false, myStyle = {}}) => {
    return (
        <SafeAreaView style={[
            styles.container,
            {backgroundColor: bgColor}
            ]}>
            {
                isPageWithKeyboard
                    ? <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{flex: 1}}
                    >
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <View style={[{paddingHorizontal: 20}, myStyle]}>
                                {children}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    : <View style={[{paddingHorizontal: 20}, myStyle]}>
                        {children}
                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    scrollContainer: {
        flexGrow: 1,
    },
})