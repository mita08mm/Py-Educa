import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './core/router/Router'
import { RouterProvider } from 'react-router-dom'
import { MyCoursesProvider } from "./modules/courses/hooks/useMyCourses";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MyCoursesProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </MyCoursesProvider>
  )
