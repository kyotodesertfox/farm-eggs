import React, { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useAppKit } from '@reown/appkit/react'; // 1. UPDATED IMPORT
import { formatUnits } from 'viem';

// TODO: Replace with your actual $EGG token address
const EGG_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';

export default function Trade({ setActiveTab }) {
    const { isConnected, address } = useAccount();
    const { open } = useAppKit(); // 2. UPDATED HOOK

    const [amount, setAmount] = useState('');
    const [targetToken, setTargetToken] = useState('ETH');
    const [isSwapped, setIsSwapped] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Fetch Native ETH Balance (Taiko)
    const { data: ethBalance } = useBalance({
        address,
        chainId: 167000,
    });

    // Fetch $EGG Token Balance (Taiko)
    const { data: eggBalance } = useBalance({
        address,
        token: EGG_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000' ? EGG_TOKEN_ADDRESS : undefined,
        chainId: 167000,
    });

    const displayBalance = () => {
        if (!mounted || !isConnected || !address) return '0.00';

        const currentBalance = isSwapped ? ethBalance : eggBalance;

        // Special Guard for the EGG placeholder
        if (!isSwapped && EGG_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
            return '0.00';
        }

        if (!currentBalance || !currentBalance.value) return '0.00';

        try {
            const formatted = formatUnits(currentBalance.value, currentBalance.decimals);
            const value = parseFloat(formatted);
            return value === 0 ? '0.00' : value.toFixed(isSwapped ? 4 : 2);
        } catch (e) {
            return '0.00';
        }
    };

    const handleSwapDirection = () => {
        setIsSwapped(!isSwapped);
        setAmount('');
    };

    if (!mounted) return null;

    return (
        <section className="w-full max-w-5xl px-8 py-20 animate-in fade-in duration-700">
        <div className="bg-white border-b-8 border-r-8 border-stone-200 rounded-[3rem] p-8 md:p-16 shadow-2xl text-center">

        <header className="mb-16 border-b border-stone-100 pb-10">
        <h2 className="text-5xl md:text-6xl font-serif font-black text-homestead-header mb-6 italic">
        Egg <span className="text-egg-yolk underline decoration-stone-200">Exchange</span>
        </h2>
        <div className="text-xl md:text-2xl text-stone-700 font-medium leading-relaxed mx-auto max-w-2xl">
        Access my homestead economy. Secure your position with $EGG or exit back to the marketplace.
        <div className="mt-12">
        <button onClick={() => setActiveTab('bridge')} className="text-egg-yolk font-black text-xl hover:underline">
        Need $ETH →
        </button>
        </div>
        </div>
        </header>

        <div className="max-w-xl mx-auto">
        <div
        className="relative rounded-[3rem] p-6 border-4 border-[#D9A06F] shadow-2xl bg-homestead-header overflow-hidden"
        style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
            backgroundBlendMode: 'overlay'
        }}
        >
        <div className="flex flex-col gap-4">

        {/* TOP BLOCK (Sell) */}
        <div className="bg-black/40 border border-white/10 p-5 rounded-2xl text-left transition-all">
        <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">You Sell</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-egg-yolk">
        Balance: {displayBalance()}
        </span>
        </div>
        <div className="flex justify-between items-center gap-4">
        <input
        type="number"
        placeholder="0.0"
        className="bg-transparent text-3xl font-black text-white outline-none w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
        {!isSwapped ? (
            <div className="bg-stone-800 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 shadow-lg shrink-0">
            <div className="w-5 h-5 rounded-full bg-egg-yolk shadow-[0_0_10px_#fcd34d]" />
            <span className="font-black text-white text-sm">$EGG</span>
            </div>
        ) : (
            <div className="bg-stone-800 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 shadow-lg shrink-0">
            <span className="font-black text-white text-sm">{targetToken}</span>
            </div>
        )}
        </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="flex justify-center -my-6 z-10">
        <button
        onClick={handleSwapDirection}
        className="bg-homestead-header border-2 border-[#D9A06F] p-2 rounded-full text-egg-yolk shadow-xl hover:scale-110 active:rotate-180 transition-all duration-300"
        >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        </button>
        </div>

        {/* BOTTOM BLOCK (Receive) */}
        <div className="bg-black/40 border border-white/10 p-5 rounded-2xl text-left transition-all">
        <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">You Receive</span>
        </div>
        <div className="flex justify-between items-center gap-4">
        <div className="text-3xl font-black text-stone-500">0.00</div>
        {!isSwapped ? (
            <div className="flex gap-1 bg-stone-900 p-1 rounded-xl border border-white/5">
            <button
            onClick={() => setTargetToken('ETH')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${targetToken === 'ETH' ? 'bg-egg-yolk text-homestead-header shadow-lg' : 'text-stone-500 hover:text-white'}`}
            >
            ETH
            </button>
            <button
            onClick={() => setTargetToken('TAIKO')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${targetToken === 'TAIKO' ? 'bg-egg-yolk text-homestead-header shadow-lg' : 'text-stone-500 hover:text-white'}`}
            >
            TAIKO
            </button>
            </div>
        ) : (
            <div className="bg-stone-800 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 shadow-lg shrink-0">
            <div className="w-5 h-5 rounded-full bg-egg-yolk shadow-[0_0_10px_#fcd34d]" />
            <span className="font-black text-white text-sm">$EGG</span>
            </div>
        )}
        </div>
        </div>

        {/* ACTION BUTTON */}
        {isConnected ? (
            <button className="w-full mt-4 bg-egg-yolk hover:bg-amber-400 text-homestead-header font-black py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-sm">
            {isSwapped ? `Buy $EGG with ${targetToken}` : `Swap $EGG for ${targetToken}`}
            </button>
        ) : (
            <button
            onClick={() => open()}
            className="w-full mt-4 bg-stone-800 hover:bg-stone-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-sm"
            >
            Connect Wallet to Swap
            </button>
        )}
        </div>
        </div>
        </div>

        <div className="max-w-xl mx-auto mt-16 bg-stone-50 border border-stone-100 p-8 rounded-[2.5rem] text-left">
        <div className="flex gap-5">
        <div className="bg-egg-yolk/10 text-egg-yolk rounded-full w-10 h-10 flex items-center justify-center font-black border border-egg-yolk/20 shadow-sm">!</div>
        <div>
        <h4 className="text-homestead-header uppercase text-[10px] font-black tracking-[0.2em] mb-2">Homestead Liquidity Protocol</h4>
        <p className="text-stone-500 text-sm leading-relaxed font-bold">
        The $EGG economy is a private homestead ecosystem. This interface interacts directly with our automated liquidity pools on the Taiko network.
        </p>
        </div>
        </div>
        </div>

        </div>
        </section>
    );
}
