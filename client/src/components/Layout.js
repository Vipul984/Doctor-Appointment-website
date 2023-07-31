import { Badge } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../layout.css'
function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    console.log(user);

    const Location = useLocation();
    const navigate = useNavigate();

    const userMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-line"
        },

        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-line'
        },

        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'ri-hospital-line'
        },





    ];
    let ui = user !== null ? user._id : "";
    const doctorMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-line"
        },

        {
            name: 'Appointments',
            path: '/doctor/appointment',
            icon: 'ri-file-list-line'
        },




        {
            name: 'Profile',
            path: `/doctor/profile/${ui}`,
            icon: "ri-user-line"
        },


    ];
    const adminMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-line"
        },

        {
            name: 'Users',
            path: '/admin/userslist',
            icon: 'ri-user-line'
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: 'ri-user-star-line'
        },


        {
            name: 'Profile',
            path: '/profile',
            icon: "ri-user-line"
        },


    ];
    let menuToBeRendered = userMenu;
    if (user !== null && user.isAdmin) {
        menuToBeRendered = adminMenu;
    } if (user !== null && user.isDoctor) {
        menuToBeRendered = doctorMenu;
    }
    let role = "User";
    if (user !== null && user.isAdmin) {
        role = "Admin";
    }
    if (user !== null && user.isDoctor) {
        role = "Doctor";
    }
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1 className='logo'>VK</h1>
                        <h1 className='role'>{role}</h1>
                    </div >

                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = Location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} >
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}

                            </div>


                        })}
                        <div className={`d-flex menu-item`} onClick={() => { localStorage.clear(); navigate('/login') }}>
                            <i className="ri-logout-box-line"></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}

                        </div>

                    </div>

                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? <i className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(!collapsed)}></i> : <i className="ri-close-line header-action-icon" onClick={() => setCollapsed(!collapsed)}></i>}
                        <div className='d-flex align-items-center px-4'>
                            <Badge count={user === null ? 0 : user.unseenNotification.length} onClick={() => navigate('/notifications')} >
                                <i className="ri-notification-line header-action-icon px-3"></i>
                            </Badge>

                            {user === null ? <Link className='anchor mx-2' to='/profile'>{""}</Link> : <Link className='anchor ' to='/'>{user.name}</Link>}
                        </div>

                    </div>
                    <div className='body'>
                        {children}

                    </div>

                </div>


            </div>

        </div>
    )
}

export default Layout