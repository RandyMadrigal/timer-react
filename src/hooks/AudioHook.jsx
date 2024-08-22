import { useState } from "react"

export const AudioHook = (value) => {

    const [audio,setAudio]= useState(new Audio(value))
    const playBeep = () => <audio id="beep" src={audio} autoPlay ></audio>
    
  return {playBeep}
}
