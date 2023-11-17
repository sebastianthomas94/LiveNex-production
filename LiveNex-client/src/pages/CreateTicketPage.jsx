import React, { useEffect } from 'react'
import Header from '../components/header'
import SideBar from '../components/sidebar'
import CreateTicket from '../components/CreateTicket'
import { useNavigate } from 'react-router-dom';


function CreateTicketPage() {
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
        <CreateTicket />
      </div>
    </div>
  </>
  )
}

export default CreateTicketPage