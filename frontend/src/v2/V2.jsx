import React, { useEffect, useState, useRef } from "react";
import { findFlagUrlByCountryName } from "country-flags-svg";
import "../index.css"

export default function V2() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [flagUrl, setFlagUrl] = useState("");
  const timerRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/translate-v2", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: value })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        const data = await response.json();
        setData(data);
        setFlagUrl(findFlagUrlByCountryName(data.detectedLang));
        setLoading(false);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const handleChange = (event) => {
    setLoading(true);
    setValue(event.target.value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (value !== "") {
        fetchData();
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  /*if(!data){
    return(
      <div id="v2" className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="loader"></div> 
      </div>
    )
  }*/

  return (
    <div id="v2" className="w-screen h-screen flex gap-5 justify-center items-center">
      <textarea type="text" placeholder="Type something" value={value} onChange={handleChange} className="bg-white p-2 px-3 w-[25rem] h-[15rem] rounded-2xl shadow-lg text-gray-600 border border-gray-200 resize-none" />
      <div className="bg-[#f7f7f7] p-1 px-2 w-[25rem] h-[15rem] rounded-lg shadow-lg text-gray-600">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="h-full w-full">
            {data.detectedLang === "Czech" && (
              <img src={flagUrl} alt="" height={10} width={20}/>
            )}
            <p className="mb-1 h-5">{data.detectedLang}</p>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p>{data.translatedText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
