import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {useRoute} from "@react-navigation/native";
import {YouTubeVideo} from "../../components/study/YouTubeVideo";
import {extractVideoId} from "../../helpers/extractVideoId";
import {COLORS} from "../../helpers/colors";
import {CustomAppButton} from "../../components/UI/CustomAppButton";
import {QuizModal} from "../../components/study/QuizModal";
import {useState} from "react";

export const StudyLessonPage = () => {

    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)

    const {lessonData} = useRoute().params
    return (
        <>
            <QuizModal
                onClose={() => setIsQuizModalOpen(false)}
                isVisible={isQuizModalOpen}
                quiz={lessonData.questions}
            />

            <ActiveAreaWrapper
                myStyle={styles.container}
            >
                {
                    lessonData &&
                    <ScrollView>
                        <Text style={styles.lessonTitle}>{lessonData.title}</Text>
                        <YouTubeVideo videoId={extractVideoId(lessonData.videoLink)} />

                        <Text style={styles.divider}>Information</Text>
                        <Text style={styles.info}>{lessonData.levelDescription}</Text>

                        <CustomAppButton
                            text={'Take quiz'}
                            additionalStyle={{
                                marginVertical: 10
                            }}
                            onPress={() => setIsQuizModalOpen(true)}
                        />

                    </ScrollView>
                }
            </ActiveAreaWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    lessonTitle: {
        marginBottom: 10,
        fontSize: 22,
        color: COLORS.darkGray,
        fontWeight: 'bold'
    },
    divider: {
        fontSize: 18,
        color: COLORS.darkGray,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        fontSize: 16,
        color: COLORS.darkGray,
        marginBottom: 10
    }
})