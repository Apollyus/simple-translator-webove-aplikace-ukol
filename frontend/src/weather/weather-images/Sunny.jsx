import React from "react";
import SunnyImage from "/weather-images/sunny.png?url"

export default function Cloudy(){
    return(
        <>
            <img src={SunnyImage} alt="Weather image" className="h-[5rem] mx-3"/>
        </>
    )
}