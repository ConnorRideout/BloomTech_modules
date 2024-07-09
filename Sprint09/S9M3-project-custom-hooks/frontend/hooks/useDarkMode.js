// import { useState } from "react"
import useLocalStorage from "./useLocalStorage"

export default function useDarkMode(initVal = false) {
    // const [enableDarkMode, setEnableDarkMode] = useState(initVal)
    const [enableDarkMode, setEnableDarkMode] = useLocalStorage("useDarkMode", initVal)
    return [enableDarkMode, setEnableDarkMode]
}