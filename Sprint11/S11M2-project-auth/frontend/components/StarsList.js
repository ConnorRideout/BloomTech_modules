import React, { useState, useEffect } from 'react'

export default function StarsList() {
  const [stars, setStars] = useState([])
  return (
    <div className="container">
      <h3>StarsList <button>Logout</button></h3>
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
