import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setHighlightedQuote,
    toggleVisibility,
} from '../state/quotesSlice'
import { useGetQuotesQuery, useDeleteQuoteMutation, useToggleFakeMutation } from '../state/quotesApi'

export default function Quotes() {
    const {
        data: quotes,
        error: quotesError,
        isLoading: quotesLoading,
        isFetching: quotesRefreshing
    } = useGetQuotesQuery()
    const [
        deleteQuote,
        {
            error: quoteDeleteError,
            isLoading: quoteDeleting,
        }
    ] = useDeleteQuoteMutation()
    const [
        toggleFake,
        {
            error: quoteToggleError,
            isLoading: quoteToggling,
        }
    ] = useToggleFakeMutation()
    const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
    const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
    const dispatch = useDispatch()
    const errMsg = txt => `Error ${txt} quotes, please try again.`
    return (
        <div id="quotes">
            <h3>Quotes</h3>
            <h3>{(quoteToggling || quoteDeleting || quotesRefreshing) && "Updating quotes, please wait..."}</h3>
            <span className='error'>{quotesError && errMsg("fetching")} {quoteDeleteError && errMsg("deleting")} {quoteToggleError && errMsg("toggling")}</span>
            <div>
                {
                    quotesLoading ? "Loading quotes, please wait..." :
                        quotes?.filter(qt => {
                            return displayAllQuotes || !qt.apocryphal
                        })
                            .map(qt => (
                                <div
                                    key={qt.id}
                                    className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
                                >
                                    <div>{qt.quoteText}</div>
                                    <div>{qt.authorName}</div>
                                    <div className="quote-buttons">
                                        <button onClick={() => deleteQuote(qt.id)}>DELETE</button>
                                        <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                                        <button onClick={() => toggleFake({ id: qt.id, data: { apocryphal: !qt.apocryphal } })}>FAKE</button>
                                    </div>
                                </div>
                            ))
                }
                {
                    !quotes?.length && "No quotes here! Go write some."
                }
            </div>
            {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
                {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
            </button>}
        </div>
    )
}
