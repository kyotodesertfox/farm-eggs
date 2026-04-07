import React, { useState } from 'react';
import './App.css';
import OurProcess from './assets/our_process/App';
import HowItWorks from './assets/how_it_works/App';
import Trade from './assets/trade/App';
import Bridge from './assets/bridge/App';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans">
    <nav className="flex items-center justify-between px-10 py-5 bg-homestead-header shadow-2xl sticky top-0 z-50">

    {/* Left Flank: Logo (Occupies 1/3 of the space) */}
    <div className="flex-1 flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
  {/* The Enhanced Logo Container */}
  <div className="bg-egg-yolk p-2.5 rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]"
    >
      {/* 1. Definining the Gradient */}
      <defs>
        <linearGradient id="eggGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="#FEF3C7"/> {/* Soft Cream at the bottom */}
        </linearGradient>
      </defs>

      {/* 2. Main Egg Body (Now with Gradient) */}
      <path
        d="M12 2C8.5 2 5.5 7.5 5.5 12.5C5.5 17.5 8.4 22 12 22C15.6 22 18.5 17.5 18.5 12.5C18.5 7.5 15.5 2 12 2Z"
        fill="url(#eggGradient)"
      />

      {/* 3. Primary Shine (Existing) */}
      <path
        d="M9 10C9 8 10 6 11 5"
        stroke="#fcd34d"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* 4. New Secondary Highlight (For Pop) */}
      <path
        d="M15 13C15 14.5 14.5 16 13.5 17"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  </div>

  <span className="text-2xl font-black tracking-tighter uppercase text-white whitespace-nowrap">
    The Egg Exchange
  </span>
</div>

    {/* Center: The Menu (Pinned to the middle) */}
    <div className="hidden md:flex items-center justify-center gap-10 text-sm font-black uppercase tracking-[0.2em]">
    <button
    onClick={() => setActiveTab('home')}
    className={`transition-colors py-1 border-b-2 ${activeTab === 'home' ? 'text-egg-yolk border-egg-yolk' : 'text-stone-400 border-transparent hover:text-white'}`}
    >Home</button>
    <button
    onClick={() => setActiveTab('our-process')}
    className={`transition-colors py-1 border-b-2 ${activeTab === 'our-process' ? 'text-egg-yolk border-egg-yolk' : 'text-stone-400 border-transparent hover:text-white'}`}
    >Process</button>
    <button
    onClick={() => setActiveTab('how-it-works')}
    className={`transition-colors py-1 border-b-2 ${activeTab === 'how-it-works' ? 'text-egg-yolk border-egg-yolk' : 'text-stone-400 border-transparent hover:text-white'}`}
    >How It Works</button>
    <button
    onClick={() => setActiveTab('trade')}
    className={`transition-colors py-1 border-b-2 ${activeTab === 'trade' ? 'text-egg-yolk border-egg-yolk' : 'text-stone-400 border-transparent hover:text-white'}`}
    >$EGGS</button>
    <button
    onClick={() => setActiveTab('bridge')}
    className={`transition-colors py-1 border-b-2 ${activeTab === 'bridge' ? 'text-egg-yolk border-egg-yolk' : 'text-stone-400 border-transparent hover:text-white'}`}
    >Bridge</button>
    </div>

    {/* Right Flank: Connect Button (Occupies 1/3 of the space) */}
    <div className="flex-1 flex justify-end">
    <button className="bg-egg-yolk hover:bg-amber-400 text-homestead-header font-black py-2.5 px-8 rounded-full text-xs uppercase tracking-tighter transition-all shadow-lg shadow-black/20">
    Connect Wallet
    </button>
    </div>

    </nav>

    <main className="flex-grow flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">
    {activeTab === 'home' && (
      <section className="w-full max-w-4xl px-8 py-20 text-center">
      <h1 className="text-7xl font-serif font-black text-homestead-header mb-6 tracking-tight">Jacksonville, FL <span className="text-egg-yolk">Homestead</span></h1>
      <div className="bg-white border-b-8 border-r-8 border-stone-200 rounded-[3rem] p-12 shadow-2xl text-xl text-stone-700">
      <p>Word of mouth brought you here. Private homestead. High standards.</p>

      <button onClick={() => setActiveTab('our-process')} className="mt-10 text-egg-yolk font-black text-2xl">Learn about our process →<br />
      <img src="/public/images/couple_eggs.png" className="w-full max-w-md aspect-video rounded-[2rem] overflow-hidden border-4 border-egg-yolk shadow-2xl bg-stone-100 my-8" />
      </button><br />




      <button onClick={() => setActiveTab('how-it-works')} className="mt-10 text-egg-yolk font-black text-2xl">Learn how it works →<br />
      <img src="/public/images/couple_crypto.png" className="w-full max-w-md aspect-video rounded-[2rem] overflow-hidden border-4 border-egg-yolk shadow-2xl bg-stone-100 my-8" />
      </button>

      </div>
      </section>
    )}

    {/* Modular Component Loading */}
    {activeTab === 'our-process' && <OurProcess setActiveTab={setActiveTab} />}
    {activeTab === 'how-it-works' && <HowItWorks setActiveTab={setActiveTab} />}
    {activeTab === 'trade' && <Trade setActiveTab={setActiveTab} />}
    {activeTab === 'bridge' && <Bridge setActiveTab={setActiveTab} />}
    </main>

    <footer className="py-12 text-center text-stone-800 text-[10px] font-black uppercase tracking-[0.4em]">
    &copy; 2026 The Egg Exchange
    </footer>
    </div>
  );
}

export default App;
