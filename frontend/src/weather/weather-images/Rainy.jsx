import React from "react";
import RainyImage from "/weather-images/rainy.png?url"

export default function Cloudy(){
    return(
        <>
            <img src={RainyImage} alt="Weather image" className="h-[5rem] mx-3"/>
        </>
    )
}