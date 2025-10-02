import React from 'react';

export default function HeaderSolutii() {
    return (
        <div className="bg-[url('/assets/headerUp.jpg')] bg-cover bg-center h-[300px] p-14 mx-auto relative">
            {/* Overlay negru */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

            {/* Text centrat */}
            <div className='relative flex justify-center items-center h-full mt-10 z-10'>
                <h1 className='text-white font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center'>
                    SOLUȚII
                </h1>
            </div>
        </div>
    );
}
