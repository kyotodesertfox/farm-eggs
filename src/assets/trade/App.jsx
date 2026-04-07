import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useConfig } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatUnits } from 'viem';

// Ensure this matches your token exactly
const EGG_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';

export default function Trade({ setActiveTab }) {
    const { isConnected, address, chain } = useAccount();
    const { open } = useWeb3Modal();
    const config = useConfig(); // Connects the hook directly to your App.jsx config

    const [amount, setAmount] = useState('');
    const [targetToken, setTargetToken] = useState('ETH');
    const [isSwapped, setIsSwapped] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // 1. Fetch Native ETH Balance (Taiko)
    const { data: ethBalance } = useBalance({
        address,
        chainId: 167000,
        config,
    });

    // 2. Fetch $EGG Token Balance (Taiko)
    const { data: eggBalance } = useBalance({
        address: address,
        // Only fetch if it's NOT the zero address
        token: (EGG_TOKEN_ADDRESS && EGG_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000')
        ? EGG_TOKEN_ADDRESS
        : undefined,
        chainId: 167000,
        query: {
            // If no token address, disable the query so it doesn't default to ETH
            enabled: !!address && EGG_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
            refetchInterval: 5000,
        }
    });

    const displayBalance = () => {
        // 1. Initial Guard
        if (!isConnected || !address) return '0.00';

        // 2. Identify which balance we are actually looking at
        // If NOT swapped (isSwapped === false), we want EGG
        // If Swapped (isSwapped === true), we want ETH
        const currentBalance = isSwapped ? ethBalance : eggBalance;

        // 3. Special Guard for the EGG placeholder
        // Only return 0.00 if we are actually looking at EGG and the address is missing
        if (!isSwapped && EGG_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
            return '0.00';
        }

        // 4. Data Arrival Guard
        if (!currentBalance) return '0.00';

        // 5. Extraction Logic (Handles both .formatted and raw .value)
        let formattedValue = '0';
        if (currentBalance.formatted) {
            formattedValue = currentBalance.formatted;
        } else if (currentBalance.value) {
            // Fallback for Wagmi v3 raw data
            formattedValue = (Number(currentBalance.value) / Math.pow(10, currentBalance.decimals || 18)).toString();
        }

        const value = parseFloat(formattedValue);

        // 6. Return formatted string (4 decimals for ETH, 2 for EGG)
        if (isNaN(value) || value === 0) return '0.00';
        return value.toFixed(isSwapped ? 4 : 2);
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
        Access my homestead economy.
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
        {/* Network Status Pill */}
        {isConnected && (
            <div className="absolute top-4 right-6 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${chain?.id === 167000 ? 'bg-egg-yolk shadow-[0_0_8px_#fcd34d]' : 'bg-red-500'}`} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">
            {chain?.name || 'Unknown Network'}
            </span>
            </div>
        )}

        <div className="flex flex-col gap-4 mt-6">
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
        <path d="M12 5v14M19 12l-7 7-7-7"/>
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
        <div className="bg-egg-yolk/10 text-egg-yolk rounded-full w-10 h-10 flex items-center justify-center font-black border border-egg-yolk/20">!</div>
        <div>
        <h4 className="text-homestead-header uppercase text-[10px] font-black tracking-widest mb-1">Homestead Protocol</h4>
        <p className="text-stone-500 text-sm font-bold">Trading $EGG on Taiko Mainnet.</p>
        </div>
        </div>
        </div>

        </div>
        </section>
    );
}
