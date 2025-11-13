import { useState, useEffect, useRef } from "react";

export default function Timer({ title }) {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    const toTimeStr = (totalSeconds) => {
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${d ? d + "d " : ""}${h ? h + "h " : ""}${m ? m + "m " : ""}${s}s`;
    };

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => setSeconds((p) => p + 1), 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [running]);

    const handleReset = () => {
        setRunning(false);
        setSeconds(0);
    };

    return (
        <div className="w-[15.5rem] m-auto p-2 text-black rounded-md bg-gray-300 shadow-md">
            <h1 className="text-center font-bold text-blue-900">{title}</h1>

            <div className="flex flex-col mt-2">
                <p className="text-end border bg-white p-2 rounded-md">{toTimeStr(seconds)}</p>
            </div>

            <div className="flex gap-4 justify-center mt-4">
                <button
                    className="px-3 py-1 rounded-md bg-red-600 text-white flex items-center gap-2"
                    onClick={handleReset}
                >
                    <i className="fa-solid fa-arrow-rotate-right"></i> Reset
                </button>
                <button
                    className={`px-3 py-1 rounded-md flex items-center gap-2 ${running ? "bg-yellow-400 text-black" : "bg-green-600 text-white"
                        }`}
                    onClick={() => setRunning((r) => !r)}
                >
                    <i className={`fa-solid ${running ? "fa-pause" : "fa-play"}`}></i>
                    {running ? "Pause" : "Run"}
                </button>
            </div>
        </div>
    );
}