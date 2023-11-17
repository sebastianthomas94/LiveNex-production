import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SchedulingLivesLoader = () => {
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const youtube_rtmp = localStorage.getItem("youtube_rtmp");
    const facebook_rtmp = localStorage.getItem("facebook_rtmp");
    const twitch_rtmp = localStorage.getItem("twitch_rtmp");
    const scheduledTime = localStorage.getItem("scheduledTimeInIso");
    const fileName = localStorage.getItem("fileName");
    const facebook_accesstoken = localStorage.getItem("facebook_accesstoken");
    const facebook_liveVideoId = localStorage.getItem("facebook_liveVideoId");
    const socket = io("http://localhost:8200", {
      transports: ["websocket"],
      query: {
        scheduling: true,
        youtube_rtmp,
        facebook_rtmp,
        twitch_rtmp,
        scheduledTime,
        fileName,
        facebook_accesstoken,
        facebook_liveVideoId,
      },
      withCredentials: true,
    });
    socket.emit("Schedule Live", { message: "schedule the live" });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect to the dashboard after 5 seconds
    setTimeout(() => {
      setRedirect(true);
      clearInterval(countdownInterval);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);
  const navigate = useNavigate();
  if (redirect) {
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <h1 className="text-2xl font-semibold text-blue-800 mb-4">
        Scheduling the Lives...
      </h1>
      <div className="loader ease-linear rounded-full border-t-4 border-blue-500 h-12 w-12 mb-4 animate-spin"></div>
      <p className="text-sm text-blue-700">
        Redirecting to Dashboard in {countdown} seconds
      </p>
    </div>
  );
};

export default SchedulingLivesLoader;
