"use client";

import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";

const Page = () => {
    const [key, setKey] = useState<string | null>(null);

    useEffect(() => {
        // Ensure the code runs only on the client side
        const params = new URLSearchParams(window.location.search);
        const keyParam = params.get("key");
        setKey(keyParam);
    }, []);

    // If the key is not set or still loading, render loading or nothing
    if (key === null) {
        return <div>Loading...</div>;
    }

    if (key !== "Zt9rQ6Lm82VxB4Ny") {
        return <div className="text-red-600 font-bold text-center mt-20 text-2xl">Acces interzis</div>;
    }

    return <AdminPanel />;
};

export default Page;
