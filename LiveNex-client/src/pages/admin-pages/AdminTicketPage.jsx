import React from 'react'
import Tickets from '../../components/admin-components/Tickets'
import Sidebar from '../../components/admin-components/Sidebar'
import Header from '../../components/admin-components/Header'

function AdminTicketPage() {
  return (
    <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            < Tickets/>
          </div>
        </div>
  )
}

export default AdminTicketPage