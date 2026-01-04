
import React, { useState, useEffect } from 'react';
import { TransactionStatus, TransactionStep } from '../types';
import { Shield, Flame, Cpu, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

const STEPS: TransactionStep[] = [
  { status: TransactionStatus.BURNING, label: 'Burning ETH', description: 'Sending ETH to an unspendable wormhole address.' },
  { status: TransactionStatus.PROVING, label: 'Generating Proof', description: 'Creating an off-chain ZK-SNARK of the burn event.' },
  { status: TransactionStatus.MINTING, label: 'Reminting', description: 'Claiming fresh ETH at the recipient address.' },
  { status: TransactionStatus.COMPLETED, label: 'Success', description: 'Privacy preserved. On-chain link broken.' },
];

export const Demo: React.FC = () => {
  const [amount, setAmount] = useState('0.1');
  const [recipient, setRecipient] = useState('0x71C7...a839');
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>(TransactionStatus.IDLE);
  const [progress, setProgress] = useState(0);

  const handleStart = async () => {
    if (!amount || !recipient) return;
    
    setCurrentStatus(TransactionStatus.BURNING);
    setProgress(25);
    
    await new Promise(r => setTimeout(r, 2000));
    setCurrentStatus(TransactionStatus.PROVING);
    setProgress(50);
    
    await new Promise(r => setTimeout(r, 3500));
    setCurrentStatus(TransactionStatus.MINTING);
    setProgress(75);
    
    await new Promise(r => setTimeout(r, 2500));
    setCurrentStatus(TransactionStatus.COMPLETED);
    setProgress(100);
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
    <section id="demo" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demo</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Simulate a private transfer using the StealthPay protocol. Witness the ZK-wormhole process in real-time.
        </p>
      </div>

      <div className="bg-[#121826] rounded-3xl p-8 card-border shadow-2xl relative overflow-hidden">
        {currentStatus === TransactionStatus.IDLE ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Amount (ETH)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#1a202c] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Recipient Address</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-[#1a202c] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="0x..."
                />
              </div>
            </div>
            <button 
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
            >
              Initiate Private Transfer <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {STEPS.map((step, idx) => {
                const isActive = currentStatus === step.status;
                const isPast = progress > (idx + 1) * 25 || currentStatus === TransactionStatus.COMPLETED;
                
                return (
                  <div key={step.status} className={`flex items-start gap-4 transition-opacity duration-500 ${isActive || isPast ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-indigo-500/20 ring-2 ring-indigo-500/50 animate-pulse' : 'bg-gray-800'}`}>
                      {isPast ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : getStepIcon(step.status)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg flex items-center gap-3">
                        {step.label}
                        {isActive && <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />}
                      </h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {currentStatus === TransactionStatus.COMPLETED && (
              <div className="pt-6 animate-bounce">
                <button 
                  onClick={reset}
                  className="w-full border border-gray-700 hover:border-indigo-500 text-gray-300 py-3 rounded-xl transition-all"
                >
                  New Transfer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
