import React, { useState, useEffect } from "react";
import FullCard from "./WeatherCard";

export default function Weather() {
    const [data, setData] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [error, setError] = useState("");

    const getWeather = async () => {
        const response = await fetch("http://localhost:8000/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: inputCity })
        });
        const data = await response.json();
        setError(false);
        if(data === "Error fetching weather data"){
            setError(true);
         }else{
            setData(data);
        }
        
        console.log("fe", data);
    }

    const setInputCityFunc = (event) => {
        setInputCity(event.target.value);
    }

    const handlebackButton = () => {
        setInputCity("");
        setData("");
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          getWeather();
        }
      };

    return(
        <div className="bg-[#dcebff] h-screen w-screen flex justify-center items-center">
            <div className="bg-white h-[15rem] w-[35rem] flex justify-between rounded-xl shadow-xl">
                { data ? <FullCard data={data} backButton={handlebackButton}/> : 
                <div className="h-full w-full flex gap-5 justify-center items-center ">
                    <input type="text" value={inputCity} onChange={setInputCityFunc} onKeyDown={handleKeyPress} placeholder="Napiš město" className="bg-gray-100 h-9 border border-gray-300 rounded-lg p-2 px-3"/>
                    <button onClick={getWeather} className="h-9 px-3 rounded-lg bg-blue-500 text-white">Hledat</button>
                    { error && (
                        <div className="bg-red-500 p-2 px-4 rounded-xl text-white">
                            <p>Chyba pří načítání dat :(</p>
                        </div>
                    )}
                </div>
                }
            </div>
        </div>
    );
}