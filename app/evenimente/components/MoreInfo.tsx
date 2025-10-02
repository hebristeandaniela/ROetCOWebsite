"use client";

import { useState, useEffect } from "react";
import { db } from "../../services/firebaseService";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const MoreInfo = () => {
    const [evenimentData, setEvenimentData] = useState<any>(null); // State pentru datele din Firestore

    useEffect(() => {
        // Funcția care preia datele din Firestore
        const fetchEvenimentData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "evenimentData"));
                querySnapshot.forEach(doc => {
                    setEvenimentData(doc.data()); // Setează datele
                });
            } catch (error) {
                console.error("Eroare la preluarea datelor din Firestore:", error);
            }
        };

        fetchEvenimentData();
    }, []);

    // Dacă datele nu sunt încă disponibile, afișează un loading
    if (!evenimentData) {
        return <div>Încărcare...</div>;
    }

    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-[30px] lg:gap-[65px] h-auto lg:h-[510px]">
            {/* 🖼️ Zona colaj imagini */}
            <div className="relative w-full ml-10 lg:w-[633px] grid grid-cols-2 gap-4 lg:grid-cols-2 h-auto lg:h-[510px]">
                {/* Imaginile sunt poziționate în grid pentru o mai bună vizibilitate */}
                <div className="relative mt-10">
                    <Image
                        src={evenimentData.image1} // Preia imaginea din Firestore
                        alt="eveniment 1"
                        width={285}
                        height={285}
                        className="rounded-[12px] shadow-lg object-cover"
                    />
                </div>
                <div className="relative mt-10">
                    <Image
                        src={evenimentData.image2} // Preia imaginea din Firestore
                        alt="eveniment 2"
                        width={285}
                        height={285}
                        className="rounded-[12px] shadow-lg object-cover"
                    />
                </div>
            </div>

            {/* ✍️ Textul informativ */}
            <div className="flex flex-col items-start gap-[30px] w-full lg:w-[469px] h-auto lg:h-[432px]">
                <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[120%] text-[#0D0D0D]">
                    Ce mai organizăm?
                </h2>
                <p className="text-[16px] sm:text-[18px] font-medium text-[#333] leading-[150%]">
                    {evenimentData.text1} {/* Preia textul din Firestore */}
                </p>
                <p className="text-[16px] sm:text-[18px] font-medium text-[#333] leading-[150%]">
                    {evenimentData.text2} {/* Preia textul din Firestore */}
                </p>
            </div>
        </section>
    );
};

export default MoreInfo;
