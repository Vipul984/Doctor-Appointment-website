
import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';

import Layout from '../components/Layout'
import moment from 'moment'

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const getDoctorData = async () => {
        try {
            const response = await axios.post(
                "/api/doctor/get-doctor-info-by-id", { doctorId: params.doctorId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                setDoctor(response.data.data);


            }
        } catch (error) {
            console.log(error);
        }
    }
    const bookNow = async () => {
        setIsAvailable(false);
        try {
            const response = await axios.post(
                "/api/user/book-appointment", { doctorId: params.doctorId, userId: user._id, doctorInfo: doctor, userInfo: user, date: date, time: time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);


            }
        } catch (error) {
            console.log(error);
            toast.error('Error booking appointment');
        }


    }

    const checkAvaliabilty = async () => {
        try {
            const response = await axios.post(
                "/api/user/check-booking-availability", { doctorId: params.doctorId, date: date, time: time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);


            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error booking appointment');
        }


    }
    useEffect(() => {

        getDoctorData();



    }, [])
    return (
        <Layout>
            {
                doctor && (
                    <div>
                        <h1 className='page-title'>{doctor.firstName} {doctor.lastName}</h1>
                        <hr />
                        <Row gutter={20} className="mt-5" align="middle">

                            <Col pan={8} sm={24} xs={24} lg={8} >

                                <img src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                                    width="100%"
                                    height='400'
                                />

                            </Col>

                            <Col span={8} sm={24} xs={24} lg={8} >
                                <h1 className='normal-text' ><b>Timings: </b> {doctor.timings[0]} - {doctor.timings[1]} </h1>
                                <p ><b>Phone Number : </b>{doctor.phoneNumber} </p>
                                <p ><b>Specialization: </b>{doctor.specialization} </p>
                                <p ><b>Fee Per Visit : </b>{doctor.feePerConsultation} </p>

                                <div className='d-flex flex-column pt-2 ' >
                                    <DatePicker format='DD-MM-YYYY' onChange={(value) => { setIsAvailable(false); setDate(moment(value.$d).format('DD-MM-YYYY')) }} />
                                    <TimePicker format="HH:mm" className='mt-3' onChange={(value) => { setIsAvailable(false); setTime(moment(value.$d).format("HH:mm")) }} />
                                    <Button className='primary-button mt-3 full-width-button' onClick={checkAvaliabilty}> Check Availability </Button>

                                    {isAvailable && (<Button className='primary-button mt-3 full-width-button' onClick={bookNow}> Book Now </Button>)}
                                </div>
                            </Col>

                        </Row>
                    </div>

                )


            }

        </Layout>
    )
}

export default BookAppointment