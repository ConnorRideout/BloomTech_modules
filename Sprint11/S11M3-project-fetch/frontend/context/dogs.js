import React, { useReducer, createContext } from "react"

import buildUrl from "../constants"

// action types
const SET_DOG_TO_EDIT = 'SET_DOG_TO_EDIT'
const SET_DOGS_LIST = 'SET_DOGS_LIST'
const GET_DOG_BREEDS = 'GET_DOG_BREEDS'

// initial state
const initialState = {
    dogToEdit: null,
    dogsList: [],
    dogBreeds: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_DOGS_LIST: {
            return { ...state, dogsList: action.payload }
        }
        case SET_DOG_TO_EDIT: {
            // expects a dog object OR null
            return { ...state, dogToEdit: action.payload }
        }
        case GET_DOG_BREEDS: {
            return { ...state, dogBreeds: action.payload }
        }
    }
}

export const DogsContext = createContext()

export function DogsProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const updateDogsList = () => {
        fetch(buildUrl())
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`)
                }
                return res.json()
            })
            .then(dogs => {
                dispatch({ type: SET_DOGS_LIST, payload: dogs })
            })
            .catch(err => console.error(`Something went wrong GETing dogs: ${err}`))
    }
    const setDogToEdit = dog => {
        dispatch({ type: SET_DOG_TO_EDIT, payload: dog })
    }
    const getDogBreeds = () => {
        fetch(buildUrl('breeds'))
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`)
                }
                return res.json()
            })
            .then(breeds => {
                breeds.sort()
                dispatch({ type: GET_DOG_BREEDS, payload: breeds })
            })
            .catch(err => console.error(`Something went wrong GETing breeds: ${err}`))
    }
    const dataToProvide = {
        updateDogsList,
        setDogToEdit,
        getDogBreeds,
        ...state
    }

    return (
        <DogsContext.Provider value={dataToProvide}>
            {props.children}
        </DogsContext.Provider>
    )
}
