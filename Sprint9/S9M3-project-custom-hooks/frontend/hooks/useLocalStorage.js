import { useState } from "react"

export default function useLocalStorage(key, initVal) {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initVal
    })
    const setValue = value => {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    return [storedValue, setValue]
}