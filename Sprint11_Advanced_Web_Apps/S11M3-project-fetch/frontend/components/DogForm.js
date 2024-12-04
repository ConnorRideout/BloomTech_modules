import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { DogsContext } from '../context/dogs'
import buildUrl from '../constants'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm() {
    const {
        dogToEdit,
        setDogToEdit,
        dogBreeds
    } = useContext(DogsContext)
    const [values, setValues] = useState(initialForm)
    useEffect(() => {
        if (dogToEdit) {
            let { id, ...formVals } = dogToEdit
            setValues(formVals)
        }
    }, [])
    const navigate = useNavigate()

    // helper function
    const doFetch = (method, payload, urlAppend = '') => {
        fetch(buildUrl(urlAppend), {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`)
                }
                clearForm()
                navigate('/')
            })
            .catch(err => {
                console.error(`Something went wrong ${method}ing dog: ${err}`)
            })
    }

    // event handlers
    const onSubmit = evt => {
        evt.preventDefault()
        if (dogToEdit) {
            // update existing entry using PUT
            const { id } = dogToEdit
            const payload = { id, ...values }
            doFetch('PUT', payload, id)
        } else {
            // create new entry using POST
            doFetch('POST', values)
        }
    }
    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        setValues({
            ...values, [name]: type === 'checkbox' ? checked : value
        })
    }
    const clearForm = evt => {
        evt?.preventDefault()
        setDogToEdit(null)
        setValues(initialForm)
    }

    return (
        <div>
            <h2>
                {dogToEdit ? 'Update' : 'Create'} Dog
            </h2>
            <form onSubmit={onSubmit}>
                <input
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    placeholder="Name"
                    aria-label="Dog's name"
                />
                <select
                    name="breed"
                    value={values.breed}
                    onChange={onChange}
                    aria-label="Dog's breed"
                >
                    <option value="">---Select Breed---</option>
                    {dogBreeds?.map((breed, idx) => (
                        <option key={idx} value={breed}>{breed}</option>
                    ))}
                </select>
                <label>
                    Adopted: <input
                        type="checkbox"
                        name="adopted"
                        checked={values.adopted}
                        onChange={onChange}
                        aria-label="Is the dog adopted?"
                    />
                </label>
                <div>
                    <button type="submit">
                        {dogToEdit ? 'Update' : 'Create'} Dog
                    </button>
                    <button aria-label="Reset form" onClick={clearForm}>Reset</button>
                </div>
            </form>
        </div>
    )
}