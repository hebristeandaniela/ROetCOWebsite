"use client";
import { useState } from "react";
import SolutiiPage from "./SolutiiPage";
import ProiectePage from "./ProiectePage";
import EventsPage from "./evenimente";
import DesprePage from "./DesprePage";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";

const AdminPanel = () => {
    const [activePage, setActivePage] = useState("home");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (activePage) {
            case "home":
                return <HomePage />;
            case "solutii":
                return <SolutiiPage />;
            case "proiecte":
                return <ProiectePage />;
            case "evenimente":
                return <EventsPage />;
            case "despre":
                return <DesprePage />;
            case "contact":
                return <ContactPage />;
            default:
                return <div className="text-2xl font-semibold text-gray-800">Bine ai venit în panoul de administrare!</div>;
        }
    };

    const handleNavClick = (page: string) => {
        setActivePage(page);
        setSidebarOpen(false); // Închide meniul după click
    };

    const navButtonStyle = (page: string) =>
        `block w-full text-left px-4 py-2 rounded-lg font-medium transition ${activePage === page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Top Bar Mobile */}
            <div className="md:hidden fixed mt-20 left-0 right-0 z-30 bg-white border-b shadow px-4 py-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl font-bold text-blue-600">
                    ☰Admin
                </button>
                <span className="text-lg font-semibold">Panou Admin</span>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed mt-20 left-0 h-full w-64 bg-white p-6 border-r shadow-md space-y-4 z-40 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 xl:fixed md:block md:fixed md:top-0`} // Modificare pentru sticky pe desktop
            >
                <h2 className="text-2xl font-bold text-blue-600 mt-20 md:mt-4 mb-8">EDITARE PAGINI:</h2>
                <nav className="space-y-2">
                    <button onClick={() => handleNavClick("home")} className={navButtonStyle("home")}>Pagina Principală</button>
                    <button onClick={() => handleNavClick("solutii")} className={navButtonStyle("solutii")}>Soluții</button>
                    <button onClick={() => handleNavClick("proiecte")} className={navButtonStyle("proiecte")}>Proiecte</button>
                    <button onClick={() => handleNavClick("evenimente")} className={navButtonStyle("evenimente")}>Evenimente</button>
                    <button onClick={() => handleNavClick("despre")} className={navButtonStyle("despre")}>Despre</button>
                    <button onClick={() => handleNavClick("contact")} className={navButtonStyle("contact")}>Contact</button>
              </nav>
            </aside>

            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 mt-16 md:mt-0 md:p-10 md:ml-64 mb-20">
                {renderPage()}
            </main>
        </div>
    );
};

export default AdminPanel;
