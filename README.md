
# SmartContract Deployment Using Truffle

This repository demonstrates the process of deploying a basic smart contract using Truffle on the Polygon Amoy testnet.

## Prerequisites

1. **Node.js**: Make sure you have **Node.js v18** installed. You can install Node.js via [nvm](https://github.com/nvm-sh/nvm) or directly from the [Node.js website](https://nodejs.org/).
2. **Truffle**: Install Truffle globally if you haven't already:
    ```bash
    npm install -g truffle
    ```

## Setup Instructions

### 1. Install Dependencies
Run the following command to install the necessary node packages:
```bash
npm install
```

### 2. Compile the Contract
To compile the smart contracts, run:
```bash
npx truffle compile
```

### 3. Configuration
Replace the following values in your `truffle-config.js` file:
- **MNEMONIC**: Your wallet's mnemonic (12 or 24-word seed phrase).
- **PolygonScan API Key**: Get this from [PolygonScan](https://polygonscan.com).
- **Infura URL**: You can obtain this by signing up for an Infura account and creating a project for the Polygon network.

Example configuration in `truffle-config.js`:
```javascript
amoy: {
  provider: () => new HDWalletProvider(MNEMONIC, `https://polygon-amoy.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
  network_id: 80002,       // Amoy's network ID
  gas: 5500000,            // Gas limit for deployment
  gasPrice: 25000000000,   // Gas price (25 Gwei)
  confirmations: 2,        // Confirmations to wait between deployments
  timeoutBlocks: 200,      // Block timeout for deployment
  skipDryRun: true,        // Skip dry run before deployment
  verify: {
    apiUrl: 'https://api-amoy.polygonscan.com/api',
    apiKey: 'YOUR_POLYGONSCAN_API_KEY',
  },
},
```

### 4. Deploy the Contract
Once everything is configured, deploy the contract using:
```bash
npx truffle migrate --network amoy --reset
```

### 5. Verify the Contract on Amoy Testnet
After deployment, verify the contract on the Amoy testnet using the following command:
```bash
npx truffle run verify Token1 --network amoy
```

Make sure to replace `Token1` with your actual contract name if different.

---

This should be clearer for anyone following your deployment process.