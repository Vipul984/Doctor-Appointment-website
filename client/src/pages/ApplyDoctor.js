import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import axios from 'axios';
import moment from 'moment';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';
import Layout from '../components/Layout'

function ApplyDoctor() {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {

            const response = await axios.post('/api/user/apply-doctor-account', { ...values, userId: user._id, timings: [moment(values.timings[0].$d).format("HH:mm"), moment(values.timings[1].$d).format("HH:mm")] }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            // dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);

                navigate("/");


            } else {
                toast.error(response.data.message);

            }
        } catch (error) {
            // dispatch(hideLoading());
            toast.error("Something went wrong");

        }
    }
    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <hr />

            <DoctorForm onFinish={onFinish} />
        </Layout>
    )
}

export default ApplyDoctor