import { useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import Destinations from "../components/Destinations";

function DestinationPage() {
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
          <Destinations/>
        </div>
      </div>
    </>
  );
}

export default DestinationPage;
