import React from 'react';

export default function SimplePage() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#1ea05f', fontSize: '48px', marginBottom: '20px' }}>
        ✅ Website is Working!
      </h1>
      <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#333' }}>
        Agar aap yeh dekh sakte hain, toh server perfectly kaam kar raha hai.
      </p>
      <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
        The issue is with client-side JavaScript or Firebase connection.
      </p>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f0f0f0', 
        borderRadius: '10px' 
      }}>
        <h3 style={{ color: '#333' }}>Test Links:</h3>
        <ul style={{ lineHeight: '2' }}>
          <li><a href="/test" style={{ color: '#1ea05f' }}>Simple Test Page</a></li>
          <li><a href="/" style={{ color: '#1ea05f' }}>Homepage (might hang)</a></li>
        </ul>
      </div>
    </div>
  );
}
