import React from "react";

export default function FullCard(props){

    return(
        <div className="w-full flex justify-between text-gray-800">
            <div className="flex flex-col p-2">
                <button onClick={props.backButton} className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </button>
                <h1 className="text-2xl font-bold">{props.data.location.name}, {props.data.location.region}</h1>
                <h2 className="text-lg">{props.data.location.country}</h2>
                <span className="font-bold text-xl text-blue-500">{props.data.current.temp_c} °C</span>
                <span className="font-semibold text-lg">Vítr: {props.data.current.wind_kph} km/h</span>
            </div>
            <div className="h-full">
                <img src="https://placehold.co/600x400/" alt="Weather image" className="h-[15rem] w-[10rem] rounded-r-xl object-cover"/>    
            </div>         
        </div>
    )
}