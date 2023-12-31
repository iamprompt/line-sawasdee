import './styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'

import App from './App.tsx'
import Providers from './components/Providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster position="top-center" richColors />
    </Providers>
  </React.StrictMode>,
)
