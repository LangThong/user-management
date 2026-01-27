import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppTask from './AppTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App/>
   {/* <AppTask/> */}
  </StrictMode>,
)
