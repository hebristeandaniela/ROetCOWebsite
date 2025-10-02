"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseService";

interface Solutie {
  id: string;
  nume: string;
}

export default function NavbarTel() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solutii, setSolutii] = useState<Solutie[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSolutii = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "solutii"));
        const docs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            nume: data.nume || "Soluție fără nume",
          };
        });
        setSolutii(docs);
      } catch (error) {
        console.error("Eroare la încărcarea soluțiilor:", error);
      }
    };

    fetchSolutii();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
  };

  return (
    <div className="p-4 lg:hidden bg-white fixed w-full left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image width={361} height={139} className="w-20" src="/assets/Logo_ROetCO.jpg" alt="logo" />
        </Link>

        {/* Hamburger button */}
        <div className="gap-1 p-2 flex flex-col cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
          <span className="sr-only">Deschide meniul</span>
          <div className="w-6 border-b-[3px] border-[#004AEA]"></div>
          <div className="w-6 border-b-[3px] border-[#004AEA]"></div>
          <div className="w-6 border-b-[3px] border-[#004AEA]"></div>
        </div>

        {/* Drawer content */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <div className="fixed right-0 top-0 w-72 h-full bg-[#8192b7] text-white font-semibold p-4 z-50 shadow-lg flex flex-col gap-4">
              <Link href="/" className="py-2" onClick={handleLinkClick}>Acasă</Link>

              {/* Soluții dropdown */}
              <div className="flex flex-col gap-1">
                <button
                  ref={buttonRef}
                  onClick={() => setIsSolutionsOpen(prev => !prev)}
                  className="flex items-center justify-between py-2 text-left hover:text-blue-200 transition duration-300"
                >
                  <span>Soluții</span>
                  <span className="ml-2">▼</span>
                </button>

                {isSolutionsOpen && (
                  <div
                    ref={dropdownRef}
                    className="bg-white rounded-md p-2 shadow-md border border-gray-300"
                  >
                    <ul className="flex flex-col gap-3">
                      {solutii.map((solutie) => (
                        <li key={solutie.id}>
                          <Link
                            href={`/solutii/${solutie.id}`}
                            className="text-gray-800 hover:text-blue-500"
                            onClick={handleLinkClick}
                          >
                            {solutie.nume}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link href="/proiecte" className="py-2" onClick={handleLinkClick}>Proiecte</Link>
              <Link href="/evenimente" className="py-2" onClick={handleLinkClick}>Evenimente</Link>
              <Link href="/despre" className="py-2" onClick={handleLinkClick}>Despre</Link>
              <Link href="/contact" className="py-2" onClick={handleLinkClick}>Contact</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
