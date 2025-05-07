import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
=======
import { BrowserRouter } from 'react-router-dom';
import App from './App'
>>>>>>> feature/module-visualization
import './index.css'
import { router } from './core/router/Router'
import { RouterProvider } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<<<<<<< HEAD
    <RouterProvider router={router} />
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> feature/module-visualization
  </React.StrictMode>,
)
