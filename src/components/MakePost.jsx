'use client';
import { useState } from 'react';

export default function AddLibraryButton() {
  const [status, setStatus] = useState(null);

  async function handleAdd() {
    try {
      console.log("Making POST");
      const res = await fetch('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: 37.7749,
          longitude: -122.4194,
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