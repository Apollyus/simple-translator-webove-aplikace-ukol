import React, { useState } from 'react';

function App() {
  const [translation, setTranslation] = useState({});
  const [word, setWord] = useState('');

  const sendTranslateRequest = () => {
    const dataToSend = { word: word }; // Define the data to send

    fetch('http://localhost:8000/translate', {
      method: 'POST', // Specify the method as POST
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(dataToSend), // Convert the data to JSON string
    })
      .then((response) => response.json())
      .then((data) => setTranslation(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <main>
      <p>{translation.message}</p>
      <p>CZ: {translation.czech}</p>
      <p>EN: {translation.english}</p>
      <div className='flex flex-col w-fit gap-3 mt-4'>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter word to translate"
        />
        <button onClick={sendTranslateRequest}>Translate</button>
      </div>
    </main>
  );
}

export default App;