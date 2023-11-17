import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UpcomingLives from '../components/UpcomingLives';
import SideBar from '../components/sidebar';
import Header from '../components/header';

function UpcomingLivesPage() {
    const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const fooCookie = cookies.find(function (cookie) {
      return cookie?.split("=")[0] === "jwt";
    });
    const jwt = fooCookie?.split("=")[1];
    console.log(jwt)
    if (!localStorage.getItem("user") && !jwt) navigate("/login");

  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow m-12">
          <UpcomingLives />
        </div>
      </div>
    </>
  )
}

export default UpcomingLivesPage