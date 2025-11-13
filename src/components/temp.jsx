import { useState, useEffect } from "react";
import Value from "./value";

export default function Temp({ title }) {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);

  // ✅ แปลงค่าเมื่อ Celsius เปลี่ยน
  useEffect(() => {
    setFahrenheit((celsius * 9) / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

  // ✅ แปลงค่าเมื่อ Fahrenheit เปลี่ยน
  useEffect(() => {
    const newC = ((fahrenheit - 32) * 5) / 9;
    setCelsius(newC);
    setKelvin(newC + 273.15);
  }, [fahrenheit]);

  // ✅ แปลงค่าเมื่อ Kelvin เปลี่ยน
  useEffect(() => {
    const newC = kelvin - 273.15;
    setCelsius(newC);
    setFahrenheit((newC * 9) / 5 + 32);
  }, [kelvin]);

  return (
    <div className="w-fit m-auto p-4 rounded-2xl bg-white text-black">
      <h1 className="text-center text-[30px] text-blue-600 font-bold">{title || "TEMPERATURES"}</h1>

      <div className="flex justify-between gap-4 my-4">
        <p className="border rounded-md p-2 bg-blue-600 text-white">
          {celsius.toFixed(2)} °C
        </p>
        <p className="border rounded-md p-2 bg-blue-600 text-white">
          {fahrenheit.toFixed(2)} °F
        </p>
        <p className="border rounded-md p-2 bg-blue-600 text-white">
          {kelvin.toFixed(2)} °K
        </p>
      </div>

      <div className="flex justify-between gap-2">
        <Value title="CELSIUS" value={celsius} setValue={setCelsius} />
        <Value title="FAHRENHEIT" value={fahrenheit} setValue={setFahrenheit} />
        <Value title="KELVIN" value={kelvin} setValue={setKelvin} />
      </div>
    </div>
  );
}