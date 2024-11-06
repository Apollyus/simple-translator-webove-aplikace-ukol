import React from "react";
import Cloudy from "./weather-images/Cloudy"
import Sunny from "./weather-images/Sunny"
import HalfCloudy from "./weather-images/HalfCloudy"
import Rainy from "./weather-images/Rainy"

export default function FullCard(props) {
  return (
    <div className="w-full flex justify-between text-gray-800 relative">
      <div className="flex flex-col p-2">
        <button onClick={props.backButton} className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        <h1 className="text-2xl ml-2 font-bold">{props.data.location.name}, {props.data.location.region}</h1>
        <h2 className="text-lg ml-2">{props.data.location.country}</h2>
        <div className="flex flex-col gap-2">
            <span className="ml-2 font-bold text-xl text-blue-500">{props.data.current.temp_c} °C</span>
            <span className="ml-2 flex items-center gap-2 font-semibold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                </svg>
                {props.data.current.wind_kph} km/h
            </span>
            <span className="text-gray-400 text-sm absolute bottom-2 right-3">Naposledy aktualizováno: {props.data.current.last_updated}</span>
        </div>
      </div>
      <div className="h-full">
        {props.data.current.condition.text === "Cloudy" ?(
            <>
                <Cloudy />
            </>
        ) : props.data.current.condition.text === "Sunny" ? (
            <>
                <Sunny />
            </>
        ) : props.data.current.condition.text === "Partly cloudy" ? (
            <>
                <HalfCloudy />
            </>
        ) : props.data.current.condition.text === "Rainy" ? (
            <>
                <Rainy />
            </>
        ) : (
            <div className="flex justify-center items-center bg-gray-200 h-32 w-40 rounded-xl mr-4 mt-4">
                <div className="loader"></div> 
            </div>
        )}
      </div>         
    </div>
  );
}