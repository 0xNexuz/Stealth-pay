
import React from 'react';
import { Demo } from './components/Demo';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { CodeBlock } from './components/ui/CodeBlock';
import { Shield, Zap, Globe, Github, Terminal, ArrowDown, Lock, Code2, Layers } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      <div className="glow-bg absolute top-0 left-0 w-full h-[800px] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">StealthPay</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#developers" className="hover:text-white transition-colors">Developers</a>
          <a href="#demo" className="bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 px-4 py-2 rounded-full hover:bg-indigo-600/20 transition-all">Launch Demo</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Zap className="w-3 h-3" /> Powered by EIP-7503
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight">
          Native Ethereum Privacy. <br/> Without the Mixers.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Send ETH privately using Zero-Knowledge Wormholes. Burn your ETH, generate a proof, and remint at your destination with zero on-chain link.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#demo" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1">
            Get Started
          </a>
          <a href="https://github.com" target="_blank" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-2xl card-border flex items-center justify-center gap-2 transition-all">
            <Github className="w-5 h-5" /> View Github
          </a>
        </div>
        <div className="mt-20 animate-bounce text-gray-600">
          <ArrowDown className="w-6 h-6 mx-auto" />
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#121826] card-border hover:bg-indigo-500/[0.03] transition-colors group">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Private by Design</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Breaks the transaction graph entirely. There is no linkable transaction between the sender and the receiver on Etherscan.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#121826] card-border hover:bg-indigo-500/[0.03] transition-colors group">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Native Protocol</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unlike mixers, StealthPay uses native EIP-7503 mechanisms. No wrapped tokens, no pools, no liquidity issues.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#121826] card-border hover:bg-indigo-500/[0.03] transition-colors group">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">SDK Ready</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built for developers. Integrate private payments into any dApp with just a few lines of code using our lightweight SDK.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How it works</h2>
        <div className="space-y-12">
          {[
            { step: '01', title: 'Burn', text: 'You send ETH to a specific, unspendable address derived from your recipient\'s public key. This "burns" the ETH out of existence.' },
            { step: '02', title: 'Prove', text: 'Off-chain, we generate a Zero-Knowledge proof verifying that a burn occurred at a specific time, without revealing which transaction it was.' },
            { step: '03', title: 'Remint', text: 'Your recipient submits the proof to the StealthPay system contract, which "remints" the ETH to their fresh, unconnected address.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-8 group">
              <div className="text-4xl md:text-6xl font-black text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
                {item.step}
              </div>
              <div className="pt-2 md:pt-4">
                <h4 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-400 md:text-lg leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <Demo />

      {/* Developer Section */}
      <section id="developers" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#121826] rounded-3xl p-8 md:p-12 card-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Developer Experience</h2>
              <p className="text-gray-400">Integrate privacy in minutes.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <Terminal className="w-4 h-4" /> npm install @stealthpay/sdk
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <CodeBlock 
              code={`
import { StealthPay } from '@stealthpay/sdk';

const sp = new StealthPay(provider);

// Send 1.5 ETH privately
await sp.sendPrivate({
  amount: "1.5",
  recipient: "0xReceiverAddress",
  onStatusUpdate: (status) => console.log(status)
});
              `} 
            />
            <p className="text-gray-400 text-sm italic text-center">
              StealthPay abstracts away proof generation, relayer logic, and contract interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            <span className="font-bold tracking-tight">StealthPay</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-white transition-colors">EIP-7503 Spec</a>
          </div>
          <div className="text-sm text-gray-600">
            © 2024 StealthPay Protocol. Built for a private web.
          </div>
        </div>
      </footer>

      {/* AI Advisor Overlay */}
      <GeminiAdvisor />
    </div>
  );
};

export default App;
