import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

import music from "./assets/audios/Ali Mir - Alan Kojaee (320).mp3";
import NEG from "./assets/images/za.jpg";

function App() {
  const [playMusic, setPlayMusic] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const [musicTotalLength, setMusicTotalLength] = useState("00:00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00:00");

  const musicRef = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    musicRef.current.currentTime =
      (e.target.value * musicRef.current.duration) / 100;
  };

  const pauseHandler = () => {
    setPlayMusic(false);
    musicRef.current.pause();
  };

  const playHandler = () => {
    setPlayMusic(true);
    musicRef.current.play();
  };

  const handleAudioUpdate = () => {
    //Input total length of the audio
    let minutes = Math.floor(musicRef.current.duration / 60);
    let seconds = Math.floor(musicRef.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(musicRef.current.currentTime / 60);
    let currentSec = Math.floor(musicRef.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin}:${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (musicRef.current.currentTime / musicRef.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };
  return (
    <div className="app text-white container max-w-[450px]  mx-auto border-2 px-2 py-10 h-screen overflow-hidden    bg-gray-700">
      <div className="flex flex-col h-full   py-8 bg-cart ">
        <header className="p-4 text-center">
          <p className="text-4xl font-bold "> Music Player </p>
          <Spinner state={playMusic ? "running" : "paused"} />
        </header>
        <div className="h-[400px]  mt-5 flex flex-col justify-start items-center">
          <img
            src={NEG}
            alt="neg"
            className={`object-cover transition-all duration-1000  ${
              playMusic
                ? "w-full h-full rounded-3xl"
                : " w-52 h-52 rounded-full"
            } `}
          />
          <p className="title mt-2">kojaei ...</p>
        </div>
        <audio
          ref={musicRef}
          src={music}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <div className=" mt-auto px-4 ">
          <div className="flex justify-between ">
            <span className="  text-xs">{musicCurrentTime}</span>
            <span className=" text-xs">{musicTotalLength}</span>
          </div>

          <input
            type="range"
            min={0}
            max="100"
            onChange={handleMusicProgressBar}
            value={audioProgress}
            className="range range-xs  w-full transition-all duration-150 "
          />

          <div className="  flex justify-center mt-2">
            {playMusic ? (
              <FaPause
                onClick={pauseHandler}
                className="text-5xl cursor-pointer"
              />
            ) : (
              <FaPlay
                onClick={playHandler}
                className="text-5xl  cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Spinner = ({ state }) => {
  return (
    <div className="spinner">
      <div className="r1" style={{ animationPlayState: state }}></div>
      <div className="r2" style={{ animationPlayState: state }}></div>
      <div className="r3" style={{ animationPlayState: state }}></div>
      <div className="r4" style={{ animationPlayState: state }}></div>
    </div>
  );
};

export default App;
