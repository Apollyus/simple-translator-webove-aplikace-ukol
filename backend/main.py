from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

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
    return {"input": data.get("input"), "translatedText": "xxx" ,"detectedLang": "xxx"}