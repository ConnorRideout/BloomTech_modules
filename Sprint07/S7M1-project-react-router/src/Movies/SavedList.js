import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'


export default function SavedList(props) {
    const navigate = useNavigate()

    return (
        <div className="saved-list">
            <h3>Saved Movies:</h3>
            {props.list.map(movie => (
                <NavLink
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="saved-movie"
                >{movie.title}</NavLink>
            ))}
            <div className="home-button" onClick={() => navigate('/')}>Home</div>
        </div>
    )
}
