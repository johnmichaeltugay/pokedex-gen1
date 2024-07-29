import { useEffect, useState } from "react";

export default function useLocalStorage (key:string, initValue) {
    const [data, setData] = useState(() => {
        const size = localStorage.getItem('key');
        return size ? JSON.parse(size) : initValue;
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    return [data, setData];
}