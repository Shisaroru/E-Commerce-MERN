import React from 'react'
import { BsArrowUpCircleFill } from 'react-icons/bs'

function ToTopButton() {
    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <BsArrowUpCircleFill
            className='z-50 fixed right-5 bottom-5 text-5xl cursor-pointer opacity-50 hover:opacity-70'
            onClick={toTop}
        ></BsArrowUpCircleFill>
    )
}

export default ToTopButton