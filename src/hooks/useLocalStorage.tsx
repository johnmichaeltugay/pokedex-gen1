import { useEffect, useState } from "react";

export default function useLocalStorage (key:string, initValue: unknown) {
    const [data, setData] = useState(() => {
        const size = localStorage.getItem(key);
        console.log('found', key, size);
        return size ? JSON.parse(size) : initValue;
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    return [data, setData];
}