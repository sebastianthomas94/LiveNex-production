import React, { useEffect } from 'react'
import SideBar from '../components/sidebar'
import Header from '../components/header'
import TicketList from '../components/TicketList'
import { useNavigate } from 'react-router-dom';

function TicketsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const fooCookie = cookies.find(function (cookie) {
      return cookie?.split("=")[0] === "jwt";
    });
    const jwt = fooCookie?.split("=")[1];
    if (!localStorage.getItem("user") && !jwt) navigate("/login");

  }, []);
  return (
    <>
    <Header />
    <div className="flex">
      <SideBar />
      <div className="flex-grow m-12">
        <TicketList />
      </div>
    </div>
  </>
  )
}

export default TicketsPage