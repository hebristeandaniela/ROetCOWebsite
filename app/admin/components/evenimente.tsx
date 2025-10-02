"use client";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";

type Eveniment = {
    id?: string;
    titlu: string;
    descriere: string;
    descriereDetaliata?: string;
    image: string;
    activitate?: { id: string, titlu: string, descriere: string, image: string }[];
};

const EventsPage = () => {
    const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
    const [newEvent, setNewEvent] = useState<Eveniment>({
        id: "",
        titlu: "",
        descriere: "",
        descriereDetaliata: "",
        image: ""
    });

    const [newActivity, setNewActivity] = useState({
        id: "",
        titlu: "",
        descriere: "",
        image: "",
    });

    const [activitate, setActivitate] = useState<any[]>([]);

    const [evenimentData, setEvenimentData] = useState<any>(null);
    const [image1, setImage1] = useState<string>("");
    const [image2, setImage2] = useState<string>("");
    const [text1, setText1] = useState<string>("");
    const [text2, setText2] = useState<string>("");

    const [activitateForm, setActivitateForm] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvenimentData = async () => {
            const docRef = doc(db, "evenimentData", "IgGBOjpgxF2qVra4OgDT");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setEvenimentData(data);
                setImage1(data.image1);
                setImage2(data.image2);
                setText1(data.text1);
                setText2(data.text2);
            }
        };
        fetchEvenimentData();
    }, []);

    useEffect(() => {
        const fetchEvenimente = async () => {
            const querySnapshot = await getDocs(collection(db, "evenimente"));
            const fetchedEvents = querySnapshot.docs.map((doc) => {
                const eventData = doc.data();
                return {
                    id: doc.id,
                    titlu: eventData.titlu || "",
                    descriere: eventData.descriere || "",
                    descriereDetaliata: eventData.descriereDetaliata || "",
                    image: eventData.image || "",
                    activitate: eventData.activitate || []
                };
            });
            setEvenimente(fetchedEvents);
        };
        fetchEvenimente();
    }, []);

    const handleAdd = async () => {
        if (!newEvent.id || !newEvent.titlu || !newEvent.descriere) {
            alert("Completează toate câmpurile obligatorii!");
            return;
        }

        if (typeof newEvent.id !== "string") {
            alert("ID-ul evenimentului nu este valid.");
            return;
        }

        const activitate = activitateForm.map((activity: any) => ({
            id: nanoid(),
            titlu: activity.titlu,
            descriere: activity.descriere,
            image: activity.image || "",
        }));

        const docRef = doc(db, "evenimente", newEvent.id);
        await setDoc(docRef, {
            id: newEvent.id,
            titlu: newEvent.titlu,
            descriere: newEvent.descriere,
            descriereDetaliata: newEvent.descriereDetaliata || "",
            image: newEvent.image,
            activitate: activitate
        });

        setEvenimente([...evenimente, { ...newEvent, activitate }]);
        setNewEvent({ id: "", titlu: "", descriere: "", descriereDetaliata: "", image: "" });
        setActivitateForm([]);
        alert("Eveniment și activități adăugate cu succes!");
    };

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, "evenimente", id));
        setEvenimente(evenimente.filter((e) => e.id !== id));
    };

    const handleSave = async (event: Eveniment) => {
        if (!event.id) return;
        await updateDoc(doc(db, "evenimente", event.id), {
            titlu: event.titlu,
            descriere: event.descriere,
            descriereDetaliata: event.descriereDetaliata || "",
            image: event.image,
        });
        alert("Eveniment actualizat!");
    };

    const handleSaveEvenimentData = async (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof newEvent.id !== "string" || !newEvent.id) {
            alert("ID-ul evenimentului nu este valid.");
            return;
        }

        await setDoc(doc(db, "evenimentData", "IgGBOjpgxF2qVra4OgDT"), {
            image1,
            image2,
            text1,
            text2,
        }, { merge: true });

        alert("Datele au fost actualizate cu succes!");
    };

    const handleAddActivity = () => {
        setActivitateForm([...activitateForm, { titlu: "", descriere: "", image: "" }]);
    };
    const handleUpdateActivity = async (eventId: string, activityId: string, updatedActivity: any) => {
        const eventRef = doc(db, "evenimente", eventId);
        const eventDoc = await getDoc(eventRef);

        if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            const updatedActivitati = eventData.activitate.map((activity: any) =>
                activity.id === activityId ? { ...activity, ...updatedActivity } : activity
            );

            // Actualizează activitățile în Firebase
            await updateDoc(eventRef, {
                activitate: updatedActivitati,
            });

            // Actualizează starea locală
            setEvenimente(evenimente.map(event =>
                event.id === eventId ? { ...event, activitate: updatedActivitati } : event
            ));

            alert("Activitatea a fost actualizată cu succes!");
        }
    };

    const handleActivityChange = (index: number, field: string, value: string) => {
        const updatedActivities = [...activitateForm];
        updatedActivities[index][field] = value;
        setActivitateForm(updatedActivities);
    };

    const handleSaveActivity = (eventId: string, activityId: string, activity: any) => {
        handleUpdateActivity(eventId, activityId, activity);
    };

    if (!evenimentData) return <div className="p-8 text-gray-600">Încărcare...</div>;

    return (
        <div className="p-4 mt-10 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">
                Administrează Pagina "Evenimente"
            </h1>

            {/* Adaugă eveniment nou */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow mb-10">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                    Adaugă Eveniment Nou
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Titlu"
                        value={newEvent.titlu}
                        onChange={(e) => setNewEvent({ ...newEvent, titlu: e.target.value })}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                    />
                    <textarea
                        placeholder="Descriere"
                        value={newEvent.descriere}
                        onChange={(e) => setNewEvent({ ...newEvent, descriere: e.target.value })}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="URL Imagine"
                        value={newEvent.image}
                        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="ID personalizat"
                        value={newEvent.id}
                        onChange={(e) => setNewEvent({ ...newEvent, id: e.target.value })}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                    />
                    <textarea
                        placeholder="Descriere Detaliată"
                        value={newEvent.descriereDetaliata}
                        onChange={(e) => setNewEvent({ ...newEvent, descriereDetaliata: e.target.value })}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                    />

                    <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                        Adaugă activitate evenimentului
                    </h2>

                    {activitateForm.map((activity, index) => (
                        <div key={index} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Titlu Activitate"
                                value={activity.titlu}
                                onChange={(e) => handleActivityChange(index, 'titlu', e.target.value)}
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                            />
                            <textarea
                                placeholder="Descriere Activitate"
                                value={activity.descriere}
                                onChange={(e) => handleActivityChange(index, 'descriere', e.target.value)}
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                            />
                            <input
                                type="text"
                                placeholder="URL Imagine Activitate"
                                value={activity.image}
                                onChange={(e) => handleActivityChange(index, 'image', e.target.value)}
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                            />
                        </div>
                    ))}

                    <button
                        onClick={handleAddActivity}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                    >
                        Adaugă activitate
                    </button>

                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto mt-6"
                    >
                        Adaugă Eveniment
                    </button>
                </div>
            </div>

            {/* Listă evenimente */}
            <div className="space-y-6">
                {evenimente.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl p-4 md:p-6 shadow flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <img src={event.image} alt="Imagine eveniment" className="w-full h-40 object-cover rounded-md mb-2" />
                            <input type="text" value={event.image} onChange={(e) => setEvenimente(prev => prev.map(ev => ev.id === event.id ? { ...ev, image: e.target.value } : ev))} className="border border-gray-300 bg-white text-gray-900 p-2 rounded w-full" placeholder="URL Imagine" /></div>
                        <div className="flex-1 flex flex-col gap-3">
                            
                            <input
                                type="text"
                                value={event.id}
                                onChange={(e) =>
                                    setEvenimente(prev =>
                                        prev.map(ev => ev.id === event.id ? { ...ev, id: e.target.value } : ev)
                                    )
                                }
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                                placeholder="ID UNIC"
                            />
                            <input
                                type="text"
                                value={event.titlu}
                                onChange={(e) =>
                                    setEvenimente(prev =>
                                        prev.map(ev => ev.id === event.id ? { ...ev, titlu: e.target.value } : ev)
                                    )
                                }
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                                placeholder="Titlu"
                            />
                            <textarea
                                value={event.descriere}
                                onChange={(e) =>
                                    setEvenimente(prev =>
                                        prev.map(ev => ev.id === event.id ? { ...ev, descriere: e.target.value } : ev)
                                    )
                                }
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full min-h-[100px]"
                                placeholder="Descriere"
                            />
                            <textarea
                                value={event.descriereDetaliata}
                                onChange={(e) =>
                                    setEvenimente(prev =>
                                        prev.map(ev => ev.id === event.id ? { ...ev, descriereDetaliata: e.target.value } : ev)
                                    )
                                }
                                className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full min-h-[100px]"
                                placeholder="Descriere Detaliată"
                            />

                            <h3>Activitățile Evenimentului:</h3>
                            {event.activitate?.map((activity, index) => (
                                <div key={activity.id} className="bg-gray-300 text-gray-900 p-4 rounded-lg mt-2">
                                    <h4>
                                        <input
                                            type="text"
                                            value={activity.titlu}
                                            onChange={(e) => handleActivityChange(index, 'titlu', e.target.value)}
                                            className="border border-gray-300 bg-white text-gray-900 p-2 rounded w-full"
                                        />
                                    </h4>
                                    <textarea
                                        value={activity.descriere}
                                        onChange={(e) => handleActivityChange(index, 'descriere', e.target.value)}
                                        className="border bg-white text-gray-900 border-gray-300 p-2 rounded w-full"
                                    />
                                    <input
                                        type="text"
                                        value={activity.image}
                                        onChange={(e) => handleActivityChange(index, 'image', e.target.value)}
                                        className="border bg-white text-gray-900 border-gray-300 p-2 rounded w-full"
                                    />
                                    <img src={activity.image} alt="Activitate" className="w-full h-32 object-cover rounded-md mb-2" />
                                    <button
                                        onClick={() => {
                                            if (!event.id) {
                                                alert("ID-ul evenimentului nu este definit!");
                                                return;
                                            }
                                            handleSaveActivity(event.id, activity.id, activity);
                                        }}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                                    >
                                        Salvează modificările activității
                                    </button>
                                </div>
                            ))}

                            

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => handleSave(event)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                                >
                                    Salvează
                                </button>
                                <button
                                    onClick={() => event.id && handleDelete(event.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
                                >
                                    Șterge
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Formular actualizare date generale */}
            <form
                onSubmit={handleSaveEvenimentData}
                className="mt-12 bg-white p-4 md:p-6 rounded-xl shadow space-y-6"
            >
                <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2">Prima imagine de pe pagină:</label>
                    <input
                        type="text"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                        placeholder="URL imagine 1"
                    />
                </div>
                <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2">A doua imagine de pe pagină:</label>
                    <input
                        type="text"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full"
                        placeholder="URL imagine 2"
                    />
                </div>
                <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2">Ce mai organizam? Sectiune 1:</label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full min-h-[100px]"
                        placeholder="Text 1"
                    />
                </div>
                <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2">Ce mai organizam? Sectiune 2:</label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 p-3 rounded w-full min-h-[100px]"
                        placeholder="Text 2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                >
                    Salvează Modificările
                </button>
            </form>
            





























        </div>
    );
};

export default EventsPage;
