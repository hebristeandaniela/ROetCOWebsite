"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "../../services/firebaseService";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Solutii, Subsectiune } from "../../types/solutii";

const SolutiiPage = () => {
    const [solutii, setSolutii] = useState<Solutii[]>([]);
    const [loading, setLoading] = useState(true);
    const [nume, setNume] = useState("");
    const [id, setId] = useState(''); 
    const [imageUrl, setImageUrl] = useState("");
    const [descriere, setDescriere] = useState("");
    const [descriereScurta, setDescriereScurta] = useState("");
    const [descriereDetaliata, setDescriereDetaliata] = useState("");
    const [sectiuni, setSectiuni] = useState<Subsectiune[]>([
        { titlu: "", descriere1: "", descriere2: "", descriere3: "" },
    ]);
    const [editId, setEditId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        fetchSolutii();
    }, []);

    const fetchSolutii = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "solutii"));
            const items: Solutii[] = querySnapshot.docs.map(doc => ({firebaseId: doc.id, ...doc.data()} as Solutii));
 setSolutii(items);
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
        const data = {
           id,
           nume,
            image_url: imageUrl,
            descriere,
            descriere_Scurta: descriereScurta,
            descriere_detaliata: descriereDetaliata,
            detalii: { secțiuni: sectiuni }
        };

        if (editId) {
            await updateDoc(doc(db, "solutii", editId), data);
            showSuccessMessage("Soluția a fost modificată cu succes!");
        } else {
            await setDoc(doc(db, "solutii", id), data);
            showSuccessMessage("Soluția a fost adăugată cu succes!");
        }

        setId("");
        setNume("");
        setImageUrl("");
        setDescriere("");
        setDescriereScurta("");
        setDescriereDetaliata("");
        setSectiuni([{ titlu: "", descriere1: "", descriere2: "", descriere3: "" }]);
        setEditId(null);
        fetchSolutii();
    };

    const handleEdit = (solutie: Solutii) => {
        setEditId(solutie.firebaseId); 
        setId(solutie.id);  
         setNume(solutie.nume);
        setImageUrl(solutie.image_url);
        setDescriere(solutie.descriere);
        setDescriereScurta(solutie.descriere_Scurta || "");
        setDescriereDetaliata(solutie.descriere_detaliata || "");
        setSectiuni(solutie.detalii?.secțiuni || [{ titlu: "", descriere1: "", descriere2: "", descriere3: "" }]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleDelete = async (firebaseId: string) => {
        const confirmDelete = window.confirm("Ești sigur că vrei să ștergi această soluție?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "solutii", firebaseId));
            showSuccessMessage("Soluția a fost ștearsă cu succes!");
            fetchSolutii();
        } catch (error) {
            console.error("Eroare la ștergere:", error);
        }
    };

    return (
        <div className="p-4 mt-10 sm:p-6 bg-gray-50 min-h-screen">
            {successMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-1/2 bg-green-500 text-center p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out border-green-700 z-50">
                    <span className="font-semibold text-lg text-white">{successMessage}</span>
                </div>
            )}
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                PANOU ADMINISTRARE SOLUȚII
            </h1>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
            >
                <div className="space-y-6">
                    {/* câmpuri input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nume Soluție</label>
                        <input
                            type="text"
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID unic</label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrierea care apare în lista de SOLUȚII:</label>
                        <textarea
                            value={descriere}
                            onChange={(e) => setDescriere(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titlu soluției care apare pe Pagina de detalii</label>
                        <textarea
                            value={descriereScurta}
                            onChange={(e) => setDescriereScurta(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descriere Detaliată</label>
                        <textarea
                            value={descriereDetaliata}
                            onChange={(e) => setDescriereDetaliata(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Secțiuni */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Servicii oferite:</h3>
                        {sectiuni.map((sec, index) => (
                            <div
                                key={index}
                                className="bg-blue-100 p-4 rounded-lg mb-4 border border-gray-800 space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titlu serviciu:</label>
                                    <input
                                        type="text"
                                        value={sec.titlu}
                                        onChange={(e) => {
                                            const updated = [...sectiuni];
                                            updated[index].titlu = e.target.value;
                                            setSectiuni(updated);
                                        }}
                                        className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300"
                                    />
                                </div>

                                {[1, 2, 3].map((num) => (
                                    <div key={num}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Descriere {num}
                                        </label>
                                        <textarea
                                            value={sec[`descriere${num}` as keyof Subsectiune]}
                                            onChange={(e) => {
                                                const updated = [...sectiuni];
                                                updated[index][`descriere${num}` as keyof Subsectiune] = e.target.value;
                                                setSectiuni(updated);
                                            }}
                                            className="w-full p-3 border rounded-lg bg-white text-gray-900 border-gray-300"
                                        />
                                    </div>
                                ))}

                                {/* Buton pentru ștergere serviciu */}
                                {sectiuni.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...sectiuni];
                                            updated.splice(index, 1);
                                            setSectiuni(updated);
                                        }}
                                        className="text-red-600 mt-2 hover:underline"
                                    >
                                        Șterge acest serviciu
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Buton pentru adăugare serviciu nou */}
                        <button
                            type="button"
                            onClick={() =>
                                setSectiuni([
                                    ...sectiuni,
                                    { titlu: "", descriere1: "", descriere2: "", descriere3: "" },
                                ])
                            }
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                        >
                            + Adaugă un alt serviciu
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                    >
                        {editId ? "Modifică Soluția" : "Adaugă Soluție"}
                    </button>
                </div>
            </form>

            {/* Lista soluțiilor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {solutii.map((data) => (
                    <div
                        key={data.id}
                        className="bg-white p-5 rounded-xl shadow-md transition hover:shadow-lg"
                    >
                        <img
                            src={data.image_url}
                            alt={data.nume}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h2 className="text-lg font-bold text-gray-900">{data.nume}</h2>
                        <p className="text-gray-700 mt-1 text-sm">{data.descriere}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                onClick={() => handleEdit(data)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
                            >
                                Editează
                            </button>
                            <button
                                onClick={() => handleDelete(data.firebaseId)}
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

export default SolutiiPage;
      
