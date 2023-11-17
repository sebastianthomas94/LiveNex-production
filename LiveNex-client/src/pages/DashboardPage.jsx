import { useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import Dashboard from "../components/Dashboard";
import Body from "../components/body";

function DashboardPage() {
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
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
