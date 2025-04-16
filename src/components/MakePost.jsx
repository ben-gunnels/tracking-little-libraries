'use client';

import { useState } from 'react';

export default function AddLibraryButton() {
  const [status, setStatus] = useState(null);

  async function handleAdd() {
    const res = await fetch('/api/libraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: 37.7749,
        longitude: -122.4194,
      }),
    });

    const data = await res.json();
    setStatus(`Added: ${data.id}`);
  }

  return (
    <div>
      <button onClick={handleAdd} className="p-2 bg-blue-500 text-white">
        Add Library
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}