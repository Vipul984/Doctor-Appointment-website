import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout'
function Doctorlist() {
    const [doctors, setDoctors] = useState([]);
    const getDoctorData = async () => {
        try {
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                setDoctors(response.data.data)
            }

        } catch (error) {

        }
    }

    const changeDoctorStatus = async (record, status) => {
        try {
            const response = await axios.post('/api/admin/change-doctor-account-status', { doctorId: record._id, userId: record.userId, status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorData();
            }

        } catch (error) {
            toast.error("Error changing the doctor status");

        }
    }
    useEffect(() => {
        getDoctorData();
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => <span className='normal-text'>{record.firstName} {record.lastName}</span>
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => (
                moment(record.createdAt).format("DD-MM-YYYY")
            )
        },
        {
            title: 'status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex' >
                    {record.status === "pending" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'approved')} >Approv</h1>}
                    {record.status === "approved" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'Blocked')}>Block</h1>}
                </div>
            )
        }

    ]
    return (
        <Layout>
            <div className='page-title'>Doctorlist</div>
            <hr />
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctorlist