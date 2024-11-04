import React, { useState, useEffect } from "react";
import FullCard from "./WeatherCard";

export default function Weather() {
    const [data, setData] = useState("");
    const [inputCity, setInputCity] = useState("");

    const getWeather = async () => {
        const response = await fetch("http://localhost:8000/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: inputCity })
        });
        const data = await response.json();
        setData(data);
        console.log("fe", data);
    }

    const setInputCityFunc = (event) => {
        setInputCity(event.target.value);
    }

    return(
        <div className="bg-[#dcebff] h-screen w-screen flex justify-center items-center">
            <div className="bg-white h-[15rem] w-[35rem] flex justify-between rounded-xl shadow-xl">
                { data ? <FullCard data={data} /> : 
                <div className="h-full w-full flex gap-5 justify-center items-center ">
                    <input type="text" value={inputCity} onChange={setInputCityFunc} placeholder="Napiš město" className="bg-gray-100 h-9 border border-gray-300 rounded-lg p-2 px-3"/>
                    <button onClick={getWeather} className="h-9 px-3 rounded-lg bg-blue-500 text-white">Hledat</button>
                </div>
                }
            </div>
        </div>
    );
}