import React, { useEffect } from 'react'
import Subscription from '../components/Subscription'
import Header from '../components/header'
import SideBar from '../components/sidebar'
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPage() {
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
      <div className="flex-grow ">
        <Subscription />
      </div>
    </div>
  </>
  )
}
