from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

OpenAI.api_key = os.environ.get("TESTUJEME")

client = OpenAI()

class FormatTranslate(BaseModel):
    input: str
    translated: str
    detectedLang: str

def translate_with_GPT(input):
    if(input != ""):
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", 
                "content": "You are advanced translation bot. You will be given text in unknown language and your mission is to translate it to czech language. In the detected language part always put ISO 3166-1 alpha-2 code of the country, for example CZ, GB, DE etc."},
                {
                    "role": "user",
                    "content": input
                }
            ],
            response_format=FormatTranslate
        )

        response = completion.choices[0].message.parsed
        _response = dict(response)
        return _response
    else:
        return ""