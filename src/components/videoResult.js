import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VideoResult(props) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <video
                        width="100%"
                        height="auto"
                        controls
                        onPlay={handleTogglePlay}
                        onPause={handleTogglePlay}
                    >
                        {/* src={`data:video/mp4;base64,${props?.baseVideoData}`} */}
                        <source src={`data:video/webp;base64,${props?.baseVideoData}`} type="video/webm" />
                        <source src={`data:video/mp4;base64,${props?.baseVideoData}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default VideoResult