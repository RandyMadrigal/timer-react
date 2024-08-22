import { useState } from "react"

export const ResetHook = (value) => {
const [isReset, setIsReset] = useState(value) //DEFAULT FALSE

const restart = (value) => setIsReset(value)

    return {isReset,restart}
}
