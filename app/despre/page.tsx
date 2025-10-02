"use client";

import Image from "next/image";
import HeaderDespre from "./components/HeaderDespre";
import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseService";
import { collection, getDocs } from "firebase/firestore"; // Folosește Firestore

import StatisticsSection from "../components/StatisticsSection";

// Descarcă datele din Firebase
const fetchDespreData = async () => {
    const querySnapshot = await getDocs(collection(db, "despre"));
    return querySnapshot.docs.map(doc => doc.data());
};

const DesprePage = () => {
    const [despreData, setDespreData] = useState<any>(null);

    useEffect(() => {
        fetchDespreData().then((data) => {
            setDespreData(data[0]); // presupunem că există un singur document
        });
    }, []);

    if (!despreData) return <div>Loading...</div>; // Așteptăm datele din Firebase

    return (
        <div>
            <HeaderDespre />
            <div className="flex flex-col items-center bg-white min-h-screen py-12 pt-16 px-20 w-full">
          
                <section className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-gray-100 to-gray-300 p-10 rounded-3xl shadow-lg">
                    <div className="md:w-1/2 text-left ml-10">
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">{despreData.titlu}</h2>
                        <p className="text-gray-600 mt-6">{despreData.descriere_detaliata}</p>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <Image
                            src={despreData.image_url || "https://i.postimg.cc/4NJtX3SL/DESPRE.jpg"}
                            alt="DESPRE"
                            width={400}
                            height={250}
                            className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                </section>  
                
                {/* Valorile noastre */}
                <section className="py-16 mt-5 bg-white">
                    <div className="text-center max-w-xl mx-auto">
                        <h2 className="text-4xl font-extrabold text-gray-800">{despreData.valori_titlu}</h2>
                        <p className="text-lg mt-4 text-gray-600">{despreData.valori_descriere}</p>
                    </div>

                    <div className="flex flex-wrap justify-center items-start gap-10 mt-14">
                        {despreData.valori.map((valoare: any, index: number) => (
                            <div key={index} className="flex flex-col items-center w-40 text-center">
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                                    {valoare.titlu.slice(0, 2).toUpperCase()}
                                </div>
                                <h4 className="text-lg font-semibold mt-4 text-gray-800">{valoare.titlu}</h4>
                                <p className="text-sm mt-2 text-gray-600">{valoare.descriere}</p>
                            </div>
                        ))}
                    </div>
                </section>


                
                {/* Misiunea noastră */}
                <section className="mt-5">
                    <div className="text-center max-w-[533px] mx-auto">
                        <h2 className="text-4xl font-extrabold text-gray-800">{despreData.misiune_titlu}</h2>
                        <p className="text-lg mt-4 text-gray-600">{despreData.misiune_descriere}</p>
                    </div>

                   
                </section>
            </div>
             {/* Secțiunea de statistici */}
            <StatisticsSection />
        </div>
    );
};

export default DesprePage;