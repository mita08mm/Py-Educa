import React, { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Frontend React</h1>
      <p>Mensaje del backend: {message}</p>
    </div>
  )
}

export default App
