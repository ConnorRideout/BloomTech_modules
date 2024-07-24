import React, { useEffect, useContext } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

import { DogsContext } from '../context/dogs'

export default function App() {
    const { getDogBreeds } = useContext(DogsContext)
    useEffect(() => { getDogBreeds() }, [])
    return (
        <div>
            <nav>
                <NavLink to="/">Dogs</NavLink>
                <NavLink to="/form">Form</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<DogsList />} />
                <Route path="/form" element={<DogForm />} />
            </Routes>
        </div>
    )
}
