StealthPay 🕶️

Native ETH Privacy via EIP-7503 (Zero-Knowledge Wormholes)

StealthPay is an implementation of EIP-7503, enabling private ETH transfers by breaking the on-chain link between sender and receiver. 

Unlike traditional mixers that rely on liquidity pools (anonymity sets), StealthPay uses a "Burn-and-Mint" mechanism backed by Zero-Knowledge proofs.🚀 

Overview: Traditional privacy protocols on Ethereum often require users to deposit funds into a shared pool (e.g., Tornado Cash).

This creates issues with fragmented liquidity and "tainted" tokens.StealthPay utilizes the concept of Zero-Knowledge Wormholes:

Burn: You send ETH to a provably unspendable address (the "Wormhole").

Prove:

 You generate a ZK-SNARK off-chain proving you burned $X$ amount of ETH without revealing which transaction was yours.

Mint: The protocol verifies the proof and remints native ETH to a completely fresh recipient address.

Key Features 

No Mixers: No need to wait for other users to provide liquidity.

Native ETH: No wrapped tokens or "vETH"—you receive actual Ether.

Gas Optimized: Relayer support allows for gasless minting on the recipient side.

EIP-7503 Compliant: Built on the latest research in Ethereum privacy.

🛠️ How It Works
The Protocol Flow

The Entrance: User calls burn() on the StealthPay contract. 

The ETH is sent to an address derived from a cryptographic "nothing-up-my-sleeve" number.

The Void: The ETH is now effectively destroyed on-chain, but its existence is recorded in the state tree.

The Proof: Using our SDK, the user generates a ZK proof (using Halo2/Circom) that demonstrates knowledge of a valid burn transaction in the history of the chain.

The Exit: The recipient calls mint() (or uses a relayer), providing the ZK proof. 

The contract verifies the proof and releases the ETH.📦 Developer SDKIntegrating private transfers into your dApp is as simple as three lines of code:import { StealthClient } from '@stealthpay/sdk';

const stealth = new StealthClient(window.ethereum);

// Initiate a private transfer of 1.0 ETH
const receipt = await stealth.sendPrivateETH({
  amount: "1.0",
  recipient: "0xRecipientAddress...",
  onStatus: (s) => console.log(`Status: ${s}`)
});
🏗️ Technical StackSmart Contracts: Solidity (Foundry)ZK Circuits: Halo2 / CircomFrontend: React + Tailwind CSSProver: Rust-based off-chain prover service

🔧 InstallationClone the repositorygit clone [https://github.com/your-username/stealthpay.git](https://github.com/your-username/stealthpay.git)
cd stealthpay
Install dependenciesnpm install

Configure Environment:Create a .env file with your RPC URL and private keys:

RPC_URL=[https://eth-holesky.g.alchemy.com/v2/your-api-key](https://eth-holesky.g.alchemy.com/v2/your-api-key)
PRIVATE_KEY=your_testnet_key

Run the Demo Appnpm run dev
 
⚠️DisclaimerThis project is currently in Alpha/Testnet only. 

The cryptography and smart contracts have not been audited. 

Use at your own risk. Do not use with mainnet funds.🤝 

Contributing:Contributions are welcome! Please feel free to submit a Pull Request.

 For major changes, please open an issue first to discuss what you would like to change.📄 

LicenseDistributed under the MIT License. 

See LICENSE for more information.