import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    //Sets data in local storage

    //Initialize the state with the value from local storage or the initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error while accessing local storage:", error);
            return initialValue;
        }
    });

    //Update local storage whenever the state changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error while storing data in local storage:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
