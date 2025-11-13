import Value from "../components/value"
import Add from "../components/add"
import Timer from "../components/timer"
import Temp from "../components/temp"
import { useState } from "react"

export default function Components() {
    const [counter, setCounter] = useState(0)
    return (
        <div className="m-20">
            <div className="flex justify-center mb-5">
                <div className="mx-2.5">
                    <div className="mb-3">
                        <Value title={"COUNTER"} type={"real"} value={counter} setValue={setCounter} />
                    </div>
                    <Timer title={"TIMER"} />
                </div>
                <Add title={"ADD"} />
            </div>
            <Temp />
        </div>
    )
}