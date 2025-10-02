'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { db } from "../../services/firebaseService";
import { doc, getDoc } from 'firebase/firestore'

const SocialM = () => {
    const [facebook, setFacebook] = useState('#') // fallback

    useEffect(() => {
        const fetchFacebook = async () => {
            const docRef = doc(db, 'contact', 'detalii')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setFacebook(docSnap.data().facebook || '#')
            }
        }

        fetchFacebook()
    }, [])
     return (
        <section className="relative w-full max-w-7xl mx-auto mt-5 -mb-14 px-4 flex flex-col lg:flex-row items-center gap-[65px] lg:h-[510px]">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-[30px] lg:gap-[76px] w-full">
                {/* Titlu si Textul Descriere */}
                <div className="flex flex-col items-start gap-[30px] w-full lg:w-[465px] h-auto lg:h-[240px]">
                    <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#181818] leading-[120%]">
                        Check our Social Media!
                    </h2>
                    <p className="text-[16px] sm:text-[18px] font-medium text-[#181818] leading-[150%]">
                        Pentru a fi la zi cu evenimentele noastre și a afla cât mai multe informații legate de acestea te așteptăm pe pagina noastră de Facebook!
                    </p>

                    {/* Butonul Join Us */}
                    <div className="flex justify-center items-center bg-[#007AFF] rounded-[8px] w-[149px] h-[55px]">
                        <a
                            href={facebook}
                            target="_blank"
                            className="text-white text-[16px] sm:text-[18px] font-semibold"
                        >
                            Join us!
                        </a>
                    </div>
                </div>

                {/* Imaginea/Vectorul */}
                <div className="relative w-full lg:w-[544px] lg:h-[495px]">
                    {/* Imagine */}
                    <div className="absolute w-full h-full bg-[url('/assets/telefon.png')] bg-cover bg-center filter drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]"></div>
                </div>
            </div>
        </section>
    );
};

export default SocialM;
