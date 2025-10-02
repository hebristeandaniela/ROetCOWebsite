"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../services/firebaseService";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

interface Detaliu {
    titlu: string;
    descriere1: string;
    descriere2: string;
    descriere3: string;
}

interface Solutie {
    id: string;
    nume: string;
    descriere: string;
    descriere_Scurta: string;
    descriere_detaliata: string;
    image_url: string;
    detalii: {
        secțiuni: Detaliu[];
    };
}

export default function SolutiePage() {
    const params = useParams();
    const id = params?.id as string;

    const [data, setData] = useState<Solutie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const solutiiRef = collection(db, "solutii");
                const q = query(solutiiRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setData(docData as Solutie);
                } else {
                    console.warn("Soluția nu a fost găsită pentru id:", id);
                }
            } catch (error) {
                console.error("Eroare la preluarea datelor:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <p>Se încarcă...</p>;
    if (!data) return <p>Nu am găsit soluția.</p>;

    return (
        <div className="bg-white">
            {/* HEADER */}
            <div className="bg-[url('/assets/headerUp.jpg')] bg-cover bg-center h-[300px] p-14 mx-auto relative">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
                <div className='relative flex justify-center items-center h-full mt-10 z-10'>
                    <h1 className='text-white font-extrabold text-4xl text-center'>{data.nume}</h1>
                </div>
            </div>

            {/* CONȚINUT */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <section className="flex flex-col md:flex-row items-center gap-12 mt-16 bg-gradient-to-br from-blue-100 to-indigo-200 p-10 rounded-3xl shadow-lg">
                    <div className="md:w-1/2 text-left">
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">{data.descriere_Scurta}</h2>
                        <p className="text-gray-600 mt-6 text-justify">{data.descriere_detaliata}</p>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[400px] relative">
                            <Image
                                src={data.image_url}
                                alt="Soluție"
                                fill
                                className="rounded-xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                   
                </section>

                <section className="bg-white py-16 mt-20 rounded-3xl shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold text-gray-800">
                            Servicii oferite:
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-4">
                        {data.detalii.secțiuni.map((secțiune, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-xl text-center hover:bg-indigo-50 transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <svg className="w-12 h-12 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9 12l2 2l4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{secțiune.titlu}</h3>
                                <p className="text-gray-700">{secțiune.descriere1}</p>
                                {secțiune.descriere2 && <p className="text-gray-700 mt-3">{secțiune.descriere2}</p>}
                                {secțiune.descriere3 && <p className="text-gray-700 mt-3">{secțiune.descriere3}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
