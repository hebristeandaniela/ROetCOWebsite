import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <img src="/assets/Logo_ROetCO.jpg" alt="RoEtCo" className="w-30 h-30 mb-2" />
            <h2 className="text-xl font-semibold">Se încarcă...</h2>
        </div>
    );
}