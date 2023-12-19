import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header'
import VideoSection from '../../components/video'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loader from '../../components/loader';
const VideoCapture = () => {
    const navigate = useLocation()
    const [isLoader, setIsLoader] = useState(true)
    const [cookies] = useCookies(['auth'])
    const router = useNavigate()
    useEffect(() => {
        if (!cookies?.auth) {
            router('/login')
        } else if (!navigate?.state) {
            router('/template')
        } else {
            setIsLoader(false)
        }
    }, [cookies, navigate, router])
    return (
        <div className='alai-main'>
            {
                isLoader ? <Loader /> : <></>
            }
            <div className="alai-container home">
                <Header />
                <Container>
                    <VideoSection state={navigate.state} />
                </Container>
            </div>
        </div>
    );
};

export default VideoCapture;
