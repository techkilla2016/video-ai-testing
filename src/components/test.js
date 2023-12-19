import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoDecoderComponent = ({ base64Video }) => {
    const [videoUrl, setVideoUrl] = useState(null);

    const decodeBase64ToVideo = () => {
        try {
            const decodedVideo = atob(base64Video);
            const videoBlob = new Blob([decodedVideo], { type: 'video/mp4' });
            const videoUrl = URL.createObjectURL(videoBlob);
            console.log(videoUrl)
            setVideoUrl(videoUrl);
        } catch (error) {
            console.error('Error decoding base64 to video:', error);
        }
    };

    // Call decodeBase64ToVideo when the component mounts
    React.useEffect(() => {
        decodeBase64ToVideo();
    }, [base64Video]);

    if (!videoUrl) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ReactPlayer url={videoUrl} controls onError={(e) => console.error('Video error:', e)} />
        </div>
    );
};

export default VideoDecoderComponent;
