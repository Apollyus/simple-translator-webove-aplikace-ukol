import React from "react";

export default function Weather() {

    const getWeather = async () => {
        const response = await fetch("http://localhost:8000/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: "London", state_code: "GB", city_code: "GB-BDG" })
        });
        const data = await response.json();
        console.log(data);
    }

    getWeather();

    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="bg-white">
                <h1 className="text-4xl font-bold">Weather</h1>
            </div>
        </div>
    );
}