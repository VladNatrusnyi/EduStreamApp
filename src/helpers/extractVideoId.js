
export const extractVideoId = (youtubeUrl) => {
    const patterns = [
        /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?.*v=([^&]+)/,
        /(?:https?:\/\/)?youtu\.be\/([^?]+)/
    ];

    for (let pattern of patterns) {
        const match = youtubeUrl.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}


