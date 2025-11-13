import { useEffect, useState } from "react";
import basketball from "../assets/basketball.png";
import football from "../assets/football.png";
import volleyball from "../assets/volleyball.png";
import human from "../assets/Human.png";
import cartoon from "../assets/Cartoon.png";
import woodBg from "../assets/woodBackground.jpg";

export default function Animation() {
    const fieldWidth = 700;
    const fieldHeight = 400;
    const ballDiameter = 100;

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [angle, setAngle] = useState(0);
    const [running, setRunning] = useState(false);
    const [selected, setSelected] = useState("none");

    const vx = 5;
    const vy = 5;
    const rotationSpeed = 5;

    const maxX = fieldWidth - ballDiameter - 2;
    const maxY = fieldHeight - ballDiameter - 2;

    // เปลี่ยนสถานะ Run/Pause
    const toggleRun = () => setRunning((prev) => !prev);

    // คำนวณการเคลื่อนที่
    const calculate = () => {
        setX((prevX) => {
            if (goRight) {
                if (prevX + vx >= maxX) {
                    setGoRight(false);
                    return maxX;
                }
                return prevX + vx;
            } else {
                if (prevX - vx <= 0) {
                    setGoRight(true);
                    return 0;
                }
                return prevX - vx;
            }
        });

        setY((prevY) => {
            if (goDown) {
                if (prevY + vy >= maxY) {
                    setGoDown(false);
                    return maxY;
                }
                return prevY + vy;
            } else {
                if (prevY - vy <= 0) {
                    setGoDown(true);
                    return 0;
                }
                return prevY - vy;
            }
        });

        setAngle((a) => a + rotationSpeed);
    };

    // เปลี่ยนภาพลูกบอล
    const getBallImage = () => {
        switch (selected) {
            case "basketball":
                return basketball;
            case "football":
                return football;
            case "volleyball":
                return volleyball;
            case "human":
                return human;
            case "cartoon":
                return cartoon;
            default:
                return "";
        }
    };

    // จัดการคีย์บอร์ด
    useEffect(() => {
        const handleKey = (e) => {
            if (e.code === "Space") toggleRun();
            else if (e.key === "0") setSelected("none");
            else if (e.key === "1") setSelected("basketball");
            else if (e.key === "2") setSelected("football");
            else if (e.key === "3") setSelected("volleyball");
            else if (e.key === "4") setSelected("human");
            else if (e.key === "5") setSelected("cartoon");
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // loop animation
    useEffect(() => {
        const interval = setInterval(() => {
            if (running) calculate();
        }, 25);
        return () => clearInterval(interval);
    });

    return (
        <div className="w-fit mx-auto mt-[5rem] bg-white shadow-[0_0_17px_0_rgba(220,129,237,0.65)] p-5 rounded-2xl">
            <div
                className="relative border border-black rounded-xl overflow-hidden"
                style={{
                    width: `${fieldWidth}px`,
                    height: `${fieldHeight}px`,
                    backgroundImage: `url(${woodBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* ลูกบอล */}
                <div
                    className="absolute rounded-full border border-black"
                    style={{
                        width: `${ballDiameter}px`,
                        height: `${ballDiameter}px`,
                        left: `${x}px`,
                        top: `${y}px`,
                        backgroundColor: selected === "none" ? "gray" : "transparent",
                        backgroundImage: selected === "none" ? "" : `url(${getBallImage()})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform: `rotate(${angle}deg)`,
                    }}
                ></div>
            </div>

            {/* ปุ่มควบคุม */}
            <div className="flex justify-between mt-4 flex-wrap gap-2">
                <button
                    onClick={toggleRun}
                    className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${running
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                >
                    {running ? "⏸ Pause" : "▶ Run"}
                </button>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelected("none")}
                        className={`px-3 py-1 rounded-lg ${selected === "none"
                            ? "bg-gray-500 text-white"
                            : "border border-gray-400 text-gray-700"
                            }`}
                    >
                        None
                    </button>

                    {["basketball", "football", "volleyball", "human", "cartoon"].map(
                        (type) => (
                            <button
                                key={type}
                                onClick={() => setSelected(type)}
                                className={`px-3 py-1 rounded-lg capitalize ${selected === type
                                    ? "bg-blue-600 text-white"
                                    : "border border-blue-400 text-blue-600"
                                    }`}
                            >
                                {type}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}