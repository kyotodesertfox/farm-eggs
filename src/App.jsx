import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-black tracking-tighter text-orange-500 mb-2">
          $EGG
        </h1>
        <p className="text-xl uppercase tracking-widest text-zinc-400">
          Jacksonville Sovereign Farm
        </p>
      </header>

      <main className="w-full max-w-2xl border border-zinc-800 bg-zinc-900/50 p-8 rounded-2xl shadow-2xl">
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b border-zinc-800 pb-2 mb-4">
            Producer-Consumer Exchange
          </h2>
          <div className="flex justify-between items-center bg-zinc-800/50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-zinc-400 uppercase">Available Inventory</p>
              <p className="text-3xl font-mono">[Inventory Placeholder]</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400 uppercase">Current Rate</p>
              <p className="text-3xl font-mono">[Price Placeholder] $EGG</p>
            </div>
          </div>
        </section>

        <section>
          <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest">
            Execute $EGG Transaction
          </button>
        </section>
      </main>

      <footer className="mt-auto pt-12 text-zinc-600 text-sm">
        P2P Local Settlement • Jacksonville, FL
      </footer>
    </div>
  );
}

export default App;
