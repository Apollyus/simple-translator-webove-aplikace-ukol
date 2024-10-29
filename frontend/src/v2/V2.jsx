import React, { useEffect, useState } from "react";
import OpenAI from "openai";

export default function V2() {
  const [completion, setCompletion] = useState("");

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
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Hello world!</h1>
      <p>{completion}</p>
    </div>
  );
}