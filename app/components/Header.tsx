"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeaderCard from './HeaderCard';
import { db } from "../services/firebaseService";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Header() {
    const [cards, setCards] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [heroData, setHeroData] = useState<any>(null);

    const rotatingCards = cards.slice(0); // carduri care se rotesc

    // Fetch HERO (titlu, descriere, link, bg)
    useEffect(() => {
        const fetchHero = async () => {
            const docRef = doc(db, "hero", "main");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setHeroData(docSnap.data());
        };
        fetchHero();
    }, []);

    // Fetch cards pentru carusel
    useEffect(() => {
        const fetchCards = async () => {
            const querySnapshot = await getDocs(collection(db, "home"));
            const data = querySnapshot.docs.map(doc => doc.data());
            setCards(data);
        };
        fetchCards();
    }, []);

    useEffect(() => {
        if (rotatingCards.length === 0) return; // Dacă nu sunt carduri, ieșim din useEffect

        // Setăm intervalul pentru schimbarea cardurilor
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % rotatingCards.length); // Îl facem ciclic
        }, 5000); // La fiecare 3 secunde

        // Curățăm intervalul la demontarea componentului
        return () => clearInterval(interval);
    }, [rotatingCards]);

    // Verificăm dacă există carduri
    if (rotatingCards.length === 0) {
        return <p>Nu există carduri de afișat</p>; // Mesaj în cazul în care nu sunt carduri
    }

    return (
        <div
            className="bg-cover bg-center h-fit p-8 mx-auto relative"
            style={{ backgroundImage: `url(${heroData?.background || "/assets/bg4.jpg"})` }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70" />

            {/* HERO content */}
            <div className="flex flex-col lg:flex-row relative container p-8 items-center gap-4 xl:gap-8 xl:p-12 mt-12 z-10">
                {/* Textul */}
                <div className="lg:basis-2/3 text-center">
                    <h1 className="font-extrabold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        {heroData?.titlu || "PROMTITUDINE ȘI PERFORMANȚĂ!"}
                    </h1>

                    <p className="mt-5 text-white text-center xl:text-lg md:text-base">
                        {heroData?.descriere || "RO et CO îți oferă soluții IT profesionale, de la cablare structurată la administrare și mentenanță servere. Asigurăm suport tehnic rapid și eficient, optimizând infrastructura IT pentru securitate, stabilitate și performanță maximă. Cu RO et CO, tehnologia lucrează pentru succesul afacerii tale!"}
                    </p>

                    <div className="flex gap-8 mt-5 justify-center flex-wrap">
                        <Link
                            href={`https://wa.me/${heroData?.whatsapp || ""}`}
                            target="_blank"
                            className="bg-primary hover:bg-primary/90 transition text-white font-medium px-6 py-3 rounded-lg"
                        >
                            WhatsApp
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white hover:bg-gray-100 text-black font-medium px-6 py-3 rounded-lg"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Stampila (vizibilă doar pe ecrane medii și mari) */}
                <div className="hidden lg:flex lg:basis-1/3 justify-end items-start pr-4 pt-2">
                    <img
                        src="/assets/stampila.png"
                        alt="Stampila experienta"
                        className="w-28 md:w-32 xl:w-40 rotate-[20deg] drop-shadow-lg"
                    />
                </div>
            </div>


            {/* Carusel 1 card */}
            <div className="relative container mx-auto">
                <div className="flex justify-center items-center flex-wrap relative">
                    {/* Cardul rotativ */}
                    <HeaderCard
                        image={rotatingCards[currentIndex].image}
                        titlu={rotatingCards[currentIndex].titlu}
                        descriere={rotatingCards[currentIndex].descriere}
                    />
                </div>
            </div>
            
        </div>
    );
}
