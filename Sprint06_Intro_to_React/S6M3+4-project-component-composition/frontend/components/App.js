import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import ButtonBar from './Buttons/ButtonBar'
import ImageDiv from './Photo/ImageDiv'

import APOD_URL from '../constants'


const ErrorHead = styled.h1`
    color: red;
    max-width: 50%;
    text-align: center;
    border: 1px solid ${pr => pr.theme.fgColor};
    border-radius: 10px;
    padding: 10px;
`
const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${pr => pr.theme.bgColor};
    color: ${pr => pr.theme.fgColor};
    padding: 10px;
    max-width: 1080px;
`


function App() {
    const [errCode, setErrCode] = useState(0)
    const [apodUrl, setApodUrl] = useState(APOD_URL)
    const [apodData, setApodData] = useState([])
    useEffect(() => {
        console.log(`getting data from ${apodUrl}`)
        axios.get(apodUrl)
            .then(res => {
                // console.log(res.data)
                const data = Array.isArray(res.data) ? res.data[0] : res.data
                setApodData(data)
                setErrCode(0)
            }).catch(err => {
                console.error(err)
                setApodData([])

                setErrCode(err.response.status)
            })
    }, [apodUrl])

    return (
        <MainDiv>
            <ButtonBar setApodUrl={setApodUrl} defaultUrl={APOD_URL} />
            {errCode ?
                <ErrorHead>
                    {errCode === 429 ?
                        "Too many image requests! Please wait before asking for another image"
                        :
                        "Couldn't get an image!"}
                </ErrorHead>
                :
                <ImageDiv apodData={apodData} />
            }
        </MainDiv >
    )
}

export default App
