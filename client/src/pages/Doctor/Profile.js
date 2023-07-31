import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';

import Layout from '../../components/Layout'
import moment from 'moment'

function Profile() {
    const { user } = useSelector(state => state.user);
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const ui = user !== null ? user._id : "";
    const onFinish = async (values) => {
        try {

            const response = await axios.post('/api/doctor/update-doctor-profile', { ...values, userId: user._id, timings: [moment(values.timings[0].$d).format("HH:mm"), moment(values.timings[1].$d).format("HH:mm")] }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);

                navigate("/");


            } else {
                toast.error(response.data.message);

            }
        } catch (error) {

            toast.error("Something went wrong");

        }
    }
    const getDoctorData = async () => {
        try {
            const response = await axios.post(
                "/api/doctor/get-doctor-info-by-user-id", { userId: params.userId },
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
    useEffect(() => {

        getDoctorData();



    }, [])

    return (
        <Layout>
            <h1 className='page-title'> Doctor Profile</h1>
            <hr />
            {doctor !== null && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
        </Layout>
    )
}

export default Profile