from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Translate(BaseModel):
    czech: str
    english: str

app = FastAPI()

@app.get("/cz_to_en/{word}")
def read_item(word: str):
    word = word.replace('+', ' ')
    with open('C:\\aa_programovani\\webove-aplikace-slovnik\\backend\\slovnik_cz_en.txt', 'r', encoding='utf-8') as f:
        for line in f:
            if word in line:
                return line.split()[0]
    return 'Slovo nenalezeno'

@app.get("/en_to_cz/{word}")
def test(word: str):
    word = word.replace('+', ' ')
    with open('C:\\aa_programovani\\webove-aplikace-slovnik\\backend\\slovnik_cz_en.txt', 'r', encoding='utf-8') as f:
        for line in f:
            if word in line:
                return line.split()[2]
    return 'Slovo nenalezeno' 

@app.post("/translate/")
def trnaslate_word(word: Translate):
    return {"czech": word.czech, "english": word.english}