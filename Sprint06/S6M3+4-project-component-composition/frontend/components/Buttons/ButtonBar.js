import React from "react"
import styled from 'styled-components'

import GetRandom from "./GetRandom"
import GetDate from "./GetDate"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
`

function ButtonBar(props) {
    return (
        <Container>
            <p>{"Select a date to get that day's APOD image"}</p>
            <GetDate {...props} />
            <p>or</p>
            <GetRandom {...props} />
        </Container>
    )
}

export default ButtonBar