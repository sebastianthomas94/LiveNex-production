import React, { useEffect } from 'react'
import Header from '../../components/admin-components/Header'
import Sidebar from '../../components/admin-components/Sidebar'
import Dashboard from '../../components/admin-components/Dashboard'
import { useNavigate } from 'react-router-dom'

function AdminDashboardPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("admin"))
      navigate("/admin/login");
  },[])
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        < Dashboard/>
      </div>
    </div>
  )
}

export default AdminDashboardPage