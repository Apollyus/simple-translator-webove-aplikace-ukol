import React from "react";

export default function Weather() {

    const getWeather = async () => {
        const response = await fetch("http://localhost:8000/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: "New York" }) // Replace with the actual data you want to send
        });
        const data = await response.json();
        console.log(data);
    }

    getWeather();

    return(
        <>
            <h1>Hello world</h1>
        </>
    );
}