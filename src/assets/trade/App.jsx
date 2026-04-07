import React from 'react';

export default function Trade({ setActiveTab }) {
    return (
        <section className="w-full max-w-5xl px-8 py-20 animate-in fade-in duration-700">
        <div className="bg-white border-b-8 border-r-8 border-stone-200 rounded-[3rem] p-16 shadow-2xl text-center">

        {/* Updated Header: Market-Focused Wording */}
        <header className="mb-16 border-b border-stone-100 pb-10">
        <h2 className="text-6xl font-serif font-black text-homestead-header mb-6 italic">
        Egg <span className="text-egg-yolk underline decoration-stone-200">Exchange</span>
        </h2>
        <p className="text-2xl text-stone-500 font-medium leading-relaxed mx-auto max-w-2xl">
        Access my homestead economy. Secure your position with $EGG for local yield or exit your holdings back into the broader marketplace.
        <div className="mt-12">
        <button onClick={() => setActiveTab('bridge')} className="text-egg-yolk font-black text-xl hover:underline">
        Need $ETH →
        </button>
        </div>
            </p>
            </header>

            {/* The Central Trade Interface */}

            <div className="max-w-xl mx-auto space-y-2">

            {/* Top Input: Entry/Exit Amount */}
            <div className="bg-homestead-header border border-stone-800 p-8 rounded-[2.5rem] shadow-inner text-left">
            <div className="flex justify-between text-stone-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span>Trade Amount</span>
            <span>Available: 24</span>
            </div>
            <div className="flex justify-between items-center">
            <span className="text-5xl font-mono font-black text-stone-200 italic">12</span>
            <div className="bg-stone-800 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-stone-700 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-egg-yolk shadow-inner"></div>
            <span className="font-black text-sm text-white tracking-widest uppercase">$EGG</span>
            </div>
            </div>
            </div>

            {/* Pivot Point */}
            <div className="flex justify-center -my-8 relative z-10">
            <div className="bg-homestead-header border-4 border-white p-3 rounded-2xl text-egg-yolk shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10l5 5 5-5M7 14l5-5 5 5"/></svg>
            </div>
            </div>

            {/* Bottom Output: Settlement Pair */}
            <div className="bg-homestead-header border border-stone-800 p-8 rounded-[2.5rem] shadow-inner text-left">
            <div className="flex justify-between text-stone-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span>You will receive (Estimated)</span>
            </div>
            <div className="flex justify-between items-center">
            <span className="text-5xl font-mono font-black text-stone-200 italic">0.00564</span>
            <div className="bg-stone-800 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-stone-700 shadow-sm">
            <span className="font-black text-sm text-stone-300 tracking-widest uppercase">$ETH</span>
            </div>
            </div>
            </div>

            {/* Updated Action Button */}
            <button className="w-full bg-egg-yolk hover:bg-orange-500 text-white font-black py-7 rounded-[2.5rem] uppercase tracking-[0.25em] text-xl shadow-2xl shadow-orange-200/50 transition-all active:scale-[0.98] mt-6">
            Execute Trade
            </button>

            </div>

            {/* Updated Rules Box */}
            <div className="max-w-xl mx-auto mt-12 bg-stone-50 border border-stone-100 p-8 rounded-[2rem] text-left">
            <div className="flex gap-5">
            <div className="bg-egg-yolk/10 text-egg-yolk rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-black border border-egg-yolk/20">!</div>
            <div>
            <h4 className="text-homestead-header uppercase text-[10px] font-black tracking-[0.2em] mb-2">Marketplace Protocol</h4>
            <p className="text-stone-500 text-xs leading-relaxed font-bold">
            Entering the market secures your claim on homestead inventory. Exiting the market
            returns your $EGG tokens for $ETH. All trades are finalized on-chain for
            transparency and auditability.
            </p>
            </div>
            </div>
            </div>

            </div>
            </section>
    );
}
