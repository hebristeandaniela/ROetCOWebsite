'use client';
import { db } from "../services/firebaseService";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const TermeniSiConditii = () => {
  const [continut, setContinut] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'gdpr', 'termeni&conditii');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setContinut(snapshot.data().continut);
      }
    };
    fetchData();
  }, []);
  
   return (
     <div className="whitespace-pre-line w-full bg-white px-24 py-12 text-gray-800 leading-relaxed">
       <div className="text-center mb-10">
         <img
           src="/gdpr-illustration.svg"
           alt="GDPR Illustration"
           className="mx-auto mb-4 max-w-xs"
         />
         <h1 className="text-4xl font-bold">GDPR - Consimțământ</h1>
         <p className="text-base mt-2">
           Acordul explicit al utilizatorului privind colectarea și prelucrarea datelor sale personale în conformitate cu
           Regulamentul General privind Protecția Datelor.
         </p>
       </div>
      

       {continut}


      <div className="text-center mt-12">
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        > Înapoi la Contact </Link>
      </div>
    </div>
  );
};

export default TermeniSiConditii;
