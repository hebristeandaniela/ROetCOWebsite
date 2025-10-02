
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseService";
import type { Proiecte } from "../types/proiecte"; // Poți crea un tip pentru proiecte, similar cu cel pentru soluții
import HeaderProiecte from "./components/HeaderProiecte";  // Poți crea un header pentru proiecte, similar cu cel de soluții
import Loading from "../components/Loading";

const Proiecte = () => {
    const [data, setData] = useState<Proiecte[]>([]);  // Folosim un tip pentru proiecte
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("🔄 Fetching data...");
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "proiecte"));  // Schimbăm colecția Solutii cu Proiecte
                const items: Proiecte[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }) as Proiecte);

                console.log("✅ Data fetched:", items);
                setData(items);
            } catch (error) {
                console.error("❌ Eroare la preluarea datelor: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <HeaderProiecte /> {/* Header pentru proiecte */}
            <div className="flex flex-col items-center bg-white min-h-screen py-12 pt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 mt-[-99px]">
                    {data.map((item) => {
                        console.log("🔍 Rendering project:", item.id, item.nume);

                        return (
                            <div key={item.id} className="flex flex-col bg-blue-100 shadow-lg rounded-lg overflow-hidden w-96 p-6 animate-fadeInUp">
                                <img
                                    src={item.image_url || "/assets/projects.png"}
                                    alt={item.nume}
                                    className="w-full h-80 object-cover rounded-md"
                                />
                                <div className="p-3">
                                    <h3 className="text-black text-left text-lg font-semibold mt-2">{item.nume}</h3>
                                    <p className="text-sm text-left text-gray-700 mt-2">
                                        {item.descriere
                                            .split("_")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </p>

                               
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Proiecte;
