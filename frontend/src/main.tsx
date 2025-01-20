import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import {AppProvider} from "./pages/AppProvider.tsx"; // Make sure this line exists

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
          <App />
      </AppProvider>
  </StrictMode>,
)
