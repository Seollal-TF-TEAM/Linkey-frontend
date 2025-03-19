import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello') // 상대 경로로 변경
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <p>Spring Boot Response: {message}</p>
    </div>
  );
}

export default App;