import React from 'react'
import { Toaster } from 'react-hot-toast';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoutes from './components/PublicRoutes';
import Doctorlist from './pages/Admin/Doctorlist';
import Userlist from './pages/Admin/Userlist';
import ApplyDoctor from './pages/ApplyDoctor';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import DoctorAppointments from './pages/Doctor/DoctorAppointment';
import Profile from './pages/Doctor/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Register from './pages/Regisrer'
function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' element={<PublicRoutes> <Login /></PublicRoutes>} />
        <Route path='/Register' element={<PublicRoutes> <Register /></PublicRoutes>} />
        <Route path='/' element={<ProtectedRoute> <Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute> <ApplyDoctor /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute> <Notifications /></ProtectedRoute>} />
        <Route path='/admin/userslist' element={<ProtectedRoute> <Userlist /></ProtectedRoute>} />
        <Route path='/admin/doctorslist' element={<ProtectedRoute> <Doctorlist /></ProtectedRoute>} />
        <Route path='/doctor/profile/:doctorId' element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
        <Route path='/book-appointment/:doctorId' element={<ProtectedRoute> <BookAppointment /></ProtectedRoute>} />
        <Route path='/appointments' element={<ProtectedRoute> <Appointments /></ProtectedRoute>} />
        <Route path='/doctor/appointment' element={<ProtectedRoute> <DoctorAppointments /></ProtectedRoute>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
