import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import AuthForm from './AuthForm'
import StarsList from './StarsList'

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Auth</NavLink>
        <NavLink to="stars">Stars</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="stars" element={<StarsList />} />
      </Routes>
    </>
  )
}
