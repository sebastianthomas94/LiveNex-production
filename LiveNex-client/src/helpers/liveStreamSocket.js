import io from "socket.io-client";


const sendBySocket = (webcamStream) => {
    const videoElement = document.getElementById("video");
    videoElement.srcObject = webcamStream;
    const socket = io("http://localhost:8200", {
      transports: ["websocket" ],
      query:{rtmp: localStorage.getItem("rtmp")}
    });
    const mediaRecorder = new MediaRecorder(webcamStream,{
      mimeType: "video/webm;codecs=h264",
      videoBitsPerSecond: 3 * 1024 * 1024,
    });
    mediaRecorder.ondataavailable = (e) => {
        console.log("sending chunks", e.data, socket);
        socket.send(e.data);
    };

    mediaRecorder.start(1000);
};

export { sendBySocket };
