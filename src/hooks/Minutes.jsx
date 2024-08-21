import { useState } from "react"

export const Minutes = (sessionLength) => {
const [minutes, setMinutes] = useState(sessionLength)

const minutesDecrement = () => setMinutes(prev => prev - 1)
const update = () => setMinutes(sessionLength)


  return {minutes , minutesDecrement, update}
}