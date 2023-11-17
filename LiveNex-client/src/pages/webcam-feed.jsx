// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";

// const WebcamStream = () => {
//   const [stream, setStream] = useState(null);
//   const navigate = useNavigate();
//   useEffect(()=>{
//     if(!localStorage.getItem("user"))
//       navigate("/login");
//   },[navigate])

//   // Function to start the webcam stream
//   const startStream = async () => {
//     try {
//       const webcamStream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: {
//           height: { min: 720, max: 1280 },
//           width: { min: 1080, max: 1920 },
//           frameRate: { min: 15, ideal: 24, max: 30 },
//           facingMode: "user",
//         },
//       });
//       //setStream(webcamStream);
      
//       const videoElement = document.getElementById("video");
//       videoElement.srcObject = webcamStream;
//       const socket = io("http://localhost:8200", {
//         transports: ["websocket" ],
//         query:{rtmp: localStorage.getItem("rtmp")}
//       });
//       const mediaRecorder = new MediaRecorder(webcamStream,{
//         mimeType: "video/webm;codecs=h264",
//         videoBitsPerSecond: 3 * 1024 * 1024,
//       });
//       mediaRecorder.ondataavailable = (e) => {
//           console.log("sending chunks", e.data, socket);
//           socket.send(e.data);
//       };

//       mediaRecorder.start(1000);
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//     }
//   };

//   // Function to stop the webcam stream
//   const stopStream = () => {
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//       setStream(null);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopStream(); // Ensure the stream is stopped when the component unmounts
//     };
//   }, []);

//   return (
//     <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
//       <div className="w-70 h-70 border border-gray-300 rounded-md overflow-hidden">
//         {/* Webcam feed container */}
//         <video className="w-full h-full" id="video" autoPlay playsInline></video>
//       </div>
//       <div className="mt-4">
//         {/* Start and Stop buttons */}
//         {!stream ? (
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
//             onClick={startStream}
//           >
//             Start Stream
//           </button>
//         ) : (
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-md"
//             onClick={stopStream}
//           >
//             Stop Stream
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WebcamStream;
