export default function TestPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>✅ Server is Working!</h1>
      <p>If you can see this, the Next.js server is running fine.</p>
      <p>The issue is with Firebase connection or client-side JavaScript.</p>
      <a href="/" style={{ marginTop: '20px', display: 'inline-block', padding: '10px 20px', background: '#1ea05f', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
        Go to Homepage
      </a>
    </div>
  );
}
