import React, { useReducer } from 'react' // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
const initialState = {
    authorName: "",
    quoteText: ""
}

// 👇 create your reducer function here
const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            // change state.authorName OR state.quoteText (decided from action.payload.field) to action.payload.value
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        case RESET_FORM:
            return { ...initialState }
        default:
            return state
    }
}

export default function TodoForm({ createQuote }) {
    // 👇 use the reducer hook to spin up state and dispatch
    const [state, dispatch] = useReducer(reducer, initialState)

    const onChange = ({ target: { name, value } }) => {
        // 👇 implement
        const payload = { field: name, value }
        dispatch({ type: CHANGE_INPUT, payload })
    }
    const resetForm = () => {
        // 👇 implement
        dispatch({ type: RESET_FORM })
    }
    const onNewQuote = evt => {
        // 👇 implement
        evt.preventDefault()
        let { authorName, quoteText } = state;
        [authorName, quoteText] = [authorName, quoteText].map(n => n.trim())
        createQuote({ authorName, quoteText })
        resetForm()
    }

    // 👇 some props are missing in the JSX below:
    return (
        <form id="quoteForm" onSubmit={onNewQuote}>
            <h3>New Quote Form</h3>
            <label><span>Author:</span>
                <input
                    type='text'
                    name='authorName'
                    placeholder='type author name'
                    onChange={onChange}
                    value={state.authorName}
                />
            </label>
            <label><span>Quote text:</span>
                <textarea
                    type='text'
                    name='quoteText'
                    placeholder='type quote'
                    onChange={onChange}
                    value={state.quoteText}
                />
            </label>
            <label><span>Create quote:</span>
                <button
                    role='submit'
                    disabled={!(state.authorName.trim() && state.quoteText.trim())}
                >DO IT!</button>
            </label>
        </form>
    )
}
