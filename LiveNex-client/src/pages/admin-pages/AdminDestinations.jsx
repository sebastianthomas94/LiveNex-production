import React, { useEffect } from 'react'
import Sidebar from '../../components/admin-components/Sidebar'
import Header from '../../components/admin-components/Header'
import Destinations from '../../components/admin-components/Destinations'
import { useNavigate } from 'react-router-dom';

function AdminDestinations() {
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
        < Destinations/>
      </div>
    </div>
  )
}

export default AdminDestinations