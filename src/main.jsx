import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GuessNumberGame from './GuessNumberGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuessNumberGame />
  </StrictMode>,
)
