import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout'
const moment = require('moment');

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const getAppointmentsData = async () => {
        try {
            const response = await axios.get('/api/user/get-appointments-by-user-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                setAppointments(response.data.data)
            }

        } catch (error) {

        }
    }


    useEffect(() => {
        getAppointmentsData();
    }, [])

    const columns = [
        {
            title: "Id",
            dataIndex: "_id"

        },

        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => <span className='normal-text'>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</span>
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => <span className='normal-text'>{record.doctorInfo.phoneNumber} </span>
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => <span className='normal-text'>{moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")} </span>
        },


        {
            title: "Status",
            dataIndex: "status",
        }

    ]
    return (
        <Layout>
            <div className='page-title'>Doctorlist</div>
            <hr />
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appointments
