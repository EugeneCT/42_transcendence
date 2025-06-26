import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div>
        <Header />
      </div>

      {/* MAIN SECTION */}
      <main className="flex flex-col items-center justify-center px-6 py-12 space-y-8">
        {/* Game Preview Placeholder */}
          <video
            className='w-full max-w-md rounded-xl'
            controls
            autoPlay
            muted
            loop
          >
          <source src="/mockup.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <button className="bg-green-600 hover:bg-green-700 py-3 px-6 rounded text-lg font-semibold">
            ▶ Play Game
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded text-lg font-semibold">
            📊 Leaderboard
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 py-3 px-6 rounded text-lg font-semibold text-black">
            🔐 Login
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-6 text-sm">
        &copy; 2025 ft_transcendance team
      </footer>
    </div>
  )
}

export default App
