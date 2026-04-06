'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("GLOBAL ERROR CAUGHT:", error);
  }, [error]);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#fee2e2', color: '#991b1b', height: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>⚠️ Client Error CAUGHT!</h2>
      <p style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <strong>Message:</strong> {error.message}
      </p>
      {error.stack && (
        <pre style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.7)', padding: '10px', overflowX: 'auto' }}>
          {error.stack}
        </pre>
      )}
      {error.digest && (
        <p style={{ marginTop: '20px' }}>
          <strong>Digest:</strong> {error.digest}
        </p>
      )}
         
      <button
        style={{ marginTop: '40px', padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', borderRadius: '4px' }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
