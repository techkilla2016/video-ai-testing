import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiArrowFromLeft } from 'react-icons/bi';
import ReactVideoRecorder from 'react-video-recorder';
import Loader from './loader';

const VideoSection = () => {
    const [videoBase64, setVideoBase64] = useState(``);
    const [isLoad, setIsLoad] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    useEffect(() => {
        if (videoBase64) {
            const videoElement = document.getElementById('videoPreview');
            if (videoElement) {
                videoElement.src = videoBase64;
            }
        }
    }, [videoBase64]);

    const handleRecordingComplete = (videoBlob) => {
        setVideoBase64(videoBlob);
    };

    const [videoAI, setVideoAI] = useState('')
    const handleSubmit = async () => {
        setIsLoad(true)
        const formData = new FormData()
        formData.append('file', videoBase64)
        try {
            const res = await axios.post('https://5f28-103-17-110-127.ngrok.io/video', formData)
            console.log(res)
            setIsLoad(false)
            // const blob = new Blob([res?.data], { type: 'video/mp4' });
            // const url = URL.createObjectURL(blob);

            // const newObjectUrl = URL.createObjectURL(res?.data);
            // console.log(newObjectUrl)
            const a = document.createElement('a');
            a.style.display = 'none';

            // Assuming res.data is the binary data of the video
            const blob = new Blob([res.data], { type: 'video/mp4' });
            const url = window.URL.createObjectURL(blob);

            a.href = url;
            a.download = 'video.mp4';

            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            // const data = await res.data.arrayBuffer();
            // setVideoUrl(data)
        } catch (error) {
            setIsLoad(false)
            console.log(error)
        }
    };

    return (
        <>
            {
                isLoad && <Loader />
            }
            <Row className='sp-section align-items-center justify-content-center'>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12} className='d-flex justify-content-center'>
                    <div className="videoReander mt-5">
                        <ReactVideoRecorder onRecordingComplete={handleRecordingComplete} />
                    </div>
                </Col>
                <div className="d-flex justify-content-center sp-submit align-items-center">
                    <button className='btn swap-btn' onClick={handleSubmit}>
                        <span className='px-2'>Submit</span>
                        <BiArrowFromLeft />
                    </button>
                </div>
                <div id="videoCOt">
                    {
                        console.log(videoUrl)
                    }
                    <video width="320" height="240" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </Row>
        </>
    );
}

export default VideoSection;
