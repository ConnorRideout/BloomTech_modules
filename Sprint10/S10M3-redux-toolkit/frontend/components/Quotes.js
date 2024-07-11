import React from 'react'

export default function Quotes() {
  const quotes = [{ // ✨ `quotes` must come from the Redux store
    id: 3,
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  }]
  const displayAllQuotes = true // ✨ `displayAllQuotes` must come from the Redux store
  const highlightedQuote = 3 // ✨ `highlightedQuote` must come from the Redux store

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
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
                  <button onClick={() => {/* ✨ dispatch an action */ }}>DELETE</button>
                  <button onClick={() => {/* ✨ dispatch an action */ }}>HIGHLIGHT</button>
                  <button onClick={() => {/* ✨ dispatch an action */ }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => {/* ✨ dispatch an action */ }}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
