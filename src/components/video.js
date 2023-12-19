import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiArrowFromLeft } from 'react-icons/bi';
import ReactVideoRecorder from 'react-video-recorder';
import Loader from './loader';
import videoData from './data';
import VideoDecoderComponent from './test';
import VideoResult from './videoResult';

const VideoSection = ({ state }) => {
    const [videoBase64, setVideoBase64] = useState(``);
    const [isLoad, setIsLoad] = useState(false)
    const [videoUrl, setVideoUrl] = useState(``)
    const [modalShow, setModalShow] = useState(false);

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
        const reader = new FileReader();
        reader.onload = (event) => {
            setVideoUrl(event.target.result)
            console.log(event.target.result)
        };
        reader.readAsDataURL(videoBlob);
    };

    const handleSubmit = async () => {
        setIsLoad(true)
        const formData = new FormData()
        formData.append('file', videoBase64)
        formData.append('number', state.id)
        try {
            const res = await axios.post('https://0ca3-103-17-110-127.ngrok-free.app/video', formData)
            setVideoUrl(res.data.data)
            setModalShow(true)
            // setVideoUrl("data:video/webm;" + res.data.data)
            setIsLoad(false)
        } catch (error) {
            setIsLoad(false)
            console.log(error)
        }
    };

    const isValidBase64 = (str) => {
        try {
            atob(str);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDownload = async () => {
        console.log(videoBase64,
            videoUrl)
        try {
            if (isValidBase64(videoUrl.split('webm;')[1])) {
                const decodedVideo = atob(videoUrl);
                const blob = new Blob([decodedVideo], { type: 'video/mp4' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'video.mp4';
                downloadLink.click();
            } else {
                console.error('Invalid base64 string');
            }
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <>
            {
                isLoad && <Loader />
            }
            <Row className='sp-section align-items-center justify-content-center'>
                <h5 className='text-center mt-2'>record 5 sec video</h5>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12} className='d-flex justify-content-center'>
                    <div className="videoReander">
                        <ReactVideoRecorder timeLimit={5000} onRecordingComplete={handleRecordingComplete} />
                    </div>
                </Col>
                {
                    <VideoResult
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        baseVideoData={videoUrl}
                    />
                }
                {
                    <div className="d-flex justify-content-center sp-submit align-items-center">
                        {
                            videoBase64 ? <button className='btn swap-btn' onClick={handleSubmit}>
                                <span className='px-2'>Submit</span>
                                <BiArrowFromLeft />
                            </button> : <button className='btn swap-btn disable'>
                                <span className='px-2'>Submit</span>
                                <BiArrowFromLeft />
                            </button>
                        }
                    </div>
                }
            </Row>
        </>
    );
}
export default VideoSection;
