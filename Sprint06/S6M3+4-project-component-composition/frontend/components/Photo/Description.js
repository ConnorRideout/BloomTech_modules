import React from 'react'
import styled from 'styled-components'


const DescDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`
const StyledHr = styled.hr`
    border: none;
    height: 1px;
    width: 90%;
    background: ${pr => pr.theme.fgColor};
    margin: 0 0 15px 0;
`


function Description(props) {
    return (
        <DescDiv>
            <StyledHr />
            <p>{props.description || 'Retrieving data, please wait'}</p>
        </DescDiv>
    )
}

export default Description