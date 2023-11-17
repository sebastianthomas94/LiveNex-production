import { useNavigate } from "react-router-dom";
import Login from "../components/login";
import { useEffect } from "react";

export default function LoginPage()
{        
    const navigate = useNavigate();
    useEffect(() => {

        const cookies = document.cookie.split(";");
        const fooCookie = cookies.find(function (cookie) {
          return cookie?.split("=")[0] === "jwt";
        });
        const jwt = fooCookie?.split("=")[1];
        if (!localStorage.getItem("user") && !jwt) navigate("/login");
        else navigate('/dashboard');
    
      }, []);
    return (
        <div className="bg-gray-200 fixed inset-0 overflow-hidden">
            <Login />
        </div>

    )
}