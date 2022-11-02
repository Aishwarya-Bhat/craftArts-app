import React from 'react'

const ImageModal = ({clickedImg, setClickedImg}) => {
    const handleClick = (e) => {
        if(e.target.classList.contains("dismiss")){
            setClickedImg(null);
        }
    }
  return (
    <>
    <div className='overlay dismiss' onClick={handleClick}>
        <img src={clickedImg}/>
        </div>
    </>
  )
}

export default ImageModal