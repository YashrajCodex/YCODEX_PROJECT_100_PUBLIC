import React, { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) : [T, (val: T)=> void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.log(error)
        }
    },[key, storedValue])
    return [storedValue, setStoredValue]
}
