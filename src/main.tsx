import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameLobby from './GameLobby.tsx'
import Game from './Game.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <GameLobby /> },
  { path: '/play/:id', element: <Game /> },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
