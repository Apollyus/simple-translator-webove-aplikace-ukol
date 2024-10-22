import { useEffect, useState } from 'react'

function App() {
  const [translation, setTranslation] = useState("");

  /*useEffect(() => {
    fetch('http://localhost:8000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: "ahoj"
      }),
    })
      .then((response) => response.json())
      .then((data) => setTranslation(data))
  }, [])*/

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((response) => response.json())
      .then(console.log(translation))
      .then((data) => setTranslation(data.toString()))
  }, [])

  console.log(translation)

  return (
    <main>
      <p>{translation}</p>
    </main>
  )
}

export default App
