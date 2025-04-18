'use client';
import { useState } from 'react';
import words from "../data/word_generator.json";

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export default function AddLibraryButton() {
  const [status, setStatus] = useState(null);

  async function handleAdd() {
    try {
      console.log("Making POST");

      const generatedName = getRandomWord(words.adjectives) + "-" + getRandomWord(words.nouns)
      const res = await fetch('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: generatedName,
          latitude: getRandomFloat(25, 49),
          longitude: getRandomFloat(-66, -125),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse JSON:', jsonErr);
        setStatus('Failed to parse server response');
        return;
      }

      if (!res.ok) {
        console.error('❌ Server responded with error:', data);
        setStatus(`Error: ${data?.error || 'Unknown error'}`);
        return;
      }

      console.log('✅ Created Library:', data);
      setStatus(`Added: ${data.id}`);
    } catch (err) {
      console.error('❌ Network or server error:', err);
      setStatus('Request failed');
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Library
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}