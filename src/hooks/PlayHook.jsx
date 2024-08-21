import { useState } from "react"

export const PlayHook = (value) => {
const [isPlay, setIsPlay] = useState(value)

const playing = () => setIsPlay(true)

  return {isPlay,playing}
}
