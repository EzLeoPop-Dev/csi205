import { useEffect, useState } from "react"

export default function Value({ title , type ,init ,value ,setValue }) {
    useEffect(()=> {
        setValue(init || 0)
    },[init])
    return (
        <div>
            <div className=" text-black w-fit m-auto px-[74px] py-[20px] rounded-md bg-gray-300">
                <div className="header">
                    <h1 className="text-center">{title || "Value"}</h1>
                </div>
                <div className="flex justify-between align-middle gap-1.5">
                    <button className="px-[10px] py-[2px] rounded-[5px] bg-red-600 text-white" onClick={()=>setValue((prev) => (prev - 1))}>&minus;</button>
                <span>{type === 'real' ? value.toFixed(2) : Number(Math.floor(value))}</span>
                <button className="px-[10px] py-[2px] rounded-[5px] bg-green-600 text-white" onClick={()=>setValue((prev) => (prev + 1))}>+</button>
            </div>
        </div >
        </div>
    )
}