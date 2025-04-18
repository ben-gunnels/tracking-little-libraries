"use client"
import { useEffect, useState } from 'react';

export default function LocationForm({ token }) {
  const [consent, setConsent] = useState(false);
  const [denied, setDenied] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [posted, setPosted] = useState(false);
  const [status, setStatus] = useState(null);

  const handleAccept = () => {
    setConsent(true);
  }

  async function handlePost () {
    try {
        console.log("Making POST");
        
        const res = await fetch('/api/libraries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
            latitude: location.latitude,
            longitude: location.longitude,
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
        setPosted(true);
      } catch (err) {
        console.error('❌ Network or server error:', err);
        setStatus('Request failed');
      }
  }

  const handleDeny = () => {
    setDenied(true);
  }

  useEffect(() => {
    if (!consent) return;
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );
  }, [consent]);

  if (error) return <p>{error}</p>;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 text-center space-y-6">
        {
          !location && !denied ? (
            <>
              <h1 className="text-xl font-semibold text-gray-800">
                Do you give <span className="text-blue-600">Tracking Little Libraries</span> permission to use your location to expand our database?
              </h1>
              <div className="flex justify-center gap-6 pt-4">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={handleDeny}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Deny
                </button>
              </div>
            </>
          ) : location && !posted && !denied ? (
            <>
              <h2 className="text-lg font-medium text-green-700">Verify Your Location:</h2>
              <p className="text-gray-700">Latitude: {location.latitude}</p>
              <p className="text-gray-700">Longitude: {location.longitude}</p>
              <button
                  onClick={handlePost}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
                <button
                  onClick={handleDeny}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Deny
                </button>
            </>
          ) : denied ? (
            <h1 className="text-red-600 font-semibold">
              Tracking Little Libraries will not use your location.
            </h1>
          ) : posted ? (
            <>
              <h1 className="text-xl font-semibold text-gray-800">
                Thank you for giving <span className="text-blue-600">Tracking Little Libraries</span> permission to use your location to expand our database
              </h1>
              <p>
                Your location will be reviewed by our team. 
              </p>
            </>
          ) : (
            <h1 className="text-red-500">Something went wrong...</h1>
          )
        }
      </div>
    </div>
  );
}