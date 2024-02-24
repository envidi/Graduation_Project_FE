import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop.jsx'
import {QueryClientProvider,QueryClient } from 'react-query'
import { Analytics } from '@vercel/analytics/react'
import ContextProvider from './context/Context.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

    <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <ScrollToTop />
      <App />
    <Analytics />
    </ContextProvider>
   
    </QueryClientProvider>
    </BrowserRouter>

  </React.StrictMode>
)
