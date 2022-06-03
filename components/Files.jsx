import React,{useRef, useState, useEffect} from 'react'
import {updPic} from '../utils/httpRequest'

const Files = () => {

    const hiddenFileInput = useRef(null);

    const handleChange = event => {

        if (event.target.files) {
            const pic = event.target.files[0];

            const formData = new FormData();
            formData.append("files[]", pic);

            updPic(formData)
            .then(res=>console.log(res))
            .catch((error)=>console.error('Error:', error))
        }
    };


    const handleClick = event => {
        hiddenFileInput.current.click();
    };
  return (
    <div>
        <input type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}

                  accept="image/*"/>

        <button onClick={handleClick}>Upload</button>

    </div>          
  )
}

export default Files