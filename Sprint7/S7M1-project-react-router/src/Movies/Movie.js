import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import MovieCard from './MovieCard'

export default function Movie(props) {
    const [movie, setMovie] = useState()

    // let id = 1
    // Change ^^^ that line and use a hook to obtain the :id parameter from the URL
    let { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/movies/${id}`) // Study this endpoint with Postman
            .then(response => {
                // Study this response with a breakpoint or log statements
                // and set the response data as the 'movie' slice of state
                // console.log(response.data)
                setMovie(response.data)
            })
            .catch(error => {
                console.error(error);
            });
        // This effect should run every time time
        // the `id` changes... How could we do this?
    }, [id]);

    // Uncomment this only when you have moved on to the stretch goals
    const saveMovie = evt => {
        props.addToSavedList(id)
    }

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />
            <div
                className="save-button"
                style={{ cursor: 'pointer' }}
                onClick={saveMovie}
            >Save</div>
        </div>
    );
}
