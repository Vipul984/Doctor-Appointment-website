import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout'
const moment = require('moment');

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const changeAppointmentStatus = async (record, status) => {
        try {
            const response = await axios.post('/api/doctor/change-appointment-status', { appointmentId: record._id, status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointmentsData();
            }

        } catch (error) {
            toast.error("Error changing the doctor status");

        }
    }
    const getAppointmentsData = async () => {
        try {
            const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                setAppointments(response.data.data)
            }

        } catch (error) {
            console.log(error);

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
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => <span className='normal-text'>{record.userInfo.name}</span>
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex' >
                    {record.status === "pending" && (<div className='d-flex'>
                        <h1 className='anchor px-2' onClick={() => changeAppointmentStatus(record, 'approved')} >Approv</h1>
                        <h1 className='anchor' onClick={() => changeAppointmentStatus(record, 'rejected')}>Reject</h1>
                    </div>)}

                </div>
            )
        }

    ]
    return (
        <Layout>
            <div className='page-title'>Appointments</div>
            <hr />
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments
