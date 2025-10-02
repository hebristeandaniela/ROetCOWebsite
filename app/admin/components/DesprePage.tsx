"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseService";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const DesprePage = () => {
    const [despreData, setDespreData] = useState<any>(null);
    const [titlu, setTitlu] = useState("");
    const [descriereDetaliata, setDescriereDetaliata] = useState("");
    const [imagineURL, setImagineURL] = useState("");

    type Valoare = { titlu: string; descriere: string };
    const [valori, setValori] = useState<Valoare[]>([{ titlu: "", descriere: "" }]);

    const [misiuneTitlu, setMisiuneTitlu] = useState("");
    const [misiuneDescriere, setMisiuneDescriere] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "despre"));
            const data = querySnapshot.docs.map(doc => doc.data())[0];
            setDespreData(data);
            setTitlu(data.titlu);
            setDescriereDetaliata(data.descriere_detaliata);
            setImagineURL(data.image_url);
            setValori(data.valori);
            setMisiuneTitlu(data.misiune_titlu);
            setMisiuneDescriere(data.misiune_descriere);
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        const docRef = doc(db, "despre", "despreDoc");

        await updateDoc(docRef, {
            titlu,
            descriere_detaliata: descriereDetaliata,
            valori,
            misiune_titlu: misiuneTitlu,
            misiune_descriere: misiuneDescriere,
            image_url: imagineURL,
        });

        alert("Datele au fost salvate cu succes!");
    };

    const handleValoriChange = (index: number, field: keyof Valoare, value: string) => {
        const updatedValori = [...valori];
        updatedValori[index][field] = value;
        setValori(updatedValori);
    };

    const handleDeleteValoare = (index: number) => {
        const updatedValori = valori.filter((_, i) => i !== index);
        setValori(updatedValori);
    };

    if (!despreData) return <div className="p-6 text-gray-600">Se încarcă...</div>;

    return (
        <div className="px-4 mt-10 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                Administrează Pagina "Despre"
            </h1>
         
            {/* Titlu */}
            <div className="mb-6">
                <label className="block text-base font-semibold text-black mb-1">Titlu:</label>
                <input
                    type="text"
                    value={titlu}
                    onChange={(e) => setTitlu(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded bg-white text-black"
                />
            </div>

            {/* Descriere detaliată */}
            <div className="mb-6">
                <label className="block text-base font-semibold text-black mb-1">Descriere detaliată:</label>
                <textarea
                    value={descriereDetaliata}
                    onChange={(e) => setDescriereDetaliata(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded bg-white text-black min-h-[100px]"
                />
            </div>

            {/* Imagine */}
            <div className="mb-8">
                <label className="block text-base font-semibold text-black mb-2">URL Imagine principală:</label>
                {imagineURL && (
                    <div className="mb-4">
                        <img
                            src={imagineURL}
                            alt="Imagine actuală"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-md border mx-auto"
                        />
                    </div>
                )}
                <input
                    type="text"
                    value={imagineURL}
                    onChange={(e) => setImagineURL(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                    placeholder="https://link-catre-imagine.jpg"
                />
            </div>

            {/* Valorile noastre */}
            <div className="mb-8">
                <label className="block text-base font-semibold text-black mb-4">Valorile noastre:</label>
                {valori.map((valoare, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded bg-white shadow-sm relative">
                        <input
                            type="text"
                            value={valoare.titlu}
                            onChange={(e) => handleValoriChange(index, "titlu", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                            placeholder="Titlu valoare"
                        />
                        <textarea
                            value={valoare.descriere}
                            onChange={(e) => handleValoriChange(index, "descriere", e.target.value)}
                            className="w-full p-2 mt-2 border border-gray-300 rounded bg-white text-black"
                            placeholder="Descriere valoare"
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteValoare(index)}
                            className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Șterge
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setValori([...valori, { titlu: "", descriere: "" }])}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Adaugă o valoare
                </button>
            </div>

            {/* Misiune */}
            <div className="mb-6">
                <label className="block text-base font-semibold text-black mb-1">Misiunea noastră:</label>
                <input
                    type="text"
                    value={misiuneTitlu}
                    onChange={(e) => setMisiuneTitlu(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded bg-white text-black"
                    placeholder="Titlu misiune"
                />
                <textarea
                    value={misiuneDescriere}
                    onChange={(e) => setMisiuneDescriere(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded bg-white text-black min-h-[100px]"
                    placeholder="Descriere misiune"
                />
            </div>

            <button
                onClick={handleSave}
                className="mt-6 w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Salvează
            </button>
        </div>
    );
};

export default DesprePage;
