import React, { useState } from 'react'
import Content from './Content'
import background from './images/background1.jpg'

function App() {
  return (
    <div className="container-fluid container-xxl p-0">
      <div
        style={{
          backgroundImage: `url(${background}) `,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ minHeight: '70vh' }}>
          <Content />
        </div>
      </div>
    </div>
  )
}

export default App
