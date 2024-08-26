import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";

/*hooks*/
import { MinutesHook } from "../hooks/session/MinutesHook";
import { SecondsHook } from "../hooks/session/SecondsHook";
import { PlayHook } from "../hooks/PlayHook";
import { ResetHook } from "../hooks/ResetHook";
import { MinutesBreakHook } from "../hooks/break/MinutesBreakHook";
import { SecondsBreakHook } from "../hooks/break/SecondsBreakHook";

export const TimerContainer = () => {
  //states
  const { isPlay, playing } = PlayHook(false);
  const { isReset, restart } = ResetHook(false);
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("Session");

  // Session
  const [sessionLength, setSessionLength] = useState(25);
  const { minutes, minuteDecrease, update } = MinutesHook(sessionLength);
  const { seconds, secondDecrease, reset, secondInit } = SecondsHook(0);

  // Break
  const [breakLength, setBreakLength] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const { minutesBreak, minuteDecreaseBreak, updateBreak } =
    MinutesBreakHook(breakLength);
  const { secondsBreak, secondDecreaseBreak, resetBreak, secondInitBreak } =
    SecondsBreakHook(0);

  const handleReset = () => {
    playing(false); // Stop the timer
    restart(true);
    setSessionLength(25);
    setBreakLength(5);
    update(25); // Reset session minutes
    updateBreak(5); // Reset break minutes
    secondInit(0); // Reset session seconds
    secondInitBreak(0); // Reset break seconds
    setIsBreak(false);
    setTitle("Session");
    setDisabled(false);
  };

  const handlePlay = () => {
    playing(!isPlay);
    setDisabled(!isPlay);
  };

  const handleClickSession = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "session-increment") {
      sessionLength < 60 && setSessionLength(sessionLength + 1);
      update(sessionLength + 1);
    }
    if (btnId === "session-decrement") {
      if (sessionLength > 1) {
        setSessionLength(sessionLength - 1);
        update(sessionLength - 1);
      }
    }
  };

  const handleClickBreak = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "break-decrement") {
      if (breakLength > 1) {
        setBreakLength(breakLength - 1);
        updateBreak(breakLength - 1);
      }
    }

    if (btnId === "break-increment") {
      breakLength < 60 && setBreakLength(breakLength + 1);
      updateBreak(breakLength + 1);
    }
  };

  // Handle reset
  useEffect(() => {
    if (isReset) {
      handleReset();
    }
  }, [isReset]);

  // Handle session end
  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      setIsBreak(true);
      setTitle("Break time!");
    }
  }, [minutes, seconds]);

  // Handle break end and session transition
  useEffect(() => {
    if (isBreak) {
      if (secondsBreak <= 0) {
        resetBreak(59);
        minuteDecreaseBreak();
      }
      if (minutesBreak <= 0 && secondsBreak <= 0) {
        update(sessionLength - 1); // Reset session length
        setTitle("Session");
        setIsBreak(false);
      }
    }
  }, [isBreak]);

  // Handle play/pause
  useEffect(() => {
    if (isPlay) {
      const myInterval = setInterval(() => {
        if (isBreak) {
          if (secondsBreak < 0) {
            resetBreak(59);
            minuteDecreaseBreak();
          } else {
            secondDecreaseBreak();
          }
        } else {
          if (seconds <= 0) {
            reset(59);
            minuteDecrease();
          } else {
            secondDecrease();
          }
        }
      }, 1000);

      return () => clearInterval(myInterval);
    }
  }, [isPlay, seconds, isBreak, secondsBreak]);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 text-center">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickBreak={handleClickBreak}
          disabled={disabled}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickSession={handleClickSession}
          disabled={disabled}
        />
      </div>
      <Timer
        title={title}
        minutes={isBreak ? minutesBreak : minutes}
        seconds={isBreak ? secondsBreak : seconds}
      />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause handlePause={handlePlay} />
        <Play handlePlay={handlePlay} />
        <Reset handleReset={handleReset} />
      </div>
    </div>
  );
};
