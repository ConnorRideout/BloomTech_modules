import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Title from './Photo/Title'
import Image from './Photo/Image'
import Description from './Photo/Description'

import APOD_URL from '../constants'

function App() {
    const [apodData, setApodData] = useState([])
    useEffect(() => {
        axios.get(APOD_URL)
            .then(res => {
                // console.log(res.data)
                setApodData(res.data)
            }).catch(err => console.error(err))
    }, [])

    return (
        <div>
            <Title title={apodData.title} />
            <Image media_type={apodData.media_type} img_url={apodData.url} hd_img_url={apodData.hdurl} />
            <Description copyright={apodData.copyright} description={apodData.explanation} />
        </div>
    )
}

export default App
