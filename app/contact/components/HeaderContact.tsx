"use client";
import React, { useEffect, useState } from "react";

const HeaderContact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Asigură-te că este rulată doar pe client
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Dacă nu este încă client, afișează un loader
  }

  return (
    <div className="bg-[url('/assets/headerUp.jpg')] bg-cover bg-center h-[300px] p-14 mx-auto relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div className="relative flex justify-center items-center h-full mt-10 z-10">
        <h1 className="text-white font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center">
          CONTACT
        </h1>
      </div>
    </div>
  );
};

export default HeaderContact;
