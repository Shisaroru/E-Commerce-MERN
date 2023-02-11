import React from 'react'
import { FaPaypal, FaReact } from 'react-icons/fa'
import { SiExpress, SiMongodb } from 'react-icons/si'

function Footer() {
    return (
        <footer className='p-2 grid grid-cols-2 items-end bg-primary w-full h-20'>
            <span className="text-2xl italic">Powered by
                <span className='text-2xl'>
                    <FaPaypal className='inline-block ml-2 align-middle'></FaPaypal>
                    <FaReact className='inline-block ml-2 align-middle'></FaReact>
                    <SiExpress className='inline-block ml-2 align-middle'></SiExpress>
                    <SiMongodb className='inline-block ml-2 align-middle'></SiMongodb>
                </span>
            </span>
            <span className="justify-self-end">
                CT271-02 NLCS
                Made by Trịnh Minh Thanh - B1909985
            </span>
        </footer>
    )
}

export default Footer