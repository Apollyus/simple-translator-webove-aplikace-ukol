import React from "react";
import CloudyImage from "/weather-images/cloudy.png?url"

export default function Cloudy(){
    return(
        <>
            <img src={CloudyImage} alt="Weather image" className="h-[5rem] mx-3"/>
        </>
    )
}