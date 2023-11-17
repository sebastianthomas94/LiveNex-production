import React, { useEffect } from "react";
import LiveStream from "../components/LiveStream";
import Chat from "../components/Chat";
import { SharedProvider } from "../context/SharedContext.js"; //provider for go live button
import { useSetLiveDataMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";

export default function LiveStreamPage() {
  const [setLiveData] = useSetLiveDataMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const fooCookie = cookies.find(function (cookie) {
      return cookie?.split("=")[0] === "jwt";
    });
    const jwt = fooCookie?.split("=")[1];
    if (!localStorage.getItem("user") && !jwt) navigate("/login");
  }, []);
  useEffect(() => {
    let destinations = [];
    let broadcast;
    if (localStorage.getItem("youtube_rtmp")) destinations.push("youtube");
    if (localStorage.getItem("facebook_rtmp")) destinations.push("facebook");
    if (localStorage.getItem("twitch_rtmp")) destinations.push("twitch");
    if (localStorage.getItem("fileName")) broadcast = true;
    else broadcast = false;
    const title = localStorage.getItem("title");
    const youtubeLiveUrl = localStorage.getItem("youtubeLiveUrl");
    const twitchLiveUrl =  localStorage.getItem("twitchLiveUrl");
    const startTime = new Date();
    const data = {
      startTime,
      title,
      destinations,
      broadcast,
      youtubeLiveUrl,
      twitchLiveUrl,
    };
    console.log(data);
    setLiveData(data)
      .unwrap()
      .then((res) => {
        console.log("live data added");
      })
      .catch((e) => console.log(e.message));
  }, []);
  return (
    // Inside the LiveStream component
    <SharedProvider>
      <div className="flex">
        <div className="w-3/4">
          <LiveStream />
        </div>
        <div className="w-1/4">
          <Chat />
        </div>
      </div>
    </SharedProvider>
  );
}
