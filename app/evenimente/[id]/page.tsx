"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import Image from "next/image";

interface Eveniment {
    id: string;
    titlu: string;
    descriere: string;
    descriere_detaliata: string;
    image: string;
}
interface Activitate {
    id: string;
    titlu: string;
    descriere: string;
    image: string;
}
export default function EvenimentPage() {
    const params = useParams();
    const id = params?.id as string;
    const [eveniment, setEveniment] = useState<Eveniment | null>(null);
    const [loading, setLoading] = useState(true);
    const [activitati, setActivitati] = useState<Activitate[]>([]);

    useEffect(() => {
        const fetchActivitati = async () => {
            if (!id) return;
            try {
                const ref = collection(db, "evenimente", id, "activitate");
                const snapshot = await getDocs(ref);
                const data = snapshot.docs.map(doc => {
                    const d = doc.data();
                    return {
                        id: doc.id,
                        titlu: d.titlu || "",
                        descriere: d.descriere || "",
                        image: d.image || "/public/assets/solutiiVIDEOCONF.jpg", // un fallback default local
                    };
                }) as Activitate[];

                setActivitati(data);
            } catch (error) {
                console.error("Eroare la încărcarea activităților:", error);
            }
        };

        fetchActivitati();
    }, [id]);

    useEffect(() => {
        const fetchEveniment = async () => {
            try {
                const ref = collection(db, "evenimente");
                const q = query(ref, where("id", "==", id));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setEveniment(data as Eveniment);
                } else {
                    console.warn("Evenimentul nu a fost găsit");
                }
            } catch (e) {
                console.error("Eroare la încărcarea evenimentului:", e);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEveniment();
    }, [id]);

    if (loading) return <p className="text-center py-10">Se încarcă...</p>;
    if (!eveniment) return <p className="text-center py-10">Evenimentul nu a fost găsit.</p>;

    return (
        <div className="bg-white">
            {/* HERO SECTION */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                    src={eveniment.image}
                    alt={eveniment.titlu}
                    fill
                    className="object-cover brightness-60"
                />

                {/* Overlay doar peste imagine */}
                <div className="absolute top-20 left-0 w-full h-full bg-black opacity-70 z-10" />
               
                {/* Gradient mic de tranziție în jos */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20" />

                {/* Text peste imagine */}
                <div className="absolute mt-20 inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                        {eveniment.titlu}
                    </h1>
                </div>
            </div>

            

            {/* DESCRIERE */}
            <section className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Despre eveniment</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {eveniment.descriere_detaliata || eveniment.descriere}
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center">
                        <svg
                            className="w-24 h-24 text-indigo-500 animate-bounce"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* EXTRAS / ACTIVITĂȚI */}
            <section className="bg-indigo-50 py-12">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
                    {activitati.map((act) => (
                        <div
                            key={act.id}
                            className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
                        >
                            <div className="h-[200px] bg-gray-200 relative">
                                <Image
                                    src={act.image}
                                    alt={act.titlu}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">{act.titlu}</h3>
                                <p className="text-gray-600 text-sm">{act.descriere}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
