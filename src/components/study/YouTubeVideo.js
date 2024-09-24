import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {PulseLoader} from "../PulsePreloader";

export const YouTubeVideo = ({ videoId }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.loadingText}>
                <PulseLoader isAnimating={isLoading}/>
            </View>

            <YoutubePlayer
                height={250}
                videoId={videoId}
                onReady={() => setIsLoading(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    loadingText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        fontSize: 16,
        fontWeight: 'bold',
    },
});
