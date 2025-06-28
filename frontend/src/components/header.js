import React, { useState } from 'react';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (<header className="bg-white-900/70 backdrop-blur text-white shadow-md"> 
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">🔥 ft_transcendance</h1>
                <nav className="space-x-4 hidden sm:flex">
                    <a href="#" className="hover:text-teal-400">Home</a>
                    <a href="#" className="hover:text-teal-400">Game</a>
                    <a href="#" className="hover:text-teal-400">Leaderboard</a>
                    <a href="#" className="hover:text-teal-400">Login</a>
                </nav>
                <button className="sm:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}> 
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
            {isOpen && (<nav className="flex flex-col bg-white-900/70 p-5 backdrop-blur text-white shadow-md">
                    <a href="#" className="hover:text-teal-400">Home</a>
                    <a href="#" className="hover:text-teal-400">Game</a>
                    <a href="#" className="hover:text-teal-400">Leaderboard</a>
                    <a href="#" className="hover:text-teal-400">Login</a>
                </nav>)}
        </header>);
};
export default Header;
