import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import moment from "moment";

function Userlist() {
    const [users, setUsers] = useState([]);
    const getUserData = async () => {
        try {
            const response = await axios.get('/api/admin/get-all-users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if (response.data.success) {
                setUsers(response.data.data)
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        getUserData();
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => (
                moment(record.createdAt).format("DD-MM-YYYY")
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex' >
                    <h1 className='anchor' >Block</h1>
                </div>
            )
        }

    ]

    return (
        <Layout>
            <div className='page-title'>Userlist</div>
            <hr />
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Userlist