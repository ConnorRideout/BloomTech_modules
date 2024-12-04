import React from "react"
import styled from 'styled-components'

import Title from './Title'
import Image from './Image'
import Description from './Description'

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${pr => pr.theme.bgColor};
    color: ${pr => pr.theme.fgColor};
    padding: 10px;
    max-width: 1080px;
`
const StyledImageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${pr => pr.theme.fgColor};
    border-radius: 7px;
    padding: 10px;
`


function ImageDiv({ apodData }) {
    return (
        <MainDiv>
            <Title title={apodData.title} />
            <StyledImageDiv>
                <Image media_type={apodData.media_type} img_url={apodData.url} hd_img_url={apodData.hdurl} copyright={apodData.copyright} />
                <Description description={apodData.explanation} />
            </StyledImageDiv>
        </MainDiv>
    )
}

export default ImageDiv