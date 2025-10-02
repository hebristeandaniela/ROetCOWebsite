"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../services/firebaseService";
import { Search } from "lucide-react";

interface Solutie {
    id: string;
    nume: string;
}

export default function Navbar() {
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const [solutii, setSolutii] = useState<Solutie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const searchDropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSolutii = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "solutii"));
                const docs = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: data.id,
                        nume: data.nume
                    };
                });
                setSolutii(docs);
            } catch (error) {
                console.error("Eroare la încărcarea soluțiilor:", error);
            }
        };

        fetchSolutii();
    }, []);

    const flattenValues = (obj: any): string => {
        let result = '';

        const recurse = (item: any) => {
            if (typeof item === 'string') {
                result += ' ' + item;
            } else if (Array.isArray(item)) {
                item.forEach((i) => recurse(i));
            } else if (typeof item === 'object' && item !== null) {
                Object.values(item).forEach((val) => recurse(val));
            }
        };

        recurse(obj);
        return result.toLowerCase();
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const queryText = searchQuery.toLowerCase().trim();

        if (!queryText) {
            alert("Te rog să introduci un text pentru căutare.");
            return;
        }

        setLoading(true);
        const snapshot = await getDocs(collection(db, "solutii"));
        const results: any[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            const content = flattenValues(data);

            if (content.includes(queryText)) {
                results.push({
                    id: doc.id,
                    name: data.nume || 'Nume indisponibil',
                    page: `/solutii/${doc.id}`,
                    description: data.descriere || 'Fără descriere disponibilă'
                });
            }
        });

        setLoading(false);
        setSearchResults(results);
        setIsDropdownOpen(results.length > 0);

        if (results.length === 0) {
            alert("Nicio soluție găsită.");
        }
    };

    const handleSelectResult = (result: any) => {
        setSearchQuery(result.name);
        setSearchResults([]);
        setIsDropdownOpen(false);
        router.push(result.page);
    };

    useEffect(() => {
        const handleClickOutsideDropdown = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsSolutionsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideDropdown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, []);


    return (
        <div className="bg-white w-full hidden lg:block fixed shadow-md z-20">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link href="/">
                    <Image width={361} height={139} className="w-20" src="/assets/Logo_ROetCO.jpg" alt="logo" />
                </Link>

                <div className="flex gap-8 text-[#181818] relative items-center">
                    <Link href="/" className="hover:text-blue-500 transition duration-300">Acasă</Link>

                    <div className="relative" onMouseEnter={() => setIsSolutionsOpen(true)}>
                        <Link href="/solutii" className="hover:text-blue-500 transition duration-300">Soluții</Link>
                        <button
                            ref={buttonRef}
                            className="ml-2 hover:text-blue-500 transition duration-300"
                            onClick={() => setIsSolutionsOpen(prev => !prev)}
                        >
                            ▼
                        </button>

                        {isSolutionsOpen && (
                            <div ref={dropdownRef} className="absolute left-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-50">
                                <ul className="flex flex-col gap-4">
                                    {solutii.map((solutie, index) => (
                                        <li key={index}>
                                            <Link href={`/solutii/${solutie.id}`} className="hover:text-blue-500 z-[60]">
                                                {solutie.nume}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                    <Link href="/proiecte" className="hover:text-blue-500 transition duration-300">Proiecte</Link>
                    <Link href="/evenimente" className="hover:text-blue-500 transition duration-300">Evenimente</Link>
                    <Link href="/despre" className="hover:text-blue-500 transition duration-300">Despre</Link>
                    <Link href="/contact" className="hover:text-blue-500 transition duration-300">Contact</Link>

                    {/* 🔍 Căutare */}
                    <div className="relative bg-white text-gray-900" ref={searchDropdownRef}>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Caută..."
                                className="border bg-white border-gray-300 rounded-md px-3 py-1 text-sm pr-10 w-40"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                                disabled={loading}
                            >
                                {loading ? <span className="animate-spin">🔄</span> : <Search size={16} />}
                            </button>
                        </form>

                        {isDropdownOpen && searchResults.length > 0 && (
                            <div className="absolute left-0 w-full bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-50">
                                <ul className="max-h-60 overflow-auto">
                                    {searchResults.map((result, index) => (
                                        <li
                                            key={index}
                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectResult(result)}
                                        >
                                            <span className="block text-sm text-blue-500 font-semibold">{result.name}</span>
                                            <p className="text-xs text-gray-500">{result.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <Link className="text-white px-4 py-2 font-semibold bg-primary rounded-md" href="/contact">
                    Contactează-ne
                </Link>
            </div>
        </div>
    );
}
