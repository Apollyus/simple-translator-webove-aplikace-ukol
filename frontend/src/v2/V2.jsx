import React, { useEffect, useState } from "react";
import OpenAI from "openai";

export default function V2() {
  const [data, setData] = useState("");
  /*const [completion, setCompletion] = useState("");

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
      const fetchData = async () => {
        const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true});

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful intelligent translator. You will be given phrase or word in any language and you have to translate it to czech. Without grammar mistakes." },
            {
              role: "user",
              content: "Ja! Navall!",
            },
          ],
        });

        setCompletion(response.choices[0].message.content);
      };

      fetchData();
  }, []);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/translate-v2", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: "ikhjb" }) // Assuming the payload should be an object
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else{
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchData();
}, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Hello world!</h1>
      <p>Detected language: {data.detectedLang}</p>
      <p>Translated text: {data.translatedText}</p>
    </div>
  );
}