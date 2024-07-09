import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    padding-bottom: ${pr => pr.media_type === 'image' ? '0' : '56.25%'};
    margin: 10px;
`
const PCopyright = styled.p`
    color: ${pr => pr.theme.fgDarkColor};
    font-size: small;
    align-self: stretch;
    text-align: right;
`
const StyledIframe = styled.iframe`
    position: absolute;    
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

function Image(props) {
    return (
        <Container media_type={props.media_type}>
            {props.media_type === 'image' ?
                <a href={props.hd_img_url || props.img_url}>
                    <img src={props.img_url}></img>
                </a>
                :
                <StyledIframe src={props.img_url}></StyledIframe>}
            {props.copyright ? <PCopyright className='copyright'>© {props.copyright}</PCopyright> : null}
        </Container>
    )
}

export default Image