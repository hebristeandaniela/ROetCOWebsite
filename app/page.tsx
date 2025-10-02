import Image from "next/image";
import Header from "./components/Header";
import SocialMediaSection from "./components/SocialMediaSection";
import EvenimentSection from "./components/EvenimentSection";

export default function Home() {
    return (
        <div>
        <Header />
        <SocialMediaSection/>   
        <EvenimentSection/>
        </div>
    );
}
