import { useState } from "react";
import Value from "./value";

export default function Add({ title }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    return (
        <div>
            <div className="w-fit m-auto p-3 rounded-2xl bg-white text-black ">
                <div>
                    <h1 className="text-center text-[30px] text-blue-600">{title || "ADD"}</h1>
                </div>

                <div className="flex justify-between my-4">
                    <p className="border rounded-md py-2 px-5 bg-gray-400 text-white">A = {a}</p>
                    <p className="border rounded-md py-2 px-5 bg-blue-800 text-white">A + B = {a + b}</p>
                    <p className="border rounded-md py-2 px-5 bg-gray-400 text-white">B = {b}</p>
                </div>

                <div className="flex justify-between gap-4 ">
                    <Value title="A" init={0} value={a} setValue={setA} />
                    <Value title="B" init={0} value={b} setValue={setB} />
                </div>
            </div>
        </div>
    );
}