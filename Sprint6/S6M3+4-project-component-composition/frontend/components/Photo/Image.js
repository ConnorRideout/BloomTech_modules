import React from 'react'

function Image(props) {
    return (
        <div>
            {props.media_type === 'image' ?
                <a href={props.hd_img_url}>
                    <img src={props.img_url}></img>
                </a> :
                <iframe src={props.img_url}></iframe>}
        </div>
    )
}

export default Image