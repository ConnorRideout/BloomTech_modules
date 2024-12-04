import React from 'react'
import styled from 'styled-components'

const HeadTitle = styled.h2`
    border: 1px solid ${pr => pr.theme.fgColor};
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    padding: 5px 10%;
`

function Title(props) {
    return (
        <HeadTitle>{props.title || 'Retrieving data, please wait...'}</HeadTitle>
    )
}

export default Title