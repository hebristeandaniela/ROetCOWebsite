"use client";

import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseService";
import { doc, getDoc } from "firebase/firestore";
import CountUp from "react-countup";

type Stats = {
  ani: number;
  proiecte: number;
  parteneri: number;
  angajati: number;
};

const StatisticsSection = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const docRef = doc(db, "statistici", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Stats;
        setStats(data);
      } else {
        console.log("No such document!");
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null; // sau un loader

  const statsArray = [
    { label: "ANI DE ACTIVITATE", value: stats.ani },
    { label: "PROIECTE REALIZATE", value: stats.proiecte },
    { label: "PARTENERI", value: stats.parteneri },
    { label: "ANGAJATI IMPLICATI", value: stats.angajati },
  ];

  return (
    <div className="bg-blue-50 py-16 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mx-auto max-w-6xl">
        {statsArray.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              <CountUp end={stat.value} />
            </h2>
            <p className="mt-2 text-sm font-medium text-gray-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
