import React from "react";

export default function FullCard(props){

    return(
        <div className="w-full flex justify-between text-gray-800">
            <div className="p-2">
                <h1 className="text-2xl font-bold">{props.data.location.name}, {props.data.location.region}</h1>
                <h2 className="text-lg">{props.data.location.country}</h2>
                <span className="font-bold text-xl my-5 text-blue-500">{props.data.current.temp_c} °C</span>
            </div>
            <div className="h-full">
                <img src="https://placehold.co/600x400/" alt="Weather image" className="h-[15rem] w-[10rem] rounded-r-xl object-cover"/>    
            </div>         
        </div>
    )
}