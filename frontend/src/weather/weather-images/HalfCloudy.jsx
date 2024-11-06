import React from "react";
import HalfCloudyImage from "/weather-images/half_cloudy.png?url"

export default function Cloudy(){
    return(
        <>
            <img src={HalfCloudyImage} alt="Weather image" className="h-[5rem] mx-3"/>
        </>
    )
}