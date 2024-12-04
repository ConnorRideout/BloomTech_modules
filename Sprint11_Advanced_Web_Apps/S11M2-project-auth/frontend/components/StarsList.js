import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function StarsList() {
    const [stars, setStars] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            logout()
        } else {
            axios.get('/api/stars', { headers: { Authorization: token } })
                .then(({ data }) => {
                    setStars(data)
                })
                .catch(err => {
                    if (err?.response?.status == 401) logout()
                })
        }
    }, [])
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="container">
            <h3>StarsList
                <button onClick={logout}>Logout</button>
            </h3>
            {stars.length > 0 ? (
                <div>
                    {stars.map((star) => (
                        <div key={star.id} style={{ marginBottom: '20px' }} className="star">
                            <h4>{star.fullName}</h4>
                            <p>Born: {star.born}</p>
                            <p>{star.bio}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No stars found.</p>
            )}
        </div>
    )
}
