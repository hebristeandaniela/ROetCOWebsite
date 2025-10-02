"use client";

import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseService";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

type Eveniment = {
    titlu: string;
    descriere: string;
    image?: string;
};

export default function EvenimentSection() {
    const [evenimente, setEvenimente] = useState<Eveniment[]>([]);

    useEffect(() => {
        const fetchEvenimente = async () => {
            const colRef = collection(db, "evenimente");
            const snapshot = await getDocs(colRef);
            const data = snapshot.docs.map((doc) => doc.data() as Eveniment);
            setEvenimente(data);
        };

        fetchEvenimente();
    }, []);

    return (
        <div className="bg-[url('/assets/exemplu.jpg')] bg-cover bg-bottom h-fit px-4 py-10 md:px-10 lg:px-14 xl:px-20 mx-auto">
            <div className="flex flex-col gap-6">
                {evenimente.map((event, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-md mx-auto p-6 sm:p-8 lg:p-10 text-center flex flex-col lg:flex-row items-center gap-6 shadow-lg"
                    >
                        <Image
                            width={238}
                            height={238}
                            src={event.image || "/assets/events.jpg"}
                            alt="event"
                            className="rounded-lg flex-none bg-cover bg-center w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                        />
                        <div className="flex flex-col gap-4 text-start">
                            <h1 className="text-primary font-extrabold text-xl sm:text-2xl lg:text-3xl">
                                {event.titlu}
                            </h1>
                            <p className="text-base sm:text-lg text-black">
                                {event.descriere}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
