import React, { useState } from "react"
import styled from 'styled-components'


const StyledBtn = styled.button`
    background-color: ${pr => pr.theme.bgLightColor};
    color: ${pr => pr.theme.fgLightColor};
    border: 2px solid ${pr => pr.theme.bgDarkColor};
    border-radius: 7px;
    cursor: pointer;
`

function GetRandom({ setApodUrl, defaultUrl }) {
    const [curCount, setCurCount] = useState(1)

    const updateUrl = () => {
        setApodUrl(`${defaultUrl}&count=${curCount}`)
        setCurCount(curCount === 1 ? 2 : 1)
    }

    return (
        <StyledBtn onClick={updateUrl}>Get Random Image</StyledBtn>
    )
}

export default GetRandom