import React from 'react'

function Description(props) {
    return (
        <div>
            {props.copyright ? <p className='copyright'>© {props.copyright}</p> : null}
            <p>{props.description || 'Retrieving data, please wait'}</p>
        </div>
    )
}

export default Description