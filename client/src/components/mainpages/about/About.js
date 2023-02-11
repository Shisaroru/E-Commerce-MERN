import React from 'react'

function About() {
    return (
        <section className='h-[65vh] grid grid-cols-2 bg-white my-2 mx-6 p-2 rounded-md text-2xl italic'>
            <article className='justify-self-center self-center'>
                <p>Dự án E-Commerce xây dựng bằng MERN Stack</p>
                <p>Niên luận cơ sở ngành CNTT</p>
                <p>Người thực hiện: Trịnh Minh Thanh - B1909985</p>
            </article>
            <img className='border-l-4 border-blue-300' src="/utils/logo.png" alt="" srcset="" />
        </section>
    )
}

export default About