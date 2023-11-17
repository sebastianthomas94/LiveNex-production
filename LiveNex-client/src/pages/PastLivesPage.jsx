import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import PastLives from "../components/PastLives";

function PastLivesPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const fooCookie = cookies.find(function (cookie) {
      return cookie?.split("=")[0] === "jwt";
    });
    const jwt = fooCookie?.split("=")[1];
    console.log(jwt);
    if (!localStorage.getItem("user") && !jwt) navigate("/login");
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow m-12">
          <PastLives />
        </div>
      </div>
    </>
  );
}

export default PastLivesPage;
