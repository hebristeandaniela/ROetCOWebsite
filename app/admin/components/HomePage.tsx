import { useEffect, useState } from "react";
import { db } from "../../services/firebaseService";
import {
    doc,
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    getDoc,
    updateDoc,
    setDoc,
} from "firebase/firestore";
import Link from "next/link";

const HomePage = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [newCard, setNewCard] = useState({
        titlu: "",
        descriere: "",
        image: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editCardId, setEditCardId] = useState<string>("");
    const [hero, setHero] = useState({
        titlu: "",
        descriere: "",
        whatsapp: "",
        background: "",
    });
    const [statistics, setStatistics] = useState({
        angajati: "",
        ani: "",
        parteneri: "",
        proiecte: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [cardsData, heroData, statsData] = await Promise.all([
                getDocs(collection(db, "home")),
                getDoc(doc(db, "hero", "main")),
                getDoc(doc(db, "statistici", "main")),
            ]);

            setCards(cardsData.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            if (heroData.exists()) setHero(heroData.data() as any);
            if (statsData.exists()) setStatistics(statsData.data() as any);
        };

        fetchData();
    }, []);

    const updateCard = async (id: string, updatedCard: any) => {
        const cardRef = doc(db, "home", id);
        await updateDoc(cardRef, updatedCard);
        setCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updatedCard } : c))
        );
    };

    const deleteCard = async (id: string) => {
        await deleteDoc(doc(db, "home", id));
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    const addCard = async () => {
        const newCardRef = await addDoc(collection(db, "home"), newCard);
        setCards([...cards, { id: newCardRef.id, ...newCard }]);
        setNewCard({ titlu: "", descriere: "", image: "" });
    };

    const startEdit = (card: any) => {
        setIsEditMode(true);
        setEditCardId(card.id);
        setNewCard({
            titlu: card.titlu,
            descriere: card.descriere,
            image: card.image,
        });
    };

    const cancelEdit = () => {
        setIsEditMode(false);
        setEditCardId("");
        setNewCard({ titlu: "", descriere: "", image: "" });
    };

    const saveHero = async () => {
        await setDoc(doc(db, "hero", "main"), hero);
        alert("Hero content salvat cu succes!");
    };

    const saveStatistics = async () => {
        await setDoc(doc(db, "statistici", "main"), statistics);
        alert("Statisticile au fost salvate cu succes!");
    };

    return (
        <div className="container mt-10 mx-auto px-4 py-10 space-y-10">
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                Administrare Pagina Principală
            </h1>

            <div className="flex justify-center">
                <Link
                    href="/"
                    target="_blank"
                    className="inline-block text-center w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                    Vezi cum arată pe site
                </Link>
            </div>

            {/* Hero Section */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-3xl w-full mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hero Section</h2>
                <div className="space-y-4">
                    {["titlu", "descriere", "whatsapp", "background"].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium mb-1 capitalize">
                                {field === "background" ? "Imagine Fundal (URL)" : field === "whatsapp" ? "Link WhatsApp" : field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            {field === "descriere" ? (
                                <textarea
                                    rows={4}
                                    value={hero[field as keyof typeof hero]}
                                    onChange={(e) =>
                                        setHero({ ...hero, [field]: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={hero[field as keyof typeof hero]}
                                    onChange={(e) =>
                                        setHero({ ...hero, [field]: e.target.value })
                                    }
                                        className="w-full px-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </div>
                    ))}
                    <button
                        onClick={saveHero}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Salvează Hero Section
                    </button>
                </div>
            </div>

            {/* Statistici */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-3xl w-full mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Editează Statistici</h2>
                <div className="space-y-4">
                    {["angajati", "ani", "parteneri", "proiecte"].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium mb-1 capitalize">
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            <input
                                type="number"
                                value={statistics[field as keyof typeof statistics]}
                                onChange={(e) =>
                                    setStatistics({ ...statistics, [field]: e.target.value })
                                }
                                className="w-full px-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        onClick={saveStatistics}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Salvează Statisticile
                    </button>
                </div>
            </div>

            {/* Form Add/Edit */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-3xl w-full mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {isEditMode ? "Editează Card" : "Adaugă Card Nou"}
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isEditMode) {
                            updateCard(editCardId, newCard);
                            cancelEdit();
                        } else {
                            addCard();
                        }
                    }}
                    className="space-y-4"
                >
                    {["titlu", "descriere", "image"].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium mb-1 capitalize">
                                {field === "image" ? "Imagine (URL)" : field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            {field === "descriere" ? (
                                <textarea
                                    rows={3}
                                    value={newCard[field as keyof typeof newCard]}
                                    onChange={(e) =>
                                        setNewCard({ ...newCard, [field]: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={newCard[field as keyof typeof newCard]}
                                    onChange={(e) =>
                                        setNewCard({ ...newCard, [field]: e.target.value })
                                    }
                                    required
                                        className="w-full px-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {isEditMode ? "Salvează modificările" : "Adaugă Card"}
                        </button>
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-gray-500 hover:underline"
                            >
                                Anulează
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista Carduri */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Carduri existente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full"
                    >
                        <img
                            src={card.image}
                            alt={card.titlu}
                            className="w-full h-40 sm:h-48 object-cover object-center rounded-md mb-3"
                        />
                        <h3 className="text-lg font-bold text-gray-800">{card.titlu}</h3>
                        <p className="text-gray-600 text-sm">{card.descriere}</p>
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => startEdit(card)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                            >
                                Editează
                            </button>
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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

export default HomePage;
