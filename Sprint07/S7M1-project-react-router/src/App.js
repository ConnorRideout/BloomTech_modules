import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'

export default function App() {
    const [saved, setSaved] = useState([]) // Stretch: the ids of "saved" movies
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = () => {
            axios
                .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
                .then(response => {
                    // Study this response with a breakpoint or log statements
                    // and set the response data as the 'movies' slice of state
                    // console.log(response.data)
                    setMovies(response.data)
                })
                .catch(error => {
                    console.error('Server Error', error)
                })
        }
        getMovies()
    }, [])

    const addToSavedList = id => {
        // This is stretch. Prevent the same movie from being "saved" more than once
        // eslint-disable-next-line eqeqeq
        const addMovie = movies.find(mv => mv.id == id)
        if (!saved.includes(addMovie)) {
            setSaved([...saved, addMovie])
        }
    }

    return (
        <div>
            <SavedList list={saved} />

            {/* <div>Replace this Div with your Routes</div> */}
            <Routes>
                <Route path="/" element={<MovieList movies={movies} />} />
                <Route path="movies/:id" element={<Movie addToSavedList={addToSavedList} />} />
            </Routes>
        </div>
    )
}
