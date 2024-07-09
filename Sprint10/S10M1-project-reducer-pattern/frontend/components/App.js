import React, { useReducer } from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes

// 👇 create your initial state object here
const initialState = {
    quotes: [
        {
            id: getNextId(),
            quoteText: "Don't cry because it's over, smile because it happened.",
            authorName: "Dr. Seuss",
            apocryphal: false,
        },
        {
            id: getNextId(),
            quoteText: "So many books, so little time.",
            authorName: "Frank Zappa",
            apocryphal: false,
        },
        {
            id: getNextId(),
            quoteText: "Be yourself; everyone else is already taken.",
            authorName: "Oscar Wilde",
            apocryphal: false,
        }
    ],
    displayAllQuotes: true,
    highlightedQuote: null
}

const reducer = (state, action) => {
    // 👇 implement your reducer here using the action types above
    switch (action.type) {
        case CREATE_QUOTE:
            // add a quote from the payload to the state.quotes object
            return { ...state, quotes: [...state.quotes, action.payload] }
        case DELETE_QUOTE:
            // remove a quote from the state.quotes object using id from action.payload
            return {
                ...state,
                quotes: state.quotes.filter(q => q.id != action.payload)
            }
        case EDIT_QUOTE_AUTHENTICITY:
            // toggle a specified quote.apocryphal value from state.quotes using id from action.payload
            return {
                ...state,
                quotes: state.quotes.map(q => {
                    if (q.id == action.payload) return { ...q, apocryphal: !q.apocryphal }
                    return q
                })
            }
        case SET_HIGHLIGHTED_QUOTE:
            // set state.highlightedQuote to a quote id from action.payload if state.highlightedQuote != quote id already, else set it to null
            return {
                ...state,
                highlightedQuote: action.payload != state.highlightedQuote ? action.payload : null
            }
        case TOGGLE_VISIBILITY:
            // toggle state.displayAllQuotes
            return { ...state, displayAllQuotes: !state.displayAllQuotes }
        default:
            return state
    }

}

const createAction = (type, payload) => {
    return { type, ...(payload && { payload }) }
}

export default function App() {
    // 👇 use the reducer hook to spin up state and dispatch
    const [state, dispatch] = useReducer(reducer, initialState)

    const createQuote = ({ authorName, quoteText }) => {
        // 👇 use the helper function above to create a new quote
        // 👇 and dispatch it over to the reducer
        const newQuote = {
            id: getNextId(),
            quoteText,
            authorName,
            apocryphal: false
        }
        dispatch(createAction(CREATE_QUOTE, newQuote))
    }
    const deleteQuote = id => {
        // 👇 implement
        dispatch(createAction(DELETE_QUOTE, id))
    }
    const editQuoteAuthenticity = id => {
        // 👇 implement
        dispatch(createAction(EDIT_QUOTE_AUTHENTICITY, id))
    }
    const setHighlightedQuote = id => {
        // 👇 implement
        dispatch(createAction(SET_HIGHLIGHTED_QUOTE, id))
    }
    const toggleVisibility = () => {
        // 👇 implement
        dispatch(createAction(TOGGLE_VISIBILITY))
    }

    return (
        <div id="mp">
            <h2>Module Project</h2>
            <Quotes
                quotes={state.quotes}
                // 👇 lots of props are missing! Check the Quotes component
                highlightedQuote={state.highlightedQuote}
                displayAllQuotes={state.displayAllQuotes}
                deleteQuote={deleteQuote}
                editQuoteAuthenticity={editQuoteAuthenticity}
                setHighlightedQuote={setHighlightedQuote}
                toggleVisibility={toggleVisibility}
            />
            <QuoteForm
                createQuote={createQuote}
            />
        </div>
    )
}
