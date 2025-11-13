import { useEffect, useState } from "react";

export default function Calculator() {
    const [screen, setScreen] = useState("0");
    const [operator, setOperator] = useState(null);
    const [state, setState] = useState("S0");
    const [operand1, setOperand1] = useState(null);
    const [operand2, setOperand2] = useState(null);

    // ฟังก์ชันอัปเดตหน้าจอ
    const getClearLabel = () => (screen !== "0" ? "C" : "CE");

    // การกดตัวเลข
    const numberClick = (number) => {
        if (state === "S0") {
            setScreen(number.toString());
            setState("S1");
        } else if (state === "S1") {
            if (screen.length <= 9) setScreen((s) => s + number.toString());
        } else if (state === "S2") {
            setScreen(number.toString());
            setState("S3");
        } else if (state === "S3") {
            if (screen.length <= 9) setScreen((s) => s + number.toString());
        }
        setOperand2(undefined);
    };

    // การกด operator
    const operatorClick = (op) => {
        if (state === "S1" || state === "S3") {
            setOperand1(Number(screen));
            setOperator(op);
            setState("S2");
        } else if (state === "S2") {
            setOperator(op);
        }
    };

    // การคำนวณผลลัพธ์
    const equalClick = () => {
        if (operator !== null && operand1 !== null) {
            let op2 = operand2 ?? Number(screen);
            let result = 0;

            if (operator === "+") result = operand1 + op2;
            else if (operator === "-") result = operand1 - op2;
            else if (operator === "*") result = operand1 * op2;
            else if (operator === "/") result = operand1 / op2;

            setScreen(result.toString());
            setOperand1(result);
            setOperand2(op2);
            setState("S1");
        }
    };

    // ล้างค่าทั้งหมด
    const clearClick = () => {
        setScreen("0");
        setOperator(null);
        setOperand1(null);
        setOperand2(null);
        setState("S0");
    };

    // ตรวจจับการกดคีย์บอร์ด
    useEffect(() => {
        const handleKey = (event) => {
            if (event.key >= "0" && event.key <= "9") {
                numberClick(Number(event.key));
            } else if (["+", "-", "*", "/"].includes(event.key)) {
                operatorClick(event.key);
            } else if (event.key === "Enter") {
                event.preventDefault();
                equalClick();
            } else if (event.key === "Escape") {
                clearClick();
            }
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    });

    const numberButtons = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0],
    ];

    const calcBtnStyle = (symbol) =>
        `w-16 h-16 m-2 rounded-2xl text-xl font-medium transition 
    ${operator === symbol
            ? "bg-amber-400 text-white"
            : "bg-white text-amber-500 hover:bg-amber-400 hover:text-white"
        } shadow`;

    const numBtnStyle = "w-16 h-16 m-2 rounded-2xl text-xl bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white shadow transition";

    return (
        <div className="flex items-center justify-center m-[5rem] font-[Prompt] text-black">

            <div className="bg-white p-5 rounded-2xl shadow-xl">
                <div className="flex justify-end items-center h-40 mb-4 rounded-xl bg-white text-[80px] shadow-inner px-4 select-none">
                    {screen}
                </div>

                <div className="flex flex-wrap justify-center mb-2">
                    <button className="w-16 h-16 m-2 rounded-2xl text-lg bg-sky-400 text-white shadow" disabled>
                        MC
                    </button>
                    <button className="w-16 h-16 m-2 rounded-2xl text-lg bg-sky-400 text-white shadow" disabled>
                        MR
                    </button>
                    <button className="w-16 h-16 m-2 rounded-2xl text-lg bg-sky-400 text-white shadow" disabled>
                        M+
                    </button>
                    <button className="w-16 h-16 m-2 rounded-2xl text-lg bg-sky-400 text-white shadow" disabled>
                        M-
                    </button>
                    <button onClick={clearClick} className="w-16 h-16 m-2 rounded-2xl text-lg bg-red-500 text-white hover:bg-red-600 shadow">
                        {getClearLabel()}
                    </button>
                </div>

                {numberButtons.slice(0, 3).map((row, i) => (
                    <div key={i} className="flex justify-center">
                        {row.map((num) => (
                            <button
                                key={num}
                                onClick={() => numberClick(num)}
                                className={numBtnStyle}
                            >
                                {num}
                            </button>
                        ))}
                        {i === 0 && (
                            <>
                                <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow" disabled>
                                    ÷
                                </button>
                                <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow" disabled>
                                    √
                                </button>
                            </>
                        )}
                        {i === 1 && (
                            <>
                                <button
                                    onClick={() => operatorClick("*")}
                                    className={calcBtnStyle("*")}
                                >
                                    ×
                                </button>
                                <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow" disabled>
                                    %
                                </button>
                            </>
                        )}
                        {i === 2 && (
                            <>
                                <button
                                    onClick={() => operatorClick("-")}
                                    className={calcBtnStyle("-")}
                                >
                                    −
                                </button>
                                <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow" disabled>
                                    1/x
                                </button>
                            </>
                        )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button onClick={() => numberClick(0)} className={numBtnStyle}>
                        0
                    </button>
                    <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow">
                        .
                    </button>
                    <button className="w-16 h-16 m-2 rounded-2xl text-xl bg-gray-200 text-gray-400 shadow">
                        +/-
                    </button>
                    <button onClick={() => operatorClick("+")} className={calcBtnStyle("+")}>
                        +
                    </button>
                    <button
                        onClick={equalClick}
                        className="w-16 h-16 m-2 rounded-2xl text-xl font-semibold bg-amber-500 text-white hover:bg-amber-600 shadow"
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}