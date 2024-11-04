from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import openai_v2 as oai
import json
import requests

weather_api_key = os.environ.get("OPENWEATHER_API_KEY")

class Translate(BaseModel):
    czech: str
    english: str

class WordRequest(BaseModel):
    word: str

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/translate")
def translate(data: dict):
    fpath = 'slovnik_cz_en.txt'
    if not os.path.exists(fpath):
        print('File does not exist')
    else:    
        with open(fpath, 'r', encoding='utf-8') as f:
            _word = data.get("word")
            for line in f:
                if _word in line:
                    english, czech = line.strip().split('=', 1)
                    return {"english": english, "czech": czech}
        return {"message": "Slovo nenalezeno"}
    
@app.post("/translate-v2")
def translate_v2(data: dict):
    response = oai.translate_with_GPT(data.get("input"))
    return {
        "input": data.get("input"),
        "translatedText": response.get("translated"),
        "detectedLang": response.get("detectedLang")
    }

@app.post("/weather")
def weather(data: dict):
    city = data.get("city")
    state_code = data.get("state_code")
    country_code = data.get("country_code")
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{state_code},{country_code}&appid={weather_api_key}"

    headers = {"Content-Type": "application/json"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {"message": "Error", "status_code": response.status_code, "response": response.json()}