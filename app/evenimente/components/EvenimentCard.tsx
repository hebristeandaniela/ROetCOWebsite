
import Link from "next/link";
import React from "react";

type Eveniment = {
    id?: string;
    titlu: string;
    descriere: string;
    image: string;
};

const EvenimentCard = ({ eveniment }: { eveniment: Eveniment }) => {
    return (
        <div className="flex flex-col bg-[#C5E0FF] shadow-[0px_6px_28px_rgba(0,0,0,0.1)] rounded-[12px] overflow-hidden w-[375px] h-[516px] p-[18px]">
            <img
                src={eveniment.image || "/assets/placeholder.jpg"}
                alt={eveniment.titlu}
                className="w-full h-[300px] object-cover rounded-[5px]"
            />
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#0D0D0D]">{eveniment.titlu}</h3>
                <p className="text-sm text-gray-800 mt-2">{eveniment.descriere}</p>
              
            </div>
            <div className="mt-1 flex justify-end">
                {eveniment.id ? (
                    <Link href={`/evenimente/${eveniment.id}`} className="text-blue-600 hover:underline mt-4 font-medium">
                        Vezi detalii
                    </Link>
                ) : (
                    <p className="text-red-500 mt-4">ID indisponibil</p>
                )}
            </div>
        </div>
    );
};

export default EvenimentCard;
