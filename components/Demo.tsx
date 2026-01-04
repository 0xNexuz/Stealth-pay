
import React, { useState } from 'react';
import { TransactionStatus, TransactionStep } from '../types';
import { Shield, Flame, Cpu, Sparkles, CheckCircle2, Loader2, ArrowRight, Info } from 'lucide-react';

const STEPS: TransactionStep[] = [
  { status: TransactionStatus.BURNING, label: 'Wormhole Burn', description: 'ETH is sent to a pre-computed unspendable address.' },
  { status: TransactionStatus.PROVING, label: 'ZK-SNARK Generation', description: 'Generating a non-interactive proof of the burn event.' },
  { status: TransactionStatus.MINTING, label: 'Protocol Remint', description: 'Fresh ETH is minted to the destination address.' },
  { status: TransactionStatus.COMPLETED, label: 'Privacy Secured', description: 'Transaction complete with zero linkable history.' },
];

export const Demo: React.FC = () => {
  const [amount, setAmount] = useState('0.1');
  const [recipient, setRecipient] = useState('0x71C7...a839');
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>(TransactionStatus.IDLE);
  const [progress, setProgress] = useState(0);

  const handleStart = async () => {
    if (!amount || !recipient) return;
    
    setCurrentStatus(TransactionStatus.BURNING);
    setProgress(15);
    await new Promise(r => setTimeout(r, 1500));
    
    setProgress(35);
    setCurrentStatus(TransactionStatus.PROVING);
    // ZK Proofs take a bit longer in reality
    await new Promise(r => setTimeout(r, 4000));
    
    setProgress(70);
    setCurrentStatus(TransactionStatus.MINTING);
    await new Promise(r => setTimeout(r, 2000));
    
    setProgress(100);
    setCurrentStatus(TransactionStatus.COMPLETED);
  };

  const reset = () => {
    setCurrentStatus(TransactionStatus.IDLE);
    setProgress(0);
  };

  const getStepIcon = (status: TransactionStatus) => {
    switch(status) {
      case TransactionStatus.BURNING: return <Flame className="w-6 h-6 text-orange-400" />;
      case TransactionStatus.PROVING: return <Cpu className="w-6 h-6 text-blue-400" />;
      case TransactionStatus.MINTING: return <Sparkles className="w-6 h-6 text-purple-400" />;
      case TransactionStatus.COMPLETED: return <CheckCircle2 className="w-6 h-6 text-green-400" />;
      default: return <Shield className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <section id="demo" className="py-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Interactive Demo</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Experience the ZK-Wormhole flow. StealthPay uses EIP-7503 to break the deterministic link between accounts.
        </p>
      </div>

      <div className="bg-[#121826]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
        
        {currentStatus === TransactionStatus.IDLE ? (
          <div className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 ml-1 flex items-center gap-2">
                  Amount to Send <Info className="w-3 h-3 opacity-50" />
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-lg"
                    placeholder="0.0"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">ETH</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 ml-1">Recipient Public Address</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                  placeholder="0x..."
                />
              </div>
            </div>
            <button 
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98]"
            >
              Initiate Private Protocol <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-indigo-400 uppercase tracking-widest text-xs">Protocol Progress</span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {STEPS.map((step, idx) => {
                const isActive = currentStatus === step.status;
                const isPast = progress > (idx + 0.5) * 25 || currentStatus === TransactionStatus.COMPLETED;
                
                return (
                  <div key={step.status} className={`flex items-start gap-6 transition-all duration-500 ${isActive ? 'scale-105' : ''} ${isActive || isPast ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`p-4 rounded-2xl transition-all ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : 'bg-white/5 border border-white/10 text-gray-400'}`}>
                      {isPast ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : getStepIcon(step.status)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xl flex items-center gap-3">
                        {step.label}
                        {isActive && <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {currentStatus === TransactionStatus.COMPLETED && (
              <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button 
                  onClick={reset}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-2xl transition-all font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
