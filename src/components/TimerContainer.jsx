import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";
import {Minutes} from "../hooks/Minutes"
import {Seconds} from "../hooks/Seconds"
import {PlayHook} from "../hooks/PlayHook"



export const TimerContainer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(5);
  const {minutes, minutesDecrement, update} = Minutes(sessionLength);
  const {seconds, secondsDecrement, reset} = Seconds(0);
  const {isPlay,playing} = PlayHook()

  const handlePlay = (e) => {
    const btnId = e.currentTarget.id;

    if(btnId === "start_stop" ){
      console.log(btnId)
      playing()
    }

  };

  const handleClickUp = (e) => {
    const btnId = e.currentTarget.id;

    if(btnId === "break-increment"){
      setBreakLength(breakLength + 1)
    }else{
      setSessionLength(sessionLength + 1);
    }

  };

  const handleClickDown = (e) => {
    const btnId = e.currentTarget.id;

    switch (btnId) {
      case "break-decrement":
        breakLength > 1 && setBreakLength(breakLength - 1);
        break;
      case "session-decrement":
        sessionLength > 1 && setSessionLength(sessionLength - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {

    if(isPlay){

      if(seconds < 0){
        reset()  
        minutesDecrement()  
       }
  
      const myInterval = setInterval(() => {
        secondsDecrement()
      }, 1000);

      return () =>{
        clearInterval(myInterval)
      }

    }
  }, [seconds,isPlay]);


  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-9/12 text-center ">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickUp={handleClickUp}
          handleClickDown={handleClickDown}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickUp={handleClickUp}
          handleClickDown={handleClickDown}
        />
      </div>
      <Timer title="Session" minutes={minutes} seconds={seconds} />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause />
        <Play handlePlay={handlePlay} />
        <Reset />
      </div>
    </div>
  );
};
