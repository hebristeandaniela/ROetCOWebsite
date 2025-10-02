import React from "react";
import Image from "next/image"; export default function HeaderCard({ image, titlu, descriere }: any) {
    return (
        <div className="relative w-full md:w-[500px] h-[280px] rounded-lg overflow-hidden">
            {image ? (
                <Image
                    src={image}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt="Header Image"
                    className="absolute top-0 left-0"
                />
            ) : null}

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black text-center p-6">
                <h3 className="font-bold text-2xl text-white">{titlu}</h3>
                <p className="text-lg text-white">{descriere}</p>
                 </div>
        </div>
    );
}
