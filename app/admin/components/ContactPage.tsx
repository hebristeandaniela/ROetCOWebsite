"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseService";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const ContactPage = () => {
    const [loading, setLoading] = useState(true);
    const [titlu, setTitlu] = useState("");
    const [descriere, setDescriere] = useState("");
    const [adresa, setAdresa] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [tiktok, setTiktok] = useState("");

    useEffect(() => {
        const fetchContact = async () => {
            const docRef = doc(db, "contact", "detalii"); 
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitlu(data.titlu);
                setDescriere(data.descriere);
                setAdresa(data.adresa);
                setTelefon(data.telefon);
                setEmail(data.email);
                setLinkedin(data.linkedin || "");
                setFacebook(data.facebook || "");
                setInstagram(data.instagram || "");
                setTiktok(data.tiktok || "");
            }

            setLoading(false);
        };

        fetchContact();
    }, []);

    const handleSave = async () => {
        const docRef = doc(db, "contact", "detalii");

        await updateDoc(docRef, {
            titlu,
            descriere,
            adresa,
            telefon,
            email,
            linkedin,
            facebook,
            instagram,
            tiktok,
        });

        alert("Informațiile de contact au fost actualizate cu succes!");
    };

    const [text, setText] = useState('');
    const docRef = doc(db, 'gdpr', 'termeni&conditii');

    useEffect(() => {
        const load = async () => {
            const snap = await getDoc(docRef);
            if (snap.exists()) setText(snap.data().continut || '');
            setLoading(false);
        };
        load();
    }, []);

    const save = async () => {
        await updateDoc(docRef, { continut: text });
        alert('Salvat!');
    };

    if (loading) return <div className="p-6 text-gray-600">Se încarcă...</div>;

    return (
        <div className="px-4 mt-10 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                Administrează Pagina "Contact"
            </h1>

            <div className="mb-6">
                <label className="block text-base font-semibold mb-1">Titlu:</label>
                <input
                    type="text"
                    value={titlu}
                    onChange={(e) => setTitlu(e.target.value)}
                    className="w-full p-3 border bg-white border-gray-300 rounded"
                />
            </div>

            <div className="mb-6">
                <label className="block text-base font-semibold mb-1">Descriere:</label>
                <textarea
                    value={descriere}
                    onChange={(e) => setDescriere(e.target.value)}
                    className="w-full p-3 border bg-white border-gray-300 rounded min-h-[100px]"
                />
            </div>

            <div className="mb-6">
                <label className="block text-base font-semibold mb-1">Adresă:</label>
                <input
                    type="text"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                    className="w-full p-3 border bg-white border-gray-300 rounded"
                />
            </div>

            <div className="mb-6">
                <label className="block text-base font-semibold mb-1">Telefon:</label>
                <input
                    type="text"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    className="w-full p-3 border bg-white border-gray-300 rounded"
                />
            </div>

            <div className="mb-6">
                <label className="block text-base font-semibold mb-1">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border bg-white border-gray-300 rounded"
                />
            </div>

            {/* 👇 blocul pentru social media 👇 */}
                        <div className="mb-6">
                            <label className="block text-base font-semibold mb-1">LinkedIn:</label>
                            <input
                                type="text"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                className="w-full p-3 border bg-white border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-base font-semibold mb-1">Facebook:</label>
                            <input
                                type="text"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="w-full p-3 border bg-white border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-base font-semibold mb-1">Instagram:</label>
                            <input
                                type="text"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                className="w-full p-3 border bg-white border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-base font-semibold mb-1">TikTok:</label>
                            <input
                                type="text"
                                value={tiktok}
                                onChange={(e) => setTiktok(e.target.value)}
                                className="w-full p-3 border bg-white border-gray-300 rounded"
                            />
                        </div>
            <button
                onClick={handleSave}
                className="mt-6 w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Salvează
            </button>

                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black mt-20 text-center">
                    Administrează Pagina "GDPR"
                </h1>
                <h1 className="text-xl font-bold mb-8 text-center">Editează Termeni și Condiții</h1>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-96 p-4 border bg-white border-gray-300 rounded whitespace-pre-line"
                />
                <button onClick={save} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    Salvează
                </button>
            
        </div>
    );
};
export default ContactPage;
