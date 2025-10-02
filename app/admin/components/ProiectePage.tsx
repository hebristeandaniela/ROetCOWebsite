"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "../../services/firebaseService";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Proiecte } from "../../types/proiecte";

const ProiectePage = () => {
    const [proiecte, setProiecte] = useState<Proiecte[]>([]);
    const [loading, setLoading] = useState(true);
    const [nume, setNume] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [descriere, setDescriere] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        fetchProiecte();
    }, []);

    const fetchProiecte = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "proiecte"));
            const items: Proiecte[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Proiecte));
            setProiecte(items);
        } catch (error) {
            console.error("Eroare la preluarea datelor: ", error);
        } finally {
            setLoading(false);
        }
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 4000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { nume, image_url: imageUrl, descriere };

        if (editId) {
            await updateDoc(doc(db, "proiecte", editId), data);
            showSuccessMessage("Proiectul a fost modificat cu succes!");
        } else {
            try {
                await addDoc(collection(db, "proiecte"), data);
                showSuccessMessage("Proiectul a fost adăugat cu succes!");
            } catch (error) {
                console.error("Eroare la adăugarea proiectului:", error);
            }
        }

        setNume("");
        setImageUrl("");
        setDescriere("");
        setEditId(null);
        fetchProiecte();
    };

    const handleEdit = (proiect: Proiecte) => {
        setEditId(proiect.id);
        setNume(proiect.nume);
        setImageUrl(proiect.image_url);
        setDescriere(proiect.descriere);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Ești sigur că vrei să ștergi acest proiect?");
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "proiecte", id));
        showSuccessMessage("Proiectul a fost șters cu succes!");
        fetchProiecte();
    };

    return (
        <div className="p-4 mt-10 sm:p-6 bg-gray-100 min-h-screen">
            {successMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 mt-10 w-[90%] sm:w-1/2 bg-green-500 text-center p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out border-green-700 z-50">
                    <span className="font-semibold text-lg text-white">{successMessage}</span>
                </div>
            )}
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                Administrează Pagina "Proiecte"
            </h1>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-2xl mx-auto transition-all duration-500"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nume</label>
                        <input
                            type="text"
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                        <textarea
                            value={descriere}
                            onChange={(e) => setDescriere(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                    >
                        {editId ? "Modifică Proiectul" : "Adaugă Proiect"}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {proiecte.map((data) => (
                    <div
                        key={data.id}
                        className="bg-white p-5 rounded-xl shadow-md transition duration-300 ease-in-out hover:shadow-xl flex flex-col"
                    >
                        <img
                            src={data.image_url}
                            alt={data.nume}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{data.nume}</h2>
                        <p className="text-sm sm:text-base text-gray-700 mt-1 flex-grow">{data.descriere}</p>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <button
                                onClick={() => handleEdit(data)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
                            >
                                Editează
                            </button>
                            <button
                                onClick={() => handleDelete(data.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
                            >
                                Șterge
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProiectePage;
