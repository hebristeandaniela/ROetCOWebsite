'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../services/firebaseService'
import { doc, getDoc } from 'firebase/firestore'
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const [links, setLinks] = useState({
        facebook: '',
        instagram: '',
        tiktok: '',
        linkedin: '',
    })

    useEffect(() => {
        const fetchLinks = async () => {
            const docRef = doc(db, 'contact', 'detalii')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data()
                setLinks({
                    facebook: data.facebook || '',
                    instagram: data.instagram || '',
                    tiktok: data.tiktok || '',
                    linkedin: data.linkedin || '',
                })
            }
        }

        fetchLinks()
    }, []) 
    
    return (
        
        <footer className="bg-[#002C52]">
           
            <div className="container mx-auto px-20 text-white">
                <div className="flex flex-wrap justify-center pt-24 pb-12 gap-12 ml-10">
                    <div className="w-full md:w-1/2 lg:w-4/12 px-4 lg:mb-0">
                        <Link href="/" className="inline-block mb-10">
                            <Image width={100} height={55} src="/assets/Logo_ROetCO.jpg" alt="footer" />
                        </Link>
                        <p>Implementăm soluții avansate <br />de cablare structurată, administrare <br /> servere și mentenanță IT.</p>
                        
                        <div className="flex flex-wrap gap-3 mt-14">
                            {links.linkedin && (
                                <Link href={links.linkedin} target="_blank">
                                    <Image width={38} height={32} src="/assets/linkedinwhite.svg" alt="LinkedIn" />
                                </Link>
                            )}
                            
                            {links.facebook && (
                                <Link href={links.facebook} target="_blank">
                                    <Image width={38} height={33} src="/assets/facebookwhite.svg" alt="facebook" />
                                </Link>
                            )}

                            {links.instagram && (
                                <Link href={links.instagram} target="_blank" className="mt-0.5">
                                    <Image width={37} height={33} src="/assets/instagramwhite.svg" alt="instagram" />
                                </Link>
                            )}

                            {links.tiktok && (
                                <Link href={links.tiktok} target="_blank">
                                    <Image width={38} height={33} src="/assets/tiktokwhite.svg" alt="TikTok" />
                                </Link>
                            )}
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/4 lg:w-2/12 px-4 mb-16 lg:mb-0">
                        <h3 className="mb-8 text-lg font-semibold">MENIU</h3>
                        <div className="flex flex-col gap-3">
                            <Link href="/">Acasă</Link>
                            <Link href="/solutii">Soluții</Link>
                            <Link href="/proiecte">Proiecte</Link>
                            <Link href="/evenimente">Evenimente</Link>
                            <Link href="/despre">Despre</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>
                   
                    <div className="w-full md:w-1/3 lg:w-4/12">
                        <div className="flex mb-8 gap-2 lg:text-lg lg:font-semibold">
                            <Image width={20} height={10} src="/assets/LocationMarker.png" alt='LocationMarker' />
                            <h3>Locația Noastră</h3>
                        </div>
                        <div className="w-full lg:flex-1 py-1 lg:py-0">
                            <Link href="https://maps.app.goo.gl/AyUiRiL4zd1nLMdq6">
                                <Image width={340} height={219} src="/assets/location.jpeg" alt='location' />
                            </Link>
                        </div>
                    </div>
                </div>

              
                <div className="border-b border-[#CCCCCC]"></div>
            </div>
            <p className="text-[#999999] py-8 md:pb-8 text-sm text-center">
                ©Copyright. All rights reserved to RO ET CO INTERNATIONAL.
            </p>
        </footer>
    );
}
