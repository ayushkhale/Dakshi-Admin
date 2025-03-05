import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../Components/ProfileCard';
import networkconfig from '../Dynamics/networkconfig';

const Dashboard = () => {
    const navigate = useNavigate();

    const cards = [
        { src: "https://i.ibb.co/GQYyrTnF/Certificate.png", label: "Generate Certificate", path: "/certificate" },
        { src: "https://i.ibb.co/YGFbGBR/IDcard.png", label: "Generate ID Card", path: "/generate-id" },
        { src: "https://i.ibb.co/8ngGwGjX/Offerletter.png", label: "Create Offer Letter", path: "/offer-letter" },
    ];

    return (
        <div className='bg-white px-10 flex flex-1 justify-between md:h-[80vh] rounded-b-lg'>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 flex-1">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="h-[200px] bg-white outline-dashed outline-1 outline-gray-400 p-5 rounded-lg flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => navigate(card.path)}
                    >
                        <img
                            src={card.src}
                            alt={`${card.label} Icon`}
                            className="mb-4 w-full max-w-[100px] object-contain"
                        />
                        <span className="text-lg font-semibold p-2 rounded-lg text-gray-600">{card.label}</span>
                    </div>
                ))}
            </section>

            {/* Profile Card - Hidden on Small Screens */}
            <div className="hidden md:block">
                <ProfileCard />
            </div>
        </div>
    );
};

export default Dashboard;
