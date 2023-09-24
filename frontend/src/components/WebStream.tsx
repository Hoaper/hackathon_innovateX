import { useState } from "react";

const WebcamStream = () => {
    const videoSrc = 'http://127.0.0.1:5000/video';
    const SCORE_VS_ALL = ''
    const onLoadFunction = () => {
        console.log("LOADED")
    }

    return (
      <div>
        <h1>ИГРА УГАДАЙ ПЕРСОНАЖА</h1>
        <img width="400px" src={videoSrc} alt="Webcam Stream" onLoad={onLoadFunction} />
      </div>
    );
  };
  
  export default WebcamStream;
  