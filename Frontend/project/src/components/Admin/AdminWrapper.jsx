import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminHome from '../../pages/Admin/AdminHome.jsx'
import AdminLogin from '../../pages/Admin/AdminLogin.jsx'

const AdminWrapper = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/login" element={<AdminLogin />} />
       
    </Routes>
    </div>
  )
}

export default AdminWrapper