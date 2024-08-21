import { useState } from "react"

export const Seconds = (value) => {
const [seconds, setSeconds] = useState(value)

const secondsDecrement = () => setSeconds(prev => prev - 1)
const reset = () => setSeconds(59)

  return {seconds, secondsDecrement, reset}
}
