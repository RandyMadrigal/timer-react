import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";
/*hook*/
import { MinutesHook } from "../hooks/MinutesHook";
import { SecondsHook } from "../hooks/SecondsHook";
import { PlayHook } from "../hooks/PlayHook";
import {ResetHook} from "../hooks//ResetHook"
import {AudioHook} from "../hooks/AudioHook"

/*Audio Element*/

export const TimerContainer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const { minutes, minuteDecrease,update} = MinutesHook(sessionLength);
  const { seconds, secondDecrease, reset, secondInit } = SecondsHook(0);
  const { isPlay, playing } = PlayHook(false);
  const {isReset, restart} = ResetHook(false);
  const {playBeep} = AudioHook("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav")

  //TODO refactor...
  const handleReset = (e) =>{
    const btnId = e.currentTarget.id;

    if (btnId === "reset") {
      restart(true)
    }
  }
//TODO refactor...
  const handlePlay = (e) => {
    const btnId = e.currentTarget.id;
    restart(false)

    if (btnId === "start_stop") {
      if(isPlay){
        playing(false);
      }else{
        playing(true);
      }
    }
  };
//TODO refactor...
  const handlePause = (e) => {
    const btnId = e.currentTarget.id;
    restart(false)

    if (btnId === "pause") {
      playing(false);
    }
  };
  //TODO refactor...
  const handleClickSession = (e) => {
    const btnId = e.currentTarget.id;
    restart(false)

    if (btnId === "session-increment") {
      sessionLength < 60 && setSessionLength(sessionLength + 1);
      update(sessionLength + 1)

    }
    if (btnId === "session-decrement") {
      
      if(sessionLength > 1){
        setSessionLength(sessionLength - 1);
        update(sessionLength - 1)
      }   

      

 
      

    }
  };
//TODO refactor...
  const handleClickBreak = (e) => {
    const btnId = e.currentTarget.id;
    restart(false)

    if (btnId === "break-decrement") {
      breakLength > 1 && setBreakLength(breakLength - 1);
    }

    if (btnId === "break-increment") {
      breakLength < 60 && setBreakLength(breakLength + 1);
    }
  };
//TODO refactor...
  useEffect(() => {

    if(isReset){
      playing(false);
      setBreakLength(5);
      setSessionLength(25);
      update(sessionLength);
      secondInit(0);
     
    }

    if (isPlay) {

      if (seconds < 0) {
        minuteDecrease();
        reset();
      }

      if(minutes === 0 && seconds === 0){
        playing(false)
        playBeep()
      }

      const myInterval = setInterval(() => {
        secondDecrease();
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }

  }, [seconds, isPlay, minuteDecrease, reset, secondDecrease]);

  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-9/12 text-center ">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickBreak={handleClickBreak}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickSession={handleClickSession}
        />
      </div>
      <Timer title="Session" minutes={minutes} seconds={seconds} />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause handlePause={handlePause} />
        <Play handlePlay={handlePlay} />
        <Reset handleReset={handleReset}/>
      </div>
    </div>
  );
};
