// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit"

let id = 1
const getNextId = () => id++
const initialState = {
    displayAllQuotes: true,
    highlightedQuote: null,
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
        },
    ],
}

const slice = createSlice({
    name: 'quotes_state',
    initialState,
    reducers: {
        deleteQuote: (state, { payload }) => {
            state.quotes = state.quotes.filter(qt => qt.id != payload)
        },
        setHighlightedQuote: (state, { payload }) => {
            state.highlightedQuote = state.highlightedQuote == payload ? null : payload
        },
        editQuoteAuthenticity: (state, { payload }) => {
            const quote = state.quotes.find(qt => qt.id == payload)
            quote.apocryphal = !quote.apocryphal
        },
        toggleVisibility: state => {
            state.displayAllQuotes = !state.displayAllQuotes
        },
        createQuote: {
            prepare({ authorName, quoteText }) {
                const newQuote = {
                    id: getNextId(),
                    quoteText,
                    authorName,
                    apocryphal: false
                }
                return { payload: newQuote }
            },
            reducer(state, { payload }) {
                state.quotes.push(payload)
            }
        }
    }
})

export default slice.reducer
export const {
    deleteQuote,
    setHighlightedQuote,
    editQuoteAuthenticity,
    toggleVisibility,
    createQuote
} = slice.actions