import { Header } from "./Header";
import { Pad } from "./Pad";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Repeat } from "./Repeat";

export const TimerContainer = () => {
  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-10/12 ">
      <Header />
      <div className="flex flex-col md:flex-row gap-20">
        <Pad title="Break Length" counter="5" />
        <Pad title="Session Length" counter="25" />
      </div>
      <Timer title="Session" />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause />
        <Play />
        <Repeat />
      </div>
    </div>
  );
};
