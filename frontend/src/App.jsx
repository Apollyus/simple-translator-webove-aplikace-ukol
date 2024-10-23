import React, { useState } from 'react';

function App() {
  const [translation, setTranslation] = useState({});
  const [word, setWord] = useState('');
  const [notFound, setNotFound] = useState(false);

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
      .then((data) => {
        setTranslation(data);
        return data; // Return the data to the next .then
      })
      .then((translation) => {
        setWord('');
        // Clear the input field
        if (translation.message === 'Slovo nenalezeno') {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendTranslateRequest();
    }
  };

  return (
    <main className='flex justify-center items-center bg-[#fffef1] w-screen h-screen'>
      <div className='bg-white rounded-xl p-4 shadow-xl'>
        {notFound && (
            <div className='bg-red-500 flex w-auto justify-between text-white rounded-lg p-1 px-3 mb-2'>
              <p>Slovo nenalezeno :/</p>
              <button onClick={() => setNotFound(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
            </div>
        )}
        <p>CZ: {translation.czech}</p>
        <p>EN: {translation.english}</p>
        <div className='flex flex-col w-fit gap-3 mt-4'>
          <label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Zadej slovo"
            className='rounded-xl bg-slate-100 border border-gray-300 shadow-inner p-1 px-2'
          />
          </label>
          <button onClick={sendTranslateRequest} className='bg-green-500 rounded-lg p-1 px-3 text-white'>Přelož</button>
        </div>
      </div>
    </main>
  );
}

export default App;