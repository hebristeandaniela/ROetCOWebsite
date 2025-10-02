
"use client";

import HeaderEvenimente from "./components/HeaderEvenimente";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseService";
import MoreInfo from "./components/MoreInfo";
import SocialM from "./components/SocialM";
import EvenimenteList from "./components/EvenimenteList";
import Loading from "../components/Loading";

type Eveniment = {
    id?: string;
    titlu: string;
    descriere: string;
    image: string;
};

export default function Evenimente() {
    const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "evenimente"));
                const events: Eveniment[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Eveniment[];
                setEvenimente(events);
                 
            } catch (error) {
                console.error("❌ Eroare la preluarea evenimentelor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;


    return (
        <div>
            <HeaderEvenimente />
            <div className="flex flex-col items-center bg-white min-h-screen py-12 pt-16">
                <MoreInfo />
                <EvenimenteList evenimente={evenimente} />
                <SocialM />
                
            </div>
        </div>
    );
}
