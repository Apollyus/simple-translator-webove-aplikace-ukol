import React, { useEffect, useState, useRef } from "react";
import { countries, findFlagUrlByCountryName, findFlagUrlByIso2Code } from "country-flags-svg";
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
        const _detectedLang = String(data.detectedLang);
        const _flagUrl = findFlagUrlByIso2Code(_detectedLang);
        console.log(_flagUrl);
        setFlagUrl(_flagUrl);
        console.log(flagUrl);
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

  console.log("test", flagUrl);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div id="v2" className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <div className="flex gap-5">
        <textarea type="text" placeholder="Co přeložíme?" value={value} onChange={handleChange} className="bg-white p-2 px-3 w-[25rem] h-[15rem] rounded-2xl text-gray-600 border border-gray-200 resize-none" />
        <div className="bg-[#f7f7f7] p-1 px-2 w-[25rem] h-[15rem] rounded-lg shadow-lg text-gray-600">
          {loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="h-full w-full flex flex-col">
              <div className="flex gap-3">
                <img src={flagUrl} alt="" height={10} width={20}/>
                <p className="mb-1 h-5">{data.detectedLang}</p>
              </div>
              <div className="bg-gray-300 h-[1px] w-full"></div>
              <p>{data.translatedText}</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-5 my-3 text-gray-600'>
          <a href="/" className='text-blue-500 underline'>V1</a>
          <p className="cursor-not-allowed">V2</p>
          <a href="/weather" className='text-blue-500 underline'>Weather</a>
        </div>
    </div>
  );
}
