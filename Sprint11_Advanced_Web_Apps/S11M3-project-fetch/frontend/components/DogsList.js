import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { DogsContext } from '../context/dogs'
import buildUrl from '../constants'

export default function DogsList() {
    const {
        updateDogsList,
        dogsList,
        setDogToEdit
    } = useContext(DogsContext)
    useEffect(() => { updateDogsList() }, [])
    const navigate = useNavigate()

    // event handlers
    const onClickEdit = dog => {
        setDogToEdit(dog)
        navigate('/form')
    }
    const onClickDelete = id => {
        fetch(buildUrl(id), { method: 'DELETE' })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`)
                }
                setDogToEdit(null)
                updateDogsList()
            })
            .catch(err => `Something went wrong DELETEing dog: ${err}`)
    }
    return (
        <div>
            <h2>Dogs Shelter</h2>
            <ul>
                {dogsList?.map(dog => {
                    const { id, name, breed, adopted } = dog
                    return (
                        <li key={id}>
                            {`${name}, ${breed}, ${adopted ? '' : 'NOT '}adopted`}
                            <div>
                                <button onClick={() => onClickEdit(dog)}>Edit</button>
                                <button onClick={() => onClickDelete(id)}>Delete</button>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}
