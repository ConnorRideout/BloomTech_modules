import React from 'react'

function Title(props) {
    return (
        <h2>{props.title || 'Retrieving data, please wait...'}</h2>
    )
}

export default Title