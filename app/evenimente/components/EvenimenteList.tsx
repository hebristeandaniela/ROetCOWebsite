// components/EvenimenteList.tsx
import React from "react";
import EvenimentCard from "./EvenimentCard";

type Eveniment = {
    id?: string;
    titlu: string;
    descriere: string;
    image: string;
};

const EvenimenteList = ({ evenimente }: { evenimente: Eveniment[] }) => {
    return (
        <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {evenimente.map((eveniment) => (
                <EvenimentCard key={eveniment.id} eveniment={eveniment} />
            ))}
        </div>
    );
};

export default EvenimenteList;
