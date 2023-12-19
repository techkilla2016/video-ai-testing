import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import DemoData from '../../data/templates/desktop'
import { MdStart } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader'
import { useCookies } from 'react-cookie'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
const Template = () => {
    const [show, setShow] = React.useState(false);
    const [selected, setSelected] = useState(-1)
    const [isLoader, setIsLoader] = useState(true)
    const [cookies] = useCookies(['auth'])
    const [data, setData] = useState([])
    const router = useNavigate()
    const [curGender, setCurGender] = useState('male')
    useEffect(() => {
        if (!cookies?.auth) {
            router('/login')
        } else {
            setIsLoader(false)
        }
    }, [cookies])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelected(id)
        setShow(true)
    };

    const handleContinue = () => {
        setIsLoader(true)
        router(`/capture`, {
            state: {
                id: selected
            }
        })
    }

    useEffect(() => {
        handleGender('male')
    }, [])

    function handleGender(pyload) {
        setCurGender(pyload)
        const list = DemoData?.filter(item => item.gender === pyload)
        setData(list)
    }

    return (
        <>
            {
                isLoader ? <Loader /> : <></>
            }
            <div className='alai-main'>
                <div className="alai-container">
                    {/* header  */}
                    <Header title="Please Select Your Template" />
                    <Container>
                        <div className='home-temp'>
                            <div className="d-flex justify-content-center">
                                <button className={curGender == 'male' ? 'btn swap-btn-cuccess btn-warning' : 'btn swap-btn btn-warning'} onClick={() => handleGender('male')} >
                                    <span className='px-1'> Male </span>
                                    <span className='px-1'><FaMale /></span>
                                </button>
                                <button className={curGender !== 'male' ? 'btn swap-btn-cuccess btn-warning' : 'btn swap-btn btn-warning'} onClick={() => handleGender('female')}>
                                    <span className='px-1'> Female </span>
                                    <span className='px-1'><FaFemale /></span>
                                </button>
                            </div>
                            <Row className='justify-content-center py-5'>
                                {
                                    data?.map((curItem, keys) => {
                                        return <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12} key={keys}>
                                            <div className='overflow-hidden my-2 pe-col' onClick={() => handleShow(curItem.id)}>
                                                <img src={curItem?.img} className='img-fluid' />
                                            </div>
                                        </Col>
                                    })
                                }
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <h3 className='text-center fw-bold'>Press Continue to Start</h3>
                </Modal.Body>
                <div className="d-flex mb-3 justify-content-center">
                    <button className='btn btn-dark mx-2 ' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn btn-warning mx-2' onClick={handleContinue}>
                        Continue <MdStart />
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Template